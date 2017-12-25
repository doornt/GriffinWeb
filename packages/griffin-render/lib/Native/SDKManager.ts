import { NativeManager } from "../Native/index";
declare var consoleLog:any

export class SDKManager{

    private static $inst:SDKManager

    private constructor(){
    }

    public init(){
        if(console){
            if(!console.log){
                console.log = (...args) =>{
                    consoleLog(...args)
                }
            }
        }
    }

    public static  get instance(){
        if(!this.$inst){
            this.$inst = new SDKManager
        }
        return this.$inst
    }

    public launch(view:any){
        // NativeManager.setRootView(view)
    }
}


