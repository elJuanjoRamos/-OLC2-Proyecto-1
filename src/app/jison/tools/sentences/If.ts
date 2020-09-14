import { Instruction } from '../abstract/instruction';
import {Type} from '../abstract/type'
import { Expression } from '../abstract/expression';
import { Ambit } from '../id/ambit.identifier';


export class IF extends Instruction {

    
    constructor(private condition: Expression,private code: Instruction,private elseDeclaracion: Instruction | null,row: number,column: number){
        super(row, column);
    }

    public exec(ambit : Ambit) {
        
        const condition = this.condition.exec(ambit);
        if(condition.type != Type.BOOLEAN){
            throw {error: "La condicion no es booleana", linea: this.row, column: this.column};
        }

        if(condition.value == true){
            return this.code.exec(ambit);
        }
        else{
            return this.elseDeclaracion?.exec(ambit);
        }
    }
}