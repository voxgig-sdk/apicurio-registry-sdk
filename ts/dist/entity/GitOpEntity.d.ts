import { ApicurioRegistryEntityBase } from '../ApicurioRegistryEntityBase';
import type { ApicurioRegistrySDK } from '../ApicurioRegistrySDK';
import type { Control } from '../types';
import type { GitOp, GitOpCreateData, GitOpRemoveMatch } from '../ApicurioRegistryTypes';
declare class GitOpEntity extends ApicurioRegistryEntityBase<GitOp> {
    constructor(client: ApicurioRegistrySDK, entopts: any);
    make(this: GitOpEntity): GitOpEntity;
    create(this: any, reqdata?: GitOpCreateData, ctrl?: Control): Promise<GitOpEntity>;
    remove(this: any, reqmatch?: GitOpRemoveMatch, ctrl?: Control): Promise<GitOpEntity>;
}
export { GitOpEntity };
