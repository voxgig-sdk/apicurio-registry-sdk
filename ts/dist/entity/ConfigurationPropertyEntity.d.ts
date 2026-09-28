import { ApicurioRegistryEntityBase } from '../ApicurioRegistryEntityBase';
import type { ApicurioRegistrySDK } from '../ApicurioRegistrySDK';
import type { Control } from '../types';
import type { ConfigurationProperty, ConfigurationPropertyLoadMatch, ConfigurationPropertyListMatch } from '../ApicurioRegistryTypes';
declare class ConfigurationPropertyEntity extends ApicurioRegistryEntityBase<ConfigurationProperty> {
    constructor(client: ApicurioRegistrySDK, entopts: any);
    make(this: ConfigurationPropertyEntity): ConfigurationPropertyEntity;
    load(this: any, reqmatch?: ConfigurationPropertyLoadMatch, ctrl?: Control): Promise<ConfigurationPropertyEntity>;
    list(this: any, reqmatch?: ConfigurationPropertyListMatch, ctrl?: Control): Promise<ConfigurationPropertyEntity[]>;
}
export { ConfigurationPropertyEntity };
