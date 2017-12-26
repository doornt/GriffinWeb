import { setConsole } from "../Bridge/Console";
import { NativeToJs } from "../Bridge/NativeToJs";

export function setup(){
    setConsole()
    NativeToJs.init()
}