import { RootView } from './RootView';
import { NativeEvent } from '../Interface/NativeEvent';

const rootMap:{[id:string]:RootView} = {}

export class Instance{
    static addRootView(id:string,view:RootView){
        rootMap[id] = view
    }

    static getRootView(id:string){
        return rootMap[id]
    }

    static removeRootView(id:string){
        if(rootMap[id]){
            delete rootMap[id]
        }
    }

    static handleEventFromNative(rid:string,vid: string, event: NativeEvent) {
        if(!rootMap[rid]){
            return console.error("unexpected root id",rid)
        }
        let root = rootMap[rid]
      
        let view = root.getViewById(vid)
        
        if(!view){
            return console.error('unexpected view id',vid)
        }
        view.$onNativeEvent(event.event)
    }
}