import { ApicurioRegistryEntityBase } from '../ApicurioRegistryEntityBase';
import type { ApicurioRegistrySDK } from '../ApicurioRegistrySDK';
import type { Control } from '../types';
import type { SearchedBranch, SearchedBranchListMatch } from '../ApicurioRegistryTypes';
declare class SearchedBranchEntity extends ApicurioRegistryEntityBase<SearchedBranch> {
    constructor(client: ApicurioRegistrySDK, entopts: any);
    make(this: SearchedBranchEntity): SearchedBranchEntity;
    list(this: any, reqmatch?: SearchedBranchListMatch, ctrl?: Control): Promise<SearchedBranchEntity[]>;
}
export { SearchedBranchEntity };
