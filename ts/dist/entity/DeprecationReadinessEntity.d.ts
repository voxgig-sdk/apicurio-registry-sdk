import { ApicurioRegistryEntityBase } from '../ApicurioRegistryEntityBase';
import type { ApicurioRegistrySDK } from '../ApicurioRegistrySDK';
import type { Control } from '../types';
import type { DeprecationReadiness, DeprecationReadinessListMatch } from '../ApicurioRegistryTypes';
declare class DeprecationReadinessEntity extends ApicurioRegistryEntityBase<DeprecationReadiness> {
    constructor(client: ApicurioRegistrySDK, entopts: any);
    make(this: DeprecationReadinessEntity): DeprecationReadinessEntity;
    list(this: any, reqmatch?: DeprecationReadinessListMatch, ctrl?: Control): Promise<DeprecationReadinessEntity[]>;
}
export { DeprecationReadinessEntity };
