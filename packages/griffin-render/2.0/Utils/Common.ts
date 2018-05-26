export class Common{

    private static currentID = 0
    
    static genID(){
        return (this.currentID++).toString()
    }
}