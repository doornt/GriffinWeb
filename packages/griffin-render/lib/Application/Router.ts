import { Context } from './Context';

export class Router{

    private $pathMap:{
        [key:string]:(ctx:Context)=>void
    } = {}

    public use(path:string,func:(ctx:Context)=>void){
       this.$pathMap[path] = func
       
    }

    public get pathes(){
        return Object.keys(this.$pathMap)
    }

    public getRuntime(path:string){
        return this.$pathMap[path]
    }


}
