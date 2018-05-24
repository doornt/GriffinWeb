export class Response{

    private $data:any

    private $url:string

    constructor(data,url){
        this.$data =data
        this.$url =url
    }

    public json(){
        return new Promise(r=>r(this.$data))
    }
}