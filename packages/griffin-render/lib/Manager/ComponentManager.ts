export class ComponentManager{

    private static $inst
    private _registeredClass:{[name:string]:object} = {}

    private constructor(){}

    public static get instance(){
        if(!this.$inst){
            this.$inst = new ComponentManager()
        }
        return this.$inst
    }

    public autoRegister(name:string,ctr:object){
        this._registeredClass[name] = ctr
    }

}