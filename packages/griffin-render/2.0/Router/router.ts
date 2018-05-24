import pathToRegExp = require('path-to-regexp')

export class Router{
    private pathes = []

    constructor(){

    }

    use(path:string,match:Function){
        let params = []
        let ops = {}
        let reg = pathToRegExp(path,params,ops)
        this.pathes.push({
            reg,
            match
        })
    }

    private match(path:string){
        return this.pathes.filter(item=>{
            if(item.reg.test(path)){
                return true
            }
            return false
        })
    }


}