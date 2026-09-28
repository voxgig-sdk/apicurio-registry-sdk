import { ApicurioRegistryEntityBase } from '../ApicurioRegistryEntityBase';
import type { ApicurioRegistrySDK } from '../ApicurioRegistrySDK';
import type { Control } from '../types';
import type { GlobalRule, GlobalRuleCreateData, GlobalRuleRemoveMatch } from '../ApicurioRegistryTypes';
declare class GlobalRuleEntity extends ApicurioRegistryEntityBase<GlobalRule> {
    constructor(client: ApicurioRegistrySDK, entopts: any);
    make(this: GlobalRuleEntity): GlobalRuleEntity;
    create(this: any, reqdata?: GlobalRuleCreateData, ctrl?: Control): Promise<GlobalRuleEntity>;
    remove(this: any, reqmatch?: GlobalRuleRemoveMatch, ctrl?: Control): Promise<GlobalRuleEntity>;
}
export { GlobalRuleEntity };
