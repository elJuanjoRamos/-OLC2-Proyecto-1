import {Instruction} from '../abstract/instruction'
import {Expression} from '../abstract/expression'
import { Ambit } from '../id/ambit.identifier';
import { Case } from "./Case"
import { Sentence } from  './Sentence';
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
        var ambitName = "Global_Switch";
        if (ambit != null) {
            ambitName = ambit.getName()+"_Switch";
        }

        var conSwitch = this.condicion.exec(ambit); //Condicion de switch
        var numeroCaso = -1;

        for (var k in this.cases) {
            
            let condCase = this.cases[k].getCond(ambit); //Obtengo la condicion del case
            
            if (condCase.value == conSwitch.value) { //Evaluo
                numeroCaso = Number(k);

                var newAmbit = new Ambit(ambit, ambitName);
                const element = this.cases[k]; //AGARRO EL CASE COINCIDENTE
                element.exec(newAmbit); // EJECUTO EL CASE
                break;
            }
        }

        if (numeroCaso == -1 &&  this.def != null) { //SIGNIFICA QUE ENCONTRO COINCIDENCIAS DENTRO DE LOS CASOS
            if (this.def != null) {
                this.def.exec(ambit)                
            }  
        }
        
    }

}