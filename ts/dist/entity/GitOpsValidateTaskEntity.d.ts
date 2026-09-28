import { ApicurioRegistryEntityBase } from '../ApicurioRegistryEntityBase';
import type { ApicurioRegistrySDK } from '../ApicurioRegistrySDK';
import type { Control } from '../types';
import type { GitOpsValidateTask, GitOpsValidateTaskLoadMatch, GitOpsValidateTaskListMatch } from '../ApicurioRegistryTypes';
declare class GitOpsValidateTaskEntity extends ApicurioRegistryEntityBase<GitOpsValidateTask> {
    constructor(client: ApicurioRegistrySDK, entopts: any);
    make(this: GitOpsValidateTaskEntity): GitOpsValidateTaskEntity;
    load(this: any, reqmatch?: GitOpsValidateTaskLoadMatch, ctrl?: Control): Promise<GitOpsValidateTaskEntity>;
    list(this: any, reqmatch?: GitOpsValidateTaskListMatch, ctrl?: Control): Promise<GitOpsValidateTaskEntity[]>;
}
export { GitOpsValidateTaskEntity };
