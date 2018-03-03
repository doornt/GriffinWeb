const {Router} = require('../dist/gn')

const router  = new Router()

// let Com
 
router.use('/',ctx =>{

    ctx.render(require('componentA'))
})

export default router