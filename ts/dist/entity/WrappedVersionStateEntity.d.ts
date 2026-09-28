import { ApicurioRegistryEntityBase } from '../ApicurioRegistryEntityBase';
import type { ApicurioRegistrySDK } from '../ApicurioRegistrySDK';
import type { Control } from '../types';
import type { WrappedVersionState, WrappedVersionStateLoadMatch } from '../ApicurioRegistryTypes';
declare class WrappedVersionStateEntity extends ApicurioRegistryEntityBase<WrappedVersionState> {
    constructor(client: ApicurioRegistrySDK, entopts: any);
    make(this: WrappedVersionStateEntity): WrappedVersionStateEntity;
    load(this: any, reqmatch?: WrappedVersionStateLoadMatch, ctrl?: Control): Promise<WrappedVersionStateEntity>;
}
export { WrappedVersionStateEntity };
