import { Instruction } from '../abstract/instruction';
import { Expression } from '../abstract/expression';
import { ErrorController } from '../../../components/controller/error.controller';
import { TypeAll } from '../abstract/enums';
import { Ambit } from '../id/ambit.identifier';
import { ArrayParam } from '../model/ArrayParam';



export class Pushs extends Instruction {

    private id: string;
     private value: Expression;
     public row: number;
    public column: number
    constructor(i: string, v: Expression, r: number, c: number) {
        super(r, c);
        this.id = i;
        this.value = v;
    }


    public exec(ambit: Ambit) {

        

        var variable = ambit.getVariable(this.id) // obtengo la variable array al que le voy a insertar

        if(variable != null){//VERIFICO QUE NO SEA NULA

        
            if (this.getType(variable.type).includes('ARRAY')) { // VERIFICO QUE SEA ARRAY

                ///*
                var temp = this.value.exec(ambit) //OBTENGO EL ELEMENTO POR GUARDAR
            
            
                if (this.getType(variable.type).includes(this.getType(temp.type)) 
                    || this.getType(variable.type) == 'ARRAYANY') { //VERIFICO QUE LOS TIPOS SEAN IGUALES
            
            
                    var arregloElementos:any[] = []; //SIRVE EN LA EJECUCION NORMAL

                    if (variable.value != null) { // VERIFICO QUE LOS VALORES DEL ARREGLO A PUSHAR NO SEAN NULOS
                        
                        arregloElementos = variable.value
                    } 
            
                    

                    arregloElementos.push(new ArrayParam(this.value, false)) //PUSHEO EL NUEVO ELEMENTO
            
                    // LE SETEO EL NUEVO ARREGLO DE ELEMENTOS AL ARREGLO QUE YA TENIA
                    ambit.setVariable(variable.id, arregloElementos, variable.type, false)
            
             
                    // GUARDO LA POSICION +1 DEL ARREGLO
                    ambit.save(this.id + '[' + (arregloElementos.length-1) + ']' , temp.value, temp.type, false); 
                
            
                } else { // SI NO SON IGUALES MARCA ERROR SEMANTICO
                    ErrorController.getInstance().add("No se puede asignar el tipo " + this.getType(temp.type)
                        + " al tipo " + this.getType(variable.type), "Semántico", this.column, this.row);
                }//*/
            
            } else {
                ErrorController.getInstance().add("La variable " + this.id + " no es un Array", "Semántico", this.column, this.row);
            
            }
        

        }else {
            ErrorController.getInstance().add("La variable " + this.id + " no está declarada", "Semántico", this.column, this.row);
        }

        


        
        

    }


    public getId(): string {
        return this.id;
    }



    public getType(type: TypeAll): string {
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