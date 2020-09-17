import { Instruction } from '../abstract/instruction';
import { Expression } from '../abstract/expression';
import { ErrorController } from '../../../components/controller/error.controller';
import { Type } from '../abstract/type';
import { Ambit } from '../id/ambit.identifier';



export class ArrayObject extends Instruction {
    public lenght: number = -1;
    constructor(private id: string, private type: Type, private values: Array<Expression> , row: number, column: number) {
        super(row, column);
      
    }


    public exec(ambit: Ambit) {

        if (this.values != null) {
            

            if (this.values.length == 1) {
                var data = this.values[0].exec(ambit)
                
                if (data.type == 0) { // significa que en el constructor vino un numero, ese numero va a ser el lenght del arreglo
                    this.lenght = data.value
                    ambit.save(this.id, null, this.getArrayType(this.type)); //GUARDO EL ARREGLO
                }  
            }

            else {
                ambit.save(this.id, this.values, this.getArrayType(this.type)); //GUARDO EL ARREGLO
                this.lenght = this.values.length;
                var flag = true;


                for (let index = 0; index < this.values.length; index++) { //ITERO SOBRE LOS ELEMENTOS
                    const element = this.values[index];
                    var temp = element.exec(ambit) //OBTENGO EL ELEMENTO
    
    
                    if ((this.getType(this.type) != this.getType(temp.type)) && this.getType(this.type) != 'ARRAYANY' ) { //VERIFICO QUE LOS TIPOS SEAN IGUALES
    
                        //SI NO COINCIDEN MARCA ERROR Y SE DETIENE
                        ErrorController.getInstance().add("No se puede asignar el tipo " + this.getType(temp.type)
                            + " al tipo " + this.getType(this.type), "Semántico", this.column, this.row);
                        flag = false
                        break;
                    }
                }

                if (flag) {
                    for (let index = 0; index < this.values.length; index++) { //ITERO SOBRE LOS ELEMENTOS
                        const element = this.values[index];
                        var temp = element.exec(ambit) //OBTENGO EL ELEMENTO
                        ambit.save(this.id + '[' + index + ']', temp.value, temp.type); // GUARDO CADA POSICION DEL ARREGLO array[0], array[1], ETC
    
                    }
                }
            }
        } else {
            ambit.save(this.id, null, this.getArrayType(this.type));
        }

    }


    public getId(): string {
        return this.id;
    }

    public Len() {
        return this.lenght;
    }


    public getArrayType(type: Type): number {
        switch (type) {
            case 0:
                return 5
            case 1:
                return 4
            case 2:
                return 6
            case 7:
                return 7
        }
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