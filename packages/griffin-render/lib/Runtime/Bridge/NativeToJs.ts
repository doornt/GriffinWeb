import { NativeEvent } from "../Interface/NativeEvent";
import { Application } from "../Application/Application";
import {ComponentManager} from "../../Manager/ComponentManager"


declare var global:any;

export class NativeToJs {
    public static init() {
        global.dispatchEventToJs = (rootViewId: string, event: NativeEvent) => {
            console.log(JSON.stringify(event))
            Application.instance.handleEventFromNative(rootViewId, event)
        }

        global.registerNativeComponent = (tagName:string) =>{
            ComponentManager.instance.registerNativeView(tagName)
        }

        global.registerModule = (ctr,name:string)=>{
            global[name] = ctr

            console.log('register module',name)
        }

    }
} 