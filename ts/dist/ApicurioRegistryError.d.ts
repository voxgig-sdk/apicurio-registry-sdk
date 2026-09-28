import { Context } from './Context';
declare class ApicurioRegistryError extends Error {
    isApicurioRegistryError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { ApicurioRegistryError };
