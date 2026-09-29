// ApicurioRegistry Ts SDK

import { AdminEntity } from './entity/AdminEntity'
import { AgentEntity } from './entity/AgentEntity'
import { AgentCardEntity } from './entity/AgentCardEntity'
import { AiCatalogEntity } from './entity/AiCatalogEntity'
import { ArdExploreEntity } from './entity/ArdExploreEntity'
import { ArdSearchEntity } from './entity/ArdSearchEntity'
import { ArtifactEntity } from './entity/ArtifactEntity'
import { ArtifactReferenceEntity } from './entity/ArtifactReferenceEntity'
import { ArtifactRuleEntity } from './entity/ArtifactRuleEntity'
import { ArtifactTypeEntity } from './entity/ArtifactTypeEntity'
import { BranchEntity } from './entity/BranchEntity'
import { CommentEntity } from './entity/CommentEntity'
import { ConfigurationPropertyEntity } from './entity/ConfigurationPropertyEntity'
import { ConsumerVersionHeatmapEntity } from './entity/ConsumerVersionHeatmapEntity'
import { ContentEntity } from './entity/ContentEntity'
import { ContractEntity } from './entity/ContractEntity'
import { ContractRuleEntity } from './entity/ContractRuleEntity'
import { ContractRuleSetEntity } from './entity/ContractRuleSetEntity'
import { CreateArtifactEntity } from './entity/CreateArtifactEntity'
import { DeprecationReadinessEntity } from './entity/DeprecationReadinessEntity'
import { DownloadRefEntity } from './entity/DownloadRefEntity'
import { GitOpEntity } from './entity/GitOpEntity'
import { GitOpsStatusEntity } from './entity/GitOpsStatusEntity'
import { GitOpsValidateTaskEntity } from './entity/GitOpsValidateTaskEntity'
import { GlobalRuleEntity } from './entity/GlobalRuleEntity'
import { GroupEntity } from './entity/GroupEntity'
import { GroupRuleEntity } from './entity/GroupRuleEntity'
import { KafkaSqlEntity } from './entity/KafkaSqlEntity'
import { MetadataEntity } from './entity/MetadataEntity'
import { OdcsContractResultEntity } from './entity/OdcsContractResultEntity'
import { OdcsContractSummaryEntity } from './entity/OdcsContractSummaryEntity'
import { ReferenceGraphEntity } from './entity/ReferenceGraphEntity'
import { RoleMappingEntity } from './entity/RoleMappingEntity'
import { RuleEntity } from './entity/RuleEntity'
import { SearchedBranchEntity } from './entity/SearchedBranchEntity'
import { SearchedGroupEntity } from './entity/SearchedGroupEntity'
import { SystemInfoEntity } from './entity/SystemInfoEntity'
import { UsageSummaryEntity } from './entity/UsageSummaryEntity'
import { UserInfoEntity } from './entity/UserInfoEntity'
import { UserInterfaceConfigEntity } from './entity/UserInterfaceConfigEntity'
import { VersionEntity } from './entity/VersionEntity'
import { WellKnownEntity } from './entity/WellKnownEntity'
import { WrappedVersionStateEntity } from './entity/WrappedVersionStateEntity'

export type * from './ApicurioRegistryTypes'


import { inspect } from 'node:util'

import type { Context, Feature } from './types'

import { config } from './Config'
import { ApicurioRegistryEntityBase } from './ApicurioRegistryEntityBase'
import { Utility } from './utility/Utility'


import { BaseFeature } from './feature/base/BaseFeature'



const stdutil = new Utility()


class ApicurioRegistrySDK {
  _mode: string = 'live'
  _options: any
  _utility = new Utility()
  _features: Feature[]
  _rootctx: Context
  

  constructor(options?: any) {

    this._rootctx = this._utility.makeContext({
      client: this,
      utility: this._utility,
      config,
      options,
      shared: new WeakMap()
    })

    this._options = this._utility.makeOptions(this._rootctx)

    const struct = this._utility.struct
    const getpath = struct.getpath

    if (true === getpath(this._options.feature, 'test.active')) {
      this._mode = 'test'
    }

    this._rootctx.options = this._options

    this._features = []

    const featureAdd = this._utility.featureAdd
    const featureInit = this._utility.featureInit

    // Add features in the resolved order (makeOptions puts an explicit
    // array order first, else defaults to test-first). Ordering matters:
    // the `test` feature installs the base mock transport and the transport
    // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is current,
    // so `test` must be added before them to sit at the base of the chain.
    const extend = this._options.extend || []

    const featureorder = getpath(this._options, '__derived__.featureorder') || []
    for (const fname of featureorder) {
      const fopts = this._options.feature[fname] || {}
      if (fopts.active) {
        // An active name with no generated class is legal when an
        // extend-supplied instance carries that name (station's adopt
        // path): the instance is added below, positioned by its own
        // __after__ entry, so skip it here rather than fail construction.
        if (!this._rootctx.config.hasFeature(fname) &&
          extend.some((f: any) => fname === f.name)) {
          continue
        }
        featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname))
      }
    }

    for (let f of extend) {
      featureAdd(this._rootctx, f)
    }

    for (let f of this._features) {
      featureInit(this._rootctx, f)
    }

    const featureHook = this._utility.featureHook
    featureHook(this._rootctx, 'PostConstruct')
  }


  options() {
    return this._utility.struct.clone(this._options)
  }


  utility() {
    return this._utility.struct.clone(this._utility)
  }

  


  async prepare(fetchargs?: any) {
    const utility = this._utility
    const struct = utility.struct
    const clone = struct.clone

    const {
      makeContext,
      makeFetchDef,
      prepareHeaders,
      prepareAuth,
    } = utility

    fetchargs = fetchargs || {}

    let ctx: Context = makeContext({
      opname: 'prepare',
      ctrl: fetchargs.ctrl || {},
    }, this._rootctx)

    const options = this._options

    const spec: any = {
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
    }

    ctx.spec = spec

    if (fetchargs.headers) {
      const uheaders = fetchargs.headers
      for (let key in uheaders) {
        spec.headers[key] = uheaders[key]
      }
    }

    

    const authResult = prepareAuth(ctx)
    if (authResult instanceof Error) {
      return authResult
    }

    return makeFetchDef(ctx)
  }


  // Raw endpoint access is operator-controllable, like every entity op.
  // Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
  // either one reaches the same endpoint.
  async direct(fetchargs?: any) {
    if (!this._options.allow.op.includes('direct')) {
      return {
        ok: false,
        err: new Error('ApicurioRegistrySDK: direct: operation not allowed by' +
          ' SDK option allow.op value: "' + this._options.allow.op + '"'),
      }
    }

    return this._rawRequest(fetchargs)
  }


  // Ungated request path shared by direct() and graphql(), each of which
  // checks its own allow.op token first. Private, rather than a flag on
  // fetchargs: a caller-supplied marker would let anyone opt straight back
  // out of the gate by passing it.
  async _rawRequest(fetchargs?: any) {
    const utility = this._utility

    const fetcher = utility.fetcher
    const makeContext = utility.makeContext

    const fetchdef = await this.prepare(fetchargs)
    if (fetchdef instanceof Error) {
      return fetchdef
    }

    let ctx: Context = makeContext({
      opname: 'direct',
      ctrl: (fetchargs || {}).ctrl || {},
    }, this._rootctx)

    try {
      const fetched = await fetcher(ctx, fetchdef.url, fetchdef)

      if (null == fetched) {
        return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') }
      }
      else if (fetched instanceof Error) {
        return { ok: false, err: fetched }
      }

      const status = fetched.status

      // No body responses (204 No Content, 304 Not Modified) and explicit
      // zero content-length must skip JSON parsing — fetched.json() would
      // throw `Unexpected end of JSON input` on an empty body.
      const headers = fetched.headers
      const contentLength = headers && 'function' === typeof headers.get
        ? headers.get('content-length')
        : (headers || {})['content-length']
      const noBody = 204 === status || 304 === status || '0' === String(contentLength)

      let json: any = undefined
      if (!noBody) {
        try {
          json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json
        }
        catch (parseErr) {
          // Body wasn't valid JSON — surface the raw response rather than
          // throwing. data stays undefined; callers can inspect status/headers.
          json = undefined
        }
      }

      return {
        ok: status >= 200 && status < 300,
        status,
        headers: fetched.headers,
        data: json,
      }
    }
    catch (err: any) {
      return { ok: false, err }
    }
  }



  async graphql(query: string, variables?: any, ctrl?: any) {
    const options = this._options

    if (!options.allow.op.includes('graphql')) {
      return {
        ok: false,
        err: new Error('ApicurioRegistrySDK: graphql: operation not allowed by' +
          ' SDK option allow.op value: "' + options.allow.op + '"'),
      }
    }

    const res: any = await this._rawRequest({
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: { query, variables: variables || {} },
      ctrl,
    })

    if (res instanceof Error) {
      return res
    }

    // Errors are read BEFORE any status check: a GraphQL parse or validation
    // failure comes back as HTTP 400 carrying the standard { errors: [...] }
    // body, and the raw path represents a non-2xx as { ok: false } with no
    // err — so returning early on status would discard the server's own
    // diagnostics, which are the only useful part of that response.
    const errors = null == res.data ? undefined : res.data.errors

    if (null != errors && Array.isArray(errors) && 0 < errors.length) {
      const first = errors[0] || {}
      const err: any = new Error('ApicurioRegistrySDK: graphql: ' +
        (first.message || 'graphql error'))
      err.graphql = errors
      return { ok: false, status: res.status, headers: res.headers, err, data: res.data }
    }

    return res
  }



  // Entity access: `client.Admin().list()` / `client.Admin().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Admin(entopts?: Record<string, any>) {
    const self = this
    return new AdminEntity(self, entopts)
  }


  // Entity access: `client.Agent().list()` / `client.Agent().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Agent(entopts?: Record<string, any>) {
    const self = this
    return new AgentEntity(self, entopts)
  }


  // Entity access: `client.AgentCard().list()` / `client.AgentCard().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AgentCard(entopts?: Record<string, any>) {
    const self = this
    return new AgentCardEntity(self, entopts)
  }


  // Entity access: `client.AiCatalog().list()` / `client.AiCatalog().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AiCatalog(entopts?: Record<string, any>) {
    const self = this
    return new AiCatalogEntity(self, entopts)
  }


  // Entity access: `client.ArdExplore().list()` / `client.ArdExplore().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ArdExplore(entopts?: Record<string, any>) {
    const self = this
    return new ArdExploreEntity(self, entopts)
  }


  // Entity access: `client.ArdSearch().list()` / `client.ArdSearch().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ArdSearch(entopts?: Record<string, any>) {
    const self = this
    return new ArdSearchEntity(self, entopts)
  }


  // Entity access: `client.Artifact().list()` / `client.Artifact().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Artifact(entopts?: Record<string, any>) {
    const self = this
    return new ArtifactEntity(self, entopts)
  }


  // Entity access: `client.ArtifactReference().list()` / `client.ArtifactReference().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ArtifactReference(entopts?: Record<string, any>) {
    const self = this
    return new ArtifactReferenceEntity(self, entopts)
  }


  // Entity access: `client.ArtifactRule().list()` / `client.ArtifactRule().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ArtifactRule(entopts?: Record<string, any>) {
    const self = this
    return new ArtifactRuleEntity(self, entopts)
  }


  // Entity access: `client.ArtifactType().list()` / `client.ArtifactType().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ArtifactType(entopts?: Record<string, any>) {
    const self = this
    return new ArtifactTypeEntity(self, entopts)
  }


  // Entity access: `client.Branch().list()` / `client.Branch().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Branch(entopts?: Record<string, any>) {
    const self = this
    return new BranchEntity(self, entopts)
  }


  // Entity access: `client.Comment().list()` / `client.Comment().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Comment(entopts?: Record<string, any>) {
    const self = this
    return new CommentEntity(self, entopts)
  }


  // Entity access: `client.ConfigurationProperty().list()` / `client.ConfigurationProperty().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ConfigurationProperty(entopts?: Record<string, any>) {
    const self = this
    return new ConfigurationPropertyEntity(self, entopts)
  }


  // Entity access: `client.ConsumerVersionHeatmap().list()` / `client.ConsumerVersionHeatmap().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ConsumerVersionHeatmap(entopts?: Record<string, any>) {
    const self = this
    return new ConsumerVersionHeatmapEntity(self, entopts)
  }


  // Entity access: `client.Content().list()` / `client.Content().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Content(entopts?: Record<string, any>) {
    const self = this
    return new ContentEntity(self, entopts)
  }


  // Entity access: `client.Contract().list()` / `client.Contract().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Contract(entopts?: Record<string, any>) {
    const self = this
    return new ContractEntity(self, entopts)
  }


  // Entity access: `client.ContractRule().list()` / `client.ContractRule().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ContractRule(entopts?: Record<string, any>) {
    const self = this
    return new ContractRuleEntity(self, entopts)
  }


  // Entity access: `client.ContractRuleSet().list()` / `client.ContractRuleSet().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ContractRuleSet(entopts?: Record<string, any>) {
    const self = this
    return new ContractRuleSetEntity(self, entopts)
  }


  // Entity access: `client.CreateArtifact().list()` / `client.CreateArtifact().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  CreateArtifact(entopts?: Record<string, any>) {
    const self = this
    return new CreateArtifactEntity(self, entopts)
  }


  // Entity access: `client.DeprecationReadiness().list()` / `client.DeprecationReadiness().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  DeprecationReadiness(entopts?: Record<string, any>) {
    const self = this
    return new DeprecationReadinessEntity(self, entopts)
  }


  // Entity access: `client.DownloadRef().list()` / `client.DownloadRef().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  DownloadRef(entopts?: Record<string, any>) {
    const self = this
    return new DownloadRefEntity(self, entopts)
  }


  // Entity access: `client.GitOp().list()` / `client.GitOp().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  GitOp(entopts?: Record<string, any>) {
    const self = this
    return new GitOpEntity(self, entopts)
  }


  // Entity access: `client.GitOpsStatus().list()` / `client.GitOpsStatus().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  GitOpsStatus(entopts?: Record<string, any>) {
    const self = this
    return new GitOpsStatusEntity(self, entopts)
  }


  // Entity access: `client.GitOpsValidateTask().list()` / `client.GitOpsValidateTask().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  GitOpsValidateTask(entopts?: Record<string, any>) {
    const self = this
    return new GitOpsValidateTaskEntity(self, entopts)
  }


  // Entity access: `client.GlobalRule().list()` / `client.GlobalRule().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  GlobalRule(entopts?: Record<string, any>) {
    const self = this
    return new GlobalRuleEntity(self, entopts)
  }


  // Entity access: `client.Group().list()` / `client.Group().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Group(entopts?: Record<string, any>) {
    const self = this
    return new GroupEntity(self, entopts)
  }


  // Entity access: `client.GroupRule().list()` / `client.GroupRule().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  GroupRule(entopts?: Record<string, any>) {
    const self = this
    return new GroupRuleEntity(self, entopts)
  }


  // Entity access: `client.KafkaSql().list()` / `client.KafkaSql().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  KafkaSql(entopts?: Record<string, any>) {
    const self = this
    return new KafkaSqlEntity(self, entopts)
  }


  // Entity access: `client.Metadata().list()` / `client.Metadata().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Metadata(entopts?: Record<string, any>) {
    const self = this
    return new MetadataEntity(self, entopts)
  }


  // Entity access: `client.OdcsContractResult().list()` / `client.OdcsContractResult().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  OdcsContractResult(entopts?: Record<string, any>) {
    const self = this
    return new OdcsContractResultEntity(self, entopts)
  }


  // Entity access: `client.OdcsContractSummary().list()` / `client.OdcsContractSummary().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  OdcsContractSummary(entopts?: Record<string, any>) {
    const self = this
    return new OdcsContractSummaryEntity(self, entopts)
  }


  // Entity access: `client.ReferenceGraph().list()` / `client.ReferenceGraph().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ReferenceGraph(entopts?: Record<string, any>) {
    const self = this
    return new ReferenceGraphEntity(self, entopts)
  }


  // Entity access: `client.RoleMapping().list()` / `client.RoleMapping().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  RoleMapping(entopts?: Record<string, any>) {
    const self = this
    return new RoleMappingEntity(self, entopts)
  }


  // Entity access: `client.Rule().list()` / `client.Rule().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Rule(entopts?: Record<string, any>) {
    const self = this
    return new RuleEntity(self, entopts)
  }


  // Entity access: `client.SearchedBranch().list()` / `client.SearchedBranch().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  SearchedBranch(entopts?: Record<string, any>) {
    const self = this
    return new SearchedBranchEntity(self, entopts)
  }


  // Entity access: `client.SearchedGroup().list()` / `client.SearchedGroup().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  SearchedGroup(entopts?: Record<string, any>) {
    const self = this
    return new SearchedGroupEntity(self, entopts)
  }


  // Entity access: `client.SystemInfo().list()` / `client.SystemInfo().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  SystemInfo(entopts?: Record<string, any>) {
    const self = this
    return new SystemInfoEntity(self, entopts)
  }


  // Entity access: `client.UsageSummary().list()` / `client.UsageSummary().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  UsageSummary(entopts?: Record<string, any>) {
    const self = this
    return new UsageSummaryEntity(self, entopts)
  }


  // Entity access: `client.UserInfo().list()` / `client.UserInfo().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  UserInfo(entopts?: Record<string, any>) {
    const self = this
    return new UserInfoEntity(self, entopts)
  }


  // Entity access: `client.UserInterfaceConfig().list()` / `client.UserInterfaceConfig().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  UserInterfaceConfig(entopts?: Record<string, any>) {
    const self = this
    return new UserInterfaceConfigEntity(self, entopts)
  }


  // Entity access: `client.Version().list()` / `client.Version().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Version(entopts?: Record<string, any>) {
    const self = this
    return new VersionEntity(self, entopts)
  }


  // Entity access: `client.WellKnown().list()` / `client.WellKnown().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  WellKnown(entopts?: Record<string, any>) {
    const self = this
    return new WellKnownEntity(self, entopts)
  }


  // Entity access: `client.WrappedVersionState().list()` / `client.WrappedVersionState().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  WrappedVersionState(entopts?: Record<string, any>) {
    const self = this
    return new WrappedVersionStateEntity(self, entopts)
  }




  static test(testoptsarg?: any, sdkoptsarg?: any) {
    const struct = stdutil.struct
    const setpath = struct.setpath
    const getdef = struct.getdef
    const clone = struct.clone
    const setprop = struct.setprop

    const sdkopts = getdef(clone(sdkoptsarg), {})
    const testopts = getdef(clone(testoptsarg), {})
    setprop(testopts, 'active', true)
    setpath(sdkopts, 'feature.test', testopts)

    const testsdk = new ApicurioRegistrySDK(sdkopts)
    testsdk._mode = 'test'

    return testsdk
  }


  tester(testopts?: any, sdkopts?: any) {
    return ApicurioRegistrySDK.test(testopts, sdkopts)
  }


  toJSON() {
    return { name: 'ApicurioRegistry' }
  }

  toString() {
    return 'ApicurioRegistry ' + this._utility.struct.jsonify(this.toJSON())
  }

  [inspect.custom]() {
    return this.toString()
  }

}




const SDK = ApicurioRegistrySDK


export {
  stdutil,
  config,
  

  BaseFeature,
  ApicurioRegistryEntityBase,

  ApicurioRegistrySDK,
  SDK,
}


