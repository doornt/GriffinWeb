import { Context } from './Context';

export class MemoryMap{

    private static _pageIdMap:{
        [key:string]:Context
    } = {}

    private constructor(){}


    public static addContext(id:string,ctx:Context){
        this._pageIdMap[id] = ctx
    }
}