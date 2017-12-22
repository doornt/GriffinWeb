 var pug = require('./lib')

var str = require('fs').readFileSync(__dirname + '/../examples/a.pug', 'utf8')

var fn = pug.compile(str)