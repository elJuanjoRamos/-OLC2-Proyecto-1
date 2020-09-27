import {Instruction} from '../abstract/instruction'
import {Expression} from '../abstract/expression'
import { TypeAll } from '../abstract/enums'
import { Ambit } from '../id/ambit.identifier';
import { ErrorController } from 'src/app/components/controller/error.controller';


export class While extends Instruction{

    private condicion: Expression;
    private sentences: Instruction;
    public row: number;
    public column: number
    constructor(con: Expression,s: Instruction,r: number, c: number){
        super(r, c);
        this.condicion = con;
        this.sentences = s;
        this.row = r;
        this.column = c;
    }

    public exec(ambit : Ambit) {
        var ambitName = "Global_While";
        if (ambit != null) {
            ambitName = ambit.getName()+"_While";
        }

        var newAmbit = new Ambit(ambit, ambitName);

        let condicion = this.condicion.exec(newAmbit);
   
        if(condicion.type != TypeAll.BOOLEAN){
            ErrorController.getInstance().add("La condicion del While no es booleana", "Semántico", this.row, this.column);
        }


        if (this.sentences != null) {

            while(condicion.value == true){

                const element = this.sentences.exec(newAmbit);
       
                if(element != null || element != undefined){
                    if(element.type == 'Break')
                        break;
                    else if(element.type == 'Continue')
                        continue;
                }
                condicion = this.condicion.exec(newAmbit);
                if(condicion.type != TypeAll.BOOLEAN){
                    ErrorController.getInstance().add("La condicion del While no es booleana", "Semántico", this.row, this.column);
                }
    
            }             

        }
   
    }
}