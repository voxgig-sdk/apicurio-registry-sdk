package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewDebugFeatureFunc func() Feature

var NewIdempotencyFeatureFunc func() Feature

var NewMetricsFeatureFunc func() Feature

var NewPagingFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewAdminEntityFunc func(client *ApicurioRegistrySDK, entopts map[string]any) ApicurioRegistryEntity

var NewAgentEntityFunc func(client *ApicurioRegistrySDK, entopts map[string]any) ApicurioRegistryEntity

var NewAgentCardEntityFunc func(client *ApicurioRegistrySDK, entopts map[string]any) ApicurioRegistryEntity

var NewAiCatalogEntityFunc func(client *ApicurioRegistrySDK, entopts map[string]any) ApicurioRegistryEntity

var NewArdExploreEntityFunc func(client *ApicurioRegistrySDK, entopts map[string]any) ApicurioRegistryEntity

var NewArdSearchEntityFunc func(client *ApicurioRegistrySDK, entopts map[string]any) ApicurioRegistryEntity

var NewArtifactEntityFunc func(client *ApicurioRegistrySDK, entopts map[string]any) ApicurioRegistryEntity

var NewArtifactReferenceEntityFunc func(client *ApicurioRegistrySDK, entopts map[string]any) ApicurioRegistryEntity

var NewArtifactRuleEntityFunc func(client *ApicurioRegistrySDK, entopts map[string]any) ApicurioRegistryEntity

var NewArtifactTypeEntityFunc func(client *ApicurioRegistrySDK, entopts map[string]any) ApicurioRegistryEntity

var NewBranchEntityFunc func(client *ApicurioRegistrySDK, entopts map[string]any) ApicurioRegistryEntity

var NewCommentEntityFunc func(client *ApicurioRegistrySDK, entopts map[string]any) ApicurioRegistryEntity

var NewConfigurationPropertyEntityFunc func(client *ApicurioRegistrySDK, entopts map[string]any) ApicurioRegistryEntity

var NewConsumerVersionHeatmapEntityFunc func(client *ApicurioRegistrySDK, entopts map[string]any) ApicurioRegistryEntity

var NewContentEntityFunc func(client *ApicurioRegistrySDK, entopts map[string]any) ApicurioRegistryEntity

var NewContractEntityFunc func(client *ApicurioRegistrySDK, entopts map[string]any) ApicurioRegistryEntity

var NewContractRuleEntityFunc func(client *ApicurioRegistrySDK, entopts map[string]any) ApicurioRegistryEntity

var NewContractRuleSetEntityFunc func(client *ApicurioRegistrySDK, entopts map[string]any) ApicurioRegistryEntity

var NewCreateArtifactEntityFunc func(client *ApicurioRegistrySDK, entopts map[string]any) ApicurioRegistryEntity

var NewDeprecationReadinessEntityFunc func(client *ApicurioRegistrySDK, entopts map[string]any) ApicurioRegistryEntity

var NewDownloadRefEntityFunc func(client *ApicurioRegistrySDK, entopts map[string]any) ApicurioRegistryEntity

var NewGitOpEntityFunc func(client *ApicurioRegistrySDK, entopts map[string]any) ApicurioRegistryEntity

var NewGitOpsStatusEntityFunc func(client *ApicurioRegistrySDK, entopts map[string]any) ApicurioRegistryEntity

var NewGitOpsValidateTaskEntityFunc func(client *ApicurioRegistrySDK, entopts map[string]any) ApicurioRegistryEntity

var NewGlobalRuleEntityFunc func(client *ApicurioRegistrySDK, entopts map[string]any) ApicurioRegistryEntity

var NewGroupEntityFunc func(client *ApicurioRegistrySDK, entopts map[string]any) ApicurioRegistryEntity

var NewGroupRuleEntityFunc func(client *ApicurioRegistrySDK, entopts map[string]any) ApicurioRegistryEntity

var NewKafkaSqlEntityFunc func(client *ApicurioRegistrySDK, entopts map[string]any) ApicurioRegistryEntity

var NewMcpToolEntityFunc func(client *ApicurioRegistrySDK, entopts map[string]any) ApicurioRegistryEntity

var NewMetadataEntityFunc func(client *ApicurioRegistrySDK, entopts map[string]any) ApicurioRegistryEntity

var NewOdcsContractResultEntityFunc func(client *ApicurioRegistrySDK, entopts map[string]any) ApicurioRegistryEntity

var NewOdcsContractSummaryEntityFunc func(client *ApicurioRegistrySDK, entopts map[string]any) ApicurioRegistryEntity

var NewReferenceGraphEntityFunc func(client *ApicurioRegistrySDK, entopts map[string]any) ApicurioRegistryEntity

var NewRoleMappingEntityFunc func(client *ApicurioRegistrySDK, entopts map[string]any) ApicurioRegistryEntity

var NewRuleEntityFunc func(client *ApicurioRegistrySDK, entopts map[string]any) ApicurioRegistryEntity

var NewSearchedBranchEntityFunc func(client *ApicurioRegistrySDK, entopts map[string]any) ApicurioRegistryEntity

var NewSearchedGroupEntityFunc func(client *ApicurioRegistrySDK, entopts map[string]any) ApicurioRegistryEntity

var NewSystemInfoEntityFunc func(client *ApicurioRegistrySDK, entopts map[string]any) ApicurioRegistryEntity

var NewUsageSummaryEntityFunc func(client *ApicurioRegistrySDK, entopts map[string]any) ApicurioRegistryEntity

var NewUserInfoEntityFunc func(client *ApicurioRegistrySDK, entopts map[string]any) ApicurioRegistryEntity

var NewUserInterfaceConfigEntityFunc func(client *ApicurioRegistrySDK, entopts map[string]any) ApicurioRegistryEntity

var NewVersionEntityFunc func(client *ApicurioRegistrySDK, entopts map[string]any) ApicurioRegistryEntity

var NewWellKnownEntityFunc func(client *ApicurioRegistrySDK, entopts map[string]any) ApicurioRegistryEntity

var NewWrappedVersionStateEntityFunc func(client *ApicurioRegistrySDK, entopts map[string]any) ApicurioRegistryEntity

