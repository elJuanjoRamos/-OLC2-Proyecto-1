import { Instruction } from '../abstract/instruction';
import { ErrorController } from '../../../components/controller/error.controller';

/*import { Expression } from '../abstract/expresion.abstract';
import { Environment } from '../simbolos/enviroment.simbolos';
*/
export class Declaration extends Instruction{

    constructor(id, type, value, fila, columna){
        super(fila, columna);
        this.id = id;
        this.value = value;
        this.type = type;
    }

    exec(ambit) {
        try {
            console.error("DECLARACION")
            console.log(ambit)
            const val = this.value.exec(ambit);
            console.log(val)
            if(this.type == undefined) {
                ambit.save(this.id, val.value, val.type);
            } else {
                if(this.type != val.type) {
                    throw {error: "El tipo " + val.value + " no es asignable con " + this.getType(this.type), fila: this.fila, columna : this.columna};
                } else {
                    ambit.save(this.id, val.value, val.type);
                }
            }
        } catch (error) {
            /**
             * INGRESAR ERRORES SEMANTICOS
             */
            ErrorController.getInstance().add(error.error, "Semántico", error.fila, error.columna);
        }
        
    }

    getType(type) {
        switch (type) {
            case 0:
                return "NUMBER"
            case 1:
                return "STRING"
            case 2:
                return "BOOLEAN"
        }
        return ""
    }

}