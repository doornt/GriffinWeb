import { setConsole } from "../Bridge/Console";
import { NativeToJs } from "../Bridge/NativeToJs";
import {JSLibrary} from "../Bridge/JsLibrary"

export function setup(){
    setConsole()
    NativeToJs.init()
    JSLibrary.init()
}