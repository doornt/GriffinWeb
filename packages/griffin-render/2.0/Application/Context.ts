import { EventSystem } from "../Event/EventSystem";

export class Context{
    private params:{[key:string]:any} = {}

    constructor(params:{[key:string]:any}){
        this.params = params || {}
    }

    public push(url:string){
        EventSystem.instance.dom.pushUrl(url)
    }
}