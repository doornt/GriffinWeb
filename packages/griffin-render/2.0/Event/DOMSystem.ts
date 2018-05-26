import Rx  = require('rxjs/Rx')

export class DOMEventSystem{

    private _routeSubject = new Rx.ReplaySubject(1)

    private _rootSubject = new Rx.ReplaySubject(1)

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
}