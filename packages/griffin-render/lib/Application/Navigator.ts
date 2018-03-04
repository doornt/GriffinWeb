import { Context } from "./Context";

declare var global:any

export class Navigator{
    static $inst:Navigator = new Navigator()

    private constructor(){}

    public static get instance(){
        return this.$inst
    }

    public push(ctx:Context,animated:boolean = true){
        global.Navigator().push(ctx.rid, animated, ()=>{
            console.log('native navigator success')
        })
    }

    public pop(animated:boolean = true){
        global.Navigator().pop(animated, ()=>{})
    }

}