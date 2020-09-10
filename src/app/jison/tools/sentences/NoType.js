import { Instruction } from '../abstract/instruction';
import { ErrorController } from '../../../components/controller/error.controller';

export class NoType extends Instruction{
    
    constructor(id, value, row, col){
        super(row, col);
        this.id = id;
        this.value = value;
    }

    exec(ambit) {
        try {
            console.error("SIN TIPO")
            console.log(ambit)
            const val = this.value.exec(ambit);
            console.log(val)
            // TODO: SIN TIPO
            /**
             * VALIDAR VALOR
             */

            const valor = ambit.getVariable(this.id);
            console.log(valor);
            switch (val.type) {
                /**
                 * VALIDAR NUMBER
                 */
                case 0:
                    if(valor.type == 0) {
                        ambit.setVariable(this.id, val.value, val.type);
                    } else {
                        throw {error: "El tipo " + val.value + " no es asignable con " + this.getType(valor.type), row: this.row, col : this.col};
                    }
                    break;
                /**
                 * VALIDAR STRING
                 */
                case 1:
                    if(valor.type == 1) {
                        ambit.setVariable(this.id, val.value, val.type);
                    } else {
                        throw {error: "El tipo " + val.value + " no es asignable con " + this.getType(valor.type), row: this.row, col : this.col};
                    }
                    break;
                /**
                 * VALIDAR BOOLEAN
                 */
                case 2:
                    if(valor.type == 2) {
                        ambit.setVariable(this.id, val.value, val.type);
                    } else {
                        throw {error: "El tipo " + val.value + " no es asignable con " + this.getType(valor.type), row: this.row, col : this.col};
                    }
                    break;
                default:
                    throw {error: "El tipo " + val.value + " no es asignable con " + this.getType(valor.type), row: this.row, col : this.col};
            }
        } catch (error) {
            /**
             * INGRESAR ERRORES SEMANTICOS
             */
            ErrorController.getInstance().add(error.error, "Semántico", error.row, error.col);
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