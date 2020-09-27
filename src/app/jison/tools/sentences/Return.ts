import { Expression }   from '../abstract/expression';
import { Ambit }        from '../id/ambit.identifier';
import { Instruction }  from '../abstract/instruction';

export class Return extends Instruction {
    
    constructor( private value: Expression, public row, public col){
        super(row, col);
    }

    public exec(ambit : Ambit) {
        var val = null;

        if (this.value != null) {
            val = this.value.exec(ambit);            
        }

        return {value: val, row : this.row, col: this.col, type : 'return'};
    }
}