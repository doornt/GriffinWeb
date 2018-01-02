import { IDOMAtrr } from "../Interface/INode";

export class ComponentManager{

    private static $inst:ComponentManager

    private _registeredClass:{[name:string]:any} = {}

    private constructor(){}

    public static get instance(){
        if(!this.$inst){
            this.$inst = new ComponentManager()
        }
        return this.$inst
    }

    public register(name:string,ctr:object){
        this._registeredClass[name] = ctr
    }

    public createViewByTag(tag:string,attrs:Array<IDOMAtrr>,styles){
        let T = this._registeredClass[tag]
        if(!T){
            console.warn("unsupported tag",tag)
            return null
        }
        return new T(attrs,styles)
    }

}