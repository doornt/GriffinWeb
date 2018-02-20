import { TaskManager } from "../Bridge/TaskManager";
import { ETaskType, ITaskEvent, EViewTask } from "../Interface/Task";
import { generateID } from "../../Utils/NodeID";
import { H5Component } from "./H5Component";
import { NativeEvent } from "../Interface/NativeEvent";
import { BaseComponent } from '../../Components/BaseComponent';
import { IDOMAtrr } from '../../Interface/INode';
import { H5Manager } from '../../Manager/H5Manager';
import { RenderNode } from "./RenderNode";
import { Instance } from './Instance';

export class RootView {

    private $rootId = null

    private $component: BaseComponent = null

    private $viewsMap: { [id: string]: RenderNode } = {}

    private $componentMap:{[id:string]:BaseComponent} = {}

    private $taskManager:TaskManager

    private constructor() {
        this.$rootId = generateID()
        this.$taskManager = TaskManager.create(this.$rootId)
        this.$taskManager.send(ETaskType.ROOT)
        Instance.addRootView(this.$rootId,this)
    }

    public get id() {
        return this.$rootId
    }

    public get taskManager():TaskManager{
        return this.$taskManager
    }

    public getViewById(id:string){
        return this.$viewsMap[id]
    }

    public viewIds(){
        return Object.keys(this.$viewsMap)
    }

    public getCoponentById(id:string){
        return this.$componentMap[id]
    }

    public createView(tagName:string,props:{
        attr:any,
        style:any
    }){

    }

    public static create(): RootView {
        return new RootView()
    }

    public set component(T: typeof BaseComponent) {
        let t = new T()
        this.$component = t
        t.rootViewId = this.$rootId
        this.$taskManager.send(ETaskType.VIEW, {
            action: EViewTask.ADD_VIEWS,
            addViewsData: { parentId: this.id, ids: [this.$component.id] }
        })
    }

    public addComponent(id:string,c:BaseComponent){
        this.$componentMap[id] = c
    }

    public createElement(tag: string, attrs: Array<IDOMAtrr>, styles){
        let T = H5Manager.instance.getElementType(tag)
        if(T){
            let view = new T() as RenderNode
            view.tagName = tag
            view.attr = attrs
            view.style = styles
            view.rootViewId = this.$rootId
            this.$viewsMap[view.id] = view
            return view
        }else{
            return null
        }
        
    }


}