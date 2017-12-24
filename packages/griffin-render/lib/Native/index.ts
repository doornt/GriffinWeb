import {IPugAttr} from "../Interface/INode"
import { BaseComponent } from "../Components/BaseComponent";

declare var createView:Function
declare var setRootView:Function
declare var addSubview:Function
declare var consoleLog:any


export class NativeManager{

    public static createView(attr:any){
        consoleLog("\ncreateView call:" + JSON.stringify(attr))
        return createView(attr)
    }

    public static setRootView(view){
        consoleLog("\nsetRootView call:" )
        consoleLog(view)
        return setRootView(view)
    }

    public static addSubview(view1,view2){
        consoleLog("\naddSubview call:" + JSON.stringify(view1))
        return addSubview(view1,view2)
    }

    public static Log(arg:any){
        return consoleLog(arg)
    }
}