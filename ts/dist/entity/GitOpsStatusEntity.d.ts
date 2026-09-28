import { ApicurioRegistryEntityBase } from '../ApicurioRegistryEntityBase';
import type { ApicurioRegistrySDK } from '../ApicurioRegistrySDK';
import type { Control } from '../types';
import type { GitOpsStatus, GitOpsStatusListMatch } from '../ApicurioRegistryTypes';
declare class GitOpsStatusEntity extends ApicurioRegistryEntityBase<GitOpsStatus> {
    constructor(client: ApicurioRegistrySDK, entopts: any);
    make(this: GitOpsStatusEntity): GitOpsStatusEntity;
    list(this: any, reqmatch?: GitOpsStatusListMatch, ctrl?: Control): Promise<GitOpsStatusEntity[]>;
}
export { GitOpsStatusEntity };
