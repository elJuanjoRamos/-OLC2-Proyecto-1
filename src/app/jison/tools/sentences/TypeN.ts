import { Instruction } from '../abstract/instruction';
import { ErrorController } from '../../../components/controller/error.controller';
import { Ambit } from '../id/ambit.identifier';
import { Expression } from '../abstract/expression';

export class TypeN extends Instruction{

    constructor( public id, public id2, public value: Expression, public row, public col){
        super(row, col);
        this.id = id;
        this.value = value;
    }

    public exec(environment: Ambit) {
        try {
            
            var val = this.value.exec(environment);
            
            const value = environment.getVariable(this.id);
            
            if(value == null) {
                ErrorController.getInstance().add("La variable " + this.id + " no existe o no esta declarada", "Semántico", this.row, this.col);
            }
    
            for (const iterator of value.value.value) {

                if(iterator.id == this.id2) {

                    iterator.value.value = val.value;
                    
                    return {value : iterator.value.value, type : iterator.value.type};
                }
            }
           
        } catch (error) {
            ErrorController.getInstance().add(error.error, "Semántico", error.row, error.col);
        }
        
    }


}