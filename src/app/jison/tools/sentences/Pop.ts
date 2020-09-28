import { Instruction } from '../abstract/instruction';
import { ErrorController } from '../../../components/controller/error.controller';
import { TypeAll } from '../abstract/enums';
import { Ambit } from '../id/ambit.identifier';
import { OutputController } from 'src/app/components/controller/output.controller';



export class Pop extends Instruction {
    private id: string
    public row: number
    public column: number

    constructor(i: string, r: number, c: number) {
        super(r, c);
        this.id = i;
        this.column = c;
        this.row = r;
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

                            var a = ambit.getVariable(nombreArregloOriginal)
                            return (arregloElementos.pop()).getElement();
                        } 

                        if (arregloElementos.length == 1) {
                            ambit.setVariable(variable.id, arregloTemporal, variable.type, false)
                            return arregloElementos.pop();    
                        }
                        
                    
                    
                    } else {
                        OutputController.getinstance().setValue("El arreglo " + this.id + " no contiene elementos" + ", en la linea: " + this.row + ", en la columna: " + this.column)
                        return {value: 'undefined'};
                    }  
                    
    


                } else {
                    OutputController.getinstance().setValue("El arreglo " + this.id + " no contiene elementos" + ", en la linea: " + this.row + ", en la columna: " + this.column)
                    return {value: 'undefined'};
                }
                            
            } else {
                OutputController.getinstance().setValue("El arreglo " + this.id + " no contiene elementos" + ", en la linea: " + this.row + ", en la columna: " + this.column)
                return {value: 'undefined'};
            }
        } else {
            OutputController.getinstance().setValue("El arreglo " + this.id + " no contiene elementos" + ", en la linea: " + this.row + ", en la columna: " + this.column)
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