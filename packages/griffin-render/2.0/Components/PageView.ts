import { Common } from '../Utils/Common';

export class PageView{

    private _id:string = null

    public get id(){
        this._id = this._id || Common.genID()
        return this._id
    }
}