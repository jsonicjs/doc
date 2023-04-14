/* Copyright (c) 2023 Richard Rodger, MIT License */

const { Gubu } = require('gubu')
const { Carn } = require('@rjrodger/carn')

const { GeneratorMap } = require('..')

let gs0 = Gubu({

  a$: 'The A Value',
  a: 1,

  b: 'B'
})
let c0 = new Carn()
GeneratorMap['options~md'](gs0, c0)

console.log(c0.src())
