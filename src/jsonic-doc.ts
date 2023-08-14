/* Copyright (c) 2023 Richard Rodger, MIT License */

import Path from 'path'

import { Gubu } from 'gubu'
import { GubuGen } from 'gubu-gen'

type Exit = (exit_code: number) => void

type Context = {
  console: Console
  exit: Exit
  errs: any[]
}

type JsonicDocSpec = {
  folder?: string
  name?: string
}

type JsonicDocSpecValid = {
  folder: string
  name: string
}

class JsonicDoc {
  static defaults = {
    folder: '',
    name: '',
  }

  spec: JsonicDocSpecValid
  plugin: any

  constructor(spec: JsonicDocSpec, ctx: Context) {
    // TODO: deep
    this.spec = spec as any

    try {
      const mod = require(this.spec.folder)
      const meta = mod.meta || {}

      const name = meta.name || this.spec.name

      this.plugin = mod[name]

      if (null == this.plugin) {
        this.plugin =
          mod[this.spec.name[0].toUpperCase() + this.spec.name.substring(1)]
      }

      if (null == this.plugin) {
        ctx.errs.push(
          'No plugin found for name: ' +
            this.spec.name +
            ' in package at: ' +
            this.spec.folder,
        )
      }
    } catch (e: any) {
      ctx.errs.push(e.message)
    }
  }

  genOptionsMD() {
    const defaults = this.plugin.defaults
    // console.log('DEF', defaults)

    const defaultsShape: any = Gubu(defaults)

    // TODO: support case insensitive
    const target = Path.join(this.spec.folder, 'README.md')

    // TODO: capture errors in ctx.errs
    const gubugen = new GubuGen()
    gubugen.generate({
      shape: defaultsShape,
      generator: 'options',
      format: 'md',
      target,
    })
  }
}

export type { Context }

export { JsonicDoc }
