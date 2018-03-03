import { App } from '../Application/index';

export class Runtime{

    private $app:App

    static $inst:Runtime = new Runtime()

    private constructor(){}

    public static get instance(){
        return this.$inst
    }

    public setApplication(app:App){
        this.$app = app
    }

    public get env(){
        return this.$app && this.$app.env
    }

}