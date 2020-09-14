import { Instruction } from '../abstract/instruction';
import {Type} from '../abstract/type'
import { Expression } from '../abstract/expression';
import { Ambit } from '../id/ambit.identifier';


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
        
        let condicion = this.condicion.exec(ambit);
        
        if(condicion.type != Type.BOOLEAN){
            throw {error: "La condicion no es booleana", linea: this.row, column : this.column};
        }
        do {
            const element = this.code.exec(ambit);
            if(element != null || element != undefined){
                if(element.type == 'Break')
                    break;
                else if(element.type == 'Continue')
                    continue;
            }
            condicion = this.condicion.exec(ambit);
            if(condicion.type != Type.BOOLEAN){
                throw {error: "La condicion no es booleana", linea: this.row, column : this.column};
            }
        } while(condicion.value == true);
    }
}