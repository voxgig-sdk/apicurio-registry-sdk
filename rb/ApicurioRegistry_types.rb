# frozen_string_literal: true

# Typed models for the ApicurioRegistry SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Admin entity data model.
#
# @!attribute [rw] role
#   @return [String]
#
# @!attribute [rw] value
#   @return [String]
Admin = Struct.new(
  :role,
  :value,
  keyword_init: true
)

# Request payload for Admin#create.
#
# @!attribute [rw] require_empty_registry
#   @return [Boolean, nil]
#
# @!attribute [rw] role
#   @return [String]
#
# @!attribute [rw] value
#   @return [String]
AdminCreateData = Struct.new(
  :require_empty_registry,
  :role,
  :value,
  keyword_init: true
)

# Request payload for Admin#update.
#
# @!attribute [rw] principal_id
#   @return [String]
#
# @!attribute [rw] role
#   @return [String, nil]
#
# @!attribute [rw] value
#   @return [String, nil]
AdminUpdateData = Struct.new(
  :principal_id,
  :role,
  :value,
  keyword_init: true
)

# Request payload for Admin#remove.
#
# @!attribute [rw] principal_id
#   @return [String]
AdminRemoveMatch = Struct.new(
  :principal_id,
  keyword_init: true
)

# Agent entity data model.
#
# @!attribute [rw] capabilities
#   @return [Hash, nil]
#
# @!attribute [rw] defaultInputModes
#   @return [Array, nil]
#
# @!attribute [rw] defaultOutputModes
#   @return [Array, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] documentationUrl
#   @return [String, nil]
#
# @!attribute [rw] iconUrl
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] protocolVersion
#   @return [String, nil]
#
# @!attribute [rw] provider
#   @return [Hash, nil]
#
# @!attribute [rw] securityRequirements
#   @return [Array, nil]
#
# @!attribute [rw] securitySchemes
#   @return [Hash, nil]
#
# @!attribute [rw] signatures
#   @return [Array, nil]
#
# @!attribute [rw] skills
#   @return [Array, nil]
#
# @!attribute [rw] supportedInterfaces
#   @return [Array, nil]
#
# @!attribute [rw] version
#   @return [String, nil]
Agent = Struct.new(
  :capabilities,
  :defaultInputModes,
  :defaultOutputModes,
  :description,
  :documentationUrl,
  :iconUrl,
  :name,
  :protocolVersion,
  :provider,
  :securityRequirements,
  :securitySchemes,
  :signatures,
  :skills,
  :supportedInterfaces,
  :version,
  keyword_init: true
)

# Request payload for Agent#list.
#
# @!attribute [rw] capabilities
#   @return [Hash, nil]
#
# @!attribute [rw] defaultInputModes
#   @return [Array, nil]
#
# @!attribute [rw] defaultOutputModes
#   @return [Array, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] documentationUrl
#   @return [String, nil]
#
# @!attribute [rw] iconUrl
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] protocolVersion
#   @return [String, nil]
#
# @!attribute [rw] provider
#   @return [Hash, nil]
#
# @!attribute [rw] securityRequirements
#   @return [Array, nil]
#
# @!attribute [rw] securitySchemes
#   @return [Hash, nil]
#
# @!attribute [rw] signatures
#   @return [Array, nil]
#
# @!attribute [rw] skills
#   @return [Array, nil]
#
# @!attribute [rw] supportedInterfaces
#   @return [Array, nil]
#
# @!attribute [rw] version
#   @return [String, nil]
AgentListMatch = Struct.new(
  :capabilities,
  :defaultInputModes,
  :defaultOutputModes,
  :description,
  :documentationUrl,
  :iconUrl,
  :name,
  :protocolVersion,
  :provider,
  :securityRequirements,
  :securitySchemes,
  :signatures,
  :skills,
  :supportedInterfaces,
  :version,
  keyword_init: true
)

# AgentCard entity data model.
#
# @!attribute [rw] capabilities
#   @return [Hash, nil]
#
# @!attribute [rw] defaultInputModes
#   @return [Array, nil]
#
# @!attribute [rw] defaultOutputModes
#   @return [Array, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] documentationUrl
#   @return [String, nil]
#
# @!attribute [rw] iconUrl
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] protocolVersion
#   @return [String, nil]
#
# @!attribute [rw] provider
#   @return [Hash, nil]
#
# @!attribute [rw] securityRequirements
#   @return [Array, nil]
#
# @!attribute [rw] securitySchemes
#   @return [Hash, nil]
#
# @!attribute [rw] signatures
#   @return [Array, nil]
#
# @!attribute [rw] skills
#   @return [Array, nil]
#
# @!attribute [rw] supportedInterfaces
#   @return [Array, nil]
#
# @!attribute [rw] version
#   @return [String, nil]
AgentCard = Struct.new(
  :capabilities,
  :defaultInputModes,
  :defaultOutputModes,
  :description,
  :documentationUrl,
  :iconUrl,
  :name,
  :protocolVersion,
  :provider,
  :securityRequirements,
  :securitySchemes,
  :signatures,
  :skills,
  :supportedInterfaces,
  :version,
  keyword_init: true
)

# Request payload for AgentCard#list.
#
# @!attribute [rw] capabilities
#   @return [Hash, nil]
#
# @!attribute [rw] defaultInputModes
#   @return [Array, nil]
#
# @!attribute [rw] defaultOutputModes
#   @return [Array, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] documentationUrl
#   @return [String, nil]
#
# @!attribute [rw] iconUrl
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] protocolVersion
#   @return [String, nil]
#
# @!attribute [rw] provider
#   @return [Hash, nil]
#
# @!attribute [rw] securityRequirements
#   @return [Array, nil]
#
# @!attribute [rw] securitySchemes
#   @return [Hash, nil]
#
# @!attribute [rw] signatures
#   @return [Array, nil]
#
# @!attribute [rw] skills
#   @return [Array, nil]
#
# @!attribute [rw] supportedInterfaces
#   @return [Array, nil]
#
# @!attribute [rw] version
#   @return [String, nil]
AgentCardListMatch = Struct.new(
  :capabilities,
  :defaultInputModes,
  :defaultOutputModes,
  :description,
  :documentationUrl,
  :iconUrl,
  :name,
  :protocolVersion,
  :provider,
  :securityRequirements,
  :securitySchemes,
  :signatures,
  :skills,
  :supportedInterfaces,
  :version,
  keyword_init: true
)

# AiCatalog entity data model.
#
# @!attribute [rw] capabilities
#   @return [Array, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] displayName
#   @return [String, nil]
#
# @!attribute [rw] identifier
#   @return [String]
#
# @!attribute [rw] representativeQueries
#   @return [Array, nil]
#
# @!attribute [rw] tags
#   @return [Array, nil]
#
# @!attribute [rw] type
#   @return [String]
#
# @!attribute [rw] updatedAt
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
#
# @!attribute [rw] version
#   @return [String, nil]
AiCatalog = Struct.new(
  :capabilities,
  :description,
  :displayName,
  :identifier,
  :representativeQueries,
  :tags,
  :type,
  :updatedAt,
  :url,
  :version,
  keyword_init: true
)

# Request payload for AiCatalog#list.
#
# @!attribute [rw] capabilities
#   @return [Array, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] displayName
#   @return [String, nil]
#
# @!attribute [rw] identifier
#   @return [String, nil]
#
# @!attribute [rw] representativeQueries
#   @return [Array, nil]
#
# @!attribute [rw] tags
#   @return [Array, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] updatedAt
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
#
# @!attribute [rw] version
#   @return [String, nil]
AiCatalogListMatch = Struct.new(
  :capabilities,
  :description,
  :displayName,
  :identifier,
  :representativeQueries,
  :tags,
  :type,
  :updatedAt,
  :url,
  :version,
  keyword_init: true
)

# ArdExplore entity data model.
#
# @!attribute [rw] facets
#   @return [Hash, nil]
#
# @!attribute [rw] query
#   @return [Hash, nil]
#
# @!attribute [rw] resultType
#   @return [String, nil]
ArdExplore = Struct.new(
  :facets,
  :query,
  :resultType,
  keyword_init: true
)

# Request payload for ArdExplore#create.
#
# @!attribute [rw] facets
#   @return [Hash, nil]
#
# @!attribute [rw] query
#   @return [Hash, nil]
#
# @!attribute [rw] resultType
#   @return [String, nil]
ArdExploreCreateData = Struct.new(
  :facets,
  :query,
  :resultType,
  keyword_init: true
)

# ArdSearch entity data model.
#
# @!attribute [rw] federation
#   @return [String, nil]
#
# @!attribute [rw] pageSize
#   @return [Integer, nil]
#
# @!attribute [rw] pageToken
#   @return [String, nil]
#
# @!attribute [rw] query
#   @return [Hash]
#
# @!attribute [rw] results
#   @return [Array]
ArdSearch = Struct.new(
  :federation,
  :pageSize,
  :pageToken,
  :query,
  :results,
  keyword_init: true
)

# Request payload for ArdSearch#create.
#
# @!attribute [rw] federation
#   @return [String, nil]
#
# @!attribute [rw] pageSize
#   @return [Integer, nil]
#
# @!attribute [rw] pageToken
#   @return [String, nil]
#
# @!attribute [rw] query
#   @return [Hash]
#
# @!attribute [rw] results
#   @return [Array]
ArdSearchCreateData = Struct.new(
  :federation,
  :pageSize,
  :pageToken,
  :query,
  :results,
  keyword_init: true
)

# Artifact entity data model.
#
# @!attribute [rw] artifactId
#   @return [String]
#
# @!attribute [rw] artifactType
#   @return [String]
#
# @!attribute [rw] artifacts
#   @return [Array]
#
# @!attribute [rw] count
#   @return [Integer]
#
# @!attribute [rw] createdOn
#   @return [String]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] groupId
#   @return [String]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] labels
#   @return [Hash, nil]
#
# @!attribute [rw] modifiedBy
#   @return [String]
#
# @!attribute [rw] modifiedOn
#   @return [String]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] owner
#   @return [String]
#
# @!attribute [rw] versions
#   @return [Array]
Artifact = Struct.new(
  :artifactId,
  :artifactType,
  :artifacts,
  :count,
  :createdOn,
  :description,
  :groupId,
  :id,
  :labels,
  :modifiedBy,
  :modifiedOn,
  :name,
  :owner,
  :versions,
  keyword_init: true
)

# Request payload for Artifact#load.
#
# @!attribute [rw] global_id
#   @return [Integer]
#
# @!attribute [rw] reference
#   @return [String, nil]
#
# @!attribute [rw] return_artifact_type
#   @return [Boolean, nil]
ArtifactLoadMatch = Struct.new(
  :global_id,
  :reference,
  :return_artifact_type,
  keyword_init: true
)

# Request payload for Artifact#list.
#
# @!attribute [rw] artifact_id
#   @return [String, nil]
#
# @!attribute [rw] artifact_type
#   @return [String, nil]
#
# @!attribute [rw] content_id
#   @return [Integer, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] global_id
#   @return [Integer, nil]
#
# @!attribute [rw] group_id
#   @return [String, nil]
#
# @!attribute [rw] label
#   @return [Array, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] offset
#   @return [Integer, nil]
#
# @!attribute [rw] order
#   @return [String, nil]
#
# @!attribute [rw] orderby
#   @return [String, nil]
#
# @!attribute [rw] skip_count
#   @return [Boolean, nil]
ArtifactListMatch = Struct.new(
  :artifact_id,
  :artifact_type,
  :content_id,
  :description,
  :global_id,
  :group_id,
  :label,
  :limit,
  :name,
  :offset,
  :order,
  :orderby,
  :skip_count,
  keyword_init: true
)

# Request payload for Artifact#create.
#
# @!attribute [rw] artifact_type
#   @return [String, nil]
#
# @!attribute [rw] canonical
#   @return [Boolean, nil]
#
# @!attribute [rw] group_id
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] offset
#   @return [Integer, nil]
#
# @!attribute [rw] order
#   @return [String, nil]
#
# @!attribute [rw] orderby
#   @return [String, nil]
#
# @!attribute [rw] skip_count
#   @return [Boolean, nil]
#
# @!attribute [rw] artifactId
#   @return [String]
#
# @!attribute [rw] artifactType
#   @return [String]
#
# @!attribute [rw] artifacts
#   @return [Array]
#
# @!attribute [rw] count
#   @return [Integer]
#
# @!attribute [rw] createdOn
#   @return [String]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] groupId
#   @return [String]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] labels
#   @return [Hash, nil]
#
# @!attribute [rw] modifiedBy
#   @return [String]
#
# @!attribute [rw] modifiedOn
#   @return [String]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] owner
#   @return [String]
#
# @!attribute [rw] versions
#   @return [Array]
ArtifactCreateData = Struct.new(
  :artifact_type,
  :canonical,
  :group_id,
  :limit,
  :offset,
  :order,
  :orderby,
  :skip_count,
  :artifactId,
  :artifactType,
  :artifacts,
  :count,
  :createdOn,
  :description,
  :groupId,
  :id,
  :labels,
  :modifiedBy,
  :modifiedOn,
  :name,
  :owner,
  :versions,
  keyword_init: true
)

# Request payload for Artifact#remove.
#
# @!attribute [rw] group_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String, nil]
ArtifactRemoveMatch = Struct.new(
  :group_id,
  :id,
  keyword_init: true
)

# ArtifactReference entity data model.
#
# @!attribute [rw] artifactId
#   @return [String]
#
# @!attribute [rw] content
#   @return [String]
#
# @!attribute [rw] contentType
#   @return [String]
#
# @!attribute [rw] encoding
#   @return [String, nil]
#
# @!attribute [rw] groupId
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] references
#   @return [Array, nil]
#
# @!attribute [rw] version
#   @return [String, nil]
ArtifactReference = Struct.new(
  :artifactId,
  :content,
  :contentType,
  :encoding,
  :groupId,
  :name,
  :references,
  :version,
  keyword_init: true
)

# Request payload for ArtifactReference#list.
#
# @!attribute [rw] global_id_id
#   @return [Integer]
#
# @!attribute [rw] ref_type
#   @return [String, nil]
ArtifactReferenceListMatch = Struct.new(
  :global_id_id,
  :ref_type,
  keyword_init: true
)

# Request payload for ArtifactReference#create.
#
# @!attribute [rw] artifact_type
#   @return [String, nil]
#
# @!attribute [rw] artifactId
#   @return [String]
#
# @!attribute [rw] content
#   @return [String]
#
# @!attribute [rw] contentType
#   @return [String]
#
# @!attribute [rw] encoding
#   @return [String, nil]
#
# @!attribute [rw] groupId
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] references
#   @return [Array, nil]
#
# @!attribute [rw] version
#   @return [String, nil]
ArtifactReferenceCreateData = Struct.new(
  :artifact_type,
  :artifactId,
  :content,
  :contentType,
  :encoding,
  :groupId,
  :name,
  :references,
  :version,
  keyword_init: true
)

# ArtifactRule entity data model.
#
# @!attribute [rw] config
#   @return [String]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] ruleType
#   @return [String, nil]
ArtifactRule = Struct.new(
  :config,
  :id,
  :ruleType,
  keyword_init: true
)

# Request payload for ArtifactRule#create.
#
# @!attribute [rw] group_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] config
#   @return [String]
#
# @!attribute [rw] ruleType
#   @return [String, nil]
ArtifactRuleCreateData = Struct.new(
  :group_id,
  :id,
  :config,
  :ruleType,
  keyword_init: true
)

# Request payload for ArtifactRule#remove.
#
# @!attribute [rw] artifact_id
#   @return [String, nil]
#
# @!attribute [rw] group_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
ArtifactRuleRemoveMatch = Struct.new(
  :artifact_id,
  :group_id,
  :id,
  keyword_init: true
)

# ArtifactType entity data model.
#
# @!attribute [rw] name
#   @return [String, nil]
ArtifactType = Struct.new(
  :name,
  keyword_init: true
)

# Request payload for ArtifactType#list.
#
# @!attribute [rw] name
#   @return [String, nil]
ArtifactTypeListMatch = Struct.new(
  :name,
  keyword_init: true
)

# Branch entity data model.
#
# @!attribute [rw] artifactId
#   @return [String]
#
# @!attribute [rw] branchId
#   @return [String]
#
# @!attribute [rw] createdOn
#   @return [String]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] groupId
#   @return [String]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] modifiedBy
#   @return [String]
#
# @!attribute [rw] modifiedOn
#   @return [String]
#
# @!attribute [rw] owner
#   @return [String]
#
# @!attribute [rw] systemDefined
#   @return [Boolean]
#
# @!attribute [rw] versions
#   @return [Array, nil]
Branch = Struct.new(
  :artifactId,
  :branchId,
  :createdOn,
  :description,
  :groupId,
  :id,
  :modifiedBy,
  :modifiedOn,
  :owner,
  :systemDefined,
  :versions,
  keyword_init: true
)

# Request payload for Branch#load.
#
# @!attribute [rw] artifact_id
#   @return [String]
#
# @!attribute [rw] group_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
BranchLoadMatch = Struct.new(
  :artifact_id,
  :group_id,
  :id,
  keyword_init: true
)

# Request payload for Branch#create.
#
# @!attribute [rw] artifact_id
#   @return [String]
#
# @!attribute [rw] group_id
#   @return [String]
#
# @!attribute [rw] artifactId
#   @return [String]
#
# @!attribute [rw] branchId
#   @return [String]
#
# @!attribute [rw] createdOn
#   @return [String]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] groupId
#   @return [String]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] modifiedBy
#   @return [String]
#
# @!attribute [rw] modifiedOn
#   @return [String]
#
# @!attribute [rw] owner
#   @return [String]
#
# @!attribute [rw] systemDefined
#   @return [Boolean]
#
# @!attribute [rw] versions
#   @return [Array, nil]
BranchCreateData = Struct.new(
  :artifact_id,
  :group_id,
  :artifactId,
  :branchId,
  :createdOn,
  :description,
  :groupId,
  :id,
  :modifiedBy,
  :modifiedOn,
  :owner,
  :systemDefined,
  :versions,
  keyword_init: true
)

# Request payload for Branch#update.
#
# @!attribute [rw] artifact_id
#   @return [String]
#
# @!attribute [rw] group_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] artifactId
#   @return [String, nil]
#
# @!attribute [rw] branchId
#   @return [String, nil]
#
# @!attribute [rw] createdOn
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] groupId
#   @return [String, nil]
#
# @!attribute [rw] modifiedBy
#   @return [String, nil]
#
# @!attribute [rw] modifiedOn
#   @return [String, nil]
#
# @!attribute [rw] owner
#   @return [String, nil]
#
# @!attribute [rw] systemDefined
#   @return [Boolean, nil]
#
# @!attribute [rw] versions
#   @return [Array, nil]
BranchUpdateData = Struct.new(
  :artifact_id,
  :group_id,
  :id,
  :artifactId,
  :branchId,
  :createdOn,
  :description,
  :groupId,
  :modifiedBy,
  :modifiedOn,
  :owner,
  :systemDefined,
  :versions,
  keyword_init: true
)

# Request payload for Branch#remove.
#
# @!attribute [rw] artifact_id
#   @return [String]
#
# @!attribute [rw] group_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
BranchRemoveMatch = Struct.new(
  :artifact_id,
  :group_id,
  :id,
  keyword_init: true
)

# Comment entity data model.
#
# @!attribute [rw] commentId
#   @return [String]
#
# @!attribute [rw] createdOn
#   @return [String]
#
# @!attribute [rw] owner
#   @return [String]
#
# @!attribute [rw] value
#   @return [String]
Comment = Struct.new(
  :commentId,
  :createdOn,
  :owner,
  :value,
  keyword_init: true
)

# Request payload for Comment#list.
#
# @!attribute [rw] artifact_id
#   @return [String]
#
# @!attribute [rw] group_id
#   @return [String]
#
# @!attribute [rw] version_expression
#   @return [String]
CommentListMatch = Struct.new(
  :artifact_id,
  :group_id,
  :version_expression,
  keyword_init: true
)

# Request payload for Comment#create.
#
# @!attribute [rw] artifact_id
#   @return [String]
#
# @!attribute [rw] group_id
#   @return [String]
#
# @!attribute [rw] version_expression
#   @return [String]
#
# @!attribute [rw] commentId
#   @return [String]
#
# @!attribute [rw] createdOn
#   @return [String]
#
# @!attribute [rw] owner
#   @return [String]
#
# @!attribute [rw] value
#   @return [String]
CommentCreateData = Struct.new(
  :artifact_id,
  :group_id,
  :version_expression,
  :commentId,
  :createdOn,
  :owner,
  :value,
  keyword_init: true
)

# ConfigurationProperty entity data model.
#
# @!attribute [rw] description
#   @return [String]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] label
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] type
#   @return [String]
#
# @!attribute [rw] value
#   @return [String]
ConfigurationProperty = Struct.new(
  :description,
  :id,
  :label,
  :name,
  :type,
  :value,
  keyword_init: true
)

# Request payload for ConfigurationProperty#load.
#
# @!attribute [rw] id
#   @return [String]
ConfigurationPropertyLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for ConfigurationProperty#list.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] label
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] value
#   @return [String, nil]
ConfigurationPropertyListMatch = Struct.new(
  :description,
  :id,
  :label,
  :name,
  :type,
  :value,
  keyword_init: true
)

# ConsumerVersionHeatmap entity data model.
#
# @!attribute [rw] clientId
#   @return [String]
#
# @!attribute [rw] driftAlert
#   @return [Boolean, nil]
#
# @!attribute [rw] versions
#   @return [Hash, nil]
#
# @!attribute [rw] versionsBehind
#   @return [Integer, nil]
ConsumerVersionHeatmap = Struct.new(
  :clientId,
  :driftAlert,
  :versions,
  :versionsBehind,
  keyword_init: true
)

# Request payload for ConsumerVersionHeatmap#list.
#
# @!attribute [rw] artifact_id
#   @return [String]
#
# @!attribute [rw] group_id
#   @return [String]
ConsumerVersionHeatmapListMatch = Struct.new(
  :artifact_id,
  :group_id,
  keyword_init: true
)

# Content entity data model.
class Content
end

# Request payload for Content#create.
#
# @!attribute [rw] artifact_type
#   @return [String]
ContentCreateData = Struct.new(
  :artifact_type,
  keyword_init: true
)

# Contract entity data model.
#
# @!attribute [rw] artifactId
#   @return [String]
#
# @!attribute [rw] artifactType
#   @return [String]
#
# @!attribute [rw] createdOn
#   @return [String]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] groupId
#   @return [String]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] labels
#   @return [Hash, nil]
#
# @!attribute [rw] modifiedBy
#   @return [String]
#
# @!attribute [rw] modifiedOn
#   @return [String]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] owner
#   @return [String]
Contract = Struct.new(
  :artifactId,
  :artifactType,
  :createdOn,
  :description,
  :groupId,
  :id,
  :labels,
  :modifiedBy,
  :modifiedOn,
  :name,
  :owner,
  keyword_init: true
)

# Request payload for Contract#load.
#
# @!attribute [rw] group_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
ContractLoadMatch = Struct.new(
  :group_id,
  :id,
  keyword_init: true
)

# Request payload for Contract#list.
#
# @!attribute [rw] compatibility_group
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] offset
#   @return [Integer, nil]
#
# @!attribute [rw] order
#   @return [String, nil]
#
# @!attribute [rw] orderby
#   @return [String, nil]
#
# @!attribute [rw] owner_team
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
ContractListMatch = Struct.new(
  :compatibility_group,
  :limit,
  :offset,
  :order,
  :orderby,
  :owner_team,
  :status,
  keyword_init: true
)

# Request payload for Contract#create.
#
# @!attribute [rw] artifact_id
#   @return [String]
#
# @!attribute [rw] group_id
#   @return [String]
#
# @!attribute [rw] version_id
#   @return [String, nil]
#
# @!attribute [rw] artifactId
#   @return [String]
#
# @!attribute [rw] artifactType
#   @return [String]
#
# @!attribute [rw] createdOn
#   @return [String]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] groupId
#   @return [String]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] labels
#   @return [Hash, nil]
#
# @!attribute [rw] modifiedBy
#   @return [String]
#
# @!attribute [rw] modifiedOn
#   @return [String]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] owner
#   @return [String]
ContractCreateData = Struct.new(
  :artifact_id,
  :group_id,
  :version_id,
  :artifactId,
  :artifactType,
  :createdOn,
  :description,
  :groupId,
  :id,
  :labels,
  :modifiedBy,
  :modifiedOn,
  :name,
  :owner,
  keyword_init: true
)

# Request payload for Contract#update.
#
# @!attribute [rw] artifact_id
#   @return [String]
#
# @!attribute [rw] group_id
#   @return [String]
#
# @!attribute [rw] artifactId
#   @return [String, nil]
#
# @!attribute [rw] artifactType
#   @return [String, nil]
#
# @!attribute [rw] createdOn
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] groupId
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] labels
#   @return [Hash, nil]
#
# @!attribute [rw] modifiedBy
#   @return [String, nil]
#
# @!attribute [rw] modifiedOn
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] owner
#   @return [String, nil]
ContractUpdateData = Struct.new(
  :artifact_id,
  :group_id,
  :artifactId,
  :artifactType,
  :createdOn,
  :description,
  :groupId,
  :id,
  :labels,
  :modifiedBy,
  :modifiedOn,
  :name,
  :owner,
  keyword_init: true
)

# Request payload for Contract#remove.
#
# @!attribute [rw] group_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
ContractRemoveMatch = Struct.new(
  :group_id,
  :id,
  keyword_init: true
)

# ContractRule entity data model.
#
# @!attribute [rw] artifactId
#   @return [String, nil]
#
# @!attribute [rw] globalId
#   @return [Integer, nil]
#
# @!attribute [rw] groupId
#   @return [String, nil]
#
# @!attribute [rw] rule
#   @return [Hash]
#
# @!attribute [rw] ruleCategory
#   @return [String, nil]
ContractRule = Struct.new(
  :artifactId,
  :globalId,
  :groupId,
  :rule,
  :ruleCategory,
  keyword_init: true
)

# Request payload for ContractRule#list.
#
# @!attribute [rw] tag
#   @return [String]
ContractRuleListMatch = Struct.new(
  :tag,
  keyword_init: true
)

# ContractRuleSet entity data model.
#
# @!attribute [rw] domainRules
#   @return [Array, nil]
#
# @!attribute [rw] migrationRules
#   @return [Array, nil]
ContractRuleSet = Struct.new(
  :domainRules,
  :migrationRules,
  keyword_init: true
)

# Request payload for ContractRuleSet#list.
#
# @!attribute [rw] domainRules
#   @return [Array, nil]
#
# @!attribute [rw] migrationRules
#   @return [Array, nil]
ContractRuleSetListMatch = Struct.new(
  :domainRules,
  :migrationRules,
  keyword_init: true
)

# Request payload for ContractRuleSet#update.
#
# @!attribute [rw] domainRules
#   @return [Array, nil]
#
# @!attribute [rw] migrationRules
#   @return [Array, nil]
ContractRuleSetUpdateData = Struct.new(
  :domainRules,
  :migrationRules,
  keyword_init: true
)

# CreateArtifact entity data model.
#
# @!attribute [rw] artifact
#   @return [Hash]
#
# @!attribute [rw] artifactId
#   @return [String]
#
# @!attribute [rw] artifactType
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] firstVersion
#   @return [Hash]
#
# @!attribute [rw] labels
#   @return [Hash, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] version
#   @return [Hash]
CreateArtifact = Struct.new(
  :artifact,
  :artifactId,
  :artifactType,
  :description,
  :firstVersion,
  :labels,
  :name,
  :version,
  keyword_init: true
)

# Request payload for CreateArtifact#create.
#
# @!attribute [rw] group_id
#   @return [String]
#
# @!attribute [rw] canonical
#   @return [Boolean, nil]
#
# @!attribute [rw] dry_run
#   @return [Boolean, nil]
#
# @!attribute [rw] if_exist
#   @return [String, nil]
#
# @!attribute [rw] artifact
#   @return [Hash]
#
# @!attribute [rw] artifactId
#   @return [String]
#
# @!attribute [rw] artifactType
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] firstVersion
#   @return [Hash]
#
# @!attribute [rw] labels
#   @return [Hash, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] version
#   @return [Hash]
CreateArtifactCreateData = Struct.new(
  :group_id,
  :canonical,
  :dry_run,
  :if_exist,
  :artifact,
  :artifactId,
  :artifactType,
  :description,
  :firstVersion,
  :labels,
  :name,
  :version,
  keyword_init: true
)

# DeprecationReadiness entity data model.
#
# @!attribute [rw] clientId
#   @return [String, nil]
#
# @!attribute [rw] fetchCount
#   @return [Integer, nil]
#
# @!attribute [rw] lastFetched
#   @return [Integer, nil]
DeprecationReadiness = Struct.new(
  :clientId,
  :fetchCount,
  :lastFetched,
  keyword_init: true
)

# Request payload for DeprecationReadiness#list.
#
# @!attribute [rw] artifact_id
#   @return [String]
#
# @!attribute [rw] group_id
#   @return [String]
#
# @!attribute [rw] version_id
#   @return [String]
DeprecationReadinessListMatch = Struct.new(
  :artifact_id,
  :group_id,
  :version_id,
  keyword_init: true
)

# DownloadRef entity data model.
#
# @!attribute [rw] downloadId
#   @return [String]
#
# @!attribute [rw] href
#   @return [String, nil]
DownloadRef = Struct.new(
  :downloadId,
  :href,
  keyword_init: true
)

# Request payload for DownloadRef#load.
#
# @!attribute [rw] for_browser
#   @return [Boolean, nil]
#
# @!attribute [rw] group_id
#   @return [String, nil]
DownloadRefLoadMatch = Struct.new(
  :for_browser,
  :group_id,
  keyword_init: true
)

# GitOp entity data model.
class GitOp
end

# Request payload for GitOp#create.
class GitOpCreateData
end

# Request payload for GitOp#remove.
#
# @!attribute [rw] task_id
#   @return [String]
GitOpRemoveMatch = Struct.new(
  :task_id,
  keyword_init: true
)

# GitOpsStatus entity data model.
#
# @!attribute [rw] context
#   @return [String, nil]
#
# @!attribute [rw] detail
#   @return [String]
#
# @!attribute [rw] source
#   @return [String, nil]
GitOpsStatus = Struct.new(
  :context,
  :detail,
  :source,
  keyword_init: true
)

# Request payload for GitOpsStatus#list.
#
# @!attribute [rw] context
#   @return [String, nil]
#
# @!attribute [rw] detail
#   @return [String, nil]
#
# @!attribute [rw] source
#   @return [String, nil]
GitOpsStatusListMatch = Struct.new(
  :context,
  :detail,
  :source,
  keyword_init: true
)

# GitOpsValidateTask entity data model.
#
# @!attribute [rw] artifactCount
#   @return [Integer, nil]
#
# @!attribute [rw] completedAt
#   @return [String, nil]
#
# @!attribute [rw] createdAt
#   @return [String, nil]
#
# @!attribute [rw] errors
#   @return [Array, nil]
#
# @!attribute [rw] groupCount
#   @return [Integer, nil]
#
# @!attribute [rw] ref
#   @return [String, nil]
#
# @!attribute [rw] repoId
#   @return [String, nil]
#
# @!attribute [rw] result
#   @return [String, nil]
#
# @!attribute [rw] state
#   @return [String]
#
# @!attribute [rw] taskId
#   @return [String]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] versionCount
#   @return [Integer, nil]
GitOpsValidateTask = Struct.new(
  :artifactCount,
  :completedAt,
  :createdAt,
  :errors,
  :groupCount,
  :ref,
  :repoId,
  :result,
  :state,
  :taskId,
  :type,
  :versionCount,
  keyword_init: true
)

# Request payload for GitOpsValidateTask#load.
#
# @!attribute [rw] task_id
#   @return [String]
GitOpsValidateTaskLoadMatch = Struct.new(
  :task_id,
  keyword_init: true
)

# Request payload for GitOpsValidateTask#list.
#
# @!attribute [rw] artifactCount
#   @return [Integer, nil]
#
# @!attribute [rw] completedAt
#   @return [String, nil]
#
# @!attribute [rw] createdAt
#   @return [String, nil]
#
# @!attribute [rw] errors
#   @return [Array, nil]
#
# @!attribute [rw] groupCount
#   @return [Integer, nil]
#
# @!attribute [rw] ref
#   @return [String, nil]
#
# @!attribute [rw] repoId
#   @return [String, nil]
#
# @!attribute [rw] result
#   @return [String, nil]
#
# @!attribute [rw] state
#   @return [String, nil]
#
# @!attribute [rw] taskId
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] versionCount
#   @return [Integer, nil]
GitOpsValidateTaskListMatch = Struct.new(
  :artifactCount,
  :completedAt,
  :createdAt,
  :errors,
  :groupCount,
  :ref,
  :repoId,
  :result,
  :state,
  :taskId,
  :type,
  :versionCount,
  keyword_init: true
)

# Request payload for GitOpsValidateTask#create.
#
# @!attribute [rw] artifactCount
#   @return [Integer, nil]
#
# @!attribute [rw] completedAt
#   @return [String, nil]
#
# @!attribute [rw] createdAt
#   @return [String, nil]
#
# @!attribute [rw] errors
#   @return [Array, nil]
#
# @!attribute [rw] groupCount
#   @return [Integer, nil]
#
# @!attribute [rw] ref
#   @return [String, nil]
#
# @!attribute [rw] repoId
#   @return [String, nil]
#
# @!attribute [rw] result
#   @return [String, nil]
#
# @!attribute [rw] state
#   @return [String]
#
# @!attribute [rw] taskId
#   @return [String]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] versionCount
#   @return [Integer, nil]
GitOpsValidateTaskCreateData = Struct.new(
  :artifactCount,
  :completedAt,
  :createdAt,
  :errors,
  :groupCount,
  :ref,
  :repoId,
  :result,
  :state,
  :taskId,
  :type,
  :versionCount,
  keyword_init: true
)

# GlobalRule entity data model.
#
# @!attribute [rw] config
#   @return [String]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] ruleType
#   @return [String, nil]
GlobalRule = Struct.new(
  :config,
  :id,
  :ruleType,
  keyword_init: true
)

# Request payload for GlobalRule#list.
#
# @!attribute [rw] config
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] ruleType
#   @return [String, nil]
GlobalRuleListMatch = Struct.new(
  :config,
  :id,
  :ruleType,
  keyword_init: true
)

# Request payload for GlobalRule#create.
#
# @!attribute [rw] config
#   @return [String]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] ruleType
#   @return [String, nil]
GlobalRuleCreateData = Struct.new(
  :config,
  :id,
  :ruleType,
  keyword_init: true
)

# Request payload for GlobalRule#remove.
#
# @!attribute [rw] id
#   @return [String]
GlobalRuleRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

# Group entity data model.
#
# @!attribute [rw] createdOn
#   @return [String]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] groupId
#   @return [String]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] labels
#   @return [Hash, nil]
#
# @!attribute [rw] modifiedBy
#   @return [String]
#
# @!attribute [rw] modifiedOn
#   @return [String]
#
# @!attribute [rw] owner
#   @return [String]
Group = Struct.new(
  :createdOn,
  :description,
  :groupId,
  :id,
  :labels,
  :modifiedBy,
  :modifiedOn,
  :owner,
  keyword_init: true
)

# Request payload for Group#load.
#
# @!attribute [rw] id
#   @return [String]
GroupLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Group#list.
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] offset
#   @return [Integer, nil]
#
# @!attribute [rw] order
#   @return [String, nil]
#
# @!attribute [rw] orderby
#   @return [String, nil]
GroupListMatch = Struct.new(
  :limit,
  :offset,
  :order,
  :orderby,
  keyword_init: true
)

# Request payload for Group#create.
#
# @!attribute [rw] createdOn
#   @return [String]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] groupId
#   @return [String]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] labels
#   @return [Hash, nil]
#
# @!attribute [rw] modifiedBy
#   @return [String]
#
# @!attribute [rw] modifiedOn
#   @return [String]
#
# @!attribute [rw] owner
#   @return [String]
GroupCreateData = Struct.new(
  :createdOn,
  :description,
  :groupId,
  :id,
  :labels,
  :modifiedBy,
  :modifiedOn,
  :owner,
  keyword_init: true
)

# Request payload for Group#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] createdOn
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] groupId
#   @return [String, nil]
#
# @!attribute [rw] labels
#   @return [Hash, nil]
#
# @!attribute [rw] modifiedBy
#   @return [String, nil]
#
# @!attribute [rw] modifiedOn
#   @return [String, nil]
#
# @!attribute [rw] owner
#   @return [String, nil]
GroupUpdateData = Struct.new(
  :id,
  :createdOn,
  :description,
  :groupId,
  :labels,
  :modifiedBy,
  :modifiedOn,
  :owner,
  keyword_init: true
)

# Request payload for Group#remove.
#
# @!attribute [rw] id
#   @return [String]
GroupRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

# GroupRule entity data model.
#
# @!attribute [rw] config
#   @return [String]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] ruleType
#   @return [String, nil]
GroupRule = Struct.new(
  :config,
  :id,
  :ruleType,
  keyword_init: true
)

# Request payload for GroupRule#create.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] config
#   @return [String]
#
# @!attribute [rw] ruleType
#   @return [String, nil]
GroupRuleCreateData = Struct.new(
  :id,
  :config,
  :ruleType,
  keyword_init: true
)

# Request payload for GroupRule#remove.
#
# @!attribute [rw] group_id
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String]
GroupRuleRemoveMatch = Struct.new(
  :group_id,
  :id,
  keyword_init: true
)

# KafkaSql entity data model.
#
# @!attribute [rw] snapshotId
#   @return [String]
KafkaSql = Struct.new(
  :snapshotId,
  keyword_init: true
)

# Request payload for KafkaSql#create.
#
# @!attribute [rw] snapshotId
#   @return [String]
KafkaSqlCreateData = Struct.new(
  :snapshotId,
  keyword_init: true
)

# Metadata entity data model.
#
# @!attribute [rw] artifactId
#   @return [String]
#
# @!attribute [rw] artifactType
#   @return [String]
#
# @!attribute [rw] contentId
#   @return [Integer]
#
# @!attribute [rw] contractMetadata
#   @return [Hash, nil]
#
# @!attribute [rw] createdOn
#   @return [String]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] globalId
#   @return [Integer]
#
# @!attribute [rw] groupId
#   @return [String, nil]
#
# @!attribute [rw] labels
#   @return [Hash, nil]
#
# @!attribute [rw] modifiedBy
#   @return [String, nil]
#
# @!attribute [rw] modifiedOn
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] owner
#   @return [String]
#
# @!attribute [rw] state
#   @return [String, nil]
#
# @!attribute [rw] version
#   @return [String]
Metadata = Struct.new(
  :artifactId,
  :artifactType,
  :contentId,
  :contractMetadata,
  :createdOn,
  :description,
  :globalId,
  :groupId,
  :labels,
  :modifiedBy,
  :modifiedOn,
  :name,
  :owner,
  :state,
  :version,
  keyword_init: true
)

# Request payload for Metadata#load.
#
# @!attribute [rw] artifact_id
#   @return [String]
#
# @!attribute [rw] group_id
#   @return [String]
#
# @!attribute [rw] version_expression
#   @return [String, nil]
MetadataLoadMatch = Struct.new(
  :artifact_id,
  :group_id,
  :version_expression,
  keyword_init: true
)

# Request payload for Metadata#create.
#
# @!attribute [rw] artifact_id
#   @return [String]
#
# @!attribute [rw] group_id
#   @return [String]
#
# @!attribute [rw] version_expression
#   @return [String]
#
# @!attribute [rw] artifactId
#   @return [String]
#
# @!attribute [rw] artifactType
#   @return [String]
#
# @!attribute [rw] contentId
#   @return [Integer]
#
# @!attribute [rw] contractMetadata
#   @return [Hash, nil]
#
# @!attribute [rw] createdOn
#   @return [String]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] globalId
#   @return [Integer]
#
# @!attribute [rw] groupId
#   @return [String, nil]
#
# @!attribute [rw] labels
#   @return [Hash, nil]
#
# @!attribute [rw] modifiedBy
#   @return [String, nil]
#
# @!attribute [rw] modifiedOn
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] owner
#   @return [String]
#
# @!attribute [rw] state
#   @return [String, nil]
#
# @!attribute [rw] version
#   @return [String]
MetadataCreateData = Struct.new(
  :artifact_id,
  :group_id,
  :version_expression,
  :artifactId,
  :artifactType,
  :contentId,
  :contractMetadata,
  :createdOn,
  :description,
  :globalId,
  :groupId,
  :labels,
  :modifiedBy,
  :modifiedOn,
  :name,
  :owner,
  :state,
  :version,
  keyword_init: true
)

# Request payload for Metadata#update.
#
# @!attribute [rw] artifact_id
#   @return [String]
#
# @!attribute [rw] group_id
#   @return [String]
#
# @!attribute [rw] version_expression
#   @return [String, nil]
#
# @!attribute [rw] artifactId
#   @return [String, nil]
#
# @!attribute [rw] artifactType
#   @return [String, nil]
#
# @!attribute [rw] contentId
#   @return [Integer, nil]
#
# @!attribute [rw] contractMetadata
#   @return [Hash, nil]
#
# @!attribute [rw] createdOn
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] globalId
#   @return [Integer, nil]
#
# @!attribute [rw] groupId
#   @return [String, nil]
#
# @!attribute [rw] labels
#   @return [Hash, nil]
#
# @!attribute [rw] modifiedBy
#   @return [String, nil]
#
# @!attribute [rw] modifiedOn
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] owner
#   @return [String, nil]
#
# @!attribute [rw] state
#   @return [String, nil]
#
# @!attribute [rw] version
#   @return [String, nil]
MetadataUpdateData = Struct.new(
  :artifact_id,
  :group_id,
  :version_expression,
  :artifactId,
  :artifactType,
  :contentId,
  :contractMetadata,
  :createdOn,
  :description,
  :globalId,
  :groupId,
  :labels,
  :modifiedBy,
  :modifiedOn,
  :name,
  :owner,
  :state,
  :version,
  keyword_init: true
)

# OdcsContractResult entity data model.
#
# @!attribute [rw] contractId
#   @return [String, nil]
#
# @!attribute [rw] projection
#   @return [Hash, nil]
#
# @!attribute [rw] version
#   @return [String, nil]
OdcsContractResult = Struct.new(
  :contractId,
  :projection,
  :version,
  keyword_init: true
)

# Request payload for OdcsContractResult#create.
#
# @!attribute [rw] group_id
#   @return [String]
#
# @!attribute [rw] contractId
#   @return [String, nil]
#
# @!attribute [rw] projection
#   @return [Hash, nil]
#
# @!attribute [rw] version
#   @return [String, nil]
OdcsContractResultCreateData = Struct.new(
  :group_id,
  :contractId,
  :projection,
  :version,
  keyword_init: true
)

# Request payload for OdcsContractResult#update.
#
# @!attribute [rw] contract_id
#   @return [String]
#
# @!attribute [rw] group_id
#   @return [String]
#
# @!attribute [rw] contractId
#   @return [String, nil]
#
# @!attribute [rw] projection
#   @return [Hash, nil]
#
# @!attribute [rw] version
#   @return [String, nil]
OdcsContractResultUpdateData = Struct.new(
  :contract_id,
  :group_id,
  :contractId,
  :projection,
  :version,
  keyword_init: true
)

# OdcsContractSummary entity data model.
#
# @!attribute [rw] contractId
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
OdcsContractSummary = Struct.new(
  :contractId,
  :name,
  keyword_init: true
)

# Request payload for OdcsContractSummary#list.
#
# @!attribute [rw] group_id
#   @return [String]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] offset
#   @return [Integer, nil]
OdcsContractSummaryListMatch = Struct.new(
  :group_id,
  :limit,
  :offset,
  keyword_init: true
)

# ReferenceGraph entity data model.
#
# @!attribute [rw] edges
#   @return [Array]
#
# @!attribute [rw] metadata
#   @return [Hash]
#
# @!attribute [rw] nodes
#   @return [Array]
#
# @!attribute [rw] root
#   @return [Hash]
ReferenceGraph = Struct.new(
  :edges,
  :metadata,
  :nodes,
  :root,
  keyword_init: true
)

# Request payload for ReferenceGraph#list.
#
# @!attribute [rw] artifact_id
#   @return [String]
#
# @!attribute [rw] group_id
#   @return [String]
#
# @!attribute [rw] version_id
#   @return [String]
#
# @!attribute [rw] depth
#   @return [Integer, nil]
#
# @!attribute [rw] direction
#   @return [String, nil]
ReferenceGraphListMatch = Struct.new(
  :artifact_id,
  :group_id,
  :version_id,
  :depth,
  :direction,
  keyword_init: true
)

# RoleMapping entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] principalId
#   @return [String]
#
# @!attribute [rw] principalName
#   @return [String, nil]
#
# @!attribute [rw] role
#   @return [String]
RoleMapping = Struct.new(
  :id,
  :principalId,
  :principalName,
  :role,
  keyword_init: true
)

# Request payload for RoleMapping#load.
#
# @!attribute [rw] id
#   @return [String]
RoleMappingLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for RoleMapping#list.
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] offset
#   @return [Integer, nil]
RoleMappingListMatch = Struct.new(
  :limit,
  :offset,
  keyword_init: true
)

# Request payload for RoleMapping#create.
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] principalId
#   @return [String]
#
# @!attribute [rw] principalName
#   @return [String, nil]
#
# @!attribute [rw] role
#   @return [String]
RoleMappingCreateData = Struct.new(
  :id,
  :principalId,
  :principalName,
  :role,
  keyword_init: true
)

# Rule entity data model.
#
# @!attribute [rw] config
#   @return [String]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] ruleType
#   @return [String, nil]
Rule = Struct.new(
  :config,
  :id,
  :ruleType,
  keyword_init: true
)

# Request payload for Rule#load.
#
# @!attribute [rw] artifact_id
#   @return [String, nil]
#
# @!attribute [rw] group_id
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String]
RuleLoadMatch = Struct.new(
  :artifact_id,
  :group_id,
  :id,
  keyword_init: true
)

# Request payload for Rule#list.
#
# @!attribute [rw] artifact_id
#   @return [String, nil]
#
# @!attribute [rw] group_id
#   @return [String]
RuleListMatch = Struct.new(
  :artifact_id,
  :group_id,
  keyword_init: true
)

# Request payload for Rule#update.
#
# @!attribute [rw] artifact_id
#   @return [String, nil]
#
# @!attribute [rw] group_id
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] config
#   @return [String, nil]
#
# @!attribute [rw] ruleType
#   @return [String, nil]
RuleUpdateData = Struct.new(
  :artifact_id,
  :group_id,
  :id,
  :config,
  :ruleType,
  keyword_init: true
)

# SearchedBranch entity data model.
#
# @!attribute [rw] artifactId
#   @return [String]
#
# @!attribute [rw] branchId
#   @return [String]
#
# @!attribute [rw] createdOn
#   @return [String]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] groupId
#   @return [String]
#
# @!attribute [rw] modifiedBy
#   @return [String]
#
# @!attribute [rw] modifiedOn
#   @return [String]
#
# @!attribute [rw] owner
#   @return [String]
#
# @!attribute [rw] systemDefined
#   @return [Boolean]
SearchedBranch = Struct.new(
  :artifactId,
  :branchId,
  :createdOn,
  :description,
  :groupId,
  :modifiedBy,
  :modifiedOn,
  :owner,
  :systemDefined,
  keyword_init: true
)

# Request payload for SearchedBranch#list.
#
# @!attribute [rw] artifact_id
#   @return [String]
#
# @!attribute [rw] group_id
#   @return [String]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] offset
#   @return [Integer, nil]
SearchedBranchListMatch = Struct.new(
  :artifact_id,
  :group_id,
  :limit,
  :offset,
  keyword_init: true
)

# SearchedGroup entity data model.
#
# @!attribute [rw] createdOn
#   @return [String]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] groupId
#   @return [String]
#
# @!attribute [rw] labels
#   @return [Hash, nil]
#
# @!attribute [rw] modifiedBy
#   @return [String]
#
# @!attribute [rw] modifiedOn
#   @return [String]
#
# @!attribute [rw] owner
#   @return [String]
SearchedGroup = Struct.new(
  :createdOn,
  :description,
  :groupId,
  :labels,
  :modifiedBy,
  :modifiedOn,
  :owner,
  keyword_init: true
)

# Request payload for SearchedGroup#list.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] group_id
#   @return [String, nil]
#
# @!attribute [rw] label
#   @return [Array, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] offset
#   @return [Integer, nil]
#
# @!attribute [rw] order
#   @return [String, nil]
#
# @!attribute [rw] orderby
#   @return [String, nil]
SearchedGroupListMatch = Struct.new(
  :description,
  :group_id,
  :label,
  :limit,
  :offset,
  :order,
  :orderby,
  keyword_init: true
)

# SystemInfo entity data model.
#
# @!attribute [rw] builtOn
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] version
#   @return [String, nil]
SystemInfo = Struct.new(
  :builtOn,
  :description,
  :name,
  :version,
  keyword_init: true
)

# Request payload for SystemInfo#load.
#
# @!attribute [rw] builtOn
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] version
#   @return [String, nil]
SystemInfoLoadMatch = Struct.new(
  :builtOn,
  :description,
  :name,
  :version,
  keyword_init: true
)

# UsageSummary entity data model.
#
# @!attribute [rw] active
#   @return [Integer]
#
# @!attribute [rw] dead
#   @return [Integer]
#
# @!attribute [rw] stale
#   @return [Integer]
UsageSummary = Struct.new(
  :active,
  :dead,
  :stale,
  keyword_init: true
)

# Request payload for UsageSummary#load.
#
# @!attribute [rw] active
#   @return [Integer, nil]
#
# @!attribute [rw] dead
#   @return [Integer, nil]
#
# @!attribute [rw] stale
#   @return [Integer, nil]
UsageSummaryLoadMatch = Struct.new(
  :active,
  :dead,
  :stale,
  keyword_init: true
)

# UserInfo entity data model.
#
# @!attribute [rw] admin
#   @return [Boolean, nil]
#
# @!attribute [rw] developer
#   @return [Boolean, nil]
#
# @!attribute [rw] displayName
#   @return [String, nil]
#
# @!attribute [rw] username
#   @return [String, nil]
#
# @!attribute [rw] viewer
#   @return [Boolean, nil]
UserInfo = Struct.new(
  :admin,
  :developer,
  :displayName,
  :username,
  :viewer,
  keyword_init: true
)

# Request payload for UserInfo#load.
#
# @!attribute [rw] admin
#   @return [Boolean, nil]
#
# @!attribute [rw] developer
#   @return [Boolean, nil]
#
# @!attribute [rw] displayName
#   @return [String, nil]
#
# @!attribute [rw] username
#   @return [String, nil]
#
# @!attribute [rw] viewer
#   @return [Boolean, nil]
UserInfoLoadMatch = Struct.new(
  :admin,
  :developer,
  :displayName,
  :username,
  :viewer,
  keyword_init: true
)

# UserInterfaceConfig entity data model.
#
# @!attribute [rw] auth
#   @return [Hash]
#
# @!attribute [rw] features
#   @return [Hash, nil]
#
# @!attribute [rw] ui
#   @return [Hash, nil]
UserInterfaceConfig = Struct.new(
  :auth,
  :features,
  :ui,
  keyword_init: true
)

# Request payload for UserInterfaceConfig#load.
#
# @!attribute [rw] auth
#   @return [Hash, nil]
#
# @!attribute [rw] features
#   @return [Hash, nil]
#
# @!attribute [rw] ui
#   @return [Hash, nil]
UserInterfaceConfigLoadMatch = Struct.new(
  :auth,
  :features,
  :ui,
  keyword_init: true
)

# Version entity data model.
#
# @!attribute [rw] artifactId
#   @return [String]
#
# @!attribute [rw] artifactType
#   @return [String]
#
# @!attribute [rw] branches
#   @return [Array, nil]
#
# @!attribute [rw] content
#   @return [Hash]
#
# @!attribute [rw] contentId
#   @return [Integer]
#
# @!attribute [rw] count
#   @return [Integer]
#
# @!attribute [rw] createdOn
#   @return [String]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] globalId
#   @return [Integer]
#
# @!attribute [rw] groupId
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] isDraft
#   @return [Boolean, nil]
#
# @!attribute [rw] labels
#   @return [Hash, nil]
#
# @!attribute [rw] modifiedBy
#   @return [String, nil]
#
# @!attribute [rw] modifiedOn
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] owner
#   @return [String]
#
# @!attribute [rw] state
#   @return [String, nil]
#
# @!attribute [rw] value
#   @return [String]
#
# @!attribute [rw] version
#   @return [String]
#
# @!attribute [rw] versions
#   @return [Array]
Version = Struct.new(
  :artifactId,
  :artifactType,
  :branches,
  :content,
  :contentId,
  :count,
  :createdOn,
  :description,
  :globalId,
  :groupId,
  :id,
  :isDraft,
  :labels,
  :modifiedBy,
  :modifiedOn,
  :name,
  :owner,
  :state,
  :value,
  :version,
  :versions,
  keyword_init: true
)

# Request payload for Version#load.
#
# @!attribute [rw] artifact_id
#   @return [String]
#
# @!attribute [rw] group_id
#   @return [String]
#
# @!attribute [rw] version_expression
#   @return [String]
#
# @!attribute [rw] canonical
#   @return [Boolean, nil]
#
# @!attribute [rw] reference
#   @return [String, nil]
VersionLoadMatch = Struct.new(
  :artifact_id,
  :group_id,
  :version_expression,
  :canonical,
  :reference,
  keyword_init: true
)

# Request payload for Version#list.
#
# @!attribute [rw] artifact_id
#   @return [String, nil]
#
# @!attribute [rw] artifact_type
#   @return [String, nil]
#
# @!attribute [rw] content
#   @return [String, nil]
#
# @!attribute [rw] content_id
#   @return [Integer, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] global_id
#   @return [Integer, nil]
#
# @!attribute [rw] group_id
#   @return [String, nil]
#
# @!attribute [rw] label
#   @return [Array, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] offset
#   @return [Integer, nil]
#
# @!attribute [rw] order
#   @return [String, nil]
#
# @!attribute [rw] orderby
#   @return [String, nil]
#
# @!attribute [rw] skip_count
#   @return [Boolean, nil]
#
# @!attribute [rw] state
#   @return [String, nil]
#
# @!attribute [rw] structure
#   @return [String, nil]
#
# @!attribute [rw] version
#   @return [String, nil]
VersionListMatch = Struct.new(
  :artifact_id,
  :artifact_type,
  :content,
  :content_id,
  :description,
  :global_id,
  :group_id,
  :label,
  :limit,
  :name,
  :offset,
  :order,
  :orderby,
  :skip_count,
  :state,
  :structure,
  :version,
  keyword_init: true
)

# Request payload for Version#create.
#
# @!attribute [rw] artifact_id
#   @return [String, nil]
#
# @!attribute [rw] artifact_type
#   @return [String, nil]
#
# @!attribute [rw] canonical
#   @return [Boolean, nil]
#
# @!attribute [rw] group_id
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] offset
#   @return [Integer, nil]
#
# @!attribute [rw] order
#   @return [String, nil]
#
# @!attribute [rw] orderby
#   @return [String, nil]
#
# @!attribute [rw] skip_count
#   @return [Boolean, nil]
#
# @!attribute [rw] state
#   @return [String, nil]
#
# @!attribute [rw] artifactId
#   @return [String]
#
# @!attribute [rw] artifactType
#   @return [String]
#
# @!attribute [rw] branches
#   @return [Array, nil]
#
# @!attribute [rw] content
#   @return [Hash]
#
# @!attribute [rw] contentId
#   @return [Integer]
#
# @!attribute [rw] count
#   @return [Integer]
#
# @!attribute [rw] createdOn
#   @return [String]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] globalId
#   @return [Integer]
#
# @!attribute [rw] groupId
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] isDraft
#   @return [Boolean, nil]
#
# @!attribute [rw] labels
#   @return [Hash, nil]
#
# @!attribute [rw] modifiedBy
#   @return [String, nil]
#
# @!attribute [rw] modifiedOn
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] owner
#   @return [String]
#
# @!attribute [rw] value
#   @return [String]
#
# @!attribute [rw] version
#   @return [String]
#
# @!attribute [rw] versions
#   @return [Array]
VersionCreateData = Struct.new(
  :artifact_id,
  :artifact_type,
  :canonical,
  :group_id,
  :limit,
  :offset,
  :order,
  :orderby,
  :skip_count,
  :state,
  :artifactId,
  :artifactType,
  :branches,
  :content,
  :contentId,
  :count,
  :createdOn,
  :description,
  :globalId,
  :groupId,
  :id,
  :isDraft,
  :labels,
  :modifiedBy,
  :modifiedOn,
  :name,
  :owner,
  :value,
  :version,
  :versions,
  keyword_init: true
)

# Request payload for Version#update.
#
# @!attribute [rw] artifact_id
#   @return [String]
#
# @!attribute [rw] comment_id
#   @return [String]
#
# @!attribute [rw] group_id
#   @return [String]
#
# @!attribute [rw] version_id
#   @return [String]
#
# @!attribute [rw] artifactId
#   @return [String, nil]
#
# @!attribute [rw] artifactType
#   @return [String, nil]
#
# @!attribute [rw] branches
#   @return [Array, nil]
#
# @!attribute [rw] content
#   @return [Hash, nil]
#
# @!attribute [rw] contentId
#   @return [Integer, nil]
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] createdOn
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] globalId
#   @return [Integer, nil]
#
# @!attribute [rw] groupId
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] isDraft
#   @return [Boolean, nil]
#
# @!attribute [rw] labels
#   @return [Hash, nil]
#
# @!attribute [rw] modifiedBy
#   @return [String, nil]
#
# @!attribute [rw] modifiedOn
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] owner
#   @return [String, nil]
#
# @!attribute [rw] state
#   @return [String, nil]
#
# @!attribute [rw] value
#   @return [String, nil]
#
# @!attribute [rw] version
#   @return [String, nil]
#
# @!attribute [rw] versions
#   @return [Array, nil]
VersionUpdateData = Struct.new(
  :artifact_id,
  :comment_id,
  :group_id,
  :version_id,
  :artifactId,
  :artifactType,
  :branches,
  :content,
  :contentId,
  :count,
  :createdOn,
  :description,
  :globalId,
  :groupId,
  :id,
  :isDraft,
  :labels,
  :modifiedBy,
  :modifiedOn,
  :name,
  :owner,
  :state,
  :value,
  :version,
  :versions,
  keyword_init: true
)

# Request payload for Version#remove.
#
# @!attribute [rw] artifact_id
#   @return [String]
#
# @!attribute [rw] comment_id
#   @return [String, nil]
#
# @!attribute [rw] group_id
#   @return [String]
#
# @!attribute [rw] version_id
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
VersionRemoveMatch = Struct.new(
  :artifact_id,
  :comment_id,
  :group_id,
  :version_id,
  :id,
  keyword_init: true
)

# WellKnown entity data model.
#
# @!attribute [rw] artifactId
#   @return [String, nil]
#
# @!attribute [rw] capabilities
#   @return [Hash, nil]
#
# @!attribute [rw] createdOn
#   @return [Integer, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] groupId
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] owner
#   @return [String, nil]
#
# @!attribute [rw] parameters
#   @return [Array, nil]
#
# @!attribute [rw] skills
#   @return [Array, nil]
#
# @!attribute [rw] supportedInterfaces
#   @return [Array, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] version
#   @return [String, nil]
WellKnown = Struct.new(
  :artifactId,
  :capabilities,
  :createdOn,
  :description,
  :groupId,
  :id,
  :name,
  :owner,
  :parameters,
  :skills,
  :supportedInterfaces,
  :title,
  :version,
  keyword_init: true
)

# Request payload for WellKnown#load.
#
# @!attribute [rw] artifact_id
#   @return [String]
#
# @!attribute [rw] group_id
#   @return [String]
#
# @!attribute [rw] version
#   @return [String, nil]
WellKnownLoadMatch = Struct.new(
  :artifact_id,
  :group_id,
  :version,
  keyword_init: true
)

# Request payload for WellKnown#list.
#
# @!attribute [rw] capability
#   @return [Array, nil]
#
# @!attribute [rw] input_mode
#   @return [Array, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] offset
#   @return [Integer, nil]
#
# @!attribute [rw] output_mode
#   @return [Array, nil]
#
# @!attribute [rw] skill
#   @return [Array, nil]
WellKnownListMatch = Struct.new(
  :capability,
  :input_mode,
  :limit,
  :name,
  :offset,
  :output_mode,
  :skill,
  keyword_init: true
)

# WrappedVersionState entity data model.
#
# @!attribute [rw] state
#   @return [String]
WrappedVersionState = Struct.new(
  :state,
  keyword_init: true
)

# Request payload for WrappedVersionState#load.
#
# @!attribute [rw] artifact_id
#   @return [String]
#
# @!attribute [rw] group_id
#   @return [String]
#
# @!attribute [rw] version_expression
#   @return [String]
WrappedVersionStateLoadMatch = Struct.new(
  :artifact_id,
  :group_id,
  :version_expression,
  keyword_init: true
)

