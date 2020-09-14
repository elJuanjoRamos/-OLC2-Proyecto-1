import { Expression } from '../abstract/expression';
import { Ambit } from '../id/ambit.identifier';
import { Returned } from '../abstract/type';

export class Access extends Expression {

    
    /**
     * CONSTRUCTOR
     * @param id 
     * @param row 
     * @param column 
     */
    constructor(private id: string, row : number, column: number){
        super(row, column);
    }

    public exec(ambit: Ambit): Returned {

        const value = ambit.getVariable(this.id);

        if(value == null) {
            throw new Error("La variable no existe D:");
        }
        return {value : value.value, type : value.type};
    }
}