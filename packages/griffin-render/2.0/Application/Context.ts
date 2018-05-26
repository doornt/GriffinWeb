import { EventSystem } from "../Event/EventSystem";
import { PageView } from "../Components/PageView";
import { MemoryMap } from "./MemoryMap";

export class Context{
    private params:{[key:string]:any} = {}

    private page:PageView = null

    constructor(params?:{[key:string]:any}){
        this.params = params || {}
        this.page = new PageView()
        MemoryMap.addContext(this.page.id,this)

        EventSystem.instance.dom.pushRoot(this.page.id)
    }

    public push(url:string){
        EventSystem.instance.dom.pushUrl(url)
    }
}