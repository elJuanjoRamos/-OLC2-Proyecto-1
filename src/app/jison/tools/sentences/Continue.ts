import { Instruction } from '../abstract/instruction';
import { Ambit } from '../id/ambit.identifier';

export class Continue extends Instruction {

    public row:number;
    public column:number;

    constructor(r : number, c : number){
        super(r, c);
        this.row =r;
        this.column = c;
    }
    public exec(ambit : Ambit) {
        return {row : this.row, column: this.column, type : 'continue'};
    }
}