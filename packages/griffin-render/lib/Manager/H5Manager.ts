import { IDOMAtrr } from "../Interface/INode";
import { H5Component } from "../Runtime/VDOM/H5Component";
import { Application } from "../Runtime/Application/Application";
import { RenderNode } from '../Runtime/VDOM/RenderNode';

export class H5Manager {

    private static $inst: H5Manager

    private _registeredClass: { [name: string]: any } = {}

    private constructor() { }

    public static get instance() {
        if (!this.$inst) {
            this.$inst = new H5Manager()
        }
        return this.$inst
    }

    public register(name: string, ctr: object) {
        this._registeredClass[name] = ctr
    }

    public createViewByTag(tag: string, attrs: Array<IDOMAtrr>, styles) {
        let T = this._registeredClass[tag]
        if (!T) {
            console.warn("unsupported tag", tag)
            return null
        }
        let view = new T(tag,attrs, styles) as RenderNode
        Application.instance.registerComponent(view)
        return view
    }

    public registerNativeView(tagName:string){
        
    }

}