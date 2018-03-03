
import { Context } from './Context';
declare var global:any

export class TaskCenter{

    private $context:Context

    public constructor(ctx:Context){
        this.$context = ctx
    }

    public postMessage(type:'view'|'root'|'add'|'removeChildren',data:any){
        let rid = this.$context.rid;
        // console.log(type,JSON.stringify(data))
        switch(type){
            case 'view':{
                global.createElement(rid,data.nodeId, data)
                break
            }
            case 'root':{
                global.createRootView(rid)
                break
            }
            case 'add':{
                global.addViews(rid,data.parentId, data.ids)
                break
            }
            case 'removeChildren':{
                return global.removeChildren(rid,data.nodeId)
            }
            default:
            break
        }
    }
}