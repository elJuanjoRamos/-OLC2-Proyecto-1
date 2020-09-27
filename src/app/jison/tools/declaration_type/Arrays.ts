import { Instruction } from '../abstract/instruction';
import { ErrorController } from '../../../components/controller/error.controller';
import { TypeAll } from '../abstract/enums';
import { Ambit } from '../id/ambit.identifier';
import { ArrayParam } from '../model/ArrayParam';


export class Arrays extends Instruction {
    public lenght: number = -1;
    constructor(private id: string, private type: TypeAll, private values: Array<ArrayParam>, row: number, column: number) {
        super(row, column);
    }


    public exec(ambit: Ambit) {



        if (this.values != null) {

            this.lenght = this.values.length;

            var flag = true;  //SIRVE PARA VER SI HAY ERROR O NO

            for (let index = 0; index < this.values.length; index++) { //ITERO SOBRE LOS ELEMENTOS
                

                var arrayParam = this.values[index]; //OBTENEGO EL ELEMENTO DENTRO DE LOS PARAMETROS QUE RECIBE EL ARREGLO, 
                //ESTE ELEMENTO ES DE TIPO ES DE TIPO ARRAYPARAM


                if (!this.VerifyElement(arrayParam, ambit, this.id + '[' + index +']')) {
                    break
                }

                
            }

            if (flag) {
                ambit.save(this.id, this.values, this.getArrayType(this.type), false); //GUARDO EL ARREGLO
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
                
                ambit.save(name, temp.value, temp.type, false); // GUARDO CADA POSICION DEL ARREGLO array[0], array[1], ETC
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

            ambit.save(name, arrayParamArray, val, false); // GUARDO CADA POSICION DEL ARREGLO array[0], array[1], ETC
            return true;
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