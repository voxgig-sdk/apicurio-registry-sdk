import { ApicurioRegistryEntityBase } from '../ApicurioRegistryEntityBase';
import type { ApicurioRegistrySDK } from '../ApicurioRegistrySDK';
import type { Control } from '../types';
import type { KafkaSql, KafkaSqlCreateData } from '../ApicurioRegistryTypes';
declare class KafkaSqlEntity extends ApicurioRegistryEntityBase<KafkaSql> {
    constructor(client: ApicurioRegistrySDK, entopts: any);
    make(this: KafkaSqlEntity): KafkaSqlEntity;
    create(this: any, reqdata?: KafkaSqlCreateData, ctrl?: Control): Promise<KafkaSqlEntity>;
}
export { KafkaSqlEntity };
