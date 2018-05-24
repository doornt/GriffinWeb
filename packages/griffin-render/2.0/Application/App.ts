import {Router} from '../Router/router'
import { Context } from './Context';
import { EventSystem } from '../Event/EventSystem';

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
        
    }
}