var loader = require('../lib/index')

var path = require('path')

let filename = path.resolve(__dirname,'../examples/a.pug')

var str = require('fs').readFileSync(filename, 'utf8')


loader(str)
// require('./b.js')