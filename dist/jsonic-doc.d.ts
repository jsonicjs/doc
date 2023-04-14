type Exit = (exit_code: number) => void;
type Context = {
    console: Console;
    exit: Exit;
    errs: any[];
};
type JsonicDocSpec = {
    folder?: string;
    name?: string;
};
type JsonicDocSpecValid = {
    folder: string;
    name: string;
};
declare class JsonicDoc {
    static defaults: {
        folder: string;
        name: string;
    };
    spec: JsonicDocSpecValid;
    plugin: any;
    constructor(spec: JsonicDocSpec, ctx: Context);
    genOptionsMD(): void;
}
export type { Context };
export { JsonicDoc };
