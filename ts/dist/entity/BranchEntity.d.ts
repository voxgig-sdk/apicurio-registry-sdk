import { ApicurioRegistryEntityBase } from '../ApicurioRegistryEntityBase';
import type { ApicurioRegistrySDK } from '../ApicurioRegistrySDK';
import type { Control } from '../types';
import type { Branch, BranchLoadMatch, BranchCreateData, BranchUpdateData, BranchRemoveMatch } from '../ApicurioRegistryTypes';
declare class BranchEntity extends ApicurioRegistryEntityBase<Branch> {
    constructor(client: ApicurioRegistrySDK, entopts: any);
    make(this: BranchEntity): BranchEntity;
    load(this: any, reqmatch?: BranchLoadMatch, ctrl?: Control): Promise<BranchEntity>;
    create(this: any, reqdata?: BranchCreateData, ctrl?: Control): Promise<BranchEntity>;
    update(this: any, reqdata?: BranchUpdateData, ctrl?: Control): Promise<BranchEntity>;
    remove(this: any, reqmatch?: BranchRemoveMatch, ctrl?: Control): Promise<BranchEntity>;
}
export { BranchEntity };
