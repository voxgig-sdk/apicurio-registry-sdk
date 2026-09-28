import { ApicurioRegistryEntityBase } from '../ApicurioRegistryEntityBase';
import type { ApicurioRegistrySDK } from '../ApicurioRegistrySDK';
import type { Control } from '../types';
import type { AgentCard, AgentCardListMatch } from '../ApicurioRegistryTypes';
declare class AgentCardEntity extends ApicurioRegistryEntityBase<AgentCard> {
    constructor(client: ApicurioRegistrySDK, entopts: any);
    make(this: AgentCardEntity): AgentCardEntity;
    list(this: any, reqmatch?: AgentCardListMatch, ctrl?: Control): Promise<AgentCardEntity[]>;
}
export { AgentCardEntity };
