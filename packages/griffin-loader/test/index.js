var loader = require('../lib/index')

var path = require('path')

let filename = path.resolve(__dirname, '../examples/a.pug')

var str = require('fs').readFileSync(filename, 'utf8')


// let res = loader(str)
// console.log(res.AstFunc({a:1,b:2}))
// require('./b.js')

var pug = require('pug')
var fn = pug.compile(str)
var res = fn({})