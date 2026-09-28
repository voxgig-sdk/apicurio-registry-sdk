import { ApicurioRegistryEntityBase } from '../ApicurioRegistryEntityBase';
import type { ApicurioRegistrySDK } from '../ApicurioRegistrySDK';
import type { Control } from '../types';
import type { ReferenceGraph, ReferenceGraphListMatch } from '../ApicurioRegistryTypes';
declare class ReferenceGraphEntity extends ApicurioRegistryEntityBase<ReferenceGraph> {
    constructor(client: ApicurioRegistrySDK, entopts: any);
    make(this: ReferenceGraphEntity): ReferenceGraphEntity;
    list(this: any, reqmatch?: ReferenceGraphListMatch, ctrl?: Control): Promise<ReferenceGraphEntity[]>;
}
export { ReferenceGraphEntity };
