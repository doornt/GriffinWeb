import { BaseComponent } from '../Components/BaseComponent';

export class ComponentCenter{
    private static $inst: ComponentCenter

    private $map:{
        [id:string]:BaseComponent
    } = {}

    private constructor() { }

    public static get instance() {
        if (!this.$inst) {
            this.$inst = new ComponentCenter()
        }
        return this.$inst
    }

    public register(id:string,o:BaseComponent){
        this.$map[id] = o
    }

    public getComponent(id){
        return this.$map[id]
    }

}