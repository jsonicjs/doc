/* Copyright (c) 2023 Richard Rodger, MIT License */

import { Gubu } from 'gubu'
import { GubuGen } from 'gubu-gen'

class JsonicDoc {
  static defaults = {
    folder: '',
    name: '',
  }

  constructor(spec: any) {
    console.log('JSONICDOC spec', spec)

    const mod = require(spec.folder)

    let plugin = mod[spec.name]
    if (null == plugin) {
      plugin = mod[spec.name[0].toUpperCase() + spec.name.substring(1)]
    }

    const defaults = plugin.defaults
    const defaultsShape = Gubu(defaults)

    const gubugen = new GubuGen()
    gubugen.generate({
      shape: defaultsShape,
    })
  }
}

export { JsonicDoc }
