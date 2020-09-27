import { Instruction } from '../abstract/instruction';
import { Expression } from '../abstract/expression';
import { Ambit } from '../id/ambit.identifier';
import { Sentence } from './Sentence';


export class Case extends Instruction {

    private condition:Expression;
    private sentences: Sentence;
    public row:number;
    public column:number;
    constructor(con: Expression,s: Sentence,r: number,c: number){
        super(r, c);
        this.column = c;
        this.row = r;
        this.condition = con;
        this.sentences = s;
    }

    public exec(ambit: Ambit){

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
    public getCond(ambit : Ambit): any{
        const condition = this.condition.exec(ambit);
        return condition;
    }

}