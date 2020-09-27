import { Expression }   from '../abstract/expression';
import { Ambit }        from '../id/ambit.identifier';
import { Instruction }  from '../abstract/instruction';

export class Return extends Instruction {
    private value: Expression;
     public row:number;
    public column:number;
    constructor( v: Expression, r:number, c:number){
        super(r, c);
        this.value = v;
        this.row = r;
        this.column = c;
    }

    public exec(ambit : Ambit) {
        var val = null;

        if (this.value != null) {
            val = this.value.exec(ambit);            
        }

        return {value: val, row : this.row, column: this.column, type : 'return'};
    }
}