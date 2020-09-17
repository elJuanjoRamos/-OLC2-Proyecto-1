import { Instruction } from '../abstract/instruction';
import { ErrorController } from '../../../components/controller/error.controller';
import { Type } from '../abstract/type';
import { Ambit } from '../id/ambit.identifier';
import { IF } from './If';



export class Pop extends Instruction {
    constructor(private id: string, row: number, column: number) {
        super(row, column);
    }


    public exec(ambit: Ambit) {

        var variable = ambit.getVariable(this.id) // obtengo la variable
        var arregloElementos:any[] = [];
        var arregloTemporal:any[] = [];
        if (variable != null) { //VERIFICO QUE NO SEA NULA
            
            
            if (this.getType(variable.type).includes('ARRAY')) { // VERIFICO QUE SEA ARRAY


                if (variable.value != null) {

                  

                    arregloElementos = variable.value


                    if(arregloElementos.length > 0) {

                        
                        if (arregloElementos.length > 1) {
                            for (let index = 0; index < arregloElementos.length -1 ; index++) {
                                const element = arregloElementos[index];
                                arregloTemporal.push(element)
                            }    

                            ambit.save(variable.id, arregloTemporal, variable.type)

                            return arregloElementos.pop();
                        } 

                        if (arregloElementos.length == 1) {
                            ambit.save(variable.id, null, variable.type)

                            return arregloElementos.pop();    
                        }
                        
                    
                    
                    } else {
                        ErrorController.getInstance().add("El arreglo " + this.id + " no contiene elementos", "Semántico", this.column, this.row);
                    }  
                    



                } else {
                    ErrorController.getInstance().add("El arreglo " + this.id + " no contiene elementos", "Semántico", this.column, this.row);
                }
                

                    


                   
                    // LE SETEO EL NUEVO ARREGLO DE ELEMENTOS AL ARREGLO
                  //  ambit.setVariable(variable.id, arregloElementos, variable.type)



                   
                    // GUARDO LA POSICION +1 DEL ARREGLO

                   // ambit.save(this.id + '[' + (arregloElementos.length-1) + ']' , temp.value, temp.type); 
                
                    
                
            } else {
                ErrorController.getInstance().add("La variable " + this.id + " no es un Array", "Semántico", this.column, this.row);

            }
        } else {
            ErrorController.getInstance().add("La variable " + this.id + " no está declarada", "Semántico", this.column, this.row);
        }

    }


    public getId(): string {
        return this.id;
    }



    public getType(type: Type): string {
        switch (type) {
            case 0:
                return "NUMBER"
            case 1:
                return "STRING"
            case 2:
                return "BOOLEAN"
            case 4:
                return "ARRAYSTRING"
            case 5:
                return "ARRAYNUMBER"
            case 6:
                return "ARRAYBOOLEAN"
            case 7:
            return "ARRAYANY"
        }
        return ""
    }

}