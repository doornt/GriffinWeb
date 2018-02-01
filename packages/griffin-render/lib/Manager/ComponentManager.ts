import { IDOMAtrr } from "../Interface/INode";
import { RenderComponent } from "../Runtime/VDOM/RenderComponent";
import { Application } from "../Runtime/Application/Application";

export class ComponentManager {

    private static $inst: ComponentManager

    private _registeredClass: { [name: string]: any } = {}

    private constructor() { }

    public static get instance() {
        if (!this.$inst) {
            this.$inst = new ComponentManager()
        }
        return this.$inst
    }

    public register(name: string, ctr: object) {
        this._registeredClass[name] = ctr
    }

    public createViewByTag(tag: string, attrs: Array<IDOMAtrr>, styles) {
        console.log("createViewByTag", tag)
        let T = this._registeredClass[tag]
        if (!T) {
            console.warn("unsupported tag", tag)
            return null
        }
        let view = new T(tag,attrs, styles) as RenderComponent
        Application.instance.registerView(view)
        return view
    }

    public registerNativeView(tagName:string){
        
    }

}