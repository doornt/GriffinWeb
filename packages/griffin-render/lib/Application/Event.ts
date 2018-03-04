declare var global:any

export class EventCenter{

    private static $inst = new EventCenter()

    private $listeners:{
        [type:string]:Array<Function>
    } = {}

    private constructor(){
        this.$init()
    }

    public static get instance(){
        return this.$inst
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

    public emit(type:'start'|'url',...args){
        switch(type){
            case 'start':{
                global.onRuntimeLoadFinish()
                break
            }
            case 'url':{
                let arry = this.$listeners.url || []
                for(let cb of arry){
                    cb(...args)
                }
                break
            }
        }
    }

    public on(type:'loaded'|'view'|'register'|'url',cb:Function){
        let arry = this.$listeners[type] || []
        arry.push(cb)
        this.$listeners[type] = arry
    }
} 