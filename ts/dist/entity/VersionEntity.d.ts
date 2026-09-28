import { ApicurioRegistryEntityBase } from '../ApicurioRegistryEntityBase';
import type { ApicurioRegistrySDK } from '../ApicurioRegistrySDK';
import type { Control } from '../types';
import type { Version, VersionLoadMatch, VersionListMatch, VersionCreateData, VersionUpdateData, VersionRemoveMatch } from '../ApicurioRegistryTypes';
declare class VersionEntity extends ApicurioRegistryEntityBase<Version> {
    constructor(client: ApicurioRegistrySDK, entopts: any);
    make(this: VersionEntity): VersionEntity;
    load(this: any, reqmatch?: VersionLoadMatch, ctrl?: Control): Promise<VersionEntity>;
    list(this: any, reqmatch?: VersionListMatch, ctrl?: Control): Promise<VersionEntity[]>;
    create(this: any, reqdata?: VersionCreateData, ctrl?: Control): Promise<VersionEntity>;
    update(this: any, reqdata?: VersionUpdateData, ctrl?: Control): Promise<VersionEntity>;
    remove(this: any, reqmatch?: VersionRemoveMatch, ctrl?: Control): Promise<VersionEntity>;
}
export { VersionEntity };
