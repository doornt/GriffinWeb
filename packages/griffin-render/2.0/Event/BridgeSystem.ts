import Rx = require('rxjs')

export class BridgeSystem{
    
    private _listener = new Rx.Subject

    private _loadedSubject = new Rx.ReplaySubject(1)

    public on(key:'load',cb:(value:{})=>void){
        switch(key){
            case 'load':{
                return this._loadedSubject.subscribe(cb)
            }
        }
        return this._listener.subscribe(cb)
    }

    public dispatch(key:'load'){
        switch(key){
            case 'load':{
                return this._loadedSubject.next()
            }
        }
    }
}