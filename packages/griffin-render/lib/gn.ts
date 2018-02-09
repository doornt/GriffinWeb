import { Application } from "./Runtime/Application/Application";
// const launchWithComponent = (view: BaseComponent) => {
//     Application.instance.runWithModule(view)
// }

Application.instance.init();

(<any>global).onRuntimeLoadFinish()

export { BaseComponent } from "./Components/BaseComponent"
export {Router} from './Router/index'