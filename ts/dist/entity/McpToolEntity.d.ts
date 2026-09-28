import { ApicurioRegistryEntityBase } from '../ApicurioRegistryEntityBase';
import type { ApicurioRegistrySDK } from '../ApicurioRegistrySDK';
import type { Control } from '../types';
import type { McpTool, McpToolListMatch } from '../ApicurioRegistryTypes';
declare class McpToolEntity extends ApicurioRegistryEntityBase<McpTool> {
    constructor(client: ApicurioRegistrySDK, entopts: any);
    make(this: McpToolEntity): McpToolEntity;
    list(this: any, reqmatch?: McpToolListMatch, ctrl?: Control): Promise<McpToolEntity[]>;
}
export { McpToolEntity };
