import { ApicurioRegistryEntityBase } from '../ApicurioRegistryEntityBase';
import type { ApicurioRegistrySDK } from '../ApicurioRegistrySDK';
import type { Control } from '../types';
import type { UserInfo, UserInfoLoadMatch } from '../ApicurioRegistryTypes';
declare class UserInfoEntity extends ApicurioRegistryEntityBase<UserInfo> {
    constructor(client: ApicurioRegistrySDK, entopts: any);
    make(this: UserInfoEntity): UserInfoEntity;
    load(this: any, reqmatch?: UserInfoLoadMatch, ctrl?: Control): Promise<UserInfoEntity>;
}
export { UserInfoEntity };
