import { ApicurioRegistryEntityBase } from '../ApicurioRegistryEntityBase';
import type { ApicurioRegistrySDK } from '../ApicurioRegistrySDK';
import type { Control } from '../types';
import type { GroupRule, GroupRuleCreateData, GroupRuleRemoveMatch } from '../ApicurioRegistryTypes';
declare class GroupRuleEntity extends ApicurioRegistryEntityBase<GroupRule> {
    constructor(client: ApicurioRegistrySDK, entopts: any);
    make(this: GroupRuleEntity): GroupRuleEntity;
    create(this: any, reqdata?: GroupRuleCreateData, ctrl?: Control): Promise<GroupRuleEntity>;
    remove(this: any, reqmatch?: GroupRuleRemoveMatch, ctrl?: Control): Promise<GroupRuleEntity>;
}
export { GroupRuleEntity };
