import { EventSystem } from "../Event/EventSystem";
import { Response } from "../Interface/Resp";

let flag = 0

declare var global:any
export class Entry{

    public setConsole(){
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

    private setFetch(){
        global.fetch = (url,params: { [key: string]: any }) => new Promise((resolve,reject)=>{
            global.nativeFetch(url, params, (data)=>{
                let resp = new Response(data,url)
                resolve(resp)
            })
        })
    }

    public start(){
        if(flag){
            return
        }

        try {
            this.setConsole()
            this.setFetch()
            EventSystem.instance.start()
        } catch (error) {
            throw new Error(error)
        }

    }
}