import { ApicurioRegistryEntityBase } from '../ApicurioRegistryEntityBase';
import type { ApicurioRegistrySDK } from '../ApicurioRegistrySDK';
import type { Control } from '../types';
import type { SearchedGroup, SearchedGroupListMatch } from '../ApicurioRegistryTypes';
declare class SearchedGroupEntity extends ApicurioRegistryEntityBase<SearchedGroup> {
    constructor(client: ApicurioRegistrySDK, entopts: any);
    make(this: SearchedGroupEntity): SearchedGroupEntity;
    list(this: any, reqmatch?: SearchedGroupListMatch, ctrl?: Control): Promise<SearchedGroupEntity[]>;
}
export { SearchedGroupEntity };
