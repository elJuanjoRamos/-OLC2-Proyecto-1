import {Instruction} from '../abstract/instruction';
import { OutputController } from '../../../components/controller/output.controller';

export class Console extends Instruction {

    /**
     * CONSTRUCTOR
     * @param value 
     * @param row 
     * @param col 
     */
    constructor(value,row,col){
        super(row, col);
    }

    exec(ambit) {
        const value = this.value.exec(ambit);
        OutputController.getinstance().setValue(value.value.toString() + "\n");
    }
}


