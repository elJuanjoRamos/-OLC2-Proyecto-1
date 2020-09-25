
import { Expression } from '../abstract/expression';
import { Ambit } from '../id/ambit.identifier';
import { Returned } from '../abstract/type';

export class TypeAccess extends Expression {

    /**
     * CONSTRUCTOR
     * @param id 
     * @param row 
     * @param col 
     */
    constructor( public id: string, public id2: string,  public row : number, public col: number){
        super(row, col);
    }

    public exec(ambit: Ambit): Returned {
        
        const value = ambit.getVariable(this.id);
        console.log(value)

        if(value == null) {
            throw new Error("La variable no existe D:");
        }

        for (const element of value.value.value) {
            if(element.id == this.id2) {
                return {value : element.value.value, type : element.value.type};
            }
        }

        return {value : value.value, type : value.type};
    }
}