import { NativeEvent } from "../Interface/NativeEvent";
import { Application } from "../Application/Application";
import {ComponentManager} from "../../Manager/ComponentManager"

export class NativeToJs {
    public static init() {
        (<any>global).dispatchEventToJs = (rootViewId: string, event: NativeEvent) => {
            console.log(JSON.stringify(event))
            Application.instance.handleEventFromNative(rootViewId, event)
        }

        (<any>global).registerNativeComponent = (tagName:string) =>{
            ComponentManager.instance.registerNativeView(tagName)
        }
    }
} 