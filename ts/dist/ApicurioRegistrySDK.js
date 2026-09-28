"use strict";
// ApicurioRegistry Ts SDK
Object.defineProperty(exports, "__esModule", { value: true });
exports.SDK = exports.ApicurioRegistrySDK = exports.ApicurioRegistryEntityBase = exports.BaseFeature = exports.config = exports.stdutil = void 0;
const AdminEntity_1 = require("./entity/AdminEntity");
const AgentEntity_1 = require("./entity/AgentEntity");
const AgentCardEntity_1 = require("./entity/AgentCardEntity");
const AiCatalogEntity_1 = require("./entity/AiCatalogEntity");
const ArdExploreEntity_1 = require("./entity/ArdExploreEntity");
const ArdSearchEntity_1 = require("./entity/ArdSearchEntity");
const ArtifactEntity_1 = require("./entity/ArtifactEntity");
const ArtifactReferenceEntity_1 = require("./entity/ArtifactReferenceEntity");
const ArtifactRuleEntity_1 = require("./entity/ArtifactRuleEntity");
const ArtifactTypeEntity_1 = require("./entity/ArtifactTypeEntity");
const BranchEntity_1 = require("./entity/BranchEntity");
const CommentEntity_1 = require("./entity/CommentEntity");
const ConfigurationPropertyEntity_1 = require("./entity/ConfigurationPropertyEntity");
const ConsumerVersionHeatmapEntity_1 = require("./entity/ConsumerVersionHeatmapEntity");
const ContentEntity_1 = require("./entity/ContentEntity");
const ContractEntity_1 = require("./entity/ContractEntity");
const ContractRuleEntity_1 = require("./entity/ContractRuleEntity");
const ContractRuleSetEntity_1 = require("./entity/ContractRuleSetEntity");
const CreateArtifactEntity_1 = require("./entity/CreateArtifactEntity");
const DeprecationReadinessEntity_1 = require("./entity/DeprecationReadinessEntity");
const DownloadRefEntity_1 = require("./entity/DownloadRefEntity");
const GitOpEntity_1 = require("./entity/GitOpEntity");
const GitOpsStatusEntity_1 = require("./entity/GitOpsStatusEntity");
const GitOpsValidateTaskEntity_1 = require("./entity/GitOpsValidateTaskEntity");
const GlobalRuleEntity_1 = require("./entity/GlobalRuleEntity");
const GroupEntity_1 = require("./entity/GroupEntity");
const GroupRuleEntity_1 = require("./entity/GroupRuleEntity");
const KafkaSqlEntity_1 = require("./entity/KafkaSqlEntity");
const McpToolEntity_1 = require("./entity/McpToolEntity");
const MetadataEntity_1 = require("./entity/MetadataEntity");
const OdcsContractResultEntity_1 = require("./entity/OdcsContractResultEntity");
const OdcsContractSummaryEntity_1 = require("./entity/OdcsContractSummaryEntity");
const ReferenceGraphEntity_1 = require("./entity/ReferenceGraphEntity");
const RoleMappingEntity_1 = require("./entity/RoleMappingEntity");
const RuleEntity_1 = require("./entity/RuleEntity");
const SearchedBranchEntity_1 = require("./entity/SearchedBranchEntity");
const SearchedGroupEntity_1 = require("./entity/SearchedGroupEntity");
const SystemInfoEntity_1 = require("./entity/SystemInfoEntity");
const UsageSummaryEntity_1 = require("./entity/UsageSummaryEntity");
const UserInfoEntity_1 = require("./entity/UserInfoEntity");
const UserInterfaceConfigEntity_1 = require("./entity/UserInterfaceConfigEntity");
const VersionEntity_1 = require("./entity/VersionEntity");
const WellKnownEntity_1 = require("./entity/WellKnownEntity");
const WrappedVersionStateEntity_1 = require("./entity/WrappedVersionStateEntity");
const node_util_1 = require("node:util");
const Config_1 = require("./Config");
Object.defineProperty(exports, "config", { enumerable: true, get: function () { return Config_1.config; } });
const ApicurioRegistryEntityBase_1 = require("./ApicurioRegistryEntityBase");
Object.defineProperty(exports, "ApicurioRegistryEntityBase", { enumerable: true, get: function () { return ApicurioRegistryEntityBase_1.ApicurioRegistryEntityBase; } });
const Utility_1 = require("./utility/Utility");
const BaseFeature_1 = require("./feature/base/BaseFeature");
Object.defineProperty(exports, "BaseFeature", { enumerable: true, get: function () { return BaseFeature_1.BaseFeature; } });
const stdutil = new Utility_1.Utility();
exports.stdutil = stdutil;
class ApicurioRegistrySDK {
    _mode = 'live';
    _options;
    _utility = new Utility_1.Utility();
    _features;
    _rootctx;
    constructor(options) {
        this._rootctx = this._utility.makeContext({
            client: this,
            utility: this._utility,
            config: Config_1.config,
            options,
            shared: new WeakMap()
        });
        this._options = this._utility.makeOptions(this._rootctx);
        const struct = this._utility.struct;
        const getpath = struct.getpath;
        if (true === getpath(this._options.feature, 'test.active')) {
            this._mode = 'test';
        }
        this._rootctx.options = this._options;
        this._features = [];
        const featureAdd = this._utility.featureAdd;
        const featureInit = this._utility.featureInit;
        // Add features in the resolved order (makeOptions puts an explicit
        // array order first, else defaults to test-first). Ordering matters:
        // the `test` feature installs the base mock transport and the transport
        // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is current,
        // so `test` must be added before them to sit at the base of the chain.
        const extend = this._options.extend || [];
        const featureorder = getpath(this._options, '__derived__.featureorder') || [];
        for (const fname of featureorder) {
            const fopts = this._options.feature[fname] || {};
            if (fopts.active) {
                // An active name with no generated class is legal when an
                // extend-supplied instance carries that name (station's adopt
                // path): the instance is added below, positioned by its own
                // __after__ entry, so skip it here rather than fail construction.
                if (!this._rootctx.config.hasFeature(fname) &&
                    extend.some((f) => fname === f.name)) {
                    continue;
                }
                featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname));
            }
        }
        for (let f of extend) {
            featureAdd(this._rootctx, f);
        }
        for (let f of this._features) {
            featureInit(this._rootctx, f);
        }
        const featureHook = this._utility.featureHook;
        featureHook(this._rootctx, 'PostConstruct');
    }
    options() {
        return this._utility.struct.clone(this._options);
    }
    utility() {
        return this._utility.struct.clone(this._utility);
    }
    async prepare(fetchargs) {
        const utility = this._utility;
        const struct = utility.struct;
        const clone = struct.clone;
        const { makeContext, makeFetchDef, prepareHeaders, prepareAuth, } = utility;
        fetchargs = fetchargs || {};
        let ctx = makeContext({
            opname: 'prepare',
            ctrl: fetchargs.ctrl || {},
        }, this._rootctx);
        const options = this._options;
        const spec = {
            base: options.base,
            prefix: options.prefix,
            suffix: options.suffix,
            path: fetchargs.path || '',
            method: fetchargs.method || 'GET',
            params: fetchargs.params || {},
            query: fetchargs.query || {},
            headers: prepareHeaders(ctx),
            body: fetchargs.body,
            step: 'start',
        };
        ctx.spec = spec;
        if (fetchargs.headers) {
            const uheaders = fetchargs.headers;
            for (let key in uheaders) {
                spec.headers[key] = uheaders[key];
            }
        }
        const authResult = prepareAuth(ctx);
        if (authResult instanceof Error) {
            return authResult;
        }
        return makeFetchDef(ctx);
    }
    // Raw endpoint access is operator-controllable, like every entity op.
    // Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
    // either one reaches the same endpoint.
    async direct(fetchargs) {
        if (!this._options.allow.op.includes('direct')) {
            return {
                ok: false,
                err: new Error('ApicurioRegistrySDK: direct: operation not allowed by' +
                    ' SDK option allow.op value: "' + this._options.allow.op + '"'),
            };
        }
        return this._rawRequest(fetchargs);
    }
    // Ungated request path shared by direct() and graphql(), each of which
    // checks its own allow.op token first. Private, rather than a flag on
    // fetchargs: a caller-supplied marker would let anyone opt straight back
    // out of the gate by passing it.
    async _rawRequest(fetchargs) {
        const utility = this._utility;
        const fetcher = utility.fetcher;
        const makeContext = utility.makeContext;
        const fetchdef = await this.prepare(fetchargs);
        if (fetchdef instanceof Error) {
            return fetchdef;
        }
        let ctx = makeContext({
            opname: 'direct',
            ctrl: (fetchargs || {}).ctrl || {},
        }, this._rootctx);
        try {
            const fetched = await fetcher(ctx, fetchdef.url, fetchdef);
            if (null == fetched) {
                return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') };
            }
            else if (fetched instanceof Error) {
                return { ok: false, err: fetched };
            }
            const status = fetched.status;
            // No body responses (204 No Content, 304 Not Modified) and explicit
            // zero content-length must skip JSON parsing — fetched.json() would
            // throw `Unexpected end of JSON input` on an empty body.
            const headers = fetched.headers;
            const contentLength = headers && 'function' === typeof headers.get
                ? headers.get('content-length')
                : (headers || {})['content-length'];
            const noBody = 204 === status || 304 === status || '0' === String(contentLength);
            let json = undefined;
            if (!noBody) {
                try {
                    json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json;
                }
                catch (parseErr) {
                    // Body wasn't valid JSON — surface the raw response rather than
                    // throwing. data stays undefined; callers can inspect status/headers.
                    json = undefined;
                }
            }
            return {
                ok: status >= 200 && status < 300,
                status,
                headers: fetched.headers,
                data: json,
            };
        }
        catch (err) {
            return { ok: false, err };
        }
    }
    async graphql(query, variables, ctrl) {
        const options = this._options;
        if (!options.allow.op.includes('graphql')) {
            return {
                ok: false,
                err: new Error('ApicurioRegistrySDK: graphql: operation not allowed by' +
                    ' SDK option allow.op value: "' + options.allow.op + '"'),
            };
        }
        const res = await this._rawRequest({
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: { query, variables: variables || {} },
            ctrl,
        });
        if (res instanceof Error) {
            return res;
        }
        // Errors are read BEFORE any status check: a GraphQL parse or validation
        // failure comes back as HTTP 400 carrying the standard { errors: [...] }
        // body, and the raw path represents a non-2xx as { ok: false } with no
        // err — so returning early on status would discard the server's own
        // diagnostics, which are the only useful part of that response.
        const errors = null == res.data ? undefined : res.data.errors;
        if (null != errors && Array.isArray(errors) && 0 < errors.length) {
            const first = errors[0] || {};
            const err = new Error('ApicurioRegistrySDK: graphql: ' +
                (first.message || 'graphql error'));
            err.graphql = errors;
            return { ok: false, status: res.status, headers: res.headers, err, data: res.data };
        }
        return res;
    }
    // Entity access: `client.Admin().list()` / `client.Admin().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Admin(entopts) {
        const self = this;
        return new AdminEntity_1.AdminEntity(self, entopts);
    }
    // Entity access: `client.Agent().list()` / `client.Agent().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Agent(entopts) {
        const self = this;
        return new AgentEntity_1.AgentEntity(self, entopts);
    }
    // Entity access: `client.AgentCard().list()` / `client.AgentCard().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AgentCard(entopts) {
        const self = this;
        return new AgentCardEntity_1.AgentCardEntity(self, entopts);
    }
    // Entity access: `client.AiCatalog().list()` / `client.AiCatalog().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AiCatalog(entopts) {
        const self = this;
        return new AiCatalogEntity_1.AiCatalogEntity(self, entopts);
    }
    // Entity access: `client.ArdExplore().list()` / `client.ArdExplore().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ArdExplore(entopts) {
        const self = this;
        return new ArdExploreEntity_1.ArdExploreEntity(self, entopts);
    }
    // Entity access: `client.ArdSearch().list()` / `client.ArdSearch().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ArdSearch(entopts) {
        const self = this;
        return new ArdSearchEntity_1.ArdSearchEntity(self, entopts);
    }
    // Entity access: `client.Artifact().list()` / `client.Artifact().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Artifact(entopts) {
        const self = this;
        return new ArtifactEntity_1.ArtifactEntity(self, entopts);
    }
    // Entity access: `client.ArtifactReference().list()` / `client.ArtifactReference().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ArtifactReference(entopts) {
        const self = this;
        return new ArtifactReferenceEntity_1.ArtifactReferenceEntity(self, entopts);
    }
    // Entity access: `client.ArtifactRule().list()` / `client.ArtifactRule().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ArtifactRule(entopts) {
        const self = this;
        return new ArtifactRuleEntity_1.ArtifactRuleEntity(self, entopts);
    }
    // Entity access: `client.ArtifactType().list()` / `client.ArtifactType().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ArtifactType(entopts) {
        const self = this;
        return new ArtifactTypeEntity_1.ArtifactTypeEntity(self, entopts);
    }
    // Entity access: `client.Branch().list()` / `client.Branch().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Branch(entopts) {
        const self = this;
        return new BranchEntity_1.BranchEntity(self, entopts);
    }
    // Entity access: `client.Comment().list()` / `client.Comment().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Comment(entopts) {
        const self = this;
        return new CommentEntity_1.CommentEntity(self, entopts);
    }
    // Entity access: `client.ConfigurationProperty().list()` / `client.ConfigurationProperty().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ConfigurationProperty(entopts) {
        const self = this;
        return new ConfigurationPropertyEntity_1.ConfigurationPropertyEntity(self, entopts);
    }
    // Entity access: `client.ConsumerVersionHeatmap().list()` / `client.ConsumerVersionHeatmap().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ConsumerVersionHeatmap(entopts) {
        const self = this;
        return new ConsumerVersionHeatmapEntity_1.ConsumerVersionHeatmapEntity(self, entopts);
    }
    // Entity access: `client.Content().list()` / `client.Content().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Content(entopts) {
        const self = this;
        return new ContentEntity_1.ContentEntity(self, entopts);
    }
    // Entity access: `client.Contract().list()` / `client.Contract().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Contract(entopts) {
        const self = this;
        return new ContractEntity_1.ContractEntity(self, entopts);
    }
    // Entity access: `client.ContractRule().list()` / `client.ContractRule().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ContractRule(entopts) {
        const self = this;
        return new ContractRuleEntity_1.ContractRuleEntity(self, entopts);
    }
    // Entity access: `client.ContractRuleSet().list()` / `client.ContractRuleSet().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ContractRuleSet(entopts) {
        const self = this;
        return new ContractRuleSetEntity_1.ContractRuleSetEntity(self, entopts);
    }
    // Entity access: `client.CreateArtifact().list()` / `client.CreateArtifact().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    CreateArtifact(entopts) {
        const self = this;
        return new CreateArtifactEntity_1.CreateArtifactEntity(self, entopts);
    }
    // Entity access: `client.DeprecationReadiness().list()` / `client.DeprecationReadiness().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DeprecationReadiness(entopts) {
        const self = this;
        return new DeprecationReadinessEntity_1.DeprecationReadinessEntity(self, entopts);
    }
    // Entity access: `client.DownloadRef().list()` / `client.DownloadRef().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DownloadRef(entopts) {
        const self = this;
        return new DownloadRefEntity_1.DownloadRefEntity(self, entopts);
    }
    // Entity access: `client.GitOp().list()` / `client.GitOp().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    GitOp(entopts) {
        const self = this;
        return new GitOpEntity_1.GitOpEntity(self, entopts);
    }
    // Entity access: `client.GitOpsStatus().list()` / `client.GitOpsStatus().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    GitOpsStatus(entopts) {
        const self = this;
        return new GitOpsStatusEntity_1.GitOpsStatusEntity(self, entopts);
    }
    // Entity access: `client.GitOpsValidateTask().list()` / `client.GitOpsValidateTask().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    GitOpsValidateTask(entopts) {
        const self = this;
        return new GitOpsValidateTaskEntity_1.GitOpsValidateTaskEntity(self, entopts);
    }
    // Entity access: `client.GlobalRule().list()` / `client.GlobalRule().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    GlobalRule(entopts) {
        const self = this;
        return new GlobalRuleEntity_1.GlobalRuleEntity(self, entopts);
    }
    // Entity access: `client.Group().list()` / `client.Group().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Group(entopts) {
        const self = this;
        return new GroupEntity_1.GroupEntity(self, entopts);
    }
    // Entity access: `client.GroupRule().list()` / `client.GroupRule().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    GroupRule(entopts) {
        const self = this;
        return new GroupRuleEntity_1.GroupRuleEntity(self, entopts);
    }
    // Entity access: `client.KafkaSql().list()` / `client.KafkaSql().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    KafkaSql(entopts) {
        const self = this;
        return new KafkaSqlEntity_1.KafkaSqlEntity(self, entopts);
    }
    // Entity access: `client.McpTool().list()` / `client.McpTool().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    McpTool(entopts) {
        const self = this;
        return new McpToolEntity_1.McpToolEntity(self, entopts);
    }
    // Entity access: `client.Metadata().list()` / `client.Metadata().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Metadata(entopts) {
        const self = this;
        return new MetadataEntity_1.MetadataEntity(self, entopts);
    }
    // Entity access: `client.OdcsContractResult().list()` / `client.OdcsContractResult().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    OdcsContractResult(entopts) {
        const self = this;
        return new OdcsContractResultEntity_1.OdcsContractResultEntity(self, entopts);
    }
    // Entity access: `client.OdcsContractSummary().list()` / `client.OdcsContractSummary().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    OdcsContractSummary(entopts) {
        const self = this;
        return new OdcsContractSummaryEntity_1.OdcsContractSummaryEntity(self, entopts);
    }
    // Entity access: `client.ReferenceGraph().list()` / `client.ReferenceGraph().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ReferenceGraph(entopts) {
        const self = this;
        return new ReferenceGraphEntity_1.ReferenceGraphEntity(self, entopts);
    }
    // Entity access: `client.RoleMapping().list()` / `client.RoleMapping().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    RoleMapping(entopts) {
        const self = this;
        return new RoleMappingEntity_1.RoleMappingEntity(self, entopts);
    }
    // Entity access: `client.Rule().list()` / `client.Rule().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Rule(entopts) {
        const self = this;
        return new RuleEntity_1.RuleEntity(self, entopts);
    }
    // Entity access: `client.SearchedBranch().list()` / `client.SearchedBranch().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    SearchedBranch(entopts) {
        const self = this;
        return new SearchedBranchEntity_1.SearchedBranchEntity(self, entopts);
    }
    // Entity access: `client.SearchedGroup().list()` / `client.SearchedGroup().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    SearchedGroup(entopts) {
        const self = this;
        return new SearchedGroupEntity_1.SearchedGroupEntity(self, entopts);
    }
    // Entity access: `client.SystemInfo().list()` / `client.SystemInfo().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    SystemInfo(entopts) {
        const self = this;
        return new SystemInfoEntity_1.SystemInfoEntity(self, entopts);
    }
    // Entity access: `client.UsageSummary().list()` / `client.UsageSummary().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    UsageSummary(entopts) {
        const self = this;
        return new UsageSummaryEntity_1.UsageSummaryEntity(self, entopts);
    }
    // Entity access: `client.UserInfo().list()` / `client.UserInfo().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    UserInfo(entopts) {
        const self = this;
        return new UserInfoEntity_1.UserInfoEntity(self, entopts);
    }
    // Entity access: `client.UserInterfaceConfig().list()` / `client.UserInterfaceConfig().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    UserInterfaceConfig(entopts) {
        const self = this;
        return new UserInterfaceConfigEntity_1.UserInterfaceConfigEntity(self, entopts);
    }
    // Entity access: `client.Version().list()` / `client.Version().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Version(entopts) {
        const self = this;
        return new VersionEntity_1.VersionEntity(self, entopts);
    }
    // Entity access: `client.WellKnown().list()` / `client.WellKnown().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    WellKnown(entopts) {
        const self = this;
        return new WellKnownEntity_1.WellKnownEntity(self, entopts);
    }
    // Entity access: `client.WrappedVersionState().list()` / `client.WrappedVersionState().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    WrappedVersionState(entopts) {
        const self = this;
        return new WrappedVersionStateEntity_1.WrappedVersionStateEntity(self, entopts);
    }
    static test(testoptsarg, sdkoptsarg) {
        const struct = stdutil.struct;
        const setpath = struct.setpath;
        const getdef = struct.getdef;
        const clone = struct.clone;
        const setprop = struct.setprop;
        const sdkopts = getdef(clone(sdkoptsarg), {});
        const testopts = getdef(clone(testoptsarg), {});
        setprop(testopts, 'active', true);
        setpath(sdkopts, 'feature.test', testopts);
        const testsdk = new ApicurioRegistrySDK(sdkopts);
        testsdk._mode = 'test';
        return testsdk;
    }
    tester(testopts, sdkopts) {
        return ApicurioRegistrySDK.test(testopts, sdkopts);
    }
    toJSON() {
        return { name: 'ApicurioRegistry' };
    }
    toString() {
        return 'ApicurioRegistry ' + this._utility.struct.jsonify(this.toJSON());
    }
    [node_util_1.inspect.custom]() {
        return this.toString();
    }
}
exports.ApicurioRegistrySDK = ApicurioRegistrySDK;
const SDK = ApicurioRegistrySDK;
exports.SDK = SDK;
//# sourceMappingURL=ApicurioRegistrySDK.js.map