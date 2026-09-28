import { ApicurioRegistryEntityBase } from '../ApicurioRegistryEntityBase';
import type { ApicurioRegistrySDK } from '../ApicurioRegistrySDK';
import type { Control } from '../types';
import type { AiCatalog, AiCatalogListMatch } from '../ApicurioRegistryTypes';
declare class AiCatalogEntity extends ApicurioRegistryEntityBase<AiCatalog> {
    constructor(client: ApicurioRegistrySDK, entopts: any);
    make(this: AiCatalogEntity): AiCatalogEntity;
    list(this: any, reqmatch?: AiCatalogListMatch, ctrl?: Control): Promise<AiCatalogEntity[]>;
}
export { AiCatalogEntity };
