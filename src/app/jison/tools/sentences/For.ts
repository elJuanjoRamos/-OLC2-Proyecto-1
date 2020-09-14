import { Instruction } from '../abstract/instruction';
import {Type} from '../abstract/type'
import { Expression } from '../abstract/expression';
import { Ambit } from '../id/ambit.identifier';
import { NoType } from './NoType';
import { Declaration } from './Declaration';
import { Sentence } from './Sentence';

export class FOR extends Instruction {

    
    constructor(
        private declaration:NoType | Declaration,
        private condition: Expression,
        private incrementDecrement: Expression,
        private sentencias: Sentence,
        row: number,column: number){
        super(row, column);
        console.log(sentencias)

    }

    public exec(ambit : Ambit){
       
       
        this.declaration.exec(ambit)
        
        var forCondition = this.condition.exec(ambit);

        if(forCondition.type != Type.BOOLEAN){
            throw {error: "La condicion no es booleana", linea: this.row, column: this.column};
        }

        while(forCondition.value == true){

           
            const element = this.sentencias.exec(ambit);
   

            if(element != null || element != undefined){
                if(element.type == 'Break')
                    break;
                else if(element.type == 'Continue')
                    this.incrementDecrement.exec(ambit);
                    continue;
            }

            const val = this.incrementDecrement.exec(ambit);
           
            
            ambit.setVariable(this.declaration.getId(), val.value, val.type)
            


            forCondition = this.condition.exec(ambit);

            if(forCondition.type != Type.BOOLEAN){
                throw {error: "La condicion no es booleana", linea: this.row, column: this.column};
                break;
            }
        }
    }
}