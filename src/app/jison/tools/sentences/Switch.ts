import {Instruction} from '../abstract/instruction'
import {Expression} from '../abstract/expression'
import { Ambit } from '../id/ambit.identifier';
import { Case } from "./Case"
import { Sentence } from  './Sentence';
export class Switch extends Instruction{

    private condicion: Expression;
    private cases : Array<Case> = new Array();
     private sentences: Sentence | null;
     public row : number;
     public column : number
    constructor(c: Expression,cs : Array<Case>, s: Sentence | null, r : number, cl : number){
        super(r, cl);
        this.condicion = c;
        this.cases = cs;
        this.sentences = s;
        this.row = r;
        this.column = cl;

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

        if (numeroCaso == -1 &&  this.sentences != null) { //SIGNIFICA QUE ENCONTRO COINCIDENCIAS DENTRO DE LOS CASOS
            if (this.sentences != null) {
                this.sentences.exec(ambit)                
            }  
        }
        
    }

}