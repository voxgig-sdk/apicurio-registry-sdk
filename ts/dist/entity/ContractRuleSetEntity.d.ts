import { ApicurioRegistryEntityBase } from '../ApicurioRegistryEntityBase';
import type { ApicurioRegistrySDK } from '../ApicurioRegistrySDK';
import type { Control } from '../types';
import type { ContractRuleSet, ContractRuleSetListMatch, ContractRuleSetUpdateData } from '../ApicurioRegistryTypes';
declare class ContractRuleSetEntity extends ApicurioRegistryEntityBase<ContractRuleSet> {
    constructor(client: ApicurioRegistrySDK, entopts: any);
    make(this: ContractRuleSetEntity): ContractRuleSetEntity;
    list(this: any, reqmatch?: ContractRuleSetListMatch, ctrl?: Control): Promise<ContractRuleSetEntity[]>;
    update(this: any, reqdata?: ContractRuleSetUpdateData, ctrl?: Control): Promise<ContractRuleSetEntity>;
}
export { ContractRuleSetEntity };
