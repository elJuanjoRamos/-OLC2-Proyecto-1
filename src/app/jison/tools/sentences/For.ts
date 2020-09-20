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
       

       var newAmbit = new Ambit(ambit)
       
        this.declaration.exec(newAmbit)
        
        var forCondition = this.condition.exec(newAmbit);

        if(forCondition.type != Type.BOOLEAN){
            throw {error: "La condicion no es booleana", linea: this.row, column: this.column};
        }

       // let temporal: any = this.sentencias
        //if (temporal.length > 0) {
            while(forCondition.value == true){

           
                const element = this.sentencias.exec(newAmbit);
       
    
                if(element != null || element != undefined){
                    if(element.type == 'break')
                        break;
                    else if(element.type == 'continue')
                        this.incrementDecrement.exec(newAmbit);
                        continue;
                }
    
                const val = this.incrementDecrement.exec(newAmbit);
               
                
                newAmbit.setVariable(this.declaration.getId(), val.value, val.type)
                
    
                forCondition = this.condition.exec(newAmbit);
    
                if(forCondition.type != Type.BOOLEAN){
                    throw {error: "La condicion no es booleana", linea: this.row, column: this.column};
                }
            }
        //}

        
    }
}