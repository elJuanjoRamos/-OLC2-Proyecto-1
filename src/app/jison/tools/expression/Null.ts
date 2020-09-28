import { Expression } from '../abstract/expression';
import { Returned, TypeAll } from '../abstract/enums';

export class NullEx extends Expression {
    public name = "Null";
    public row : number;
    public column: number; 
    public type : number

    constructor( r: number,c: number, t : number ){
        super(r, c, "Null");
        this.row = r;
        this.column = c;
        this.type = t; 
    }

    public exec() : Returned {
        return {value : null, type : TypeAll.NULL};
    }
    public getName(){
        return this.name;
    }
}