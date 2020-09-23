import { Instruction } from '../abstract/instruction';
import { Expression } from '../abstract/expression';
import { Ambit } from '../id/ambit.identifier';
import { Sentence } from './Sentence';


export class Case extends Instruction {

    
    constructor(private condition: Expression,private code: Sentence,row: number,column: number){
        super(row, column);
    }

    public exec(ambit: Ambit){

        var newAmbit = new Ambit(ambit);
        const element = this.code.exec(newAmbit);
        
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