import {Router} from './Router'
import {Context} from './Context'
import * as Html5 from "../Html5/index"
import { EventCenter } from './Event';
import { H5Manager } from '../Manager/H5Manager';
import { Runtime } from '../Runtime/runtime';
import { Response } from './CommonClass';
declare var global:any

let flag = false

export class App {
    
    private $routes: Array<Router> = []

    private $sessions:Array<Context> = []

    private $event:EventCenter = EventCenter.instance

    public constructor(){
        if(flag){
            throw new Error('cannot init twice')
        }
        flag = true
        this.setConsole()
        Html5.setup()
        this.$setupFetch()

        Runtime.instance.setApplication(this)
        
    }

    private $setupFetch(){
        global.fetch = (url,params: { [key: string]: any }) => new Promise((resolve,reject)=>{
            global.nativeFetch(url, params, (data)=>{
                let resp = new Response(data,url)
                resolve(resp)
            })
        })
    }

    public get env() {
        return (<any>global).Environment
    }

    public setConsole(){
        global.console = {
            log:(...args)=>{
                global.NativeLog(...args,"__LOG")
            },
            info:(...args)=>{
                global.NativeLog(...args,"__INFO")
            },
            warn:(...args)=>{
                global.NativeLog(...args,"__WARN")
            },
            error:(...args)=>{
                global.NativeLog(...args,"__ERROR")
            }
        }
    }

    private $onRequest(ctx:Context){
        let reg = new RegExp(ctx.request.path)
        let flag = false
        for(let router of this.$routes){
            for(let p of router.pathes){
                if(reg.test(p)){
                    router.getRuntime(p)(ctx)
                    if(!ctx.hasNext){
                        flag = true
                        break
                    }
                }
            }
            if(flag){
                break
            }
        }
        this.$sessions.push(ctx)
    }


    public use(router:Router){
        this.$routes.push(router)
    }

    public run(){

        this.$event.on('register',(tagName:string)=>{
            H5Manager.instance.registerNativeView(tagName)
        })

        this.$event.on('loaded',()=>{
            this.$onRequest(new Context('/'))
        })

        this.$event.emit('start')
        

        this.$event.on('view',(rid:string,data:any)=>{
            for(let ctx of this.$sessions){
                if(ctx.rid == rid){
                    ctx.onMessage(data)
                    break
                }
            }
        })

        this.$event.on('url',(path:string,data:any)=>{
            let ctx = new Context(path)
            this.$onRequest(ctx)
        })
        
    }
}

