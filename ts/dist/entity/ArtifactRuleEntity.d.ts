import { ApicurioRegistryEntityBase } from '../ApicurioRegistryEntityBase';
import type { ApicurioRegistrySDK } from '../ApicurioRegistrySDK';
import type { Control } from '../types';
import type { ArtifactRule, ArtifactRuleCreateData, ArtifactRuleRemoveMatch } from '../ApicurioRegistryTypes';
declare class ArtifactRuleEntity extends ApicurioRegistryEntityBase<ArtifactRule> {
    constructor(client: ApicurioRegistrySDK, entopts: any);
    make(this: ArtifactRuleEntity): ArtifactRuleEntity;
    create(this: any, reqdata?: ArtifactRuleCreateData, ctrl?: Control): Promise<ArtifactRuleEntity>;
    remove(this: any, reqmatch?: ArtifactRuleRemoveMatch, ctrl?: Control): Promise<ArtifactRuleEntity>;
}
export { ArtifactRuleEntity };
