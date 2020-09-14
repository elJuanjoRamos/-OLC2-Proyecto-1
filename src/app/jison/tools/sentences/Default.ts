import { Instruction } from '../abstract/instruction';
import {Type} from '../abstract/type'
import { Expression } from '../abstract/expression';
import { Ambit } from '../id/ambit.identifier';
import { Sentence } from './Sentence';


export class Default extends Instruction {

    
    constructor(private code: Sentence,row: number,column: number){
        super(row, column);
    }

    public exec(ambit : Ambit) {
        
        const element = this.code.exec(ambit);

        if(element != null || element != undefined){
            if(element.type == 'break')
                return;
        }
    }
}