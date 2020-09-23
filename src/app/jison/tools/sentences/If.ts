import { Instruction } from '../abstract/instruction';
import {Type} from '../abstract/type'
import { Expression } from '../abstract/expression';
import { Ambit } from '../id/ambit.identifier';
import { ErrorController } from '../../../components/controller/error.controller';


export class IF extends Instruction {

    
    constructor(private condition: Expression,private code: Instruction,private elseDeclaracion: Instruction | null,row: number,column: number){
        super(row, column);
    }

    public exec(ambit : Ambit) {
        



        var ifAmbit = new Ambit(ambit);

        const condition = this.condition.exec(ifAmbit);
        if(condition.type != Type.BOOLEAN){
            ErrorController.getInstance().add("La condicion no es booleana", "Semantico" ,this.row, this.column);
        }

        if(condition.value == true){
            if (this.code != null) {
                return this.code.exec(ifAmbit);                
            }
        }
        else{
            
            var elseAmbit = new Ambit(ambit);
            return this.elseDeclaracion?.exec(elseAmbit);
        }
    }
}