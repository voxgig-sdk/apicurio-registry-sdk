import { ApicurioRegistryEntityBase } from '../ApicurioRegistryEntityBase';
import type { ApicurioRegistrySDK } from '../ApicurioRegistrySDK';
import type { Control } from '../types';
import type { UsageSummary, UsageSummaryLoadMatch } from '../ApicurioRegistryTypes';
declare class UsageSummaryEntity extends ApicurioRegistryEntityBase<UsageSummary> {
    constructor(client: ApicurioRegistrySDK, entopts: any);
    make(this: UsageSummaryEntity): UsageSummaryEntity;
    load(this: any, reqmatch?: UsageSummaryLoadMatch, ctrl?: Control): Promise<UsageSummaryEntity>;
}
export { UsageSummaryEntity };
