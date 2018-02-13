import { RootView } from './RootView';

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
}