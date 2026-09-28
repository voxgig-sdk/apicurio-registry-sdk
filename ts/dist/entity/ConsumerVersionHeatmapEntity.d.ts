import { ApicurioRegistryEntityBase } from '../ApicurioRegistryEntityBase';
import type { ApicurioRegistrySDK } from '../ApicurioRegistrySDK';
import type { Control } from '../types';
import type { ConsumerVersionHeatmap, ConsumerVersionHeatmapListMatch } from '../ApicurioRegistryTypes';
declare class ConsumerVersionHeatmapEntity extends ApicurioRegistryEntityBase<ConsumerVersionHeatmap> {
    constructor(client: ApicurioRegistrySDK, entopts: any);
    make(this: ConsumerVersionHeatmapEntity): ConsumerVersionHeatmapEntity;
    list(this: any, reqmatch?: ConsumerVersionHeatmapListMatch, ctrl?: Control): Promise<ConsumerVersionHeatmapEntity[]>;
}
export { ConsumerVersionHeatmapEntity };
