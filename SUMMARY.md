# Apicurio Registry API [v3]

Apicurio Registry is a datastore for standard event schemas and API designs. Apicurio Registry enables developers to manage and share the structure of their data using a REST interface. For example, client applications can dynamically push or pull the latest updates to or from the registry without needing to redeploy. Apicurio Registry also enables developers to create rules that govern how registry content can evolve over time. For example, this includes rules for content validation and version compatibility. The Apicurio Registry REST API enables client applications to manage the artifacts in the registry. This API provides create, read, update, and delete operations for schema and API artifacts, rules, versions, and metadata. The supported artifact types include: - Apache Avro schema - AsyncAPI specification - Google protocol buffers - GraphQL schema - JSON Schema - Kafka Connect schema - OpenAPI specification - Web Services Description Language - XML Schema Definition **Important**: The Apicurio Registry REST API is available from `https://MY-REGISTRY-URL/apis/registry/v3` by default. Therefore you must prefix all API operation paths with `/apis/registry/v3` in this case. For example: `/apis/registry/v3/ids/globalIds/&#123;globalId&#125;`.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 44 entities and 132 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### [Admin](docs/api/admin.html)

Results: Indicates that the import was successful.; Returned when the role mapping was successfully created.; Response returned when the delete was successful.; The configuration property was deleted.; The global contract ruleset was deleted.; Response when the update is successful.; The configuration property was updated.

SDK operations: `create`, `remove`, `update`.

### [Agent](docs/api/agent.html)

Results: Agent search results.; The Agent Card.

SDK operations: `list`.

Key fields to recognise:

- `capabilities`: Capabilities of an A2A agent.
- `name`: The name of the error (typically a server exception class name).
- `provider`: Provider of an A2A agent.

### [AgentCard](docs/api/agent_card.html)

Results: The Agent Card.

SDK operations: `list`.

Key fields to recognise:

- `capabilities`: Capabilities of an A2A agent.
- `name`: The name of the error (typically a server exception class name).
- `provider`: Provider of an A2A agent.

### [AiCatalog](docs/api/ai_catalog.html)

Results: ARD agent listing.; The AI Catalog document.; The AI Catalog document (ARD v0.91 normative path).

SDK operations: `list`.

Key fields to recognise:

- `type`: A URI reference [RFC3986] that identifies the problem type.

### [ArdExplore](docs/api/ard_explore.html)

Results: ARD facet exploration results.

SDK operations: `create`.

Key fields to recognise:

- `query`: ARD search query.
- `resultType`: Requested result type for the ARD POST /explore endpoint.

### [ArdSearch](docs/api/ard_search.html)

Results: ARD search results.

SDK operations: `create`.

Key fields to recognise:

- `query`: ARD search query.

### [Artifact](docs/api/artifact.html)

Results: On a successful response, returns a result set of artifacts - one for each artifact in the registry that matches the criteria.; On a successful response, returns a bounded set of artifacts.; The content of one version of one artifact.; The artifact usage metrics.; Returned when the artifact was successfully deleted.; When the delete operation is successful, a simple 204 is returned.

SDK operations: `create`, `list`, `load`, `remove`.

Key fields to recognise:

- `artifacts`: The artifacts returned in the result set.
- `count`: The total number of artifacts that matched the query that produced the result set (may be more than the number of artifacts in the result set).
- `name`: The name of the error (typically a server exception class name).

### [ArtifactReference](docs/api/artifact_reference.html)

Results: List of references detected in the provided content. Each reference will have only the `name` field populated. The `name` value corresponds to the reference string found in the content (for example a JSON Schema `$ref` value, a Protobuf import path, or an Avro type name).; List of all the artifact references for this artifact.; A list containing all the references for the artifact with the given global id.; A list containing all the references for the artifact with the given content hash.; A list containing all the references for the artifact with the given content id.

SDK operations: `create`, `list`.

Key fields to recognise:

- `content`: Raw content of the artifact version or a valid (and accessible) URL where the content can be found.
- `contentType`: The content-type, such as `application/json` or `text/xml`.
- `encoding`: Optional encoding for the content property.
- `name`: The name of the error (typically a server exception class name).
- `references`: Collection of references to other artifacts.

### [ArtifactRule](docs/api/artifact_rule.html)

Results: The rule was added.; The rule was successfully deleted.; The rules were successfully deleted.

SDK operations: `create`, `remove`.

### [ArtifactType](docs/api/artifact_type.html)

Results: The list of available artifact types.

SDK operations: `list`.

Key fields to recognise:

- `name`: The name of the error (typically a server exception class name).

### [Branch](docs/api/branch.html)

Results: The version was successfully added to the branch.; Branch successfully created.; List of versions in an artifact branch.; Artifact branch was successfully deleted.; The list of versions was replaced successfully.

SDK operations: `create`, `load`, `remove`, `update`.

### [Comment](docs/api/comment.html)

Results: The comment was successfully created.; List of all the comments for this artifact.

SDK operations: `create`, `list`.

### [ConfigurationProperty](docs/api/configuration_property.html)

Results: On a successful response, returns a list of configuration properties.; The configuration property value.

SDK operations: `list`, `load`.

Key fields to recognise:

- `name`: The name of the error (typically a server exception class name).
- `type`: A URI reference [RFC3986] that identifies the problem type.

### [ConsumerVersionHeatmap](docs/api/consumer_version_heatmap.html)

Results: The consumer version heatmap.

SDK operations: `list`.

### [Content](docs/api/content.html)

Results: The content of one version of one artifact.

SDK operations: `create`.

### [Contract](docs/api/contract.html)

Results: The rule execution result.; The migration result.; The contract was promoted.; The updated contract metadata after the status transition.; A paginated list of artifacts that have contract metadata.; The audit log entries.; The compatibility group.; The quality score.; The reconstructed ODCS contract YAML.; The contract metadata for the artifact.; The ODCS contract YAML.; The contract ruleset was deleted.; The contract was deleted.; Compatibility group updated.; The updated contract metadata.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `name`: The name of the error (typically a server exception class name).

### [ContractRule](docs/api/contract_rule.html)

Results: A list of contract rules matching the specified tag, with their artifact coordinates.

SDK operations: `list`.

Key fields to recognise:

- `artifactId`: The artifact ID containing the rule.
- `globalId`: The global ID of the version (null for artifact-level rules).
- `groupId`: The group ID of the artifact containing the rule.
- `rule`: A single contract rule definition.
- `ruleCategory`: The rule category (DOMAIN or MIGRATION).

### [ContractRuleSet](docs/api/contract_rule_set.html)

Results: The contract ruleset for the version.; The contract ruleset for the artifact.; The global contract ruleset.; The updated contract ruleset.; The global contract ruleset was set.

SDK operations: `list`, `update`.

Key fields to recognise:

- `domainRules`: Rules for domain validation.
- `migrationRules`: Rules for version migration.

### [CreateArtifact](docs/api/create_artifact.html)

Results: Artifact was successfully created.

SDK operations: `create`.

Key fields to recognise:

- `name`: The name of the error (typically a server exception class name).
- `version`: A single version of an artifact. Can be provided by the client when creating a new version, or it can be server-generated. The value can be any string unique to the artifact, but it is recommended to use a simple integer or a semver value.

### [DeprecationReadiness](docs/api/deprecation_readiness.html)

Results: The deprecation readiness report.

SDK operations: `list`.

### [DownloadRef](docs/api/download_ref.html)

Results: Response when the export is successful.

SDK operations: `load`.

### [GitOp](docs/api/git_op.html)

Results: Synchronization has been requested. The sync will happen asynchronously on the next scheduler cycle.; Validation task created. Poll the task status to get the result.; Validation task deleted.

SDK operations: `create`, `remove`.

Key fields to recognise:

- `ref`: Git ref being validated.
- `repoId`: Repository ID being validated.
- `type`: A URI reference [RFC3986] that identifies the problem type.

### [GitOpsStatus](docs/api/git_ops_status.html)

Results: The current GitOps synchronization status.

SDK operations: `list`.

Key fields to recognise:

- `context`: The file path or location where the error occurred. Absent if the error is not file-specific.
- `detail`: A human-readable description of the error.
- `source`: The source ID (for example, repository ID) where the error occurred. Absent for global errors not tied to a specific source.

### [GitOpsValidateTask](docs/api/git_ops_validate_task.html)

Results: List of active validation tasks.; The validation task details and results.

SDK operations: `list`, `load`.

Key fields to recognise:

- `artifactCount`: Number of artifacts loaded during validation. Only present when state is `completed`.
- `completedAt`: ISO 8601 timestamp of when the task completed. Only present when state is `completed` or `failed`.
- `createdAt`: ISO 8601 timestamp of when the task was created.
- `errors`: Validation errors. Empty if validation passed.
- `groupCount`: Number of groups loaded during validation. Only present when state is `completed`.

### [GlobalRule](docs/api/global_rule.html)

Results: The global rule was added.; The global rule was successfully deleted.; All global rules have been removed successfully.

SDK operations: `create`, `remove`.

### [Group](docs/api/group.html)

Results: The group has been successfully created.; On a successful response, returns a bounded set of groups.; The group&#39;s metadata.; Empty content indicates a successful deletion.; Empty response when the metadata is successfully updated.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

### [GroupRule](docs/api/group_rule.html)

Results: The rule was added.; The rule was successfully deleted.; The rules were successfully deleted.

SDK operations: `create`, `remove`.

### [KafkaSql](docs/api/kafka_sql.html)

Results: The snapshot has been successfully triggered.

SDK operations: `create`.

### [McpTool](docs/api/mcp_tool.html)

Results: MCP tool search results.

SDK operations: `list`.

Key fields to recognise:

- `name`: The name of the error (typically a server exception class name).
- `title`: A short, human-readable summary of the problem type.

### [Metadata](docs/api/metadata.html)

Results: The rendered prompt template.; The artifact version&#39;s metadata.; The artifact&#39;s metadata.; The state was successfully updated.; The artifact version&#39;s metadata was successfully updated.; The artifact version content was successfully updated.; The artifact&#39;s metadata was updated.

SDK operations: `create`, `load`, `update`.

Key fields to recognise:

- `artifactId`: The artifact ID.
- `contractMetadata`: Contract metadata projected from the artifact labels. Only present when data contracts are enabled and contract labels exist.
- `groupId`: The group ID of the artifact.
- `name`: The name of the error (typically a server exception class name).
- `version`: The version of the artifact that was rendered.

### [OdcsContractResult](docs/api/odcs_contract_result.html)

Results: The contract was created (or updated if it already exists) and projected onto the referenced schema artifact.; The contract was updated and re-projected.

SDK operations: `create`, `update`.

Key fields to recognise:

- `labelsApplied`: Number of contract.* labels set on the schema artifact.
- `rulesApplied`: Number of CEL quality rules projected onto the schema artifact.
- `tagsApplied`: Number of field-tag.* labels set on the schema artifact version.
- `warnings`: Any warnings encountered during projection.

### [OdcsContractSummary](docs/api/odcs_contract_summary.html)

Results: List of ODCS contracts in the group.

SDK operations: `list`.

Key fields to recognise:

- `contractId`: The contract artifact ID.
- `name`: The contract display name.

### [ReferenceGraph](docs/api/reference_graph.html)

Results: A graph representation of all artifact references.

SDK operations: `list`.

Key fields to recognise:

- `edges`: All edges (references) in the graph.
- `metadata`: Metadata about the graph structure.
- `nodes`: All nodes in the graph, including the root.
- `root`: The root node of the graph (the artifact for which references were requested).

### [RoleMapping](docs/api/role_mapping.html)

Results: A successful response will return the list of role mappings.; When successful, returns the details of a role mapping.

SDK operations: `list`, `load`.

Key fields to recognise:

- `principalName`: A friendly name for the principal.

### [Rule](docs/api/rule.html)

Results: Returns the names of the rules configured for the artifact.; Returns the names of the rules configured for the group.; The list of names of the globally configured rules.; Information about a rule.; The global rule&#39;s configuration.; Rule configuration was updated.; The global rule&#39;s configuration was successfully updated.

SDK operations: `list`, `load`, `update`.

### [SearchedBranch](docs/api/searched_branch.html)

Results: List of all artifact versions.

SDK operations: `list`.

### [SearchedGroup](docs/api/searched_group.html)

Results: On a successful response, returns a result set of groups - one for each group in the registry that matches the criteria.

SDK operations: `list`.

### [SystemInfo](docs/api/system_info.html)

Results: On success, returns the system information.

SDK operations: `load`.

Key fields to recognise:

- `name`: The name of the error (typically a server exception class name).

### [UsageSummary](docs/api/usage_summary.html)

Results: The global usage summary.

SDK operations: `load`.

### [UserInfo](docs/api/user_info.html)

Results: Response when the endpoint is successfully invoked.

SDK operations: `load`.

### [UserInterfaceConfig](docs/api/user_interface_config.html)

Results: The UI config.

SDK operations: `load`.

### [Version](docs/api/version.html)

Results: On a successful response, returns a result set of versions - one for each version in the registry that matches the criteria.; The artifact version was successfully created.; List of all artifact versions.; The list of versions in the branch.; The content of one version of one artifact.; The Protobuf artifact and its dependencies exported as a ZIP file with package-structured directories.; The comment was successfully deleted.; The artifact version was successfully deleted.; The value of the comment was successfully changed.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `count`: The total number of versions that matched the query (may be more than the number of versions returned in the result set).
- `name`: The name of the error (typically a server exception class name).
- `version`: A single version of an artifact. Can be provided by the client when creating a new version, or it can be server-generated. The value can be any string unique to the artifact, but it is recommended to use a simple integer or a semver value.
- `versions`: The collection of artifact versions returned in the result set.

### [WellKnown](docs/api/well_known.html)

Results: Agent Card JSON.; MCP tool JSON.; The JSON Schema.

SDK operations: `load`.

### [WrappedVersionState](docs/api/wrapped_version_state.html)

Results: The current artifact version state.

SDK operations: `load`.

Key fields to recognise:

- `state`: Describes the state of an artifact or artifact version. * ENABLED * DISABLED * DEPRECATED * DRAFT * SUNSET, Signals that a migration deadline has passed and the version will be removed. Requires transitioning through DEPRECATED first. Added in 3.3.0.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| [Admin](docs/api/admin.html) | `create` | `POST /admin/import` | See reference |
| [Admin](docs/api/admin.html) | `create` | `POST /admin/roleMappings` | See reference |
| [Admin](docs/api/admin.html) | `remove` | `DELETE /admin/roleMappings/{principalId}` | See reference |
| [Admin](docs/api/admin.html) | `remove` | `DELETE /admin/config/properties/{propertyName}` | See reference |
| [Admin](docs/api/admin.html) | `remove` | `DELETE /admin/contracts/ruleset` | See reference |
| [Admin](docs/api/admin.html) | `update` | `PUT /admin/roleMappings/{principalId}` | See reference |
| [Admin](docs/api/admin.html) | `update` | `PUT /admin/config/properties/{propertyName}` | See reference |
| [Agent](docs/api/agent.html) | `list` | `GET /well-known/agents` | See reference |
| [Agent](docs/api/agent.html) | `list` | `GET /well-known/agent.json` | See reference |
| [AgentCard](docs/api/agent_card.html) | `list` | `GET /well-known/agent-card.json` | See reference |
| [AiCatalog](docs/api/ai_catalog.html) | `list` | `GET /well-known/ard/agents` | See reference |
| [AiCatalog](docs/api/ai_catalog.html) | `list` | `GET /well-known/ai-catalog.json` | See reference |
| [AiCatalog](docs/api/ai_catalog.html) | `list` | `GET /well-known/ard.json` | See reference |
| [ArdExplore](docs/api/ard_explore.html) | `create` | `POST /well-known/ard/explore` | See reference |
| [ArdSearch](docs/api/ard_search.html) | `create` | `POST /well-known/ard/search` | See reference |
| [Artifact](docs/api/artifact.html) | `create` | `POST /search/artifacts` | See reference |
| [Artifact](docs/api/artifact.html) | `list` | `GET /search/artifacts` | See reference |
| [Artifact](docs/api/artifact.html) | `list` | `GET /groups/{groupId}/artifacts` | See reference |
| [Artifact](docs/api/artifact.html) | `load` | `GET /ids/globalIds/{globalId}` | See reference |
| [Artifact](docs/api/artifact.html) | `load` | `GET /admin/usage/artifacts/{groupId}/{artifactId}` | See reference |
| [Artifact](docs/api/artifact.html) | `load` | `GET /ids/contentHashes/{contentHash}` | See reference |
| [Artifact](docs/api/artifact.html) | `load` | `GET /ids/contentIds/{contentId}` | See reference |
| [Artifact](docs/api/artifact.html) | `remove` | `DELETE /groups/{groupId}/artifacts/{artifactId}` | See reference |
| [Artifact](docs/api/artifact.html) | `remove` | `DELETE /groups/{groupId}/artifacts` | See reference |
| [ArtifactReference](docs/api/artifact_reference.html) | `create` | `POST /content/references` | See reference |
| [ArtifactReference](docs/api/artifact_reference.html) | `list` | `GET /groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/references` | See reference |
| [ArtifactReference](docs/api/artifact_reference.html) | `list` | `GET /ids/globalIds/{globalId}/references` | See reference |
| [ArtifactReference](docs/api/artifact_reference.html) | `list` | `GET /ids/contentHashes/{contentHash}/references` | See reference |
| [ArtifactReference](docs/api/artifact_reference.html) | `list` | `GET /ids/contentIds/{contentId}/references` | See reference |
| [ArtifactRule](docs/api/artifact_rule.html) | `create` | `POST /groups/{groupId}/artifacts/{artifactId}/rules` | See reference |
| [ArtifactRule](docs/api/artifact_rule.html) | `remove` | `DELETE /groups/{groupId}/artifacts/{artifactId}/rules/{ruleType}` | See reference |
| [ArtifactRule](docs/api/artifact_rule.html) | `remove` | `DELETE /groups/{groupId}/artifacts/{artifactId}/rules` | See reference |
| [ArtifactType](docs/api/artifact_type.html) | `list` | `GET /admin/config/artifactTypes` | See reference |
| [Branch](docs/api/branch.html) | `create` | `POST /groups/{groupId}/artifacts/{artifactId}/branches/{branchId}/versions` | See reference |
| [Branch](docs/api/branch.html) | `create` | `POST /groups/{groupId}/artifacts/{artifactId}/branches` | See reference |
| [Branch](docs/api/branch.html) | `load` | `GET /groups/{groupId}/artifacts/{artifactId}/branches/{branchId}` | See reference |
| [Branch](docs/api/branch.html) | `remove` | `DELETE /groups/{groupId}/artifacts/{artifactId}/branches/{branchId}` | See reference |
| [Branch](docs/api/branch.html) | `update` | `PUT /groups/{groupId}/artifacts/{artifactId}/branches/{branchId}` | See reference |
| [Branch](docs/api/branch.html) | `update` | `PUT /groups/{groupId}/artifacts/{artifactId}/branches/{branchId}/versions` | See reference |
| [Comment](docs/api/comment.html) | `create` | `POST /groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/comments` | See reference |
| [Comment](docs/api/comment.html) | `list` | `GET /groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/comments` | See reference |
| [ConfigurationProperty](docs/api/configuration_property.html) | `list` | `GET /admin/config/properties` | See reference |
| [ConfigurationProperty](docs/api/configuration_property.html) | `load` | `GET /admin/config/properties/{propertyName}` | See reference |
| [ConsumerVersionHeatmap](docs/api/consumer_version_heatmap.html) | `list` | `GET /admin/usage/artifacts/{groupId}/{artifactId}/heatmap` | See reference |
| [Content](docs/api/content.html) | `create` | `POST /content/canonicalize` | See reference |
| [Contract](docs/api/contract.html) | `create` | `POST /groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/contract/execute` | See reference |
| [Contract](docs/api/contract.html) | `create` | `POST /groups/{groupId}/artifacts/{artifactId}/contract/migrate` | See reference |
| [Contract](docs/api/contract.html) | `create` | `POST /groups/{groupId}/artifacts/{artifactId}/contract/promote` | See reference |
| [Contract](docs/api/contract.html) | `create` | `POST /groups/{groupId}/artifacts/{artifactId}/contract/status` | See reference |
| [Contract](docs/api/contract.html) | `list` | `GET /search/contracts` | See reference |
| [Contract](docs/api/contract.html) | `list` | `GET /groups/{groupId}/artifacts/{artifactId}/contract/audit` | See reference |
| [Contract](docs/api/contract.html) | `load` | `GET /groups/{groupId}/artifacts/{artifactId}/contract/compatibility-group` | See reference |
| [Contract](docs/api/contract.html) | `load` | `GET /groups/{groupId}/artifacts/{artifactId}/contract/quality` | See reference |
| [Contract](docs/api/contract.html) | `load` | `GET /groups/{groupId}/artifacts/{artifactId}/contract/export` | See reference |
| [Contract](docs/api/contract.html) | `load` | `GET /groups/{groupId}/artifacts/{artifactId}/contract/metadata` | See reference |
| [Contract](docs/api/contract.html) | `load` | `GET /groups/{groupId}/contracts/{contractId}` | See reference |
| [Contract](docs/api/contract.html) | `remove` | `DELETE /groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/contract/ruleset` | See reference |
| [Contract](docs/api/contract.html) | `remove` | `DELETE /groups/{groupId}/artifacts/{artifactId}/contract/ruleset` | See reference |
| [Contract](docs/api/contract.html) | `remove` | `DELETE /groups/{groupId}/contracts/{contractId}` | See reference |
| [Contract](docs/api/contract.html) | `update` | `PUT /groups/{groupId}/artifacts/{artifactId}/contract/compatibility-group` | See reference |
| [Contract](docs/api/contract.html) | `update` | `PUT /groups/{groupId}/artifacts/{artifactId}/contract/metadata` | See reference |
| [ContractRule](docs/api/contract_rule.html) | `list` | `GET /search/contract/rules` | See reference |
| [ContractRuleSet](docs/api/contract_rule_set.html) | `list` | `GET /groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/contract/ruleset` | See reference |
| [ContractRuleSet](docs/api/contract_rule_set.html) | `list` | `GET /groups/{groupId}/artifacts/{artifactId}/contract/ruleset` | See reference |
| [ContractRuleSet](docs/api/contract_rule_set.html) | `list` | `GET /admin/contracts/ruleset` | See reference |
| [ContractRuleSet](docs/api/contract_rule_set.html) | `update` | `PUT /groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/contract/ruleset` | See reference |
| [ContractRuleSet](docs/api/contract_rule_set.html) | `update` | `PUT /groups/{groupId}/artifacts/{artifactId}/contract/ruleset` | See reference |
| [ContractRuleSet](docs/api/contract_rule_set.html) | `update` | `PUT /admin/contracts/ruleset` | See reference |
| [CreateArtifact](docs/api/create_artifact.html) | `create` | `POST /groups/{groupId}/artifacts` | See reference |
| [DeprecationReadiness](docs/api/deprecation_readiness.html) | `list` | `GET /admin/usage/artifacts/{groupId}/{artifactId}/versions/{version}/deprecation-readiness` | See reference |
| [DownloadRef](docs/api/download_ref.html) | `load` | `GET /admin/export` | See reference |
| [GitOp](docs/api/git_op.html) | `create` | `POST /admin/gitops/sync` | See reference |
| [GitOp](docs/api/git_op.html) | `create` | `POST /admin/gitops/validate` | See reference |
| [GitOp](docs/api/git_op.html) | `remove` | `DELETE /admin/gitops/validate/{taskId}` | See reference |
| [GitOpsStatus](docs/api/git_ops_status.html) | `list` | `GET /admin/gitops/status` | See reference |
| [GitOpsValidateTask](docs/api/git_ops_validate_task.html) | `list` | `GET /admin/gitops/validate` | See reference |
| [GitOpsValidateTask](docs/api/git_ops_validate_task.html) | `load` | `GET /admin/gitops/validate/{taskId}` | See reference |
| [GlobalRule](docs/api/global_rule.html) | `create` | `POST /admin/rules` | See reference |
| [GlobalRule](docs/api/global_rule.html) | `remove` | `DELETE /admin/rules/{ruleType}` | See reference |
| [GlobalRule](docs/api/global_rule.html) | `remove` | `DELETE /admin/rules` | See reference |
| [Group](docs/api/group.html) | `create` | `POST /groups` | See reference |
| [Group](docs/api/group.html) | `list` | `GET /groups` | See reference |
| [Group](docs/api/group.html) | `load` | `GET /groups/{groupId}` | See reference |
| [Group](docs/api/group.html) | `remove` | `DELETE /groups/{groupId}` | See reference |
| [Group](docs/api/group.html) | `update` | `PUT /groups/{groupId}` | See reference |
| [GroupRule](docs/api/group_rule.html) | `create` | `POST /groups/{groupId}/rules` | See reference |
| [GroupRule](docs/api/group_rule.html) | `remove` | `DELETE /groups/{groupId}/rules/{ruleType}` | See reference |
| [GroupRule](docs/api/group_rule.html) | `remove` | `DELETE /groups/{groupId}/rules` | See reference |
| [KafkaSql](docs/api/kafka_sql.html) | `create` | `POST /admin/snapshots` | See reference |
| [McpTool](docs/api/mcp_tool.html) | `list` | `GET /well-known/mcp-tools` | See reference |
| [Metadata](docs/api/metadata.html) | `create` | `POST /groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/render` | See reference |
| [Metadata](docs/api/metadata.html) | `load` | `GET /groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}` | See reference |
| [Metadata](docs/api/metadata.html) | `load` | `GET /groups/{groupId}/artifacts/{artifactId}` | See reference |
| [Metadata](docs/api/metadata.html) | `update` | `PUT /groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/state` | See reference |
| [Metadata](docs/api/metadata.html) | `update` | `PUT /groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}` | See reference |
| [Metadata](docs/api/metadata.html) | `update` | `PUT /groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/content` | See reference |
| [Metadata](docs/api/metadata.html) | `update` | `PUT /groups/{groupId}/artifacts/{artifactId}` | See reference |
| [OdcsContractResult](docs/api/odcs_contract_result.html) | `create` | `POST /groups/{groupId}/contracts` | See reference |
| [OdcsContractResult](docs/api/odcs_contract_result.html) | `update` | `PUT /groups/{groupId}/contracts/{contractId}` | See reference |
| [OdcsContractSummary](docs/api/odcs_contract_summary.html) | `list` | `GET /groups/{groupId}/contracts` | See reference |
| [ReferenceGraph](docs/api/reference_graph.html) | `list` | `GET /groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/references/graph` | See reference |
| [RoleMapping](docs/api/role_mapping.html) | `list` | `GET /admin/roleMappings` | See reference |
| [RoleMapping](docs/api/role_mapping.html) | `load` | `GET /admin/roleMappings/{principalId}` | See reference |
| [Rule](docs/api/rule.html) | `list` | `GET /groups/{groupId}/artifacts/{artifactId}/rules` | See reference |
| [Rule](docs/api/rule.html) | `list` | `GET /groups/{groupId}/rules` | See reference |
| [Rule](docs/api/rule.html) | `list` | `GET /admin/rules` | See reference |
| [Rule](docs/api/rule.html) | `load` | `GET /groups/{groupId}/artifacts/{artifactId}/rules/{ruleType}` | See reference |
| [Rule](docs/api/rule.html) | `load` | `GET /groups/{groupId}/rules/{ruleType}` | See reference |
| [Rule](docs/api/rule.html) | `load` | `GET /admin/rules/{ruleType}` | See reference |
| [Rule](docs/api/rule.html) | `update` | `PUT /groups/{groupId}/artifacts/{artifactId}/rules/{ruleType}` | See reference |
| [Rule](docs/api/rule.html) | `update` | `PUT /groups/{groupId}/rules/{ruleType}` | See reference |
| [Rule](docs/api/rule.html) | `update` | `PUT /admin/rules/{ruleType}` | See reference |
| [SearchedBranch](docs/api/searched_branch.html) | `list` | `GET /groups/{groupId}/artifacts/{artifactId}/branches` | See reference |
| [SearchedGroup](docs/api/searched_group.html) | `list` | `GET /search/groups` | See reference |
| [SystemInfo](docs/api/system_info.html) | `load` | `GET /system/info` | See reference |
| [UsageSummary](docs/api/usage_summary.html) | `load` | `GET /admin/usage/summary` | See reference |
| [UserInfo](docs/api/user_info.html) | `load` | `GET /users/me` | See reference |
| [UserInterfaceConfig](docs/api/user_interface_config.html) | `load` | `GET /system/uiConfig` | See reference |
| [Version](docs/api/version.html) | `create` | `POST /search/versions` | See reference |
| [Version](docs/api/version.html) | `create` | `POST /groups/{groupId}/artifacts/{artifactId}/versions` | See reference |
| [Version](docs/api/version.html) | `list` | `GET /search/versions` | See reference |
| [Version](docs/api/version.html) | `list` | `GET /groups/{groupId}/artifacts/{artifactId}/versions` | See reference |
| [Version](docs/api/version.html) | `list` | `GET /groups/{groupId}/artifacts/{artifactId}/branches/{branchId}/versions` | See reference |
| [Version](docs/api/version.html) | `load` | `GET /groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/content` | See reference |
| [Version](docs/api/version.html) | `load` | `GET /groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/export` | See reference |
| [Version](docs/api/version.html) | `remove` | `DELETE /groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/comments/{commentId}` | See reference |
| [Version](docs/api/version.html) | `remove` | `DELETE /groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}` | See reference |
| [Version](docs/api/version.html) | `update` | `PUT /groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/comments/{commentId}` | See reference |
| [WellKnown](docs/api/well_known.html) | `load` | `GET /well-known/agents/{groupId}/{artifactId}` | See reference |
| [WellKnown](docs/api/well_known.html) | `load` | `GET /well-known/mcp-tools/{groupId}/{artifactId}` | See reference |
| [WellKnown](docs/api/well_known.html) | `load` | `GET /well-known/schemas/{schemaType}/{version}` | See reference |
| [WrappedVersionState](docs/api/wrapped_version_state.html) | `load` | `GET /groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/state` | See reference |

## Connect to the API

- API server: `https://{registry}/apis/registry/v3`

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| [Golang](docs/sdks/go.html) | `go/` | Build from source |
| [Lua](docs/sdks/lua.html) | `lua/` | Build from source |
| [PHP](docs/sdks/php.html) | `php/` | Build from source |
| [Python](docs/sdks/py.html) | `py/` | Build from source |
| [Ruby](docs/sdks/rb.html) | `rb/` | Build from source |
| [TypeScript](docs/sdks/ts.html) | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### [Go CLI](docs/tools/go-cli.html)

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### [Go MCP server](docs/tools/go-mcp.html)

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `apicurio-registry_list`: List records for an entity. Supported entities: `agent`, `agent_card`, `ai_catalog`, `artifact`, `artifact_reference`, `artifact_type`, `comment`, `configuration_property`, `consumer_version_heatmap`, `contract`, `contract_rule`, `contract_rule_set`, `deprecation_readiness`, `git_ops_status`, `git_ops_validate_task`, `group`, `mcp_tool`, `odcs_contract_summary`, `reference_graph`, `role_mapping`, `rule`, `searched_branch`, `searched_group`, `version`.
- `apicurio-registry_load`: Load one record for an entity. Supported entities: `artifact`, `branch`, `configuration_property`, `contract`, `download_ref`, `git_ops_validate_task`, `group`, `metadata`, `role_mapping`, `rule`, `system_info`, `usage_summary`, `user_info`, `user_interface_config`, `version`, `well_known`, `wrapped_version_state`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- [`debug`](docs/features/debug.html): Request/response capture ring buffer for debugging
- [`idempotency`](docs/features/idempotency.html): Idempotency keys for safe retries of mutating operations
- [`metrics`](docs/features/metrics.html): Statistics capture: per-operation counters and latency
- [`paging`](docs/features/paging.html): Pagination signals for list operations
- [`ratelimit`](docs/features/ratelimit.html): Client-side rate limiting via a token bucket
- [`retry`](docs/features/retry.html): Automatic retry of transient failures with exponential backoff
- [`test`](docs/features/test.html): In-memory mock transport for testing without a live server
- [`timeout`](docs/features/timeout.html): Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the [first-call guide](docs/guides/first-call.html) for the setup sequence.
- Read the [authentication guide](docs/guides/authentication.html) before using protected routes.
- Use the [API reference](docs/api/index.html) for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

