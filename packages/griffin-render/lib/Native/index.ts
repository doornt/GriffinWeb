import {IPugAttr} from "../Interface/INode"
import { BaseComponent } from "../Components/BaseComponent";

declare var createView:Function
declare var createLabel:Function
declare var setRootView:Function
declare var addSubview:Function


var isNative = typeof createView != "undefined"

export class NativeManager{

    public static createView(attr:any){
        if(!isNative){
            return
        }
        console.log("createView call:" + JSON.stringify(attr))
        return createView(attr)
    }

    public static createText(attr:any){
        if(!isNative){
            return
        }
        console.log("createText call:" + JSON.stringify(attr))
        return createLabel(attr)
    }

    public static setRootView(view){
        if(!isNative){
            return
        }
        console.log("setRootView call:",view )
        return setRootView(view)
    }

    public static addSubview(view1,view2){
        if(!isNative){
            return
        }
        console.log("addSubview call:",view1,view2)
        return addSubview(view1,view2)
    }


}