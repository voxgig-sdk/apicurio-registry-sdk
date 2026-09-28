import { ApicurioRegistryEntityBase } from '../ApicurioRegistryEntityBase';
import type { ApicurioRegistrySDK } from '../ApicurioRegistrySDK';
import type { Control } from '../types';
import type { Content, ContentCreateData } from '../ApicurioRegistryTypes';
declare class ContentEntity extends ApicurioRegistryEntityBase<Content> {
    constructor(client: ApicurioRegistrySDK, entopts: any);
    make(this: ContentEntity): ContentEntity;
    create(this: any, reqdata?: ContentCreateData, ctrl?: Control): Promise<ContentEntity>;
}
export { ContentEntity };
