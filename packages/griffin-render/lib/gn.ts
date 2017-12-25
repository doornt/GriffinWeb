import { BaseComponent } from "./Components/BaseComponent";
import { NativeManager } from "./Native/index";
import { setConsole } from "./Runtime/index";


const launchWithComponent = (view:BaseComponent)=>{
    NativeManager.setRootView(view.nativeView) 
}


setConsole()


export {BaseComponent,launchWithComponent}