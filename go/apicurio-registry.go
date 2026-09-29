package voxgigapicurioregistrysdk

import (
	"github.com/voxgig-sdk/apicurio-registry-sdk/go/core"
	"github.com/voxgig-sdk/apicurio-registry-sdk/go/entity"
	"github.com/voxgig-sdk/apicurio-registry-sdk/go/feature"
	_ "github.com/voxgig-sdk/apicurio-registry-sdk/go/utility"
)

// Type aliases preserve external API.
type ApicurioRegistrySDK = core.ApicurioRegistrySDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type ApicurioRegistryEntity = core.ApicurioRegistryEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type ApicurioRegistryError = core.ApicurioRegistryError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewDebugFeatureFunc = func() core.Feature {
		return feature.NewDebugFeature()
	}
	core.NewIdempotencyFeatureFunc = func() core.Feature {
		return feature.NewIdempotencyFeature()
	}
	core.NewMetricsFeatureFunc = func() core.Feature {
		return feature.NewMetricsFeature()
	}
	core.NewPagingFeatureFunc = func() core.Feature {
		return feature.NewPagingFeature()
	}
	core.NewRatelimitFeatureFunc = func() core.Feature {
		return feature.NewRatelimitFeature()
	}
	core.NewRetryFeatureFunc = func() core.Feature {
		return feature.NewRetryFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewTimeoutFeatureFunc = func() core.Feature {
		return feature.NewTimeoutFeature()
	}
	core.NewAdminEntityFunc = func(client *core.ApicurioRegistrySDK, entopts map[string]any) core.ApicurioRegistryEntity {
		return entity.NewAdminEntity(client, entopts)
	}
	core.NewAgentEntityFunc = func(client *core.ApicurioRegistrySDK, entopts map[string]any) core.ApicurioRegistryEntity {
		return entity.NewAgentEntity(client, entopts)
	}
	core.NewAgentCardEntityFunc = func(client *core.ApicurioRegistrySDK, entopts map[string]any) core.ApicurioRegistryEntity {
		return entity.NewAgentCardEntity(client, entopts)
	}
	core.NewAiCatalogEntityFunc = func(client *core.ApicurioRegistrySDK, entopts map[string]any) core.ApicurioRegistryEntity {
		return entity.NewAiCatalogEntity(client, entopts)
	}
	core.NewArdExploreEntityFunc = func(client *core.ApicurioRegistrySDK, entopts map[string]any) core.ApicurioRegistryEntity {
		return entity.NewArdExploreEntity(client, entopts)
	}
	core.NewArdSearchEntityFunc = func(client *core.ApicurioRegistrySDK, entopts map[string]any) core.ApicurioRegistryEntity {
		return entity.NewArdSearchEntity(client, entopts)
	}
	core.NewArtifactEntityFunc = func(client *core.ApicurioRegistrySDK, entopts map[string]any) core.ApicurioRegistryEntity {
		return entity.NewArtifactEntity(client, entopts)
	}
	core.NewArtifactReferenceEntityFunc = func(client *core.ApicurioRegistrySDK, entopts map[string]any) core.ApicurioRegistryEntity {
		return entity.NewArtifactReferenceEntity(client, entopts)
	}
	core.NewArtifactRuleEntityFunc = func(client *core.ApicurioRegistrySDK, entopts map[string]any) core.ApicurioRegistryEntity {
		return entity.NewArtifactRuleEntity(client, entopts)
	}
	core.NewArtifactTypeEntityFunc = func(client *core.ApicurioRegistrySDK, entopts map[string]any) core.ApicurioRegistryEntity {
		return entity.NewArtifactTypeEntity(client, entopts)
	}
	core.NewBranchEntityFunc = func(client *core.ApicurioRegistrySDK, entopts map[string]any) core.ApicurioRegistryEntity {
		return entity.NewBranchEntity(client, entopts)
	}
	core.NewCommentEntityFunc = func(client *core.ApicurioRegistrySDK, entopts map[string]any) core.ApicurioRegistryEntity {
		return entity.NewCommentEntity(client, entopts)
	}
	core.NewConfigurationPropertyEntityFunc = func(client *core.ApicurioRegistrySDK, entopts map[string]any) core.ApicurioRegistryEntity {
		return entity.NewConfigurationPropertyEntity(client, entopts)
	}
	core.NewConsumerVersionHeatmapEntityFunc = func(client *core.ApicurioRegistrySDK, entopts map[string]any) core.ApicurioRegistryEntity {
		return entity.NewConsumerVersionHeatmapEntity(client, entopts)
	}
	core.NewContentEntityFunc = func(client *core.ApicurioRegistrySDK, entopts map[string]any) core.ApicurioRegistryEntity {
		return entity.NewContentEntity(client, entopts)
	}
	core.NewContractEntityFunc = func(client *core.ApicurioRegistrySDK, entopts map[string]any) core.ApicurioRegistryEntity {
		return entity.NewContractEntity(client, entopts)
	}
	core.NewContractRuleEntityFunc = func(client *core.ApicurioRegistrySDK, entopts map[string]any) core.ApicurioRegistryEntity {
		return entity.NewContractRuleEntity(client, entopts)
	}
	core.NewContractRuleSetEntityFunc = func(client *core.ApicurioRegistrySDK, entopts map[string]any) core.ApicurioRegistryEntity {
		return entity.NewContractRuleSetEntity(client, entopts)
	}
	core.NewCreateArtifactEntityFunc = func(client *core.ApicurioRegistrySDK, entopts map[string]any) core.ApicurioRegistryEntity {
		return entity.NewCreateArtifactEntity(client, entopts)
	}
	core.NewDeprecationReadinessEntityFunc = func(client *core.ApicurioRegistrySDK, entopts map[string]any) core.ApicurioRegistryEntity {
		return entity.NewDeprecationReadinessEntity(client, entopts)
	}
	core.NewDownloadRefEntityFunc = func(client *core.ApicurioRegistrySDK, entopts map[string]any) core.ApicurioRegistryEntity {
		return entity.NewDownloadRefEntity(client, entopts)
	}
	core.NewGitOpEntityFunc = func(client *core.ApicurioRegistrySDK, entopts map[string]any) core.ApicurioRegistryEntity {
		return entity.NewGitOpEntity(client, entopts)
	}
	core.NewGitOpsStatusEntityFunc = func(client *core.ApicurioRegistrySDK, entopts map[string]any) core.ApicurioRegistryEntity {
		return entity.NewGitOpsStatusEntity(client, entopts)
	}
	core.NewGitOpsValidateTaskEntityFunc = func(client *core.ApicurioRegistrySDK, entopts map[string]any) core.ApicurioRegistryEntity {
		return entity.NewGitOpsValidateTaskEntity(client, entopts)
	}
	core.NewGlobalRuleEntityFunc = func(client *core.ApicurioRegistrySDK, entopts map[string]any) core.ApicurioRegistryEntity {
		return entity.NewGlobalRuleEntity(client, entopts)
	}
	core.NewGroupEntityFunc = func(client *core.ApicurioRegistrySDK, entopts map[string]any) core.ApicurioRegistryEntity {
		return entity.NewGroupEntity(client, entopts)
	}
	core.NewGroupRuleEntityFunc = func(client *core.ApicurioRegistrySDK, entopts map[string]any) core.ApicurioRegistryEntity {
		return entity.NewGroupRuleEntity(client, entopts)
	}
	core.NewKafkaSqlEntityFunc = func(client *core.ApicurioRegistrySDK, entopts map[string]any) core.ApicurioRegistryEntity {
		return entity.NewKafkaSqlEntity(client, entopts)
	}
	core.NewMetadataEntityFunc = func(client *core.ApicurioRegistrySDK, entopts map[string]any) core.ApicurioRegistryEntity {
		return entity.NewMetadataEntity(client, entopts)
	}
	core.NewOdcsContractResultEntityFunc = func(client *core.ApicurioRegistrySDK, entopts map[string]any) core.ApicurioRegistryEntity {
		return entity.NewOdcsContractResultEntity(client, entopts)
	}
	core.NewOdcsContractSummaryEntityFunc = func(client *core.ApicurioRegistrySDK, entopts map[string]any) core.ApicurioRegistryEntity {
		return entity.NewOdcsContractSummaryEntity(client, entopts)
	}
	core.NewReferenceGraphEntityFunc = func(client *core.ApicurioRegistrySDK, entopts map[string]any) core.ApicurioRegistryEntity {
		return entity.NewReferenceGraphEntity(client, entopts)
	}
	core.NewRoleMappingEntityFunc = func(client *core.ApicurioRegistrySDK, entopts map[string]any) core.ApicurioRegistryEntity {
		return entity.NewRoleMappingEntity(client, entopts)
	}
	core.NewRuleEntityFunc = func(client *core.ApicurioRegistrySDK, entopts map[string]any) core.ApicurioRegistryEntity {
		return entity.NewRuleEntity(client, entopts)
	}
	core.NewSearchedBranchEntityFunc = func(client *core.ApicurioRegistrySDK, entopts map[string]any) core.ApicurioRegistryEntity {
		return entity.NewSearchedBranchEntity(client, entopts)
	}
	core.NewSearchedGroupEntityFunc = func(client *core.ApicurioRegistrySDK, entopts map[string]any) core.ApicurioRegistryEntity {
		return entity.NewSearchedGroupEntity(client, entopts)
	}
	core.NewSystemInfoEntityFunc = func(client *core.ApicurioRegistrySDK, entopts map[string]any) core.ApicurioRegistryEntity {
		return entity.NewSystemInfoEntity(client, entopts)
	}
	core.NewUsageSummaryEntityFunc = func(client *core.ApicurioRegistrySDK, entopts map[string]any) core.ApicurioRegistryEntity {
		return entity.NewUsageSummaryEntity(client, entopts)
	}
	core.NewUserInfoEntityFunc = func(client *core.ApicurioRegistrySDK, entopts map[string]any) core.ApicurioRegistryEntity {
		return entity.NewUserInfoEntity(client, entopts)
	}
	core.NewUserInterfaceConfigEntityFunc = func(client *core.ApicurioRegistrySDK, entopts map[string]any) core.ApicurioRegistryEntity {
		return entity.NewUserInterfaceConfigEntity(client, entopts)
	}
	core.NewVersionEntityFunc = func(client *core.ApicurioRegistrySDK, entopts map[string]any) core.ApicurioRegistryEntity {
		return entity.NewVersionEntity(client, entopts)
	}
	core.NewWellKnownEntityFunc = func(client *core.ApicurioRegistrySDK, entopts map[string]any) core.ApicurioRegistryEntity {
		return entity.NewWellKnownEntity(client, entopts)
	}
	core.NewWrappedVersionStateEntityFunc = func(client *core.ApicurioRegistrySDK, entopts map[string]any) core.ApicurioRegistryEntity {
		return entity.NewWrappedVersionStateEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewApicurioRegistrySDK = core.NewApicurioRegistrySDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewApicurioRegistrySDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *ApicurioRegistrySDK  { return NewApicurioRegistrySDK(nil) }
func Test() *ApicurioRegistrySDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewDebugFeature = feature.NewDebugFeature
var NewIdempotencyFeature = feature.NewIdempotencyFeature
var NewMetricsFeature = feature.NewMetricsFeature
var NewPagingFeature = feature.NewPagingFeature
var NewRatelimitFeature = feature.NewRatelimitFeature
var NewRetryFeature = feature.NewRetryFeature
var NewTestFeature = feature.NewTestFeature
var NewTimeoutFeature = feature.NewTimeoutFeature
