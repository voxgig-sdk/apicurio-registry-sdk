import { ApicurioRegistryEntityBase } from '../ApicurioRegistryEntityBase';
import type { ApicurioRegistrySDK } from '../ApicurioRegistrySDK';
import type { Control } from '../types';
import type { ArtifactType, ArtifactTypeListMatch } from '../ApicurioRegistryTypes';
declare class ArtifactTypeEntity extends ApicurioRegistryEntityBase<ArtifactType> {
    constructor(client: ApicurioRegistrySDK, entopts: any);
    make(this: ArtifactTypeEntity): ArtifactTypeEntity;
    list(this: any, reqmatch?: ArtifactTypeListMatch, ctrl?: Control): Promise<ArtifactTypeEntity[]>;
}
export { ArtifactTypeEntity };
