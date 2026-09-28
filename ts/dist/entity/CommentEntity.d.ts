import { ApicurioRegistryEntityBase } from '../ApicurioRegistryEntityBase';
import type { ApicurioRegistrySDK } from '../ApicurioRegistrySDK';
import type { Control } from '../types';
import type { Comment, CommentListMatch, CommentCreateData } from '../ApicurioRegistryTypes';
declare class CommentEntity extends ApicurioRegistryEntityBase<Comment> {
    constructor(client: ApicurioRegistrySDK, entopts: any);
    make(this: CommentEntity): CommentEntity;
    list(this: any, reqmatch?: CommentListMatch, ctrl?: Control): Promise<CommentEntity[]>;
    create(this: any, reqdata?: CommentCreateData, ctrl?: Control): Promise<CommentEntity>;
}
export { CommentEntity };
