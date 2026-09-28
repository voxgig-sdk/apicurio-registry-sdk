import { ApicurioRegistryEntityBase } from '../ApicurioRegistryEntityBase';
import type { ApicurioRegistrySDK } from '../ApicurioRegistrySDK';
import type { Control } from '../types';
import type { OdcsContractResult, OdcsContractResultCreateData, OdcsContractResultUpdateData } from '../ApicurioRegistryTypes';
declare class OdcsContractResultEntity extends ApicurioRegistryEntityBase<OdcsContractResult> {
    constructor(client: ApicurioRegistrySDK, entopts: any);
    make(this: OdcsContractResultEntity): OdcsContractResultEntity;
    create(this: any, reqdata?: OdcsContractResultCreateData, ctrl?: Control): Promise<OdcsContractResultEntity>;
    update(this: any, reqdata?: OdcsContractResultUpdateData, ctrl?: Control): Promise<OdcsContractResultEntity>;
}
export { OdcsContractResultEntity };
