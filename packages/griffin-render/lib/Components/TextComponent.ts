import { RenderComponent } from "./RenderComponent";
import { IPugAttr } from "../Interface/INode";
import { ViewManager } from "../Runtime/index";


export class TextComponent extends RenderComponent{
    constructor(attrs:Array<IPugAttr>){
       super(attrs)
    }

    protected createView(){
        this.$nativeView = ViewManager.createText(this.$attr)

    }
}