import { ApicurioRegistryEntityBase } from '../ApicurioRegistryEntityBase';
import type { ApicurioRegistrySDK } from '../ApicurioRegistrySDK';
import type { Control } from '../types';
import type { Metadata, MetadataLoadMatch, MetadataCreateData, MetadataUpdateData } from '../ApicurioRegistryTypes';
declare class MetadataEntity extends ApicurioRegistryEntityBase<Metadata> {
    constructor(client: ApicurioRegistrySDK, entopts: any);
    make(this: MetadataEntity): MetadataEntity;
    load(this: any, reqmatch?: MetadataLoadMatch, ctrl?: Control): Promise<MetadataEntity>;
    create(this: any, reqdata?: MetadataCreateData, ctrl?: Control): Promise<MetadataEntity>;
    update(this: any, reqdata?: MetadataUpdateData, ctrl?: Control): Promise<MetadataEntity>;
}
export { MetadataEntity };
