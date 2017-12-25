import { BaseComponent } from "./Components/BaseComponent";
import { NativeManager } from "./Native/index";
import { SDKManager } from "./Native/SDKManager";

const launchWithComponent = (view:BaseComponent)=>{
    NativeManager.setRootView(view.nativeView) 
}

SDKManager.instance.init()

// debugger

// const A

export {BaseComponent,launchWithComponent}