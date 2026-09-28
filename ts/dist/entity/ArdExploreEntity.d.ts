import { ApicurioRegistryEntityBase } from '../ApicurioRegistryEntityBase';
import type { ApicurioRegistrySDK } from '../ApicurioRegistrySDK';
import type { Control } from '../types';
import type { ArdExplore, ArdExploreCreateData } from '../ApicurioRegistryTypes';
declare class ArdExploreEntity extends ApicurioRegistryEntityBase<ArdExplore> {
    constructor(client: ApicurioRegistrySDK, entopts: any);
    make(this: ArdExploreEntity): ArdExploreEntity;
    create(this: any, reqdata?: ArdExploreCreateData, ctrl?: Control): Promise<ArdExploreEntity>;
}
export { ArdExploreEntity };
