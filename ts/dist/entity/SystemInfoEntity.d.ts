import { ApicurioRegistryEntityBase } from '../ApicurioRegistryEntityBase';
import type { ApicurioRegistrySDK } from '../ApicurioRegistrySDK';
import type { Control } from '../types';
import type { SystemInfo, SystemInfoLoadMatch } from '../ApicurioRegistryTypes';
declare class SystemInfoEntity extends ApicurioRegistryEntityBase<SystemInfo> {
    constructor(client: ApicurioRegistrySDK, entopts: any);
    make(this: SystemInfoEntity): SystemInfoEntity;
    load(this: any, reqmatch?: SystemInfoLoadMatch, ctrl?: Control): Promise<SystemInfoEntity>;
}
export { SystemInfoEntity };
