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
        }

        /* this.declaration.exec(ambit)
        
        var forCondition = this.condition.exec(ambit);

        if(forCondition.type != Type.BOOLEAN){
            throw {error: "La condicion no es booleana", linea: this.row, column: this.column};
        }

        while(forCondition.value == true){

           
            const element = this.sentencias.exec(ambit);
   

            if(element != null || element != undefined){
                if(element.type == 'break')
                    break;
                else if(element.type == 'continue')
                    this.incrementDecrement.exec(ambit);
                    continue;
            }

            const val = this.incrementDecrement.exec(ambit);
           
            
            ambit.setVariable(this.declaration.getId(), val.value, val.type)
            

            forCondition = this.condition.exec(ambit);

            if(forCondition.type != Type.BOOLEAN){
                throw {error: "La condicion no es booleana", linea: this.row, column: this.column};
            }
        }*/
    }
}