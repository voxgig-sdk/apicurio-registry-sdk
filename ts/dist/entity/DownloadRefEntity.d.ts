import { ApicurioRegistryEntityBase } from '../ApicurioRegistryEntityBase';
import type { ApicurioRegistrySDK } from '../ApicurioRegistrySDK';
import type { Control } from '../types';
import type { DownloadRef, DownloadRefLoadMatch } from '../ApicurioRegistryTypes';
declare class DownloadRefEntity extends ApicurioRegistryEntityBase<DownloadRef> {
    constructor(client: ApicurioRegistrySDK, entopts: any);
    make(this: DownloadRefEntity): DownloadRefEntity;
    load(this: any, reqmatch?: DownloadRefLoadMatch, ctrl?: Control): Promise<DownloadRefEntity>;
}
export { DownloadRefEntity };
