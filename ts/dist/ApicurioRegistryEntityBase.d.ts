import { inspect } from 'node:util';
import { ApicurioRegistrySDK } from './ApicurioRegistrySDK';
import { Utility } from './utility/Utility';
import type { Context } from './types';
declare class ApicurioRegistryEntityBase<D = any> {
    name: string;
    name_: string;
    Name: string;
    _client: ApicurioRegistrySDK;
    _utility: Utility;
    _entopts: any;
    _data: Partial<D>;
    _match: Partial<D>;
    _entctx: Context;
    _deleted: boolean;
    constructor(client: ApicurioRegistrySDK, entopts: any);
    markDeleted(this: any): void;
    deleted(this: any): boolean;
    entopts(): any;
    client(): ApicurioRegistrySDK;
    data(this: any, data?: Partial<D>): D;
    match(this: any, match?: Partial<D>): Partial<D>;
    stream(this: any, action: string, args?: any, callopts?: any): AsyncGenerator<any>;
    toJSON(): any;
    toString(): string;
    [inspect.custom](): string;
    _unexpected(this: any, ctx: Context, err: any): any;
}
export { ApicurioRegistryEntityBase };
