import { Instruction } from '../abstract/instruction';
import { Ambit } from '../id/ambit.identifier';

export class PrimType extends Instruction{

    public id;
    public type;
    public row;
    public column;


    constructor( i, t, r, c){
        super(r, c);
        this.id = i;
        this.type = t;
        this.column = c;
        this.row = r;
    }

    public exec(ambit: Ambit) {
        
        return {id: this.id, type: this.type};
    }

}