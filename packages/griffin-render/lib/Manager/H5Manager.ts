import { IDOMAtrr } from "../Interface/INode";
import { H5Component } from "../Runtime/DOM/H5Component";
import { RenderNode } from '../Runtime/DOM/RenderNode';
import { BaseComponent } from '../Components/BaseComponent';
import { NativeTag } from '../Html5/native';

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
        console.log("register native view",tagName)
        this._registeredClass[tagName] = NativeTag
    }

}