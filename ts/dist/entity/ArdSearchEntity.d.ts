import { ApicurioRegistryEntityBase } from '../ApicurioRegistryEntityBase';
import type { ApicurioRegistrySDK } from '../ApicurioRegistrySDK';
import type { Control } from '../types';
import type { ArdSearch, ArdSearchCreateData } from '../ApicurioRegistryTypes';
declare class ArdSearchEntity extends ApicurioRegistryEntityBase<ArdSearch> {
    constructor(client: ApicurioRegistrySDK, entopts: any);
    make(this: ArdSearchEntity): ArdSearchEntity;
    create(this: any, reqdata?: ArdSearchCreateData, ctrl?: Control): Promise<ArdSearchEntity>;
}
export { ArdSearchEntity };
