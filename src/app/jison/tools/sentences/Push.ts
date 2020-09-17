import { Instruction } from '../abstract/instruction';
import { Expression } from '../abstract/expression';
import { ErrorController } from '../../../components/controller/error.controller';
import { Type } from '../abstract/type';
import { Ambit } from '../id/ambit.identifier';



export class Pushs extends Instruction {
    constructor(private id: string, private value: Expression, row: number, column: number) {
        super(row, column);
    }


    public exec(ambit: Ambit) {

        var variable = ambit.getVariable(this.id) // obtengo la variable array al que le voy a insertar

        if (variable != null) { //VERIFICO QUE NO SEA NULA
            
            
            if (this.getType(variable.type).includes('ARRAY')) { // VERIFICO QUE SEA ARRAY


                
                var temp = this.value.exec(ambit) //OBTENGO EL ELEMENTO POR GUARDAR





                if (this.getType(variable.type).includes(this.getType(temp.type)) 
                    || this.getType(variable.type) == 'ARRAYANY') { //VERIFICO QUE LOS TIPOS SEAN IGUALES


                    var arregloElementos:any[] = [];

                    if (variable.value != null) {
                        
                        arregloElementos = variable.value
                    } 

                    

                    arregloElementos.push(this.value)

                    // LE SETEO EL NUEVO ARREGLO DE ELEMENTOS AL ARREGLO
                    ambit.setVariable(variable.id, arregloElementos, variable.type)



                   
                    // GUARDO LA POSICION +1 DEL ARREGLO

                    ambit.save(this.id + '[' + (arregloElementos.length-1) + ']' , temp.value, temp.type); 
                

                } else { // SI NO SON IGUALES MARCA ERROR SEMANTICO
                    ErrorController.getInstance().add("No se puede asignar el tipo " + this.getType(temp.type)
                        + " al tipo " + this.getType(variable.type), "Semántico", this.column, this.row);
                }
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