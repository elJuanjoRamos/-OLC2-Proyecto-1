import { Instruction } from '../abstract/instruction';
import { Ambit } from '../id/ambit.identifier';

export class Continue extends Instruction {

    constructor(public row : number, public col : number
    ){
        super(row, col);
    }
    public execute(ambit : Ambit) {
        return {row : this.row, col: this.col, type : 'continue'};
    }
}