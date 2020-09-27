import { Expression } from '../abstract/expression';
import { Ambit } from '../id/ambit.identifier';
import { Returned } from '../abstract/enums';
import { ErrorController } from '../../../components/controller/error.controller';


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

            ErrorController.getInstance().add("La variable '" + this.id + "' no ha sido declarada o no existe en este ambito", "Semantico", this.row, this.column);
            return {value : 'undefined', type : 8};
    
        }
        return {value : value.value, type : value.type};
    }

    
}