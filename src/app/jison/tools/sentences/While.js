import {Instruction} from '../abstract/instruction'
import Expression from '../abstract/expression'
import {Type} from '../abstract/type'
/*import { Instruction } from '../id/instruccion.abstract';
import { Expression } from '../id/expresion.abstract';
import { Environment } from '../simbolos/enviroment.simbolos';
import { Type } from '../id/retorno.abstract';*/

export class While extends Instruction{

    /**
     * CONSTRUCTOR
     * @param condicion 
     * @param code 
     * @param row 
     * @param column 
     */
    constructor(condition, code, row, column){
        super(row, column);
    }

    exec(env) {
        console.error('WHILE')
        console.log(env)
        console.log(this.condicion)
        let condicion = this.condicion.exec(env);
        console.log(condicion)
        console.log(this.code)

        if(condicion.type != Type.BOOLEAN){
            throw {error: "La condicion no es booleana", linea: this.row, column : this.column};
        }
        console.log(condicion.value == true)
        while(condicion.value == true){
            const element = this.code.exec(env);
            console.log(element)
            if(element != null || element != undefined){
                console.log(element);
                if(element.type == 'Break')
                    break;
                else if(element.type == 'Continue')
                    continue;
            }
            condicion = this.condicion.exec(env);
            if(condicion.type != Type.BOOLEAN){
                throw {error: "La condicion no es booleana", linea: this.row, column : this.column};
            }
        }
    }
}