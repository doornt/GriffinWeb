export enum ETaskType{
    VIEW = "view",
    ROOT = "create_root"
}

export enum EViewTask{
    CREATE_VIEW="create_view",
    SET_ROOT = "set_root",
    ADD_VIEWS = "add_views",
    REMOVE_CHILDREN = "remove_children"
}

export interface ICreateData{
    parentId?:string,
    nodeId:string,
    type:string,
    props:any,
    styles:any
}

export interface ITaskEvent{
    action?:EViewTask,
    createData?:ICreateData,
    addViewsData?:{
        ids:Array<string>,
        parentId:string
    },
    removeViewsData?:{
        nodeId:string,
        rootId:string
    }
    
}