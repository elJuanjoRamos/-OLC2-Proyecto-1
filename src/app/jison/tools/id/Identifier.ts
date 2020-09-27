import { TypeAll } from '../abstract/enums';

export class Identifier {
    public value: any;
    public id: string;
    public type: TypeAll;
    public row: number;
    public column : number;
    public name: string;
    public esconsante: boolean
    constructor(value: any, id: string, type: TypeAll, esconstante: boolean, row?:number, column?:number){
        this.name = "Identifier"
        this.value = value;
        this.id = id;
        this.type = type;
        this.row = row;
        this.column = column;
        this.esconsante = esconstante
    }
}

