import { Common } from '../Utils/Common';
export class BaseComponent{
    
    private _id:string = Common.genID()

    private _pageId:string

    private $ast: Function

    protected $styles: any

    protected set template(pugData: any) {
        this.$ast = pugData.AstFunc
        console.log(JSON.stringify(this.$ast))
        this.$styles = pugData.style
    }

    public set pageId(v:string){
        this._pageId = v
    }
}