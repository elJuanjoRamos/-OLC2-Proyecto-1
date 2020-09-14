import { Instruction } from '../abstract/instruction';
import {Type} from '../abstract/type'
import { Expression } from '../abstract/expression';
import { Ambit } from '../id/ambit.identifier';
import { Sentence } from './Sentence';
import { flushMicrotasks } from '@angular/core/testing';


export class Case extends Instruction {

    
    constructor(private condition: Expression,private code: Sentence,row: number,column: number){
        super(row, column);

        console.log(this.condition)
        console.log(this.code)
    }

    public exec(ambit: Ambit){

        const element = this.code.exec(ambit);
        
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