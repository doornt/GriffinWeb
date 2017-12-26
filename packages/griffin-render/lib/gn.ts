import { BaseComponent } from "./Components/BaseComponent";
import { Application } from "./Runtime/Application/Application";


const launchWithComponent = (view:BaseComponent)=>{
    Application.instance.runWithModule(view) 
}

Application.instance.init()

export {BaseComponent,launchWithComponent}