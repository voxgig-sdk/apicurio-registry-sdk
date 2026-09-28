import { ApicurioRegistryEntityBase } from '../ApicurioRegistryEntityBase';
import type { ApicurioRegistrySDK } from '../ApicurioRegistrySDK';
import type { Control } from '../types';
import type { Admin, AdminCreateData, AdminUpdateData, AdminRemoveMatch } from '../ApicurioRegistryTypes';
declare class AdminEntity extends ApicurioRegistryEntityBase<Admin> {
    constructor(client: ApicurioRegistrySDK, entopts: any);
    make(this: AdminEntity): AdminEntity;
    create(this: any, reqdata?: AdminCreateData, ctrl?: Control): Promise<AdminEntity>;
    update(this: any, reqdata?: AdminUpdateData, ctrl?: Control): Promise<AdminEntity>;
    remove(this: any, reqmatch?: AdminRemoveMatch, ctrl?: Control): Promise<AdminEntity>;
}
export { AdminEntity };
