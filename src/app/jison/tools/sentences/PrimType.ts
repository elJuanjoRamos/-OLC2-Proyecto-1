import { Instruction } from '../abstract/instruction';
import { Ambit } from '../id/ambit.identifier';

export class PrimType extends Instruction{

    constructor( public id, public type, public row, public col){
        super(row, col);
        this.id = id;
        this.type = type;
    }

    public exec(ambit: Ambit) {
        
        return {id: this.id, type: this.type};
    }

}