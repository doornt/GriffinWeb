declare var global:any

export class EventCenter{

    private $listeners:{
        [type:string]:Array<Function>
    } = {}

    public constructor(){
        this.$init()
    }

    private $init(){
        global.runtimeLoadedResponse = ()=>{
            let arry = this.$listeners.loaded || []
            for(let cb of arry){
                cb()
            }
        }
        
        global.dispatchEventToJs = (rid:string,data:any) =>{
            let arry = this.$listeners.view || []
            for(let cb of arry){
                cb(rid,data)
            }
        };

        global.registerNativeComponent = (tagName:string) =>{
            let arry = this.$listeners.register || []
            for(let cb of arry){
                cb(tagName)
            }
        }
    }

    public emit(type:'start'){
        global.onRuntimeLoadFinish()
    }

    public on(type:'loaded'|'view'|'register',cb:Function){
        let arry = this.$listeners[type] || []
        arry.push(cb)
        this.$listeners[type] = arry
    }
} 