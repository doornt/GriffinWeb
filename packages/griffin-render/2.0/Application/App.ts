import {Router} from '../Router/router'
import { Context } from './Context';
import { EventSystem } from '../Event/EventSystem';

declare var global:any;
export class GN{
    private _routes:Array<Router> = []

    addRoute(route:Router){
        this._routes.push(route)
    }

    listen(){
        EventSystem.instance.bridge.on('load',()=>{
            let ctx = new Context(null)
            ctx.push('/')
        })

        EventSystem.instance.dom.onUrl((url:string)=>{
            let matches = []
            for(let route of this._routes){
                let list = route.test(url)
                matches = matches.concat(list)
            }

            for(let route of matches){
                route.match(new Context())
            }
        })

        EventSystem.instance.dom.onRoot((rid:string)=>{
            console.log('on root',rid)
            global.createRootView && global.createRootView(rid)
        })

        EventSystem.instance.dom.onAddChildren((rid,id,children)=>{
            console.log('add children',id,children)
            global.addViews && global.addViews(rid,id, children)

        })
        
    }
}