"use strict";
/* Copyright (c) 2023 Richard Rodger, MIT License */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonicDoc = void 0;
const path_1 = __importDefault(require("path"));
const gubu_1 = require("gubu");
const gubu_gen_1 = require("gubu-gen");
class JsonicDoc {
    constructor(spec, ctx) {
        // TODO: deep
        this.spec = spec;
        try {
            const mod = require(this.spec.folder);
            this.plugin = mod[this.spec.name];
            if (null == this.plugin) {
                this.plugin =
                    mod[this.spec.name[0].toUpperCase() + this.spec.name.substring(1)];
            }
            if (null == this.plugin) {
                ctx.errs.push('No plugin found for name: ' +
                    this.spec.name +
                    ' in package at: ' +
                    this.spec.folder);
            }
        }
        catch (e) {
            ctx.errs.push(e.message);
        }
    }
    genOptionsMD() {
        const defaults = this.plugin.defaults;
        // console.log('DEF', defaults)
        const defaultsShape = (0, gubu_1.Gubu)(defaults);
        // TODO: support case insensitive
        const target = path_1.default.join(this.spec.folder, 'README.md');
        // TODO: capture errors in ctx.errs
        const gubugen = new gubu_gen_1.GubuGen();
        gubugen.generate({
            shape: defaultsShape,
            generator: 'options',
            format: 'md',
            target,
        });
    }
}
exports.JsonicDoc = JsonicDoc;
JsonicDoc.defaults = {
    folder: '',
    name: '',
};
//# sourceMappingURL=jsonic-doc.js.map