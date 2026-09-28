import { ApicurioRegistryEntityBase } from '../ApicurioRegistryEntityBase';
import type { ApicurioRegistrySDK } from '../ApicurioRegistrySDK';
import type { Control } from '../types';
import type { RoleMapping, RoleMappingLoadMatch, RoleMappingListMatch } from '../ApicurioRegistryTypes';
declare class RoleMappingEntity extends ApicurioRegistryEntityBase<RoleMapping> {
    constructor(client: ApicurioRegistrySDK, entopts: any);
    make(this: RoleMappingEntity): RoleMappingEntity;
    load(this: any, reqmatch?: RoleMappingLoadMatch, ctrl?: Control): Promise<RoleMappingEntity>;
    list(this: any, reqmatch?: RoleMappingListMatch, ctrl?: Control): Promise<RoleMappingEntity[]>;
}
export { RoleMappingEntity };
