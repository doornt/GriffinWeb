var pug = require('pug')

var path = require('path')

let filename = path.resolve(__dirname,'../examples/a.pug')

var str = require('fs').readFileSync(filename, 'utf8')

var fn = pug.compile(str,{filename})

var s = fn({test:1})

console.error(fn)