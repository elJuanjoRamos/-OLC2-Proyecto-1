import {Instruction} from '../abstract/instruction'
import {Expression} from '../abstract/expression'
import {Type} from '../abstract/type'
import { Ambit } from '../id/ambit.identifier';


export class While extends Instruction{

    /**
     * CONSTRUCTOR
     * @param condition 
     * @param code 
     * @param row 
     * @param column 
     */
    constructor(private condicion: Expression,private code: Instruction,row: number, column: number){
        super(row, column);
    }

    public exec(ambit : Ambit) {
        let condicion = this.condicion.exec(ambit);
   
        if(condicion.type != Type.BOOLEAN){
            throw {error: "La condicion no es booleana", linea: this.row, column : this.column};
        }
   
        while(condicion.value == true){
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
        }
    }
}