import { Expression } from '../abstract/expression';
import { Returned, TypeAll } from '../abstract/enums';
import { Ambit } from '../id/ambit.identifier';

export class ObjectLiteral extends Expression {
    public name = "ObjectLiteral";
    private value:any;
    public row:number;
    public column: number;
    constructor( v: any, r : number, c: number, ){
        super(r, c, "ObjectLiteral");
        this.value = v;
        this.row = r;
        this.column = c;
    }

    public exec(ambit: Ambit) : Returned {
       

        var typeStructure = "{"
        for (const elem of this.value) {
            let val = elem.value.exec(ambit);
            typeStructure += elem.id + ": " + (val.value.valorSTR || val.value);
        }
        typeStructure += "}";

        var data = {
            value: this.value,
            valorSTR: typeStructure
        }

        return {value: data, type : TypeAll.TYPE};
    }
    public getName(){
        return this.name;
    }
}