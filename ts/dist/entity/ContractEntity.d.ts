import { ApicurioRegistryEntityBase } from '../ApicurioRegistryEntityBase';
import type { ApicurioRegistrySDK } from '../ApicurioRegistrySDK';
import type { Control } from '../types';
import type { Contract, ContractLoadMatch, ContractListMatch, ContractCreateData, ContractUpdateData, ContractRemoveMatch } from '../ApicurioRegistryTypes';
declare class ContractEntity extends ApicurioRegistryEntityBase<Contract> {
    constructor(client: ApicurioRegistrySDK, entopts: any);
    make(this: ContractEntity): ContractEntity;
    load(this: any, reqmatch?: ContractLoadMatch, ctrl?: Control): Promise<ContractEntity>;
    list(this: any, reqmatch?: ContractListMatch, ctrl?: Control): Promise<ContractEntity[]>;
    create(this: any, reqdata?: ContractCreateData, ctrl?: Control): Promise<ContractEntity>;
    update(this: any, reqdata?: ContractUpdateData, ctrl?: Control): Promise<ContractEntity>;
    remove(this: any, reqmatch?: ContractRemoveMatch, ctrl?: Control): Promise<ContractEntity>;
}
export { ContractEntity };
