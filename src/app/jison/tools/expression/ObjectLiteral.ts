import { Expression } from '../abstract/expression';
import { Returned, Type } from '../abstract/type';
import { Ambit } from '../id/ambit.identifier';

export class ObjectLiteral extends Expression {

    /**
     * CONSTRUCTOR
     * @param value 
     * @param fila 
     * @param columna 
     * @param type 
     */
    constructor( public value: any, public fila : number, public columna: number, ){
        super(fila, columna);
    }

    public exec(ambit: Ambit) : Returned {
       

        var strJSON = "{"
        for (const element of this.value) {
            let val = element.value.execute(ambit);
            strJSON += element.id + ": " + (val.value.valorSTR || val.value);
        }
        strJSON += "}";

        var data = {
            value: this.value,
            valorSTR: strJSON
        }

        return {value: data, type : Type.TYPE};
    }
}