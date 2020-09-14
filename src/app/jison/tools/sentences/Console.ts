import { Instruction } from '../abstract/instruction';
import { OutputController } from '../../../components/controller/output.controller';

import { Expression } from '../abstract/expression';
import { Ambit } from '../id/ambit.identifier';


export class Console extends Instruction {

    /**
     * CONSTRUCTOR
     * @param value 
     * @param row 
     * @param col 
     */
    constructor(private value: Expression,row: number,col: number){
        super(row, col);
    }


    public exec(ambit : Ambit) {
        const value = this.value.exec(ambit);
        OutputController.getinstance().setValue(value.value.toString() + "\n");
        
    }
}


