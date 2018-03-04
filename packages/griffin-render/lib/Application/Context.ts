import { BaseComponent } from '../Components/BaseComponent';
import { RootView } from '../Runtime/DOM/RootView';
import { TaskCenter } from './Task';
import { CtxRequest } from './CommonClass';
import { Navigator } from './Navigator';

export class Context{

    private $request:CtxRequest = new CtxRequest()

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

    public get request(){
        return this.$request
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
        if(this.request.method == 'push'){
            Navigator.instance.push(this)
        }
    }
}