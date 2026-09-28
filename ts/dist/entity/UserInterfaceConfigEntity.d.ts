import { ApicurioRegistryEntityBase } from '../ApicurioRegistryEntityBase';
import type { ApicurioRegistrySDK } from '../ApicurioRegistrySDK';
import type { Control } from '../types';
import type { UserInterfaceConfig, UserInterfaceConfigLoadMatch } from '../ApicurioRegistryTypes';
declare class UserInterfaceConfigEntity extends ApicurioRegistryEntityBase<UserInterfaceConfig> {
    constructor(client: ApicurioRegistrySDK, entopts: any);
    make(this: UserInterfaceConfigEntity): UserInterfaceConfigEntity;
    load(this: any, reqmatch?: UserInterfaceConfigLoadMatch, ctrl?: Control): Promise<UserInterfaceConfigEntity>;
}
export { UserInterfaceConfigEntity };
