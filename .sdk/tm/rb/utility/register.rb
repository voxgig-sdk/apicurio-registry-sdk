# ApicurioRegistry SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

ApicurioRegistryUtility.registrar = ->(u) {
  u.clean = ApicurioRegistryUtilities::Clean
  u.done = ApicurioRegistryUtilities::Done
  u.make_error = ApicurioRegistryUtilities::MakeError
  u.feature_add = ApicurioRegistryUtilities::FeatureAdd
  u.feature_hook = ApicurioRegistryUtilities::FeatureHook
  u.feature_init = ApicurioRegistryUtilities::FeatureInit
  u.fetcher = ApicurioRegistryUtilities::Fetcher
  u.make_fetch_def = ApicurioRegistryUtilities::MakeFetchDef
  u.make_context = ApicurioRegistryUtilities::MakeContext
  u.make_options = ApicurioRegistryUtilities::MakeOptions
  u.make_request = ApicurioRegistryUtilities::MakeRequest
  u.make_response = ApicurioRegistryUtilities::MakeResponse
  u.make_result = ApicurioRegistryUtilities::MakeResult
  u.make_point = ApicurioRegistryUtilities::MakePoint
  u.make_spec = ApicurioRegistryUtilities::MakeSpec
  u.make_url = ApicurioRegistryUtilities::MakeUrl
  u.param = ApicurioRegistryUtilities::Param
  u.prepare_auth = ApicurioRegistryUtilities::PrepareAuth
  u.prepare_body = ApicurioRegistryUtilities::PrepareBody
  u.prepare_headers = ApicurioRegistryUtilities::PrepareHeaders
  u.prepare_method = ApicurioRegistryUtilities::PrepareMethod
  u.prepare_params = ApicurioRegistryUtilities::PrepareParams
  u.prepare_path = ApicurioRegistryUtilities::PreparePath
  u.prepare_query = ApicurioRegistryUtilities::PrepareQuery
  u.graphql_body = ApicurioRegistryUtilities::GraphqlBody
  u.graphql_errors = ApicurioRegistryUtilities::GraphqlErrors
  u.result_basic = ApicurioRegistryUtilities::ResultBasic
  u.result_body = ApicurioRegistryUtilities::ResultBody
  u.result_headers = ApicurioRegistryUtilities::ResultHeaders
  u.transform_request = ApicurioRegistryUtilities::TransformRequest
  u.transform_response = ApicurioRegistryUtilities::TransformResponse
}
