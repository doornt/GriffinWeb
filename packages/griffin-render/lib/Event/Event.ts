export class Event{

    static CLICK:string = '@click'

    private $name:string = null

    private $bubble:boolean = true

    public get type(){
        return this.$name
    }

    constructor(type:"@click",bubble:boolean = true){
        this.$name = type
        this.$bubble = bubble
    }
}

