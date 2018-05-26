import Rx  = require('rxjs/Rx')

export class DOMEventSystem{

    private _routeSubject = new Rx.ReplaySubject(1)

    public pushUrl(url:string){
        this._routeSubject.next(url)
    }

    public onUrl(cb:Function){
        return this._routeSubject.subscribe((data)=>cb(data))
    }
}