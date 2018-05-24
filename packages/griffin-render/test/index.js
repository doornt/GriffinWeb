const { App, Router, BaseComponent } = require('../dist/gn')
const path = require("path")

const loader = require('../../griffin-loader/lib')
let filename = path.resolve(__dirname, '../../griffin-loader/examples/b.pug')
let str = require('fs').readFileSync(filename, 'utf8')
let res = loader(str, true)

const app = new App()


const router = new Router()


const c = new BaseComponent()

router.use('/', ctx => {

    ctx.render(c)
})

app.use(router)

app.run()


