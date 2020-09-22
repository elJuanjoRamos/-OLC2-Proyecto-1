import { Instruction } from '../abstract/instruction';
import { Expression } from '../abstract/expression';
import { ErrorController } from '../../../components/controller/error.controller';
import { Type } from '../abstract/type';
import { Ambit } from '../id/ambit.identifier';
import { ArrayParam } from '../model/ArrayParam';
import { abort } from 'process';


export class Arrays extends Instruction {
    public lenght: number = -1;
    constructor(private id: string, private type: Type, private values: Array<ArrayParam>, row: number, column: number) {
        super(row, column);
    }


    public exec(ambit: Ambit) {


        var newAmbit = new Ambit(ambit)

        if (this.values != null) {

            this.lenght = this.values.length;

            var flag = true;  //SIRVE PARA VER SI HAY ERROR O NO

            for (let index = 0; index < this.values.length; index++) { //ITERO SOBRE LOS ELEMENTOS
                

                var arrayParam = this.values[index]; //OBTENEGO EL ELEMENTO DENTRO DE LOS PARAMETROS QUE RECIBE EL ARREGLO, 
                //ESTE ELEMENTO ES DE TIPO ES DE TIPO ARRAYPARAM


                if (!this.VerifyElement(arrayParam, newAmbit, this.id + '[' + index +']')) {
                    break
                }

                
            }

            if (flag) {
                newAmbit.save(this.id, this.values, this.getArrayType(this.type)); //GUARDO EL ARREGLO
            }


        } else {
            this.lenght = -1;
        }
    }



    public VerifyElement(arrayParam: ArrayParam, ambit: Ambit, name: string): boolean {

        if (!arrayParam.getIsArray()) { // SIGNIFICA QUE SOLO ES UN OBJETO

            var temp = arrayParam.getElement().exec(ambit) //OBTENGO EL ELEMENTO REAL QUE SE QUIERE GUARDAR
            //VERIFICO QUE LOS TIPOS SEAN IGUALES O QUE EL TIPO SEA ANY
            if ((this.getType(this.type) != this.getType(temp.type)) && this.getType(this.type) != 'ARRAYANY') {

                //SI NO COINCIDEN MARCA ERROR Y SE DETIENE
                ErrorController.getInstance().add("No se puede asignar el tipo " + this.getType(temp.type)
                    + " al tipo " + this.getType(this.type), "Semántico", this.column, this.row);

                    return false;
            } else {
                
                ambit.save(name, temp.value, temp.type); // GUARDO CADA POSICION DEL ARREGLO array[0], array[1], ETC
                return true;
            }

        } else { // SIGNIFICA QUE EL OJETO ES UN ARREGLO

            var arrayParamArray: any[] = arrayParam.getElement() 

            var val;
            //RECORRO EL ARREGLO Y LO MANDO A EVALUAR CADA ELMEENTO DENTRO DEL ARREGLO
            for (let i = 0; i < arrayParamArray.length; i++) {
                if(!this.VerifyElement(arrayParamArray[i], ambit, name + '['+ i + ']')){
                    return false
                } else {
                    var e = (arrayParamArray[i]).getElement().exec(ambit);
                    val = this.getArrayType(e.type)
                }
            }

            ambit.save(name, arrayParamArray, val); // GUARDO CADA POSICION DEL ARREGLO array[0], array[1], ETC
            return true;
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