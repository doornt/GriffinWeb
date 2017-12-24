import {IPugAttr} from "../Interface/INode"
import { BaseComponent } from "../Components/BaseComponent";

declare var createView:Function
declare var createLabel:Function
declare var setRootView:Function
declare var addSubview:Function
declare var consoleLog:any

var isNative = typeof createView != "undefined"

export class NativeManager{

    public static createView(attr:any){
        if(!isNative){
            return
        }
        consoleLog("\ncreateView call:" + JSON.stringify(attr))
        return createView(attr)
    }

    public static createText(attr:any){
        if(!isNative){
            return
        }
        consoleLog("\createText call:" + JSON.stringify(attr))
        return createLabel(attr)
    }

    public static setRootView(view){
        if(!isNative){
            return
        }
        consoleLog("\nsetRootView call:" )
        consoleLog(view)
        return setRootView(view)
    }

    public static addSubview(view1,view2){
        if(!isNative){
            return
        }
        consoleLog("\naddSubview call:")
        consoleLog(view1)
        consoleLog(view2)
        return addSubview(view1,view2)
    }

    public static Log(arg:any){
        if(!isNative){
            return
        }
        return consoleLog(arg)
    }


}