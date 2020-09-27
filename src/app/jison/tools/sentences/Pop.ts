import { Instruction } from '../abstract/instruction';
import { ErrorController } from '../../../components/controller/error.controller';
import { TypeAll } from '../abstract/enums';
import { Ambit } from '../id/ambit.identifier';



export class Pop extends Instruction {
    constructor(private id: string, row: number, column: number) {
        super(row, column);
    }


    public exec(ambit: Ambit) {


        var nombreArregloOriginal = "";
        var esArregloDeArreglos: boolean = false;
        if (this.id.includes("[") && this.id.includes("]")) {
            var t = this.id.split("[");
            nombreArregloOriginal = t[0];
            esArregloDeArreglos = true
        } 


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

                            ambit.setVariable(variable.id, arregloTemporal, variable.type, false)

                            console.log(variable);
                            var a = ambit.getVariable(nombreArregloOriginal)
                            console.log(a);
                            return (arregloElementos.pop()).getElement();
                        } 

                        if (arregloElementos.length == 1) {
                            ambit.setVariable(variable.id, arregloTemporal, variable.type, false)
                            return arregloElementos.pop();    
                        }
                        
                    
                    
                    } else {
                        ErrorController.getInstance().add("El arreglo " + this.id + " no contiene elementos", "Semántico", this.column, this.row);
                        return {value: 'undefined'};
                    }  
                    



                } else {
                    ErrorController.getInstance().add("El arreglo " + this.id + " no contiene elementos", "Semántico", this.column, this.row);
                    return {value: 'undefined'};
                }
                            
            } else {
                ErrorController.getInstance().add("La variable " + this.id + " no es un Array", "Semántico", this.column, this.row);
                return {value: 'undefined'};
            }
        } else {
            ErrorController.getInstance().add("La variable " + this.id + " no está declarada", "Semántico", this.column, this.row);
            return {value: 'undefined'};
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