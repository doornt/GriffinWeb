import { NativeEvent } from "../Interface/NativeEvent";

export class NativeToJs{
    public static init(){
        (<any>global).dispatchEventToJs = (rootViewId:string,event:NativeEvent)=>{
            console.log(JSON.stringify(event))
        }
    }
} 