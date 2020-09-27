import { Instruction } from '../abstract/instruction';
import { OutputController } from '../../../components/controller/output.controller';

import { Expression } from '../abstract/expression';
import { Ambit } from '../id/ambit.identifier';


export class Console extends Instruction {

    private value:Expression;
    public row:number;
    public column:number;
    constructor(v: Expression,r: number,c: number){
        super(r, c);
        this.value = v;
        this.column =c;
        this.row = r;
    }


    public exec(ambit : Ambit) {
        const value = this.value.exec(ambit);
        OutputController.getinstance().setValue(value.value.toString() + "\n");
        
    }
}


