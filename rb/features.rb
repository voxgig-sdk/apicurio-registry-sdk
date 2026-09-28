# ApicurioRegistry SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/debug_feature'
require_relative 'feature/idempotency_feature'
require_relative 'feature/metrics_feature'
require_relative 'feature/paging_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module ApicurioRegistryFeatures
  def self.make_feature(name)
    case name
    when "base"
      ApicurioRegistryBaseFeature.new
    when "debug"
      ApicurioRegistryDebugFeature.new
    when "idempotency"
      ApicurioRegistryIdempotencyFeature.new
    when "metrics"
      ApicurioRegistryMetricsFeature.new
    when "paging"
      ApicurioRegistryPagingFeature.new
    when "ratelimit"
      ApicurioRegistryRatelimitFeature.new
    when "retry"
      ApicurioRegistryRetryFeature.new
    when "test"
      ApicurioRegistryTestFeature.new
    when "timeout"
      ApicurioRegistryTimeoutFeature.new
    else
      ApicurioRegistryBaseFeature.new
    end
  end
end
