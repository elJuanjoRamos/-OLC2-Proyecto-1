import { Type } from '../abstract/type';

export class Identifier {
    public value: any;
    public id: string;
    public type: Type;
    public row: number;
    public column : number;
    public name: string;

    constructor(value: any, id: string, type: Type, row?:number, column?:number){
        this.name = "Identifier"
        this.value = value;
        this.id = id;
        this.type = type;
        this.row = row;
        this.column = column;
    }
}

