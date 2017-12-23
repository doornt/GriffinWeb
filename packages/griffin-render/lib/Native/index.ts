import {IPugAttr} from "../Interface/INode"

declare var createView:Function
declare var setRootView:Function
declare var addSubview:Function


export class NativeManager{

    public static createView(attr:any){
        return createView(attr)
    }

    public static setRootView(view){
        return setRootView(view)
    }

    public static addSubview(view1,view2){
        return addSubview(view1,view2)
    }
}