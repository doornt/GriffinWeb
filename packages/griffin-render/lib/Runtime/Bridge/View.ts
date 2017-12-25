declare var global:{
    [k:string]:any
}

export class ViewManager{

    public static createView(attr:any){
        console.log("createView call:" + JSON.stringify(attr))
        return global.createView(attr)
    }

    public static createText(attr:any){
        
        console.log("createText call:" + JSON.stringify(attr))
        return global.createLabel(attr)
    }

    public static setRootView(view){
        
        console.log("setRootView call:",view )
        return global.setRootView(view)
    }

    public static addSubview(view1,view2){
       
        console.log("addSubview call:",view1,view2)
        return global.addSubview(view1,view2)
    }


}