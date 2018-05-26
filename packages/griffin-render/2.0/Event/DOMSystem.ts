import Rx  = require('rxjs')

export class DOMEventSystem{

    private _routeSubject = new Rx.ReplaySubject(1)

    private _rootSubject = new Rx.ReplaySubject(1)

    private _domOperateSubject = new Rx.Subject()

    public pushUrl(url:string){
        this._routeSubject.next(url)
    }

    public onUrl(cb:Function){
        return this._routeSubject.subscribe((data)=>cb(data))
    }

    public pushRoot(id:string){
        this._rootSubject.next(id)
    }

    public onRoot(cb:Function){
        return this._rootSubject.subscribe((data)=>cb(data))
    }

    public addChildren(rid:string,pid:string,children:[string]){
        return this._domOperateSubject.next({
            type:'addViews',
            rid,
            pid,
            children
        })
    }

    public onAddChildren(cb:Function){
        return this._domOperateSubject.subscribe((data:any)=>{
            if(data.type === 'addViews'){
                cb(data.rid,data.pid,data.children)
            }
        })
    }
}