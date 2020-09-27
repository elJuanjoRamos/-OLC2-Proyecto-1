import {Instruction} from '../abstract/instruction'
import {Expression} from '../abstract/expression'
import { TypeAll } from '../abstract/enums'
import { Ambit } from '../id/ambit.identifier';
import { ErrorController } from 'src/app/components/controller/error.controller';


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
        var ambitName = "Global_While";
        if (ambit != null) {
            ambitName = ambit.getName()+"_While";
        }

        var newAmbit = new Ambit(ambit, ambit);

        let condicion = this.condicion.exec(newAmbit);
   
        if(condicion.type != TypeAll.BOOLEAN){
            ErrorController.getInstance().add("La condicion del While no es booleana", "Semántico", this.row, this.column);
        }


        if (this.code != null) {

            while(condicion.value == true){

                const element = this.code.exec(newAmbit);
       
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