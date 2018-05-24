

import Rx = require('rxjs')
import { BridgeSystem } from './BridgeSystem';
import { DOMEventSystem } from './DOMSystem';

declare var global:any

export class EventSystem{

    private static _inst:EventSystem

    private _bridge:BridgeSystem

    private _dom:DOMEventSystem

    private _started:boolean = false

    private constructor(){}

    public static get instance(){
        if(!this._inst){
            this._inst = new EventSystem
        }
        return this._inst
    }

    public createComponentSystem(){

    }

    public get bridge(){
        this._bridge = this._bridge || new BridgeSystem

        return this._bridge
    }

    public get dom(){
        this._dom = this._dom || new DOMEventSystem
        return this._dom
    }

    public start(){
        if(this._started){
            return
        }
        
        this.registerNativeEvent()

        this._started = true
    }

    private registerNativeEvent(){
        global.runtimeLoadedResponse = ()=>{
            this.bridge.dispatch('load')
        }
        
        // global.dispatchEventToJs = (rid:string,data:any) =>{
        //     let arry = this.$listeners.view || []
        //     for(let cb of arry){
        //         cb(rid,data)
        //     }
        // };

        
    }
}