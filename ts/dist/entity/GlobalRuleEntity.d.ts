import { ApicurioRegistryEntityBase } from '../ApicurioRegistryEntityBase';
import type { ApicurioRegistrySDK } from '../ApicurioRegistrySDK';
import type { Control } from '../types';
import type { GlobalRule, GlobalRuleListMatch, GlobalRuleCreateData, GlobalRuleRemoveMatch } from '../ApicurioRegistryTypes';
declare class GlobalRuleEntity extends ApicurioRegistryEntityBase<GlobalRule> {
    constructor(client: ApicurioRegistrySDK, entopts: any);
    make(this: GlobalRuleEntity): GlobalRuleEntity;
    list(this: any, reqmatch?: GlobalRuleListMatch, ctrl?: Control): Promise<GlobalRuleEntity[]>;
    create(this: any, reqdata?: GlobalRuleCreateData, ctrl?: Control): Promise<GlobalRuleEntity>;
    remove(this: any, reqmatch?: GlobalRuleRemoveMatch, ctrl?: Control): Promise<GlobalRuleEntity>;
}
export { GlobalRuleEntity };
