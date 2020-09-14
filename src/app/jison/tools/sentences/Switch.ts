import {Instruction} from '../abstract/instruction'
import {Expression} from '../abstract/expression'
import {Type} from '../abstract/type'
import { Ambit } from '../id/ambit.identifier';
import { Case } from "./Case"
import { Sentence } from  './Sentence';
import { flushMicrotasks } from '@angular/core/testing';
import { abort } from 'process';
export class Switch extends Instruction{

    /**
     * CONSTRUCTOR
     * @param condition 
     * @param code 
     * @param row 
     * @param column 
     */
    constructor(private condicion: Expression,private cases : Array<Case>, private def: Sentence | null, row : number, column : number){
        super(row, column);

    }
    public exec(ambit : Ambit){

        var conSwitch = this.condicion.exec(ambit); //Condicion de switch
        var numeroCaso = -1;

        for (var k in this.cases) {
            
            let condCase = this.cases[k].getCond(ambit); //Obtengo la condicion del case
            
            if (condCase.value == conSwitch.value) { //Evaluo
                numeroCaso = Number(k);
                break;
            }
        }

        if (numeroCaso != -1) { //SIGNIFICA QUE ENCONTRO COINCIDENCIAS DENTRO DE LOS CASOS
            
            var newAmbit = new Ambit(ambit);

            for (let index = numeroCaso; index < this.cases.length; index++) {
                const element = this.cases[index];
                element.exec(newAmbit);
            }


        } else { //SI SIGUE EN -1, SE VA AL DEFAULT
            this.def.exec(ambit)
        }

        
    }

}