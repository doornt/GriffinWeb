var pug = require('../lib/compiler')

var path = require('path')

let filename = path.resolve(__dirname,'../examples/a.pug')

var str = require('fs').readFileSync(filename, 'utf8')

var fn = pug.compile(str,{filename})

console.error(fn)

// require('./b.js')