import { Instruction } from '../abstract/instruction';
import { TypeAll } from '../abstract/enums'
import { Expression } from '../abstract/expression';
import { Ambit } from '../id/ambit.identifier';
import { ErrorController } from '../../../components/controller/error.controller';


export class IF extends Instruction {

    
    constructor(private condition: Expression,private code: Instruction,private elseDeclaracion: Instruction | null,row: number,column: number){
        super(row, column);
    }

    public exec(ambit : Ambit) {
        var ambitName = "Global_If";
        if (ambit != null) {
            ambitName = ambit.getName()+"_If";
        }



        var ifAmbit = new Ambit(ambit, ambitName);

        const condition = this.condition.exec(ifAmbit);
        if(condition.type != TypeAll.BOOLEAN){
            ErrorController.getInstance().add("La condicion no es booleana", "Semantico" ,this.row, this.column);
        }

        if(condition.value == true){
            if (this.code != null) {
                return this.code.exec(ifAmbit);                
            }
        }
        else{
            
            var elseAmbit = new Ambit(ambit, ambitName);
            return this.elseDeclaracion?.exec(elseAmbit);
        }
    }
}