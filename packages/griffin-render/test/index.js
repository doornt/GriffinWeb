const GN = require('../dist/gn')
const { Router, BaseComponent }  = GN
const App = GN.default
const path = require("path")

const loader = require('../../griffin-loader/lib')
let filename = path.resolve(__dirname, '../../griffin-loader/examples/b.pug')
let str = require('fs').readFileSync(filename, 'utf8')
let res = loader(str, true)

const {EventSystem} = require('../dist/Event/EventSystem')

const app = new App()


const router = new Router()

router.use('/', ctx => {
    ctx.render(BaseComponent)
})

app.addRoute(router)

app.listen()


EventSystem.instance.bridge.dispatch('load')
