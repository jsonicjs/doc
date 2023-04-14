"use strict";
/* Copyright (c) 2023 Richard Rodger, MIT License */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const path_1 = __importDefault(require("path"));
const jsonic_doc_1 = require("./jsonic-doc");
run(process.argv, {
    console,
    exit: (code) => process.exit(code),
    errs: [],
}).catch((e) => console.error(e));
async function run(argv, ctx) {
    let args = handle_args(parse_args(argv), ctx);
    let plugindesc = resolve_plugindesc(args, ctx);
    let jsonicdoc = new jsonic_doc_1.JsonicDoc({
        folder: plugindesc.folder,
        name: plugindesc.name,
    }, ctx);
    handle_errs(ctx);
    jsonicdoc.genOptionsMD();
    handle_errs(ctx);
}
exports.run = run;
function resolve_plugindesc(args, ctx) {
    const plugindesc = {
        folder: '',
        name: '',
    };
    let fullfolder = args.folder;
    if (!path_1.default.isAbsolute(fullfolder)) {
        fullfolder = path_1.default.join(process.cwd(), fullfolder);
    }
    plugindesc.folder = fullfolder;
    plugindesc.name = args.name;
    if ('' === plugindesc.name) {
        plugindesc.name = path_1.default.basename(plugindesc.folder);
    }
    return plugindesc;
}
function handle_args(args, ctx) {
    // resolve file paths etc
    handle_errs(ctx);
    if (args.help) {
        help(ctx);
        ctx.exit(0);
    }
    return args;
}
function handle_errs(ctx) {
    if (0 < ctx.errs.length) {
        ctx.errs.map((err) => {
            console.log('ERROR: ' + err);
        });
        ctx.exit(1);
    }
}
function parse_args(argv) {
    const args = {
        // TODO: move to ctx
        errs: [],
        help: false,
        folder: '',
        name: '',
    };
    let accept_args = true;
    for (let aI = 2; aI < argv.length; aI++) {
        let arg = argv[aI];
        if (accept_args && arg.startsWith('-')) {
            if ('--' === arg) {
                accept_args = false;
            }
            else if ('--folder' === arg || '-f' === arg) {
                args.folder = argv[++aI];
            }
            else if ('--name' === arg || '-n' === arg) {
                args.name = argv[++aI];
            }
            else if ('--help' === arg || '-h' === arg) {
                args.help = true;
            }
            else {
                args.errs.push('Unknown command option: ' + arg);
            }
        }
        else {
            args.errs.push('Unrecognised option: ' + arg);
        }
    }
    return args;
}
function help(ctx) {
    let s = `
Help for jsonic-doc.
`;
    ctx.console.log(s);
}
//# sourceMappingURL=jsonic-doc-cli.js.map