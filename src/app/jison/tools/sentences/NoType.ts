import { Instruction } from '../abstract/instruction';
import { ErrorController } from '../../../components/controller/error.controller';
import { Expression } from '../abstract/expression';
import { Ambit } from '../id/ambit.identifier';
import { Type } from '../abstract/type';

export class NoType extends Instruction{
    private type: any;
    constructor(private id: string, private value: Expression, row: number, column: number){
        super(row, column);
        this.id = id;
        this.value = value;
    }

    public exec(ambit: Ambit) {
        try {
            const val = this.value.exec(ambit);
            // TODO: SIN TIPO
            /**
             * VALIDAR VALOR
             */

            const valor = ambit.getVariable(this.id);
            console.log(valor);


            if (val.type == 0) {

                switch (valor.type) {
                    case 0:
                        ambit.setVariable(this.id, val.value, val.type);        
                        break;
                    default:
                        throw {error: "El tipo " + val.value + " no es asignable con " + this.getType(valor.type), row: this.row, column : this.column};
                        break;
                }
            } else if (val.type == 1) {
                
                switch (valor.type) {
                    case 1:
                        ambit.setVariable(this.id, val.value, val.type);
                        break;
                    default:
                        throw {error: "El tipo " + val.value + " no es asignable con " + this.getType(valor.type), row: this.row, column : this.column};
                        break;
                }
            } else if (val.type ==2) {
                switch (valor.type) {
                    case 2:
                        ambit.setVariable(this.id, val.value, val.type);                        
                        break;
                    default:
                        throw {error: "El tipo " + val.value + " no es asignable con " + this.getType(valor.type), row: this.row, column : this.column};
                    break;
                }
                
            } else {
                throw {error: "El tipo " + val.value + " no es asignable con " + this.getType(valor.type), row: this.row, column : this.column};
        
            }
        } catch (error) {
            /**
             * INGRESAR ERRORES SEMANTICOS
             */
            ErrorController.getInstance().add(error.error, "Semántico", error.row, error.column);
        }
        
    }

    public getId(): string{
        return this.id
    }
    public getType(type: Type):string {
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