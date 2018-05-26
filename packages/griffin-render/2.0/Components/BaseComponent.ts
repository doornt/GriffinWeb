import { Common } from '../Utils/Common';
export class BaseComponent{
    
    private _id:string = null

    private _pageId:string

    private $ast: Function

    protected $styles: any

    public get id(){
        this._id = this._id || Common.genID()
        return this._id
    }

    protected set template(pugData: any) {
        this.$ast = pugData.AstFunc
        console.log(JSON.stringify(this.$ast))
        this.$styles = pugData.style
    }

    public set pageId(v:string){
        this._pageId = v
    }

    protected setupView(){

    }
}