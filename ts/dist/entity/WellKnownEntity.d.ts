import { ApicurioRegistryEntityBase } from '../ApicurioRegistryEntityBase';
import type { ApicurioRegistrySDK } from '../ApicurioRegistrySDK';
import type { Control } from '../types';
import type { WellKnown, WellKnownLoadMatch } from '../ApicurioRegistryTypes';
declare class WellKnownEntity extends ApicurioRegistryEntityBase<WellKnown> {
    constructor(client: ApicurioRegistrySDK, entopts: any);
    make(this: WellKnownEntity): WellKnownEntity;
    load(this: any, reqmatch?: WellKnownLoadMatch, ctrl?: Control): Promise<WellKnownEntity>;
}
export { WellKnownEntity };
