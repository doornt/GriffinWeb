import { NativeEvent } from "../Interface/NativeEvent";
import { Application } from "../Application/Application";
import {H5Manager} from "../../Manager/H5Manager"
import { Instance } from '../DOM/Instance';


declare var global:any;

export class NativeToJs {
    public static init() {
        global.dispatchEventToJs = (rid: string, event: NativeEvent) => {
            console.log(JSON.stringify(event))
            Instance.handleEventFromNative(rid, event)
        }

        global.registerNativeComponent = (tagName:string) =>{
            H5Manager.instance.registerNativeView(tagName)
        }

        global.registerModule = (ctr,name:string)=>{
            global[name] = ctr

            console.log('register module',name)
        }

    }
} 