import { Instruction } from '../abstract/instruction';
import { Expression } from '../abstract/expression';
import { Ambit } from '../id/ambit.identifier';
import { ErrorController } from '../../../components/controller/error.controller';

export class TypeValue extends Instruction{

    constructor( public id, public value: Expression, public row, public col){
        super(row, col);
        this.id = id;
        this.value = value;
    }

    public exec(ambit: Ambit) {
        try {
           
            const val = this.value.exec(ambit);

            return {id: this.id, value: val.value, type: val.type};
            
        } catch (error) {
            
            ErrorController.getInstance().add(error.error, "Semántico", error.row, error.col);
        }
        
    }

}