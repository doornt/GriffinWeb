import { NativeEvent } from "../Interface/NativeEvent";
import { Application } from "../Application/Application";

export class NativeToJs {
    public static init() {
        (<any>global).dispatchEventToJs = (rootViewId: string, event: NativeEvent) => {
            console.log(JSON.stringify(event))
            Application.instance.handleEventFromNative(rootViewId, event)
        }
    }
} 