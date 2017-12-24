import { BaseComponent } from "./Components/BaseComponent";
import { NativeManager } from "./Native/index";

const launchWithComponent = (view:BaseComponent)=>{
    NativeManager.Log("launch")
    NativeManager.setRootView(view.nativeView) 
}

// debugger

// const A

export {BaseComponent,launchWithComponent}