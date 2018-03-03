import { ETaskType, ITaskEvent, EViewTask } from "../Interface/Task";
import { generateID } from "../../Utils/NodeID";
import { H5Component } from "./H5Component";
import { NativeEvent } from "../Interface/NativeEvent";
import { BaseComponent } from '../../Components/BaseComponent';
import { IDOMAtrr } from '../../Interface/INode';
import { H5Manager } from '../../Manager/H5Manager';
import { RenderNode } from "./RenderNode";
import { Context } from '../../Application/Context';

export class RootView {

    private $rootId = null

    private $component: BaseComponent = null

    private $viewsMap: { [id: string]: RenderNode } = {}

    private $componentMap:{[id:string]:BaseComponent} = {}

    private $ctx:Context

    private $componentClz:typeof BaseComponent

    private constructor() {
        this.$rootId = generateID()
    }

    public get id() {
        return this.$rootId
    }

    public attach(ctx:Context){
        this.$ctx = ctx
        this.$ctx.task.postMessage('root',null)

        let t = new this.$componentClz()
        
        this.$component = t
        
        t.attach(ctx)

        this.$ctx.task.postMessage('add',{ parentId: this.id, ids: [this.$component.id] })
        
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
        this.$componentClz = T
        // 
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
            view.attach(this.$ctx)
            this.$viewsMap[view.id] = view
            return view
        }else{
            return null
        }
        
    }

    public onEvent(event: NativeEvent) {
        let view = this.getViewById(event.nodeId)
        if(!view){
            console.error(`unexpected view id:${event.nodeId}, current root id:${this.id}`)
            return console.log('views only in',this.viewIds().join(' '))
        }
        view.$onNativeEvent(event.event)
    }


}