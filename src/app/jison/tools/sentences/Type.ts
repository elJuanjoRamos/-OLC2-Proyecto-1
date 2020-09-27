import { Ambit } from '../id/ambit.identifier';
import { Instruction } from '../abstract/instruction';
import { ErrorController } from '../../../components/controller/error.controller'
export class Type extends Instruction {

    constructor(public id, public type, public value,public row,public col) {
        super(row, col);
        this.id = id;
        this.value = value;
        this.type = type;
    }

    public exec(ambit: Ambit) {
        try {
            
            ambit.saveTypes(this.id, this.value, this.type);

        } catch (error) {
            ErrorController.getInstance().add(error.error, "Semantico", this.row, this.col);
        }
        
    }

}