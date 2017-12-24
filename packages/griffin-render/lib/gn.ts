import { BaseComponent } from "./Components/BaseComponent";
import { NativeManager } from "./Native/index";

const launchWithComponent = (view:BaseComponent)=>{
    NativeManager.setRootView(view.nativeView) 
}

// debugger

// const A

export {BaseComponent,launchWithComponent}