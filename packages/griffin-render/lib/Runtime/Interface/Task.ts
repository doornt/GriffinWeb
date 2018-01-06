import { BaseComponent } from "../../gn";

export enum ETaskType{
    VIEW = "view",
    ROOT = "create_root"
}

export enum EViewTask{
    CREATE_VIEW="create_view",
    SET_ROOT = "set_root",
    ADD_CHILD = "add_child",
    ADD_SUBVIEW = "add_subview",
    
}

export interface ICreateData{
    parentId?:string,
    nodeId:string,
    type:string,
    styles:any
}

export interface ICreateRootData{
    nodeId:string
}

export interface IAddSubviewData{
    nodeId:string,
    parentId:string
}

export interface ITaskEvent{
    action?:EViewTask,
    createData?:ICreateData,
    createRootData?:ICreateRootData,
    addSubviewData?:IAddSubviewData,
    
}