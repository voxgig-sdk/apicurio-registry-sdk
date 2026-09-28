import { ApicurioRegistryEntityBase } from '../ApicurioRegistryEntityBase';
import type { ApicurioRegistrySDK } from '../ApicurioRegistrySDK';
import type { Control } from '../types';
import type { ArtifactReference, ArtifactReferenceListMatch, ArtifactReferenceCreateData } from '../ApicurioRegistryTypes';
declare class ArtifactReferenceEntity extends ApicurioRegistryEntityBase<ArtifactReference> {
    constructor(client: ApicurioRegistrySDK, entopts: any);
    make(this: ArtifactReferenceEntity): ArtifactReferenceEntity;
    list(this: any, reqmatch?: ArtifactReferenceListMatch, ctrl?: Control): Promise<ArtifactReferenceEntity[]>;
    create(this: any, reqdata?: ArtifactReferenceCreateData, ctrl?: Control): Promise<ArtifactReferenceEntity>;
}
export { ArtifactReferenceEntity };
