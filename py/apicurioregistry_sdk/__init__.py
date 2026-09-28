# ApicurioRegistry SDK

from apicurioregistry_sdk.utility.voxgig_struct import voxgig_struct as vs
from apicurioregistry_sdk.core.utility_type import ApicurioRegistryUtility
from apicurioregistry_sdk.core.spec import ApicurioRegistrySpec
from apicurioregistry_sdk.core import helpers

# Load utility registration (populates Utility._registrar)
from apicurioregistry_sdk.utility import register

# Load features
from apicurioregistry_sdk.feature.base_feature import ApicurioRegistryBaseFeature
from apicurioregistry_sdk.features import _has_feature, _make_feature


class ApicurioRegistrySDK:

    def __init__(self, options=None):
        self.mode = "live"
        self.features = []
        self.options = None

        utility = ApicurioRegistryUtility()
        self._utility = utility

        from apicurioregistry_sdk.config import shared_config
        config = shared_config()

        self._rootctx = utility.make_context({
            "client": self,
            "utility": utility,
            "config": config,
            "options": options if options is not None else {},
            "shared": {},
        }, None)

        self.options = utility.make_options(self._rootctx)

        if vs.getpath(self.options, "feature.test.active") is True:
            self.mode = "test"

        self._rootctx.options = self.options

        # Add features in the resolved order (make_options puts an explicit
        # list order first, else defaults to test-first). Ordering matters: the
        # `test` feature installs the base mock transport and the transport
        # features (retry/cache/netsim/proxy/ratelimit) wrap whatever is
        # current, so `test` must be added before them to sit at the base.
        # Extension feature INSTANCES come from the RAW construction
        # options - extend is consumed exactly once, here. make_options
        # strips the key before cloning (vs.clone flattens arbitrary
        # objects), so self.options never carries the instances.
        feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
        extend = options.get("extend") if isinstance(options, dict) else None
        if not isinstance(extend, list):
            extend = []
        if feature_opts is not None:
            featureorder = vs.getpath(self.options, "__derived__.featureorder")
            if isinstance(featureorder, list):
                for fname in featureorder:
                    fopts = helpers.to_map(feature_opts.get(fname))
                    if fopts is not None and fopts.get("active") is True:
                        # An active name with no generated feature class is
                        # legal when an extend-supplied instance carries that
                        # name (station's adopt path): the instance is added
                        # below, positioned by its own __after__ entry, so
                        # skip it here rather than add a BaseFeature stray
                        # that would silently shift feature positions.
                        if not _has_feature(fname) and any(
                            fname == (f.get("name") if isinstance(f, dict)
                                      else getattr(f, "name", None))
                            for f in extend
                        ):
                            continue
                        utility.feature_add(self._rootctx, _make_feature(fname))

        # Add extension features.
        for f in extend:
            if isinstance(f, dict) or (hasattr(f, "get_name") and callable(f.get_name)):
                utility.feature_add(self._rootctx, f)

        # Initialize features.
        for f in self.features:
            utility.feature_init(self._rootctx, f)

        utility.feature_hook(self._rootctx, "PostConstruct")

        # #BuildFeatures

    def options_map(self):
        out = vs.clone(self.options)
        if isinstance(out, dict):
            return out
        return {}

    def get_utility(self):
        return ApicurioRegistryUtility.copy(self._utility)

    def get_root_ctx(self):
        return self._rootctx

    def prepare(self, fetchargs=None):
        utility = self._utility

        if fetchargs is None:
            fetchargs = {}

        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "prepare",
            "ctrl": ctrl,
        }, self._rootctx)

        options = self.options

        path = vs.getprop(fetchargs, "path") or ""
        if not isinstance(path, str):
            path = ""

        method = vs.getprop(fetchargs, "method") or "GET"
        if not isinstance(method, str):
            method = "GET"

        params = helpers.to_map(vs.getprop(fetchargs, "params"))
        if params is None:
            params = {}
        query = helpers.to_map(vs.getprop(fetchargs, "query"))
        if query is None:
            query = {}

        headers = utility.prepare_headers(ctx)

        base = vs.getprop(options, "base") or ""
        if not isinstance(base, str):
            base = ""
        prefix = vs.getprop(options, "prefix") or ""
        if not isinstance(prefix, str):
            prefix = ""
        suffix = vs.getprop(options, "suffix") or ""
        if not isinstance(suffix, str):
            suffix = ""

        ctx.spec = ApicurioRegistrySpec({
            "base": base,
            "prefix": prefix,
            "suffix": suffix,
            "path": path,
            "method": method,
            "params": params,
            "query": query,
            "headers": headers,
            "body": vs.getprop(fetchargs, "body"),
            "step": "start",
        })

        # Merge user-provided headers.
        uh = vs.getprop(fetchargs, "headers")
        if isinstance(uh, dict):
            for k, v in uh.items():
                ctx.spec.headers[k] = v

        _, err = utility.prepare_auth(ctx)
        if err is not None:
            raise err

        fetchdef, err = utility.make_fetch_def(ctx)
        if err is not None:
            raise err

        return fetchdef

    # Raw endpoint access is operator-controllable, like every entity op.
    # Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
    # either one reaches the same endpoint.
    def direct(self, fetchargs=None):
        if not self._op_allowed("direct"):
            return self._op_denied("direct")

        return self._raw_request(fetchargs)

    # Is this raw-access op permitted by the SDK's allow.op option?
    def _op_allowed(self, op):
        allow_op = vs.getpath(self.options, "allow.op")
        return isinstance(allow_op, str) and op in allow_op

    def _op_denied(self, op):
        allow_op = vs.getpath(self.options, "allow.op")
        return {
            "ok": False,
            "err": Exception(
                "ApicurioRegistrySDK: " + op + ": operation not allowed by"
                ' SDK option allow.op value: "' + str(allow_op) + '"'),
        }

    # Ungated request path shared by direct and graphql, each of which checks
    # its own allow.op token first. Private, rather than a flag on fetchargs:
    # a caller-supplied marker would let anyone opt straight back out of the
    # gate by passing it.
    def _raw_request(self, fetchargs=None):
        utility = self._utility

        try:
            fetchdef = self.prepare(fetchargs)
        except Exception as err:
            # direct() is the raw-HTTP escape hatch: it never raises, it
            # returns a result object callers branch on via result["ok"].
            return {"ok": False, "err": err}

        if fetchargs is None:
            fetchargs = {}
        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "direct",
            "ctrl": ctrl,
        }, self._rootctx)

        url = fetchdef.get("url", "")
        fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

        if fetch_err is not None:
            return {"ok": False, "err": fetch_err}

        if fetched is None:
            return {
                "ok": False,
                "err": ctx.make_error("direct_no_response", "response: undefined"),
            }

        if isinstance(fetched, dict):
            status = helpers.to_int(vs.getprop(fetched, "status"))
            headers = vs.getprop(fetched, "headers") or {}

            # No-body responses (204, 304) and explicit zero content-length
            # must skip JSON parsing — calling json() on an empty body raises.
            content_length = None
            if isinstance(headers, dict):
                content_length = headers.get("content-length")
            no_body = status in (204, 304) or str(content_length) == "0"

            json_data = None
            if not no_body:
                jf = vs.getprop(fetched, "json")
                if callable(jf):
                    try:
                        json_data = jf()
                    except Exception:
                        # Non-JSON body (e.g. text/plain, text/html). Surface
                        # status + headers but leave data as None.
                        json_data = None

            return {
                "ok": status >= 200 and status < 300,
                "status": status,
                "headers": headers,
                "data": json_data,
            }

        return {
            "ok": False,
            "err": ctx.make_error("direct_invalid", "invalid response type"),
        }

    # Raw GraphQL access: the pressure valve that makes the generated
    # surface's deliberate omissions (per-call selection sets, typed filter
    # builders, batching, subscriptions) livable — the whole schema stays
    # reachable.
    #
    # Thin wrapper over the same prepare/fetch path direct uses, with the one
    # thing raw direct cannot do for GraphQL: a GraphQL failure rides HTTP 200
    # as a top-level `errors` array, so status alone would report a failed
    # query as ok.
    #
    # NOTE: like direct, this bypasses the feature pipeline — no retry,
    # ratelimit or paging features apply.
    def graphql(self, query, variables=None, ctrl=None):
        if not self._op_allowed("graphql"):
            return self._op_denied("graphql")

        res = self._raw_request({
            "method": "POST",
            "headers": {"content-type": "application/json"},
            "body": {"query": query, "variables": variables or {}},
            "ctrl": ctrl or {},
        })

        # Errors are read BEFORE any status check: a GraphQL parse or
        # validation failure comes back as HTTP 400 carrying the standard
        # { errors: [...] } body, and the raw path represents a non-2xx as
        # ok:False with no err — so returning early on status would discard
        # the server's own diagnostics, which are the only useful part of
        # that response.
        errors = vs.getpath(res, "data.errors")

        if isinstance(errors, list) and 0 < len(errors):
            first = errors[0] if isinstance(errors[0], dict) else {}
            msg = first.get("message") or "graphql error"
            res["ok"] = False
            res["err"] = Exception("ApicurioRegistrySDK: graphql: " + str(msg))
            res["graphql"] = errors

        return res


    def Admin(self, data=None) -> "AdminEntity":
        """Entity factory: client.Admin().list() / client.Admin().load({"id": ...})."""
        from apicurioregistry_sdk.entity.admin_entity import AdminEntity
        return AdminEntity(self, data)


    def Agent(self, data=None) -> "AgentEntity":
        """Entity factory: client.Agent().list() / client.Agent().load({"id": ...})."""
        from apicurioregistry_sdk.entity.agent_entity import AgentEntity
        return AgentEntity(self, data)


    def AgentCard(self, data=None) -> "AgentCardEntity":
        """Entity factory: client.AgentCard().list() / client.AgentCard().load({"id": ...})."""
        from apicurioregistry_sdk.entity.agent_card_entity import AgentCardEntity
        return AgentCardEntity(self, data)


    def AiCatalog(self, data=None) -> "AiCatalogEntity":
        """Entity factory: client.AiCatalog().list() / client.AiCatalog().load({"id": ...})."""
        from apicurioregistry_sdk.entity.ai_catalog_entity import AiCatalogEntity
        return AiCatalogEntity(self, data)


    def ArdExplore(self, data=None) -> "ArdExploreEntity":
        """Entity factory: client.ArdExplore().list() / client.ArdExplore().load({"id": ...})."""
        from apicurioregistry_sdk.entity.ard_explore_entity import ArdExploreEntity
        return ArdExploreEntity(self, data)


    def ArdSearch(self, data=None) -> "ArdSearchEntity":
        """Entity factory: client.ArdSearch().list() / client.ArdSearch().load({"id": ...})."""
        from apicurioregistry_sdk.entity.ard_search_entity import ArdSearchEntity
        return ArdSearchEntity(self, data)


    def Artifact(self, data=None) -> "ArtifactEntity":
        """Entity factory: client.Artifact().list() / client.Artifact().load({"id": ...})."""
        from apicurioregistry_sdk.entity.artifact_entity import ArtifactEntity
        return ArtifactEntity(self, data)


    def ArtifactReference(self, data=None) -> "ArtifactReferenceEntity":
        """Entity factory: client.ArtifactReference().list() / client.ArtifactReference().load({"id": ...})."""
        from apicurioregistry_sdk.entity.artifact_reference_entity import ArtifactReferenceEntity
        return ArtifactReferenceEntity(self, data)


    def ArtifactRule(self, data=None) -> "ArtifactRuleEntity":
        """Entity factory: client.ArtifactRule().list() / client.ArtifactRule().load({"id": ...})."""
        from apicurioregistry_sdk.entity.artifact_rule_entity import ArtifactRuleEntity
        return ArtifactRuleEntity(self, data)


    def ArtifactType(self, data=None) -> "ArtifactTypeEntity":
        """Entity factory: client.ArtifactType().list() / client.ArtifactType().load({"id": ...})."""
        from apicurioregistry_sdk.entity.artifact_type_entity import ArtifactTypeEntity
        return ArtifactTypeEntity(self, data)


    def Branch(self, data=None) -> "BranchEntity":
        """Entity factory: client.Branch().list() / client.Branch().load({"id": ...})."""
        from apicurioregistry_sdk.entity.branch_entity import BranchEntity
        return BranchEntity(self, data)


    def Comment(self, data=None) -> "CommentEntity":
        """Entity factory: client.Comment().list() / client.Comment().load({"id": ...})."""
        from apicurioregistry_sdk.entity.comment_entity import CommentEntity
        return CommentEntity(self, data)


    def ConfigurationProperty(self, data=None) -> "ConfigurationPropertyEntity":
        """Entity factory: client.ConfigurationProperty().list() / client.ConfigurationProperty().load({"id": ...})."""
        from apicurioregistry_sdk.entity.configuration_property_entity import ConfigurationPropertyEntity
        return ConfigurationPropertyEntity(self, data)


    def ConsumerVersionHeatmap(self, data=None) -> "ConsumerVersionHeatmapEntity":
        """Entity factory: client.ConsumerVersionHeatmap().list() / client.ConsumerVersionHeatmap().load({"id": ...})."""
        from apicurioregistry_sdk.entity.consumer_version_heatmap_entity import ConsumerVersionHeatmapEntity
        return ConsumerVersionHeatmapEntity(self, data)


    def Content(self, data=None) -> "ContentEntity":
        """Entity factory: client.Content().list() / client.Content().load({"id": ...})."""
        from apicurioregistry_sdk.entity.content_entity import ContentEntity
        return ContentEntity(self, data)


    def Contract(self, data=None) -> "ContractEntity":
        """Entity factory: client.Contract().list() / client.Contract().load({"id": ...})."""
        from apicurioregistry_sdk.entity.contract_entity import ContractEntity
        return ContractEntity(self, data)


    def ContractRule(self, data=None) -> "ContractRuleEntity":
        """Entity factory: client.ContractRule().list() / client.ContractRule().load({"id": ...})."""
        from apicurioregistry_sdk.entity.contract_rule_entity import ContractRuleEntity
        return ContractRuleEntity(self, data)


    def ContractRuleSet(self, data=None) -> "ContractRuleSetEntity":
        """Entity factory: client.ContractRuleSet().list() / client.ContractRuleSet().load({"id": ...})."""
        from apicurioregistry_sdk.entity.contract_rule_set_entity import ContractRuleSetEntity
        return ContractRuleSetEntity(self, data)


    def CreateArtifact(self, data=None) -> "CreateArtifactEntity":
        """Entity factory: client.CreateArtifact().list() / client.CreateArtifact().load({"id": ...})."""
        from apicurioregistry_sdk.entity.create_artifact_entity import CreateArtifactEntity
        return CreateArtifactEntity(self, data)


    def DeprecationReadiness(self, data=None) -> "DeprecationReadinessEntity":
        """Entity factory: client.DeprecationReadiness().list() / client.DeprecationReadiness().load({"id": ...})."""
        from apicurioregistry_sdk.entity.deprecation_readiness_entity import DeprecationReadinessEntity
        return DeprecationReadinessEntity(self, data)


    def DownloadRef(self, data=None) -> "DownloadRefEntity":
        """Entity factory: client.DownloadRef().list() / client.DownloadRef().load({"id": ...})."""
        from apicurioregistry_sdk.entity.download_ref_entity import DownloadRefEntity
        return DownloadRefEntity(self, data)


    def GitOp(self, data=None) -> "GitOpEntity":
        """Entity factory: client.GitOp().list() / client.GitOp().load({"id": ...})."""
        from apicurioregistry_sdk.entity.git_op_entity import GitOpEntity
        return GitOpEntity(self, data)


    def GitOpsStatus(self, data=None) -> "GitOpsStatusEntity":
        """Entity factory: client.GitOpsStatus().list() / client.GitOpsStatus().load({"id": ...})."""
        from apicurioregistry_sdk.entity.git_ops_status_entity import GitOpsStatusEntity
        return GitOpsStatusEntity(self, data)


    def GitOpsValidateTask(self, data=None) -> "GitOpsValidateTaskEntity":
        """Entity factory: client.GitOpsValidateTask().list() / client.GitOpsValidateTask().load({"id": ...})."""
        from apicurioregistry_sdk.entity.git_ops_validate_task_entity import GitOpsValidateTaskEntity
        return GitOpsValidateTaskEntity(self, data)


    def GlobalRule(self, data=None) -> "GlobalRuleEntity":
        """Entity factory: client.GlobalRule().list() / client.GlobalRule().load({"id": ...})."""
        from apicurioregistry_sdk.entity.global_rule_entity import GlobalRuleEntity
        return GlobalRuleEntity(self, data)


    def Group(self, data=None) -> "GroupEntity":
        """Entity factory: client.Group().list() / client.Group().load({"id": ...})."""
        from apicurioregistry_sdk.entity.group_entity import GroupEntity
        return GroupEntity(self, data)


    def GroupRule(self, data=None) -> "GroupRuleEntity":
        """Entity factory: client.GroupRule().list() / client.GroupRule().load({"id": ...})."""
        from apicurioregistry_sdk.entity.group_rule_entity import GroupRuleEntity
        return GroupRuleEntity(self, data)


    def KafkaSql(self, data=None) -> "KafkaSqlEntity":
        """Entity factory: client.KafkaSql().list() / client.KafkaSql().load({"id": ...})."""
        from apicurioregistry_sdk.entity.kafka_sql_entity import KafkaSqlEntity
        return KafkaSqlEntity(self, data)


    def McpTool(self, data=None) -> "McpToolEntity":
        """Entity factory: client.McpTool().list() / client.McpTool().load({"id": ...})."""
        from apicurioregistry_sdk.entity.mcp_tool_entity import McpToolEntity
        return McpToolEntity(self, data)


    def Metadata(self, data=None) -> "MetadataEntity":
        """Entity factory: client.Metadata().list() / client.Metadata().load({"id": ...})."""
        from apicurioregistry_sdk.entity.metadata_entity import MetadataEntity
        return MetadataEntity(self, data)


    def OdcsContractResult(self, data=None) -> "OdcsContractResultEntity":
        """Entity factory: client.OdcsContractResult().list() / client.OdcsContractResult().load({"id": ...})."""
        from apicurioregistry_sdk.entity.odcs_contract_result_entity import OdcsContractResultEntity
        return OdcsContractResultEntity(self, data)


    def OdcsContractSummary(self, data=None) -> "OdcsContractSummaryEntity":
        """Entity factory: client.OdcsContractSummary().list() / client.OdcsContractSummary().load({"id": ...})."""
        from apicurioregistry_sdk.entity.odcs_contract_summary_entity import OdcsContractSummaryEntity
        return OdcsContractSummaryEntity(self, data)


    def ReferenceGraph(self, data=None) -> "ReferenceGraphEntity":
        """Entity factory: client.ReferenceGraph().list() / client.ReferenceGraph().load({"id": ...})."""
        from apicurioregistry_sdk.entity.reference_graph_entity import ReferenceGraphEntity
        return ReferenceGraphEntity(self, data)


    def RoleMapping(self, data=None) -> "RoleMappingEntity":
        """Entity factory: client.RoleMapping().list() / client.RoleMapping().load({"id": ...})."""
        from apicurioregistry_sdk.entity.role_mapping_entity import RoleMappingEntity
        return RoleMappingEntity(self, data)


    def Rule(self, data=None) -> "RuleEntity":
        """Entity factory: client.Rule().list() / client.Rule().load({"id": ...})."""
        from apicurioregistry_sdk.entity.rule_entity import RuleEntity
        return RuleEntity(self, data)


    def SearchedBranch(self, data=None) -> "SearchedBranchEntity":
        """Entity factory: client.SearchedBranch().list() / client.SearchedBranch().load({"id": ...})."""
        from apicurioregistry_sdk.entity.searched_branch_entity import SearchedBranchEntity
        return SearchedBranchEntity(self, data)


    def SearchedGroup(self, data=None) -> "SearchedGroupEntity":
        """Entity factory: client.SearchedGroup().list() / client.SearchedGroup().load({"id": ...})."""
        from apicurioregistry_sdk.entity.searched_group_entity import SearchedGroupEntity
        return SearchedGroupEntity(self, data)


    def SystemInfo(self, data=None) -> "SystemInfoEntity":
        """Entity factory: client.SystemInfo().list() / client.SystemInfo().load({"id": ...})."""
        from apicurioregistry_sdk.entity.system_info_entity import SystemInfoEntity
        return SystemInfoEntity(self, data)


    def UsageSummary(self, data=None) -> "UsageSummaryEntity":
        """Entity factory: client.UsageSummary().list() / client.UsageSummary().load({"id": ...})."""
        from apicurioregistry_sdk.entity.usage_summary_entity import UsageSummaryEntity
        return UsageSummaryEntity(self, data)


    def UserInfo(self, data=None) -> "UserInfoEntity":
        """Entity factory: client.UserInfo().list() / client.UserInfo().load({"id": ...})."""
        from apicurioregistry_sdk.entity.user_info_entity import UserInfoEntity
        return UserInfoEntity(self, data)


    def UserInterfaceConfig(self, data=None) -> "UserInterfaceConfigEntity":
        """Entity factory: client.UserInterfaceConfig().list() / client.UserInterfaceConfig().load({"id": ...})."""
        from apicurioregistry_sdk.entity.user_interface_config_entity import UserInterfaceConfigEntity
        return UserInterfaceConfigEntity(self, data)


    def Version(self, data=None) -> "VersionEntity":
        """Entity factory: client.Version().list() / client.Version().load({"id": ...})."""
        from apicurioregistry_sdk.entity.version_entity import VersionEntity
        return VersionEntity(self, data)


    def WellKnown(self, data=None) -> "WellKnownEntity":
        """Entity factory: client.WellKnown().list() / client.WellKnown().load({"id": ...})."""
        from apicurioregistry_sdk.entity.well_known_entity import WellKnownEntity
        return WellKnownEntity(self, data)


    def WrappedVersionState(self, data=None) -> "WrappedVersionStateEntity":
        """Entity factory: client.WrappedVersionState().list() / client.WrappedVersionState().load({"id": ...})."""
        from apicurioregistry_sdk.entity.wrapped_version_state_entity import WrappedVersionStateEntity
        return WrappedVersionStateEntity(self, data)



    @classmethod
    def test(cls, testopts=None, sdkopts=None) -> "ApicurioRegistrySDK":
        if sdkopts is None:
            sdkopts = {}
        sdkopts = vs.clone(sdkopts)
        if not isinstance(sdkopts, dict):
            sdkopts = {}

        if testopts is None:
            testopts = {}
        testopts = vs.clone(testopts)
        if not isinstance(testopts, dict):
            testopts = {}
        testopts["active"] = True

        vs.setpath(sdkopts, "feature.test", testopts)

        sdk = cls(sdkopts)
        sdk.mode = "test"

        return sdk


from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from apicurioregistry_sdk.entity.admin_entity import AdminEntity
    from apicurioregistry_sdk.entity.agent_entity import AgentEntity
    from apicurioregistry_sdk.entity.agent_card_entity import AgentCardEntity
    from apicurioregistry_sdk.entity.ai_catalog_entity import AiCatalogEntity
    from apicurioregistry_sdk.entity.ard_explore_entity import ArdExploreEntity
    from apicurioregistry_sdk.entity.ard_search_entity import ArdSearchEntity
    from apicurioregistry_sdk.entity.artifact_entity import ArtifactEntity
    from apicurioregistry_sdk.entity.artifact_reference_entity import ArtifactReferenceEntity
    from apicurioregistry_sdk.entity.artifact_rule_entity import ArtifactRuleEntity
    from apicurioregistry_sdk.entity.artifact_type_entity import ArtifactTypeEntity
    from apicurioregistry_sdk.entity.branch_entity import BranchEntity
    from apicurioregistry_sdk.entity.comment_entity import CommentEntity
    from apicurioregistry_sdk.entity.configuration_property_entity import ConfigurationPropertyEntity
    from apicurioregistry_sdk.entity.consumer_version_heatmap_entity import ConsumerVersionHeatmapEntity
    from apicurioregistry_sdk.entity.content_entity import ContentEntity
    from apicurioregistry_sdk.entity.contract_entity import ContractEntity
    from apicurioregistry_sdk.entity.contract_rule_entity import ContractRuleEntity
    from apicurioregistry_sdk.entity.contract_rule_set_entity import ContractRuleSetEntity
    from apicurioregistry_sdk.entity.create_artifact_entity import CreateArtifactEntity
    from apicurioregistry_sdk.entity.deprecation_readiness_entity import DeprecationReadinessEntity
    from apicurioregistry_sdk.entity.download_ref_entity import DownloadRefEntity
    from apicurioregistry_sdk.entity.git_op_entity import GitOpEntity
    from apicurioregistry_sdk.entity.git_ops_status_entity import GitOpsStatusEntity
    from apicurioregistry_sdk.entity.git_ops_validate_task_entity import GitOpsValidateTaskEntity
    from apicurioregistry_sdk.entity.global_rule_entity import GlobalRuleEntity
    from apicurioregistry_sdk.entity.group_entity import GroupEntity
    from apicurioregistry_sdk.entity.group_rule_entity import GroupRuleEntity
    from apicurioregistry_sdk.entity.kafka_sql_entity import KafkaSqlEntity
    from apicurioregistry_sdk.entity.mcp_tool_entity import McpToolEntity
    from apicurioregistry_sdk.entity.metadata_entity import MetadataEntity
    from apicurioregistry_sdk.entity.odcs_contract_result_entity import OdcsContractResultEntity
    from apicurioregistry_sdk.entity.odcs_contract_summary_entity import OdcsContractSummaryEntity
    from apicurioregistry_sdk.entity.reference_graph_entity import ReferenceGraphEntity
    from apicurioregistry_sdk.entity.role_mapping_entity import RoleMappingEntity
    from apicurioregistry_sdk.entity.rule_entity import RuleEntity
    from apicurioregistry_sdk.entity.searched_branch_entity import SearchedBranchEntity
    from apicurioregistry_sdk.entity.searched_group_entity import SearchedGroupEntity
    from apicurioregistry_sdk.entity.system_info_entity import SystemInfoEntity
    from apicurioregistry_sdk.entity.usage_summary_entity import UsageSummaryEntity
    from apicurioregistry_sdk.entity.user_info_entity import UserInfoEntity
    from apicurioregistry_sdk.entity.user_interface_config_entity import UserInterfaceConfigEntity
    from apicurioregistry_sdk.entity.version_entity import VersionEntity
    from apicurioregistry_sdk.entity.well_known_entity import WellKnownEntity
    from apicurioregistry_sdk.entity.wrapped_version_state_entity import WrappedVersionStateEntity
