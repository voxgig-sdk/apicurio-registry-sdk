import { ApicurioRegistryEntityBase } from '../ApicurioRegistryEntityBase';
import type { ApicurioRegistrySDK } from '../ApicurioRegistrySDK';
import type { Control } from '../types';
import type { OdcsContractSummary, OdcsContractSummaryListMatch } from '../ApicurioRegistryTypes';
declare class OdcsContractSummaryEntity extends ApicurioRegistryEntityBase<OdcsContractSummary> {
    constructor(client: ApicurioRegistrySDK, entopts: any);
    make(this: OdcsContractSummaryEntity): OdcsContractSummaryEntity;
    list(this: any, reqmatch?: OdcsContractSummaryListMatch, ctrl?: Control): Promise<OdcsContractSummaryEntity[]>;
}
export { OdcsContractSummaryEntity };
