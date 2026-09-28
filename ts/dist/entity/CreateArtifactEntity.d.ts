import { ApicurioRegistryEntityBase } from '../ApicurioRegistryEntityBase';
import type { ApicurioRegistrySDK } from '../ApicurioRegistrySDK';
import type { Control } from '../types';
import type { CreateArtifact, CreateArtifactCreateData } from '../ApicurioRegistryTypes';
declare class CreateArtifactEntity extends ApicurioRegistryEntityBase<CreateArtifact> {
    constructor(client: ApicurioRegistrySDK, entopts: any);
    make(this: CreateArtifactEntity): CreateArtifactEntity;
    create(this: any, reqdata?: CreateArtifactCreateData, ctrl?: Control): Promise<CreateArtifactEntity>;
}
export { CreateArtifactEntity };
