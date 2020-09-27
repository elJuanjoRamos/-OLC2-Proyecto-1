import { Instruction } from '../abstract/instruction';
import { Ambit } from '../id/ambit.identifier';
import { Sentence } from './Sentence';
import { TablaSimbolosController } from '../../../components/controller/tablasimbolo.conroller';

export class Function extends Instruction {

    public idFunction:string;
    public sentecias: Sentence;
    public params: Array<string> = new Array();
    public row: number;
    public column: number;

    constructor(i: string, s: Sentence, p: Array<string>, r : number, c : number){
        super(r, c);
        this.idFunction= i;
        this.sentecias = s;
        this.params = p;
        this.row = r;
        this.column = c;
    }

    public exec(ambit : Ambit) {
        ambit.saveFunc(this.idFunction, this);
        TablaSimbolosController.getInstance().add(this.idFunction, "void", ambit.getName(), 0, 0, false, true, this.row, this.column);

    }
}