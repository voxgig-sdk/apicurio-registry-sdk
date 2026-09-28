import { ApicurioRegistryEntityBase } from '../ApicurioRegistryEntityBase';
import type { ApicurioRegistrySDK } from '../ApicurioRegistrySDK';
import type { Control } from '../types';
import type { Agent, AgentListMatch } from '../ApicurioRegistryTypes';
declare class AgentEntity extends ApicurioRegistryEntityBase<Agent> {
    constructor(client: ApicurioRegistrySDK, entopts: any);
    make(this: AgentEntity): AgentEntity;
    list(this: any, reqmatch?: AgentListMatch, ctrl?: Control): Promise<AgentEntity[]>;
}
export { AgentEntity };
