import { Instruction } from '../abstract/instruction';
import { Ambit } from '../id/ambit.identifier';
import { Sentence } from './Sentence';
import { TablaSimbolosController } from '../../../components/controller/tablasimbolo.conroller';

export class Function extends Instruction {


    constructor(public idFunction: string, public sentecias: Sentence, 
        public params : Array<string>, public row : number, public col : number){
        super(row, col);
    }

    public exec(ambit : Ambit) {
        ambit.saveFunc(this.idFunction, this);
        TablaSimbolosController.getInstance().add(this.idFunction, "void", ambit.getName(), 0, false, true, this.row, this.column);

    }
}