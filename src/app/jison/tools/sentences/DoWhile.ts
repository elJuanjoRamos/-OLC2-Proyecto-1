import { Instruction } from '../abstract/instruction';
import {Type} from '../abstract/type'
import { Expression } from '../abstract/expression';
import { Ambit } from '../id/ambit.identifier';
import { ErrorController } from '../../../components/controller/error.controller';

export class DoWhile extends Instruction{

    /**
     * CONSTRUCTOR
     * @param condicion 
     * @param code 
     * @param row 
     * @param col 
     */
    constructor(private condicion: Expression, private code: Instruction,row: number,column: number){
        super(row, column);
    }

    public exec(ambit : Ambit) {
        var newAmbit = new Ambit(ambit);
        let condicion = this.condicion.exec(newAmbit);
        
        if(condicion.type != Type.BOOLEAN){
            ErrorController.getInstance().add("La condicion del Do While no es booleana", "Semántico", this.column, this.row);

        }
        do {
            const element = this.code.exec(newAmbit);
            if(element != null || element != undefined){
                if(element.type == 'break')
                    break;
                else if(element.type == 'Continue')
                    continue;
            }
            condicion = this.condicion.exec(newAmbit);
            if(condicion.type != Type.BOOLEAN){
                ErrorController.getInstance().add("La condicion del Do While no es booleana", "Semántico", this.column, this.row);
            }
        } while(condicion.value == true);
    }
}