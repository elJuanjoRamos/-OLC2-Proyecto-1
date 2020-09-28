import { Instruction } from '../abstract/instruction';
import { Expression } from '../abstract/expression';
import { ErrorController } from '../../../components/controller/error.controller';
import { TypeAll } from '../abstract/enums';
import { Ambit } from '../id/ambit.identifier';
import { ArrayParam } from '../model/ArrayParam';
import { OutputController } from 'src/app/components/controller/output.controller';



export class ArrayObject extends Instruction {
    public lenght: number = -1;

    private id: string;
    private type: TypeAll;
    private values:Array<Expression> = new Array();
    public row: number 
    public column : number;

    constructor(i: string, t: TypeAll, v: Array<Expression> , r: number, c: number) {
        super(r, c);
        this.id = i;
        this.type = t;
        this.values = v;
        this.row = r;
        this.column = c      
    }


    public exec(ambit: Ambit) {

        if (this.values != null) {
            

            if (this.values.length == 1) {
                var data = this.values[0].exec(ambit)
                
                if (data.type == 0) { // significa que en el constructor vino un numero, ese numero va a ser el lenght del arreglo
                    this.lenght = data.value
                    ambit.save(this.id, null, this.getArrayType(this.type), false); //GUARDO EL ARREGLO
                }  
            }

            else {
                console.log(this.id);
                ambit.save(this.id, this.values, this.getArrayType(this.type), false); //GUARDO EL ARREGLO
                this.lenght = this.values.length;
                var flag = true;


                for (let index = 0; index < this.values.length; index++) { //ITERO SOBRE LOS ELEMENTOS
                    const element: any = this.values[index];
                    
                    var temp = element.getElement().exec(ambit) //OBTENGO EL ELEMENTO
    
    
                    if ((this.getType(this.type) != this.getType(temp.type)) && this.getType(this.type) != 'ARRAYANY' ) { //VERIFICO QUE LOS TIPOS SEAN IGUALES
    
                        //SI NO COINCIDEN MARCA ERROR Y SE DETIENE
                        OutputController.getinstance().setValue("No se puede asignar el tipo " + this.getType(temp.type)
                        + " al tipo " + this.getType(this.type));
                        ErrorController.getInstance().add("No se puede asignar el tipo " + this.getType(temp.type)
                            + " al tipo " + this.getType(this.type), "Semántico", this.column, this.row);
                        flag = false
                        break;
                    }
                }

                if (flag) {
                    for (let index = 0; index < this.values.length; index++) { //ITERO SOBRE LOS ELEMENTOS
                        const element:any = this.values[index];
                        var temp = element.getElement().exec(ambit) //OBTENGO EL ELEMENTO
                        ambit.save(this.id + '[' + index + ']', temp.value, temp.type, false); // GUARDO CADA POSICION DEL ARREGLO array[0], array[1], ETC
    
                    }
                }
            }
        } else {
            ambit.save(this.id, null, this.getArrayType(this.type), false);
        }

    }


    public getId(): string {
        return this.id;
    }

    public Len() {
        return this.lenght;
    }


    public getArrayType(type: TypeAll): number {

        if(type == 0){
            return 5
        }
        if (type == 1) {
            return 4
        }
        if (type == 2) {
            return 6
        }
        if (type == 7) {
            return 7
        }
    }

    public getType(type: TypeAll): string {

        if (type  == 0) {
            return "NUMBER"
        } else if(type == 1){
            return "STRING"
        } else if(type == 2){
            return "BOOLEAN"
        } else if(type == 4){
            return "ARRAYSTRING"
        } else if(type == 5){
            return "ARRAYNUMBER"
        } else if(type == 6){
            return "ARRAYBOOLEAN"
        } else if(type == 7){
            return "ARRAYANY"
        }

        return ""
    }

}