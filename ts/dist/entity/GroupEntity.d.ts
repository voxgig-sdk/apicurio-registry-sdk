import { ApicurioRegistryEntityBase } from '../ApicurioRegistryEntityBase';
import type { ApicurioRegistrySDK } from '../ApicurioRegistrySDK';
import type { Control } from '../types';
import type { Group, GroupLoadMatch, GroupListMatch, GroupCreateData, GroupUpdateData, GroupRemoveMatch } from '../ApicurioRegistryTypes';
declare class GroupEntity extends ApicurioRegistryEntityBase<Group> {
    constructor(client: ApicurioRegistrySDK, entopts: any);
    make(this: GroupEntity): GroupEntity;
    load(this: any, reqmatch?: GroupLoadMatch, ctrl?: Control): Promise<GroupEntity>;
    list(this: any, reqmatch?: GroupListMatch, ctrl?: Control): Promise<GroupEntity[]>;
    create(this: any, reqdata?: GroupCreateData, ctrl?: Control): Promise<GroupEntity>;
    update(this: any, reqdata?: GroupUpdateData, ctrl?: Control): Promise<GroupEntity>;
    remove(this: any, reqmatch?: GroupRemoveMatch, ctrl?: Control): Promise<GroupEntity>;
}
export { GroupEntity };
