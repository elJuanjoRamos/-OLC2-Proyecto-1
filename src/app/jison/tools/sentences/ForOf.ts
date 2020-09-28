import { ErrorController } from 'src/app/components/controller/error.controller';
import { OutputController } from 'src/app/components/controller/output.controller';
import { Instruction } from '../abstract/instruction';
import { Ambit } from '../id/ambit.identifier';
import { Declaration } from './Declaration';
import { Sentence } from './Sentence';

export class FOROF extends Instruction {

    private declaration: Declaration;
    private array: string;
    private sentencias: Sentence;
    public row: number;
    public column: number;

    constructor( d: Declaration,a: string,s: Sentence,r: number,c: number){
        super(r, c);
       this.declaration = d;
       this.array = a;
       this.sentencias = s;
       this.row = r;
       this.column =c;
    }

    public exec(ambit : Ambit){
       
        var ambitName = "Global_ForOf";
        if (ambit != null) {
            ambitName = ambit.getName()+"_ForOf";
        }
        const newAmbit = new Ambit(ambit, ambitName);
        this.declaration.exec(newAmbit);
       
       var arreglo = ambit.getVariable(this.array)

        if (arreglo != null) {


            if (arreglo.value != null) {
                var arregloTemporal:any[] = arreglo.value
                
                if (arregloTemporal.length > 0) {
    
                    for (let index = 0; index < arregloTemporal.length; index++) {
                        
                        //SI LA VARIABLE NO EXISTE EN EL AMBITO DEL FOR, LO CREO
                        if (newAmbit.getVariable(this.declaration.getId()) == null) {
                            newAmbit.save(this.declaration.getId(), index, 0, false)                            
                        //SI YA EXISTE, SE EDITA
                        } else {

                            newAmbit.setVariable(this.declaration.getId(), arregloTemporal[index].value, 0, false)                            
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
            OutputController.getinstance().setValue("La variable "  + this.array + " no existe o no es un arreglo" + ", en la linea: " + this.row + ", en la columna: " + this.column)

        }


    }
}