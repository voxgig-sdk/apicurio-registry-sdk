import { ApicurioRegistryEntityBase } from '../ApicurioRegistryEntityBase';
import type { ApicurioRegistrySDK } from '../ApicurioRegistrySDK';
import type { Control } from '../types';
import type { ContractRule, ContractRuleListMatch } from '../ApicurioRegistryTypes';
declare class ContractRuleEntity extends ApicurioRegistryEntityBase<ContractRule> {
    constructor(client: ApicurioRegistrySDK, entopts: any);
    make(this: ContractRuleEntity): ContractRuleEntity;
    list(this: any, reqmatch?: ContractRuleListMatch, ctrl?: Control): Promise<ContractRuleEntity[]>;
}
export { ContractRuleEntity };
