import { RenderComponent } from "../Runtime/VDOM/RenderComponent";
import { IPugAttr } from "../Interface/INode";

export class Div extends RenderComponent{

    constructor(attrs:Array<IPugAttr>){
        super(attrs)
    }

}