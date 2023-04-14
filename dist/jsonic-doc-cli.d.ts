type Exit = (exit_code: number) => void;
type Context = {
    console: Console;
    exit: Exit;
};
export declare function run(argv: string[], ctx: Context): Promise<void>;
export {};
