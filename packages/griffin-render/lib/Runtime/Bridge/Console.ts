declare var global:{
    [key:string]:any
}

export function setConsole(){
    if(global.Environment && global.Environment != 'web'){
        global.console = {
            log:(...args)=>{
                global.NativeLog(...args,"__LOG")
            },
            info:(...args)=>{
                global.NativeLog(...args,"__INFO")
            },
            warn:(...args)=>{
                global.NativeLog(...args,"__WARN")
            },
            error:(...args)=>{
                global.NativeLog(...args,"__ERROR")
            }
        }
    }
}