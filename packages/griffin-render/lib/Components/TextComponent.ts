import { RenderComponent } from "./RenderComponent";
import { IPugAttr } from "../Interface/INode";
import { NativeManager } from "../Native/index";


export class TextComponent extends RenderComponent{
    constructor(attrs:Array<IPugAttr>){
       super(attrs)
    }

    protected createView(){
        this.$nativeView = NativeManager.createText(this.$attr)

    }
}