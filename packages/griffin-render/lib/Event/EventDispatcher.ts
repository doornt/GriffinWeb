import { Event } from './Event';
import { generateID } from '../Utils/NodeID';

export class EventDispatcher{
    
    private $events:{
        [key:string]:Array<{
            cid:string,
            callback:Function
        }>
    } = {}

    public onEvent(event:Event,callback:Function):string{

        let cid = generateID()

        this.$events[event.type] = this.$events[event.type] || []

        this.$events[event.type].push({
            cid,
            callback
        })

        return cid
    }

    public offEvent(event:Event,identify:string){
        let list = this.$events[event.type]
        if(!list){
            return
        }

        this.$events[event.type] = list.filter(e=>e.cid != identify)
    }
}