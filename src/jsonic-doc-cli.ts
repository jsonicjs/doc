/* Copyright (c) 2023 Richard Rodger, MIT License */

import Path from 'path'
import Fs from 'fs'

import type { Context } from './jsonic-doc'
import { JsonicDoc } from './jsonic-doc'

type Args = {
  errs: string[]
  help: boolean
  folder: string
  name: string
}

run(process.argv, {
  console,
  exit: (code: number) => process.exit(code),
  errs: [],
}).catch((e) => console.error(e))

export async function run(argv: string[], ctx: Context) {
  let args = handle_args(parse_args(argv), ctx)

  let plugindesc = resolve_plugindesc(args, ctx)

  let jsonicdoc = new JsonicDoc(
    {
      folder: plugindesc.folder,
      name: plugindesc.name,
    },
    ctx,
  )
  handle_errs(ctx)

  jsonicdoc.genOptionsMD()
  handle_errs(ctx)
}

function resolve_plugindesc(args: Args, ctx: Context) {
  const plugindesc = {
    folder: '',
    name: '',
  }

  let fullfolder = args.folder
  if (!Path.isAbsolute(fullfolder)) {
    fullfolder = Path.join(process.cwd(), fullfolder)
  }
  plugindesc.folder = fullfolder

  plugindesc.name = args.name
  if ('' === plugindesc.name) {
    plugindesc.name = Path.basename(plugindesc.folder)
  }

  return plugindesc
}

function handle_args(args: any, ctx: Context) {
  // resolve file paths etc

  handle_errs(ctx)

  if (args.help) {
    help(ctx)
    ctx.exit(0)
  }

  return args
}

function handle_errs(ctx: Context): any {
  if (0 < ctx.errs.length) {
    ctx.errs.map((err: string) => {
      console.log('ERROR: ' + err)
    })
    ctx.exit(1)
  }
}

function parse_args(argv: string[]) {
  const args = {
    // TODO: move to ctx
    errs: [] as string[],

    help: false,
    folder: '',
    name: '',
  }

  let accept_args = true
  for (let aI = 2; aI < argv.length; aI++) {
    let arg = argv[aI]

    if (accept_args && arg.startsWith('-')) {
      if ('--' === arg) {
        accept_args = false
      } else if ('--folder' === arg || '-f' === arg) {
        args.folder = argv[++aI]
      } else if ('--name' === arg || '-n' === arg) {
        args.name = argv[++aI]
      } else if ('--help' === arg || '-h' === arg) {
        args.help = true
      } else {
        args.errs.push('Unknown command option: ' + arg)
      }
    } else {
      args.errs.push('Unrecognised option: ' + arg)
    }
  }

  return args
}

function help(ctx: Context) {
  let s = `
Help for jsonic-doc.
`

  ctx.console.log(s)
}
