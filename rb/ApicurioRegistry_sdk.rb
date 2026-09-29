# ApicurioRegistry SDK

require_relative 'utility/struct/voxgig_struct'
require_relative 'core/utility_type'
require_relative 'core/spec'
require_relative 'core/helpers'

# Load utility registration
require_relative 'utility/register'

# Load config and features
require_relative 'config'
require_relative 'feature/base_feature'
require_relative 'features'

# Load typed models (Struct value objects).
require_relative 'ApicurioRegistry_types'


class ApicurioRegistrySDK
  attr_accessor :mode, :features, :options

  def initialize(options = {})
    @mode = "live"
    @features = []
    @options = nil

    utility = ApicurioRegistryUtility.new
    @_utility = utility

    config = ApicurioRegistryConfig.shared_config

    @_rootctx = utility.make_context.call({
      "client" => self,
      "utility" => utility,
      "config" => config,
      "options" => options || {},
      "shared" => {},
    }, nil)

    @options = utility.make_options.call(@_rootctx)

    if VoxgigStruct.getpath(@options, "feature.test.active") == true
      @mode = "test"
    end

    @_rootctx.options = @options

    # Add features in the resolved order (make_options puts an explicit array
    # order first, else defaults to test-first). Ordering matters: the `test`
    # feature installs the base mock transport and the transport features
    # (retry/cache/netsim/proxy/ratelimit) wrap whatever is current, so `test`
    # must be added before them to sit at the base of the chain.
    feature_opts = ApicurioRegistryHelpers.to_map(VoxgigStruct.getprop(@options, "feature"))
    if feature_opts
      featureorder = VoxgigStruct.getpath(@options, "__derived__.featureorder")
      if featureorder.is_a?(Array)
        featureorder.each do |fname|
          fopts = ApicurioRegistryHelpers.to_map(feature_opts[fname])
          if fopts && fopts["active"] == true
            utility.feature_add.call(@_rootctx, ApicurioRegistryFeatures.make_feature(fname))
          end
        end
      end
    end

    # Add extension features.
    extend_val = VoxgigStruct.getprop(@options, "extend")
    if extend_val.is_a?(Array)
      extend_val.each do |f|
        if f.respond_to?(:get_name)
          utility.feature_add.call(@_rootctx, f)
        end
      end
    end

    # Initialize features.
    @features.each do |f|
      utility.feature_init.call(@_rootctx, f)
    end

    utility.feature_hook.call(@_rootctx, "PostConstruct")
  end

  def options_map
    out = VoxgigStruct.clone(@options)
    out.is_a?(Hash) ? out : {}
  end

  def get_utility
    ApicurioRegistryUtility.copy(@_utility)
  end

  def get_root_ctx
    @_rootctx
  end

  def prepare(fetchargs = {})
    utility = @_utility
    fetchargs ||= {}

    ctrl = ApicurioRegistryHelpers.to_map(VoxgigStruct.getprop(fetchargs, "ctrl")) || {}

    ctx = utility.make_context.call({
      "opname" => "prepare",
      "ctrl" => ctrl,
    }, @_rootctx)

    opts = @options
    path = VoxgigStruct.getprop(fetchargs, "path") || ""
    path = "" unless path.is_a?(String)
    method_val = VoxgigStruct.getprop(fetchargs, "method") || "GET"
    method_val = "GET" unless method_val.is_a?(String)
    params = ApicurioRegistryHelpers.to_map(VoxgigStruct.getprop(fetchargs, "params")) || {}
    query = ApicurioRegistryHelpers.to_map(VoxgigStruct.getprop(fetchargs, "query")) || {}
    headers = utility.prepare_headers.call(ctx)

    base = VoxgigStruct.getprop(opts, "base") || ""
    base = "" unless base.is_a?(String)
    prefix = VoxgigStruct.getprop(opts, "prefix") || ""
    prefix = "" unless prefix.is_a?(String)
    suffix = VoxgigStruct.getprop(opts, "suffix") || ""
    suffix = "" unless suffix.is_a?(String)

    ctx.spec = ApicurioRegistrySpec.new({
      "base" => base, "prefix" => prefix, "suffix" => suffix,
      "path" => path, "method" => method_val,
      "params" => params, "query" => query, "headers" => headers,
      "body" => VoxgigStruct.getprop(fetchargs, "body"),
      "step" => "start",
    })

    # Merge user-provided headers.
    uh = VoxgigStruct.getprop(fetchargs, "headers")
    if uh.is_a?(Hash)
      uh.each { |k, v| ctx.spec.headers[k] = v }
    end

    _, err = utility.prepare_auth.call(ctx)
    raise err if err

    # make_fetch_def returns a (fetchdef, err) tuple; destructure it and
    # return just the fetchdef Hash (raising on error) so callers — including
    # direct(), which indexes fetchdef["url"] — receive a Hash, mirroring the
    # ts/py prepare().
    fetchdef, fd_err = utility.make_fetch_def.call(ctx)
    raise fd_err if fd_err

    fetchdef
  end

  # Raw endpoint access is operator-controllable, like every entity op.
  # Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
  # either one reaches the same endpoint.
  def direct(fetchargs = {})
    return op_denied("direct") unless op_allowed?("direct")

    raw_request(fetchargs)
  end

  # Is this raw-access op permitted by the SDK's allow.op option?
  def op_allowed?(op)
    allow_op = VoxgigStruct.getpath(@options, "allow.op")
    allow_op.is_a?(String) && allow_op.include?(op)
  end

  def op_denied(op)
    allow_op = VoxgigStruct.getpath(@options, "allow.op")
    {
      "ok" => false,
      "err" => ApicurioRegistryError.new(
        "#{op}_allow",
        "ApicurioRegistrySDK: #{op}: operation not allowed by" \
        " SDK option allow.op value: \"#{allow_op}\""),
    }
  end

  # Ungated request path shared by direct and graphql, each of which checks
  # its own allow.op token first. Separate, rather than a flag on fetchargs:
  # a caller-supplied marker would let anyone opt straight back out of the
  # gate by passing it.
  def raw_request(fetchargs = {})
    utility = @_utility

    # direct() is the raw-HTTP escape hatch: it always returns a result hash
    # ({ "ok" => ..., ... }) and never raises. prepare() raises on error, so
    # trap that and surface it in the hash.
    begin
      fetchdef = prepare(fetchargs)
    rescue ApicurioRegistryError => err
      return { "ok" => false, "err" => err }
    end

    fetchargs ||= {}
    ctrl = ApicurioRegistryHelpers.to_map(VoxgigStruct.getprop(fetchargs, "ctrl")) || {}

    ctx = utility.make_context.call({
      "opname" => "direct",
      "ctrl" => ctrl,
    }, @_rootctx)

    url = fetchdef["url"] || ""
    fetched, fetch_err = utility.fetcher.call(ctx, url, fetchdef)

    return { "ok" => false, "err" => fetch_err } if fetch_err

    if fetched.nil?
      return {
        "ok" => false,
        "err" => ctx.make_error("direct_no_response", "response: undefined"),
      }
    end

    if fetched.is_a?(Hash)
      status = ApicurioRegistryHelpers.to_int(VoxgigStruct.getprop(fetched, "status"))
      headers = VoxgigStruct.getprop(fetched, "headers") || {}

      # No-body responses (204, 304) and explicit zero content-length must
      # skip JSON parsing — calling json() on an empty body errors.
      content_length = headers.is_a?(Hash) ? headers["content-length"] : nil
      no_body = status == 204 || status == 304 || content_length.to_s == "0"

      json_data = nil
      unless no_body
        jf = VoxgigStruct.getprop(fetched, "json")
        if jf.is_a?(Proc)
          begin
            json_data = jf.call
          rescue StandardError
            # Non-JSON body — leave data nil, keep status/headers.
            json_data = nil
          end
        end
      end

      return {
        "ok" => status >= 200 && status < 300,
        "status" => status,
        "headers" => headers,
        "data" => json_data,
      }
    end

    return {
      "ok" => false,
      "err" => ctx.make_error("direct_invalid", "invalid response type"),
    }
  end

  # Raw GraphQL access: the pressure valve that makes the generated surface's
  # deliberate omissions (per-call selection sets, typed filter builders,
  # batching, subscriptions) livable — the whole schema stays reachable.
  #
  # Thin wrapper over the same prepare/fetch path direct uses, with the one
  # thing raw direct cannot do for GraphQL: a GraphQL failure rides HTTP 200
  # as a top-level `errors` array, so status alone would report a failed
  # query as ok.
  #
  # NOTE: like direct, this bypasses the feature pipeline — no retry,
  # ratelimit or paging features apply.
  def graphql(query, variables = nil, ctrl = nil)
    return op_denied("graphql") unless op_allowed?("graphql")

    res = raw_request({
      "method" => "POST",
      "headers" => { "content-type" => "application/json" },
      "body" => { "query" => query, "variables" => variables || {} },
      "ctrl" => ctrl || {},
    })

    # Errors are read BEFORE any status check: a GraphQL parse or validation
    # failure comes back as HTTP 400 carrying the standard { errors: [...] }
    # body, and the raw path represents a non-2xx as ok:false with no err —
    # so returning early on status would discard the server's own
    # diagnostics, which are the only useful part of that response.
    errors = VoxgigStruct.getpath(res, "data.errors")

    if errors.is_a?(Array) && !errors.empty?
      first = errors[0].is_a?(Hash) ? errors[0] : {}
      msg = first["message"]
      msg = "graphql error" if msg.nil? || msg.to_s.empty?
      res["ok"] = false
      res["err"] = ApicurioRegistryError.new(
        "graphql_error", "ApicurioRegistrySDK: graphql: #{msg}")
      res["graphql"] = errors
    end

    res
  end


  # Canonical facade: client.Admin.list / client.Admin.load({ "id" => ... })
  def Admin(data = nil)
    require_relative 'entity/admin_entity'
    AdminEntity.new(self, data)
  end


  # Canonical facade: client.Agent.list / client.Agent.load({ "id" => ... })
  def Agent(data = nil)
    require_relative 'entity/agent_entity'
    AgentEntity.new(self, data)
  end


  # Canonical facade: client.AgentCard.list / client.AgentCard.load({ "id" => ... })
  def AgentCard(data = nil)
    require_relative 'entity/agent_card_entity'
    AgentCardEntity.new(self, data)
  end


  # Canonical facade: client.AiCatalog.list / client.AiCatalog.load({ "id" => ... })
  def AiCatalog(data = nil)
    require_relative 'entity/ai_catalog_entity'
    AiCatalogEntity.new(self, data)
  end


  # Canonical facade: client.ArdExplore.list / client.ArdExplore.load({ "id" => ... })
  def ArdExplore(data = nil)
    require_relative 'entity/ard_explore_entity'
    ArdExploreEntity.new(self, data)
  end


  # Canonical facade: client.ArdSearch.list / client.ArdSearch.load({ "id" => ... })
  def ArdSearch(data = nil)
    require_relative 'entity/ard_search_entity'
    ArdSearchEntity.new(self, data)
  end


  # Canonical facade: client.Artifact.list / client.Artifact.load({ "id" => ... })
  def Artifact(data = nil)
    require_relative 'entity/artifact_entity'
    ArtifactEntity.new(self, data)
  end


  # Canonical facade: client.ArtifactReference.list / client.ArtifactReference.load({ "id" => ... })
  def ArtifactReference(data = nil)
    require_relative 'entity/artifact_reference_entity'
    ArtifactReferenceEntity.new(self, data)
  end


  # Canonical facade: client.ArtifactRule.list / client.ArtifactRule.load({ "id" => ... })
  def ArtifactRule(data = nil)
    require_relative 'entity/artifact_rule_entity'
    ArtifactRuleEntity.new(self, data)
  end


  # Canonical facade: client.ArtifactType.list / client.ArtifactType.load({ "id" => ... })
  def ArtifactType(data = nil)
    require_relative 'entity/artifact_type_entity'
    ArtifactTypeEntity.new(self, data)
  end


  # Canonical facade: client.Branch.list / client.Branch.load({ "id" => ... })
  def Branch(data = nil)
    require_relative 'entity/branch_entity'
    BranchEntity.new(self, data)
  end


  # Canonical facade: client.Comment.list / client.Comment.load({ "id" => ... })
  def Comment(data = nil)
    require_relative 'entity/comment_entity'
    CommentEntity.new(self, data)
  end


  # Canonical facade: client.ConfigurationProperty.list / client.ConfigurationProperty.load({ "id" => ... })
  def ConfigurationProperty(data = nil)
    require_relative 'entity/configuration_property_entity'
    ConfigurationPropertyEntity.new(self, data)
  end


  # Canonical facade: client.ConsumerVersionHeatmap.list / client.ConsumerVersionHeatmap.load({ "id" => ... })
  def ConsumerVersionHeatmap(data = nil)
    require_relative 'entity/consumer_version_heatmap_entity'
    ConsumerVersionHeatmapEntity.new(self, data)
  end


  # Canonical facade: client.Content.list / client.Content.load({ "id" => ... })
  def Content(data = nil)
    require_relative 'entity/content_entity'
    ContentEntity.new(self, data)
  end


  # Canonical facade: client.Contract.list / client.Contract.load({ "id" => ... })
  def Contract(data = nil)
    require_relative 'entity/contract_entity'
    ContractEntity.new(self, data)
  end


  # Canonical facade: client.ContractRule.list / client.ContractRule.load({ "id" => ... })
  def ContractRule(data = nil)
    require_relative 'entity/contract_rule_entity'
    ContractRuleEntity.new(self, data)
  end


  # Canonical facade: client.ContractRuleSet.list / client.ContractRuleSet.load({ "id" => ... })
  def ContractRuleSet(data = nil)
    require_relative 'entity/contract_rule_set_entity'
    ContractRuleSetEntity.new(self, data)
  end


  # Canonical facade: client.CreateArtifact.list / client.CreateArtifact.load({ "id" => ... })
  def CreateArtifact(data = nil)
    require_relative 'entity/create_artifact_entity'
    CreateArtifactEntity.new(self, data)
  end


  # Canonical facade: client.DeprecationReadiness.list / client.DeprecationReadiness.load({ "id" => ... })
  def DeprecationReadiness(data = nil)
    require_relative 'entity/deprecation_readiness_entity'
    DeprecationReadinessEntity.new(self, data)
  end


  # Canonical facade: client.DownloadRef.list / client.DownloadRef.load({ "id" => ... })
  def DownloadRef(data = nil)
    require_relative 'entity/download_ref_entity'
    DownloadRefEntity.new(self, data)
  end


  # Canonical facade: client.GitOp.list / client.GitOp.load({ "id" => ... })
  def GitOp(data = nil)
    require_relative 'entity/git_op_entity'
    GitOpEntity.new(self, data)
  end


  # Canonical facade: client.GitOpsStatus.list / client.GitOpsStatus.load({ "id" => ... })
  def GitOpsStatus(data = nil)
    require_relative 'entity/git_ops_status_entity'
    GitOpsStatusEntity.new(self, data)
  end


  # Canonical facade: client.GitOpsValidateTask.list / client.GitOpsValidateTask.load({ "id" => ... })
  def GitOpsValidateTask(data = nil)
    require_relative 'entity/git_ops_validate_task_entity'
    GitOpsValidateTaskEntity.new(self, data)
  end


  # Canonical facade: client.GlobalRule.list / client.GlobalRule.load({ "id" => ... })
  def GlobalRule(data = nil)
    require_relative 'entity/global_rule_entity'
    GlobalRuleEntity.new(self, data)
  end


  # Canonical facade: client.Group.list / client.Group.load({ "id" => ... })
  def Group(data = nil)
    require_relative 'entity/group_entity'
    GroupEntity.new(self, data)
  end


  # Canonical facade: client.GroupRule.list / client.GroupRule.load({ "id" => ... })
  def GroupRule(data = nil)
    require_relative 'entity/group_rule_entity'
    GroupRuleEntity.new(self, data)
  end


  # Canonical facade: client.KafkaSql.list / client.KafkaSql.load({ "id" => ... })
  def KafkaSql(data = nil)
    require_relative 'entity/kafka_sql_entity'
    KafkaSqlEntity.new(self, data)
  end


  # Canonical facade: client.Metadata.list / client.Metadata.load({ "id" => ... })
  def Metadata(data = nil)
    require_relative 'entity/metadata_entity'
    MetadataEntity.new(self, data)
  end


  # Canonical facade: client.OdcsContractResult.list / client.OdcsContractResult.load({ "id" => ... })
  def OdcsContractResult(data = nil)
    require_relative 'entity/odcs_contract_result_entity'
    OdcsContractResultEntity.new(self, data)
  end


  # Canonical facade: client.OdcsContractSummary.list / client.OdcsContractSummary.load({ "id" => ... })
  def OdcsContractSummary(data = nil)
    require_relative 'entity/odcs_contract_summary_entity'
    OdcsContractSummaryEntity.new(self, data)
  end


  # Canonical facade: client.ReferenceGraph.list / client.ReferenceGraph.load({ "id" => ... })
  def ReferenceGraph(data = nil)
    require_relative 'entity/reference_graph_entity'
    ReferenceGraphEntity.new(self, data)
  end


  # Canonical facade: client.RoleMapping.list / client.RoleMapping.load({ "id" => ... })
  def RoleMapping(data = nil)
    require_relative 'entity/role_mapping_entity'
    RoleMappingEntity.new(self, data)
  end


  # Canonical facade: client.Rule.list / client.Rule.load({ "id" => ... })
  def Rule(data = nil)
    require_relative 'entity/rule_entity'
    RuleEntity.new(self, data)
  end


  # Canonical facade: client.SearchedBranch.list / client.SearchedBranch.load({ "id" => ... })
  def SearchedBranch(data = nil)
    require_relative 'entity/searched_branch_entity'
    SearchedBranchEntity.new(self, data)
  end


  # Canonical facade: client.SearchedGroup.list / client.SearchedGroup.load({ "id" => ... })
  def SearchedGroup(data = nil)
    require_relative 'entity/searched_group_entity'
    SearchedGroupEntity.new(self, data)
  end


  # Canonical facade: client.SystemInfo.list / client.SystemInfo.load({ "id" => ... })
  def SystemInfo(data = nil)
    require_relative 'entity/system_info_entity'
    SystemInfoEntity.new(self, data)
  end


  # Canonical facade: client.UsageSummary.list / client.UsageSummary.load({ "id" => ... })
  def UsageSummary(data = nil)
    require_relative 'entity/usage_summary_entity'
    UsageSummaryEntity.new(self, data)
  end


  # Canonical facade: client.UserInfo.list / client.UserInfo.load({ "id" => ... })
  def UserInfo(data = nil)
    require_relative 'entity/user_info_entity'
    UserInfoEntity.new(self, data)
  end


  # Canonical facade: client.UserInterfaceConfig.list / client.UserInterfaceConfig.load({ "id" => ... })
  def UserInterfaceConfig(data = nil)
    require_relative 'entity/user_interface_config_entity'
    UserInterfaceConfigEntity.new(self, data)
  end


  # Canonical facade: client.Version.list / client.Version.load({ "id" => ... })
  def Version(data = nil)
    require_relative 'entity/version_entity'
    VersionEntity.new(self, data)
  end


  # Canonical facade: client.WellKnown.list / client.WellKnown.load({ "id" => ... })
  def WellKnown(data = nil)
    require_relative 'entity/well_known_entity'
    WellKnownEntity.new(self, data)
  end


  # Canonical facade: client.WrappedVersionState.list / client.WrappedVersionState.load({ "id" => ... })
  def WrappedVersionState(data = nil)
    require_relative 'entity/wrapped_version_state_entity'
    WrappedVersionStateEntity.new(self, data)
  end



  def self.test(testopts = nil, sdkopts = nil)
    sdkopts = sdkopts || {}
    sdkopts = VoxgigStruct.clone(sdkopts)
    sdkopts = {} unless sdkopts.is_a?(Hash)

    testopts = testopts || {}
    testopts = VoxgigStruct.clone(testopts)
    testopts = {} unless testopts.is_a?(Hash)
    testopts["active"] = true

    VoxgigStruct.setpath(sdkopts, "feature.test", testopts)

    sdk = ApicurioRegistrySDK.new(sdkopts)
    sdk.mode = "test"
    sdk
  end
end
