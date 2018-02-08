import { BaseComponent } from '../Components/BaseComponent';
import { JSLibrary } from '../Runtime/Bridge/JsLibrary';
import { launchWithComponent } from '../gn';


export class Router{

    private $routes:{
        [key:string]:{
            component:any,
            name:string
        }
    } = {}

    private $running = false

    private $stack = []

    private $defaultRoute:string

    constructor(cfg:{
        routes:Array<{name:string,component:any}>,
        default?:string
    }){
        cfg.routes.map(r=>{
            this.$routes[r.name] = r
        })
        
        if(cfg.default){
            this.$defaultRoute = cfg.default
        }
    }

    public push(route:{name:string,params?:any}){
        // JSLibrary.navigator.push()
        let r = this.$routes[route.name]
        if(!r){
            return console.error("no route named ",route.name)
        }
        let ctor = (new r.component) as BaseComponent

        this.$stack.push(ctor)

        JSLibrary.navigator.push({id:ctor.id},()=>{})
        
    }

    public run(){
        if(this.$running){
            return
        }
        if(this.$defaultRoute && this.$routes[this.$defaultRoute]){
            this.push({name:this.$defaultRoute})
            launchWithComponent(this.$stack[0])
        }
    }
    
}