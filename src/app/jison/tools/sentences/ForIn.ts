import { ErrorController } from 'src/app/components/controller/error.controller';
import { Instruction } from '../abstract/instruction';
import { Ambit } from '../id/ambit.identifier';
import { Declaration } from './Declaration';
import { Sentence } from './Sentence';

export class FORIN extends Instruction {

    constructor(
        private declaration: Declaration,
        private array: string,
        private sentencias: Sentence,
        row: number,column: number){
        super(row, column);
       

        //NoType | Declaration
        //NoType | Declaration
    }

    public exec(ambit : Ambit){
       
       
        const newAmbit = new Ambit(ambit);
        this.declaration.exec(newAmbit);
       
       var arreglo = ambit.getVariable(this.array)

        if (arreglo != null) {


            if (arreglo.value != null) {
                var arregloTemporal:any[] = arreglo.value
                
                if (arregloTemporal.length > 0) {
    
                    for (let index = 0; index < arregloTemporal.length; index++) {
                        
                        //SI LA VARIABLE NO EXISTE EN EL AMBITO DEL FOR, LO CREO
                        if (newAmbit.getVariable(this.declaration.getId()) == null) {
                            newAmbit.save(this.declaration.getId(), index, 0)                            
                        //SI YA EXISTE, SE EDITA
                        } else {
                            newAmbit.setVariable(this.declaration.getId(), index, 0)                            
                        }
                        
                        
                        const element = this.sentencias.exec(newAmbit);
   

                        if(element != null || element != undefined){
                            if(element.type == 'break')
                                break;
                            else if(element.type == 'continue')
                                continue;
                        }
                        
                    }

                }
            }
        } else {
            ErrorController.getInstance().add("La variable "  + this.array + " no existe o no es un arreglo", "Semántico", this.column, this.row);
        }
    }
}