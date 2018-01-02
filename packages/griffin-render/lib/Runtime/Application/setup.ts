import { setConsole } from "../Bridge/Console";
import { NativeToJs } from "../Bridge/NativeToJs";
import * as JSLibrary from "../Bridge/JsLibrary"

export function setup(){
    setConsole()
    NativeToJs.init()
    JSLibrary.init()

}