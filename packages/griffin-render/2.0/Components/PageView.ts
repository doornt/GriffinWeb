import { Common } from '../Utils/Common';
import { BaseComponent } from './BaseComponent';

export class PageView{

    private _id:string = null

    private _component:BaseComponent = null

    public get id(){
        this._id = this._id || Common.genID()
        return this._id
    }

    public set component(cpt:typeof BaseComponent){
        this._component = new cpt
        this._component.pageId = this._id
    }
}