import { IDOMAtrr } from "../Interface/INode";
import { H5Component } from "../Runtime/VDOM/H5Component";
import { Application } from "../Runtime/Application/Application";
import { RenderNode } from '../Runtime/VDOM/RenderNode';
import { BaseComponent } from '../Components/BaseComponent';

export class H5Manager {

    private static $inst: H5Manager

    private _registeredClass: { [name: string]: typeof RenderNode } = {}

    private constructor() { }

    public static get instance() {
        if (!this.$inst) {
            this.$inst = new H5Manager()
        }
        return this.$inst
    }

    public register(name: string, T: typeof RenderNode) {
        this._registeredClass[name] = T
    }

    public getElementType(tag:string){
        let T = this._registeredClass[tag]
        if (!T) {
            console.warn("unsupported tag", tag)
            return null
        }
        return T
    }


    public registerNativeView(tagName:string){
        
    }

}