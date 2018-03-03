import { BaseComponent } from '../Components/BaseComponent';
import { RootView } from '../Runtime/DOM/RootView';
import { TaskCenter } from './Task';
import { JSLibrary } from '../Runtime/Bridge/JsLibrary';

class Request{
    public path:string

    public params:any = {}

    constructor(){

    }
}

export class Context{

    private $request:Request = new Request()

    private $next = false

    private $rootView:RootView

    private $task = new TaskCenter(this)

    public static get env() {
        return (<any>global).Environment
    }

    public get rid(){
        return this.$rootView && this.$rootView.id
    }

    public get task(){
        return this.$task
    }

    public get root(){
        return this.$rootView
    }

    constructor(path:string){
        this.$request.path = path
    }

    public sendStatus(){

    }

    public next(){
        this.$next = true
    }

    public get hasNext(){
        return this.$next
    }

    public onMessage(data:any){
        this.$rootView && this.$rootView.onEvent(data)
    }

    public render(clz:typeof BaseComponent){
        this.$rootView = RootView.create()
        this.$rootView.component = clz
        this.$rootView.attach(this)
        JSLibrary.navigator.push({id:this.root.id},()=>{})
    }
}