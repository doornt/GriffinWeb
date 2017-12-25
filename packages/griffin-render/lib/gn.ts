import { BaseComponent } from "./Components/BaseComponent";
import { setConsole } from "./Runtime/index";
import { ViewManager } from "./Runtime/index";


const launchWithComponent = (view:BaseComponent)=>{
    ViewManager.setRootView(view.nativeView) 
}


setConsole()


export {BaseComponent,launchWithComponent}