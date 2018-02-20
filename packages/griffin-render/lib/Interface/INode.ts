// export interface IPugAttr{
//     name:string,
//     val:string
// }

// export interface IPugNode{
//     attrs:Array<IPugAttr>,
//     type:string,
//     name:string,
//     block:IPugBlock
// }

// export interface IPugText{
//     attrs:Array<IPugAttr>,
//     type:string,
//     val:string,
// }

// export interface IPugConditional{
//     alternate:IPugBlock,
//     consequent:IPugBlock,
//     test:string,
//     type:string
// }

// export interface IPugBlock{
//     nodes:Array<IPugNode|IPugBlock|IPugConditional|IPugText>,
//     type:string
// }


export interface IStyle{
    selector:string,
    attrs:{
        [attr:string]:string
    }
}

export interface IDOMAtrr{
    name:string,val:any
}

export interface IASTNode{
    "name":string,
    "attributes"?:Array<IDOMAtrr>,
    "children"?:Array<IASTNode>,
    "id"?:string,
    "parentId"?:string,
    "val"?:string  //text 专有
}