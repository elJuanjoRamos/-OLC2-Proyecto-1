import { Instruction } from '../abstract/instruction';
import { Ambit } from '../id/ambit.identifier';
import { Sentence } from './Sentence';


export class Default extends Instruction {

    private sentences:Sentence;
    public row:number;
    public column:number;
    constructor(s: Sentence,r: number,c: number){
        super(r, c);
        this.sentences = s;
        this.row = r;
        this.column = c;
    
    }

    public exec(ambit : Ambit) {
        var ambitName = "Global";
        if (ambit != null) {
            ambitName = ambit.getName();
        }
        var newAmbit = new Ambit(ambit, ambitName);
        const element = this.sentences.exec(newAmbit);

        if(element != null || element != undefined){
            if(element.type == 'break')
                return;
        }
    }
}