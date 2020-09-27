import { Instruction } from '../abstract/instruction';
import { Ambit } from '../id/ambit.identifier';
import { Sentence } from './Sentence';


export class Default extends Instruction {

    
    constructor(private code: Sentence,row: number,column: number){
        super(row, column);
    }

    public exec(ambit : Ambit) {
        var ambitName = "Global";
        if (ambit != null) {
            ambitName = ambit.getName();
        }
        var newAmbit = new Ambit(ambit, ambitName);
        const element = this.code.exec(newAmbit);

        if(element != null || element != undefined){
            if(element.type == 'break')
                return;
        }
    }
}