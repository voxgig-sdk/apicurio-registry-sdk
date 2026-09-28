-- ApicurioRegistry SDK

local vs = require("utility.struct.struct")
local Utility = require("core.utility_type")
local Spec = require("core.spec")
local helpers = require("core.helpers")

-- Load utility registration (populates Utility._registrar)
require("utility.register")

-- Typed-model annotations (LuaLS ---@class); empty at runtime.
require("apicurio-registry_types")

-- Load features
local BaseFeature = require("feature.base_feature")
local features_factory = require("features")


local ApicurioRegistrySDK = {}
ApicurioRegistrySDK.__index = ApicurioRegistrySDK


local function _make_feature(name)
  local factory = features_factory[name]
  if factory ~= nil then
    return factory()
  end
  return features_factory.base()
end

ApicurioRegistrySDK._make_feature = _make_feature


function ApicurioRegistrySDK.new(options)
  local self = setmetatable({}, ApicurioRegistrySDK)
  self.mode = "live"
  self.features = {}
  self.options = nil

  local utility = Utility.new()
  self._utility = utility

  local config = require("config_shared")()

  self._rootctx = utility.make_context({
    client = self,
    utility = utility,
    config = config,
    options = options or {},
    shared = {},
  }, nil)

  self.options = utility.make_options(self._rootctx)

  if vs.getpath(self.options, "feature.test.active") == true then
    self.mode = "test"
  end

  self._rootctx.options = self.options

  -- Add features in the resolved order (make_options puts an explicit list
  -- order first, else defaults to test-first). Ordering matters: the `test`
  -- feature installs the base mock transport and the transport features
  -- (retry/cache/netsim/proxy/ratelimit) wrap whatever is current, so `test`
  -- must be added before them to sit at the base of the chain.
  local feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
  if feature_opts ~= nil then
    local featureorder = vs.getpath(self.options, "__derived__.featureorder")
    if type(featureorder) == "table" then
      for _, fname in ipairs(featureorder) do
        local fopts = helpers.to_map(feature_opts[fname])
        if fopts ~= nil and fopts["active"] == true then
          utility.feature_add(self._rootctx, _make_feature(fname))
        end
      end
    end
  end

  -- Add extension features.
  local extend = vs.getprop(self.options, "extend")
  if type(extend) == "table" then
    for _, f in ipairs(extend) do
      if type(f) == "table" and type(f.get_name) == "function" then
        utility.feature_add(self._rootctx, f)
      end
    end
  end

  -- CONSUMED, not kept. `extend` holds feature INSTANCES, and every shipped
  -- feature's init stores `self.client = ctx.client` - so leaving the list
  -- in self.options makes the options map CYCLIC (client.options.extend[1]
  -- .client == client), and options_map()'s vs.clone, which has no cycle
  -- guard, blew the stack on the first prepare_auth of any client built with
  -- an extend feature. The instances live on self.features from here on,
  -- which is the only place anything reads them; the SAME table is
  -- self._rootctx.options, so the root context loses the key too.
  self.options["extend"] = nil

  -- Initialize features.
  for _, f in ipairs(self.features) do
    utility.feature_init(self._rootctx, f)
  end

  utility.feature_hook(self._rootctx, "PostConstruct")

    -- feature: debug
  -- feature: idempotency
  -- feature: metrics
  -- feature: paging
  -- feature: ratelimit
  -- feature: retry
  -- feature: test
  -- feature: timeout


  return self
end


function ApicurioRegistrySDK:options_map()
  local out = vs.clone(self.options)
  if type(out) == "table" then
    return out
  end
  return {}
end


function ApicurioRegistrySDK:get_utility()
  return Utility.copy(self._utility)
end


function ApicurioRegistrySDK:get_root_ctx()
  return self._rootctx
end


function ApicurioRegistrySDK:prepare(fetchargs)
  local utility = self._utility

  fetchargs = fetchargs or {}

  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "prepare",
    ctrl = ctrl,
  }, self._rootctx)

  local options = self.options

  local path = vs.getprop(fetchargs, "path") or ""
  if type(path) ~= "string" then path = "" end

  local method = vs.getprop(fetchargs, "method") or "GET"
  if type(method) ~= "string" then method = "GET" end

  local params = helpers.to_map(vs.getprop(fetchargs, "params")) or {}
  local query = helpers.to_map(vs.getprop(fetchargs, "query")) or {}

  local headers = utility.prepare_headers(ctx)

  local base = vs.getprop(options, "base") or ""
  if type(base) ~= "string" then base = "" end
  local prefix = vs.getprop(options, "prefix") or ""
  if type(prefix) ~= "string" then prefix = "" end
  local suffix = vs.getprop(options, "suffix") or ""
  if type(suffix) ~= "string" then suffix = "" end

  ctx.spec = Spec.new({
    base = base,
    prefix = prefix,
    suffix = suffix,
    path = path,
    method = method,
    params = params,
    query = query,
    headers = headers,
    body = vs.getprop(fetchargs, "body"),
    step = "start",
  })

  -- Merge user-provided headers.
  local uh = vs.getprop(fetchargs, "headers")
  if type(uh) == "table" then
    for k, v in pairs(uh) do
      ctx.spec.headers[k] = v
    end
  end

  local _, err = utility.prepare_auth(ctx)
  if err ~= nil then
    return nil, err
  end

  return utility.make_fetch_def(ctx)
end


-- Raw endpoint access is operator-controllable, like every entity op.
-- Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
-- either one reaches the same endpoint.
function ApicurioRegistrySDK:direct(fetchargs)
  if not self:_op_allowed("direct") then
    return self:_op_denied("direct"), nil
  end

  return self:_raw_request(fetchargs)
end


-- Is this raw-access op permitted by the SDK's allow.op option?
function ApicurioRegistrySDK:_op_allowed(op)
  local allow = vs.getpath(self.options, "allow.op")
  return type(allow) == "string" and allow:find(op, 1, true) ~= nil
end


function ApicurioRegistrySDK:_op_denied(op)
  local allow = vs.getpath(self.options, "allow.op")
  if type(allow) ~= "string" then allow = "" end
  return {
    ok = false,
    err = "ApicurioRegistrySDK: " .. op .. ": operation not allowed by" ..
      " SDK option allow.op value: \"" .. allow .. "\"",
  }
end


-- Ungated request path shared by direct and graphql, each of which checks its
-- own allow.op token first. Private, rather than a flag on fetchargs: a
-- caller-supplied marker would let anyone opt straight back out of the gate
-- by passing it.
function ApicurioRegistrySDK:_raw_request(fetchargs)
  local utility = self._utility

  local fetchdef, err = self:prepare(fetchargs)
  if err ~= nil then
    return { ok = false, err = err }, nil
  end

  fetchargs = fetchargs or {}
  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "direct",
    ctrl = ctrl,
  }, self._rootctx)

  local url = fetchdef["url"] or ""
  local fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

  if fetch_err ~= nil then
    return { ok = false, err = fetch_err }, nil
  end

  if fetched == nil then
    return {
      ok = false,
      err = ctx:make_error("direct_no_response", "response: undefined"),
    }, nil
  end

  if type(fetched) == "table" then
    local status = helpers.to_int(vs.getprop(fetched, "status"))
    local headers = vs.getprop(fetched, "headers") or {}

    -- No-body responses (204, 304) and explicit zero content-length
    -- must skip JSON parsing — calling json() on an empty body errors.
    local content_length = nil
    if type(headers) == "table" then
      content_length = headers["content-length"]
    end
    local no_body = status == 204 or status == 304 or tostring(content_length) == "0"

    local json_data = nil
    if not no_body then
      local jf = vs.getprop(fetched, "json")
      if type(jf) == "function" then
        local ok, result = pcall(jf)
        if ok then
          json_data = result
        end
        -- Non-JSON body: json_data stays nil, status/headers preserved.
      end
    end

    return {
      ok = status >= 200 and status < 300,
      status = status,
      headers = headers,
      data = json_data,
    }, nil
  end

  return {
    ok = false,
    err = ctx:make_error("direct_invalid", "invalid response type"),
  }, nil
end


-- Raw GraphQL access: the pressure valve that makes the generated surface's
-- deliberate omissions (per-call selection sets, typed filter builders,
-- batching, subscriptions) livable — the whole schema stays reachable.
--
-- Thin wrapper over the same prepare/fetch path direct uses, with the one
-- thing raw direct cannot do for GraphQL: a GraphQL failure rides HTTP 200 as
-- a top-level `errors` array, so status alone would report a failed query as
-- ok.
--
-- NOTE: like direct, this bypasses the feature pipeline — no retry, ratelimit
-- or paging features apply.
function ApicurioRegistrySDK:graphql(query, variables, ctrl)
  if not self:_op_allowed("graphql") then
    return self:_op_denied("graphql"), nil
  end

  local res, err = self:_raw_request({
    method = "POST",
    headers = { ["content-type"] = "application/json" },
    body = {
      query = query,
      variables = type(variables) == "table" and variables or {},
    },
    ctrl = type(ctrl) == "table" and ctrl or {},
  })

  if err ~= nil or type(res) ~= "table" then
    return res, err
  end

  -- Errors are read BEFORE any status check: a GraphQL parse or validation
  -- failure comes back as HTTP 400 carrying the standard { errors = {...} }
  -- body, and the raw path represents a non-2xx as ok=false with no err — so
  -- returning early on status would discard the server's own diagnostics,
  -- which are the only useful part of that response.
  local errors = vs.getpath(res, "data.errors")

  if type(errors) == "table" and 0 < #errors then
    local msg = vs.getprop(errors[1], "message")
    if type(msg) ~= "string" or msg == "" then
      msg = "graphql error"
    end
    res.ok = false
    res.err = "ApicurioRegistrySDK: graphql: " .. msg
    res.graphql = errors
  end

  return res, nil
end



-- Idiomatic facade: client:Admin():list() / client:Admin():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ApicurioRegistrySDK:Admin(data)
  local EntityMod = require("entity.admin_entity")
  if data == nil then
    if self._admin == nil then
      self._admin = EntityMod.new(self, nil)
    end
    return self._admin
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Agent():list() / client:Agent():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ApicurioRegistrySDK:Agent(data)
  local EntityMod = require("entity.agent_entity")
  if data == nil then
    if self._agent == nil then
      self._agent = EntityMod.new(self, nil)
    end
    return self._agent
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AgentCard():list() / client:AgentCard():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ApicurioRegistrySDK:AgentCard(data)
  local EntityMod = require("entity.agent_card_entity")
  if data == nil then
    if self._agent_card == nil then
      self._agent_card = EntityMod.new(self, nil)
    end
    return self._agent_card
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AiCatalog():list() / client:AiCatalog():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ApicurioRegistrySDK:AiCatalog(data)
  local EntityMod = require("entity.ai_catalog_entity")
  if data == nil then
    if self._ai_catalog == nil then
      self._ai_catalog = EntityMod.new(self, nil)
    end
    return self._ai_catalog
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ArdExplore():list() / client:ArdExplore():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ApicurioRegistrySDK:ArdExplore(data)
  local EntityMod = require("entity.ard_explore_entity")
  if data == nil then
    if self._ard_explore == nil then
      self._ard_explore = EntityMod.new(self, nil)
    end
    return self._ard_explore
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ArdSearch():list() / client:ArdSearch():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ApicurioRegistrySDK:ArdSearch(data)
  local EntityMod = require("entity.ard_search_entity")
  if data == nil then
    if self._ard_search == nil then
      self._ard_search = EntityMod.new(self, nil)
    end
    return self._ard_search
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Artifact():list() / client:Artifact():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ApicurioRegistrySDK:Artifact(data)
  local EntityMod = require("entity.artifact_entity")
  if data == nil then
    if self._artifact == nil then
      self._artifact = EntityMod.new(self, nil)
    end
    return self._artifact
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ArtifactReference():list() / client:ArtifactReference():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ApicurioRegistrySDK:ArtifactReference(data)
  local EntityMod = require("entity.artifact_reference_entity")
  if data == nil then
    if self._artifact_reference == nil then
      self._artifact_reference = EntityMod.new(self, nil)
    end
    return self._artifact_reference
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ArtifactRule():list() / client:ArtifactRule():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ApicurioRegistrySDK:ArtifactRule(data)
  local EntityMod = require("entity.artifact_rule_entity")
  if data == nil then
    if self._artifact_rule == nil then
      self._artifact_rule = EntityMod.new(self, nil)
    end
    return self._artifact_rule
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ArtifactType():list() / client:ArtifactType():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ApicurioRegistrySDK:ArtifactType(data)
  local EntityMod = require("entity.artifact_type_entity")
  if data == nil then
    if self._artifact_type == nil then
      self._artifact_type = EntityMod.new(self, nil)
    end
    return self._artifact_type
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Branch():list() / client:Branch():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ApicurioRegistrySDK:Branch(data)
  local EntityMod = require("entity.branch_entity")
  if data == nil then
    if self._branch == nil then
      self._branch = EntityMod.new(self, nil)
    end
    return self._branch
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Comment():list() / client:Comment():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ApicurioRegistrySDK:Comment(data)
  local EntityMod = require("entity.comment_entity")
  if data == nil then
    if self._comment == nil then
      self._comment = EntityMod.new(self, nil)
    end
    return self._comment
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ConfigurationProperty():list() / client:ConfigurationProperty():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ApicurioRegistrySDK:ConfigurationProperty(data)
  local EntityMod = require("entity.configuration_property_entity")
  if data == nil then
    if self._configuration_property == nil then
      self._configuration_property = EntityMod.new(self, nil)
    end
    return self._configuration_property
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ConsumerVersionHeatmap():list() / client:ConsumerVersionHeatmap():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ApicurioRegistrySDK:ConsumerVersionHeatmap(data)
  local EntityMod = require("entity.consumer_version_heatmap_entity")
  if data == nil then
    if self._consumer_version_heatmap == nil then
      self._consumer_version_heatmap = EntityMod.new(self, nil)
    end
    return self._consumer_version_heatmap
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Content():list() / client:Content():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ApicurioRegistrySDK:Content(data)
  local EntityMod = require("entity.content_entity")
  if data == nil then
    if self._content == nil then
      self._content = EntityMod.new(self, nil)
    end
    return self._content
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Contract():list() / client:Contract():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ApicurioRegistrySDK:Contract(data)
  local EntityMod = require("entity.contract_entity")
  if data == nil then
    if self._contract == nil then
      self._contract = EntityMod.new(self, nil)
    end
    return self._contract
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ContractRule():list() / client:ContractRule():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ApicurioRegistrySDK:ContractRule(data)
  local EntityMod = require("entity.contract_rule_entity")
  if data == nil then
    if self._contract_rule == nil then
      self._contract_rule = EntityMod.new(self, nil)
    end
    return self._contract_rule
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ContractRuleSet():list() / client:ContractRuleSet():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ApicurioRegistrySDK:ContractRuleSet(data)
  local EntityMod = require("entity.contract_rule_set_entity")
  if data == nil then
    if self._contract_rule_set == nil then
      self._contract_rule_set = EntityMod.new(self, nil)
    end
    return self._contract_rule_set
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:CreateArtifact():list() / client:CreateArtifact():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ApicurioRegistrySDK:CreateArtifact(data)
  local EntityMod = require("entity.create_artifact_entity")
  if data == nil then
    if self._create_artifact == nil then
      self._create_artifact = EntityMod.new(self, nil)
    end
    return self._create_artifact
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:DeprecationReadiness():list() / client:DeprecationReadiness():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ApicurioRegistrySDK:DeprecationReadiness(data)
  local EntityMod = require("entity.deprecation_readiness_entity")
  if data == nil then
    if self._deprecation_readiness == nil then
      self._deprecation_readiness = EntityMod.new(self, nil)
    end
    return self._deprecation_readiness
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:DownloadRef():list() / client:DownloadRef():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ApicurioRegistrySDK:DownloadRef(data)
  local EntityMod = require("entity.download_ref_entity")
  if data == nil then
    if self._download_ref == nil then
      self._download_ref = EntityMod.new(self, nil)
    end
    return self._download_ref
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:GitOp():list() / client:GitOp():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ApicurioRegistrySDK:GitOp(data)
  local EntityMod = require("entity.git_op_entity")
  if data == nil then
    if self._git_op == nil then
      self._git_op = EntityMod.new(self, nil)
    end
    return self._git_op
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:GitOpsStatus():list() / client:GitOpsStatus():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ApicurioRegistrySDK:GitOpsStatus(data)
  local EntityMod = require("entity.git_ops_status_entity")
  if data == nil then
    if self._git_ops_status == nil then
      self._git_ops_status = EntityMod.new(self, nil)
    end
    return self._git_ops_status
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:GitOpsValidateTask():list() / client:GitOpsValidateTask():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ApicurioRegistrySDK:GitOpsValidateTask(data)
  local EntityMod = require("entity.git_ops_validate_task_entity")
  if data == nil then
    if self._git_ops_validate_task == nil then
      self._git_ops_validate_task = EntityMod.new(self, nil)
    end
    return self._git_ops_validate_task
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:GlobalRule():list() / client:GlobalRule():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ApicurioRegistrySDK:GlobalRule(data)
  local EntityMod = require("entity.global_rule_entity")
  if data == nil then
    if self._global_rule == nil then
      self._global_rule = EntityMod.new(self, nil)
    end
    return self._global_rule
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Group():list() / client:Group():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ApicurioRegistrySDK:Group(data)
  local EntityMod = require("entity.group_entity")
  if data == nil then
    if self._group == nil then
      self._group = EntityMod.new(self, nil)
    end
    return self._group
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:GroupRule():list() / client:GroupRule():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ApicurioRegistrySDK:GroupRule(data)
  local EntityMod = require("entity.group_rule_entity")
  if data == nil then
    if self._group_rule == nil then
      self._group_rule = EntityMod.new(self, nil)
    end
    return self._group_rule
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:KafkaSql():list() / client:KafkaSql():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ApicurioRegistrySDK:KafkaSql(data)
  local EntityMod = require("entity.kafka_sql_entity")
  if data == nil then
    if self._kafka_sql == nil then
      self._kafka_sql = EntityMod.new(self, nil)
    end
    return self._kafka_sql
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:McpTool():list() / client:McpTool():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ApicurioRegistrySDK:McpTool(data)
  local EntityMod = require("entity.mcp_tool_entity")
  if data == nil then
    if self._mcp_tool == nil then
      self._mcp_tool = EntityMod.new(self, nil)
    end
    return self._mcp_tool
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Metadata():list() / client:Metadata():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ApicurioRegistrySDK:Metadata(data)
  local EntityMod = require("entity.metadata_entity")
  if data == nil then
    if self._metadata == nil then
      self._metadata = EntityMod.new(self, nil)
    end
    return self._metadata
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:OdcsContractResult():list() / client:OdcsContractResult():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ApicurioRegistrySDK:OdcsContractResult(data)
  local EntityMod = require("entity.odcs_contract_result_entity")
  if data == nil then
    if self._odcs_contract_result == nil then
      self._odcs_contract_result = EntityMod.new(self, nil)
    end
    return self._odcs_contract_result
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:OdcsContractSummary():list() / client:OdcsContractSummary():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ApicurioRegistrySDK:OdcsContractSummary(data)
  local EntityMod = require("entity.odcs_contract_summary_entity")
  if data == nil then
    if self._odcs_contract_summary == nil then
      self._odcs_contract_summary = EntityMod.new(self, nil)
    end
    return self._odcs_contract_summary
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ReferenceGraph():list() / client:ReferenceGraph():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ApicurioRegistrySDK:ReferenceGraph(data)
  local EntityMod = require("entity.reference_graph_entity")
  if data == nil then
    if self._reference_graph == nil then
      self._reference_graph = EntityMod.new(self, nil)
    end
    return self._reference_graph
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:RoleMapping():list() / client:RoleMapping():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ApicurioRegistrySDK:RoleMapping(data)
  local EntityMod = require("entity.role_mapping_entity")
  if data == nil then
    if self._role_mapping == nil then
      self._role_mapping = EntityMod.new(self, nil)
    end
    return self._role_mapping
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Rule():list() / client:Rule():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ApicurioRegistrySDK:Rule(data)
  local EntityMod = require("entity.rule_entity")
  if data == nil then
    if self._rule == nil then
      self._rule = EntityMod.new(self, nil)
    end
    return self._rule
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:SearchedBranch():list() / client:SearchedBranch():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ApicurioRegistrySDK:SearchedBranch(data)
  local EntityMod = require("entity.searched_branch_entity")
  if data == nil then
    if self._searched_branch == nil then
      self._searched_branch = EntityMod.new(self, nil)
    end
    return self._searched_branch
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:SearchedGroup():list() / client:SearchedGroup():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ApicurioRegistrySDK:SearchedGroup(data)
  local EntityMod = require("entity.searched_group_entity")
  if data == nil then
    if self._searched_group == nil then
      self._searched_group = EntityMod.new(self, nil)
    end
    return self._searched_group
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:SystemInfo():list() / client:SystemInfo():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ApicurioRegistrySDK:SystemInfo(data)
  local EntityMod = require("entity.system_info_entity")
  if data == nil then
    if self._system_info == nil then
      self._system_info = EntityMod.new(self, nil)
    end
    return self._system_info
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:UsageSummary():list() / client:UsageSummary():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ApicurioRegistrySDK:UsageSummary(data)
  local EntityMod = require("entity.usage_summary_entity")
  if data == nil then
    if self._usage_summary == nil then
      self._usage_summary = EntityMod.new(self, nil)
    end
    return self._usage_summary
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:UserInfo():list() / client:UserInfo():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ApicurioRegistrySDK:UserInfo(data)
  local EntityMod = require("entity.user_info_entity")
  if data == nil then
    if self._user_info == nil then
      self._user_info = EntityMod.new(self, nil)
    end
    return self._user_info
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:UserInterfaceConfig():list() / client:UserInterfaceConfig():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ApicurioRegistrySDK:UserInterfaceConfig(data)
  local EntityMod = require("entity.user_interface_config_entity")
  if data == nil then
    if self._user_interface_config == nil then
      self._user_interface_config = EntityMod.new(self, nil)
    end
    return self._user_interface_config
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Version():list() / client:Version():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ApicurioRegistrySDK:Version(data)
  local EntityMod = require("entity.version_entity")
  if data == nil then
    if self._version == nil then
      self._version = EntityMod.new(self, nil)
    end
    return self._version
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:WellKnown():list() / client:WellKnown():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ApicurioRegistrySDK:WellKnown(data)
  local EntityMod = require("entity.well_known_entity")
  if data == nil then
    if self._well_known == nil then
      self._well_known = EntityMod.new(self, nil)
    end
    return self._well_known
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:WrappedVersionState():list() / client:WrappedVersionState():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ApicurioRegistrySDK:WrappedVersionState(data)
  local EntityMod = require("entity.wrapped_version_state_entity")
  if data == nil then
    if self._wrapped_version_state == nil then
      self._wrapped_version_state = EntityMod.new(self, nil)
    end
    return self._wrapped_version_state
  end
  return EntityMod.new(self, data)
end




function ApicurioRegistrySDK.test(testopts, sdkopts)
  sdkopts = sdkopts or {}
  sdkopts = vs.clone(sdkopts)
  if type(sdkopts) ~= "table" then
    sdkopts = {}
  end

  testopts = testopts or {}
  testopts = vs.clone(testopts)
  if type(testopts) ~= "table" then
    testopts = {}
  end
  testopts["active"] = true

  vs.setpath(sdkopts, "feature.test", testopts)

  local sdk = ApicurioRegistrySDK.new(sdkopts)
  sdk.mode = "test"

  return sdk
end


return ApicurioRegistrySDK
