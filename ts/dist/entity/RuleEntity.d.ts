import { ApicurioRegistryEntityBase } from '../ApicurioRegistryEntityBase';
import type { ApicurioRegistrySDK } from '../ApicurioRegistrySDK';
import type { Control } from '../types';
import type { Rule, RuleLoadMatch, RuleListMatch, RuleUpdateData } from '../ApicurioRegistryTypes';
declare class RuleEntity extends ApicurioRegistryEntityBase<Rule> {
    constructor(client: ApicurioRegistrySDK, entopts: any);
    make(this: RuleEntity): RuleEntity;
    load(this: any, reqmatch?: RuleLoadMatch, ctrl?: Control): Promise<RuleEntity>;
    list(this: any, reqmatch?: RuleListMatch, ctrl?: Control): Promise<RuleEntity[]>;
    update(this: any, reqdata?: RuleUpdateData, ctrl?: Control): Promise<RuleEntity>;
}
export { RuleEntity };
