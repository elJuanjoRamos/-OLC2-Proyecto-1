import { Instruction } from '../abstract/instruction';
import {Type} from '../abstract/type'
/*
import { Expression } from '../abstract/expresion.abstract';
import { Environment } from '../simbolos/enviroment.simbolos';
import { Type } from '../abstract/retorno.abstract';*/

export class DoWhile extends Instruction{

    /**
     * CONSTRUCTOR
     * @param condicion 
     * @param code 
     * @param row 
     * @param col 
     */
    constructor(condicion,code,row,col){
        super(row, col);
    }

    exec(env) {
        console.error('WHILE')
        console.log(env)
        console.log(this.condicion)
        let condicion = this.condicion.exec(env);
        console.log(condicion)
        console.log(this.code)

        if(condicion.type != Type.BOOLEAN){
            throw {error: "La condicion no es booleana", linea: this.row, col : this.col};
        }
        console.log(condicion.value == true)
        do {
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
                throw {error: "La condicion no es booleana", linea: this.row, col : this.col};
            }
        } while(condicion.value == true);
    }
}