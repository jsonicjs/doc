"use strict";
/* Copyright (c) 2023 Richard Rodger, MIT License */
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonicDoc = void 0;
const gubu_1 = require("gubu");
const gubu_gen_1 = require("gubu-gen");
class JsonicDoc {
    constructor(spec) {
        console.log('JSONICDOC spec', spec);
        const mod = require(spec.folder);
        let plugin = mod[spec.name];
        if (null == plugin) {
            plugin = mod[spec.name[0].toUpperCase() + spec.name.substring(1)];
        }
        const defaults = plugin.defaults;
        const defaultsShape = (0, gubu_1.Gubu)(defaults);
        const gubugen = new gubu_gen_1.GubuGen();
        gubugen.generate({
            shape: defaultsShape,
        });
    }
}
exports.JsonicDoc = JsonicDoc;
JsonicDoc.defaults = {
    folder: '',
    name: '',
};
//# sourceMappingURL=jsonic-doc.js.map