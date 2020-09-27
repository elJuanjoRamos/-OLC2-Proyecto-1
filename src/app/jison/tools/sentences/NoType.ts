import { Instruction } from '../abstract/instruction';
import { ErrorController } from '../../../components/controller/error.controller';
import { Expression } from '../abstract/expression';
import { Ambit } from '../id/ambit.identifier';
import { TypeAll } from '../abstract/enums';

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
           
            const valor = ambit.getVariable(this.id);
            

            if (!valor.esconsante) {
                
                if (val.type == 0) {

                                switch (valor.type) {
                                    case 0:
                                        ambit.setVariable(this.id, val.value, val.type, false);        
                                        break;
                                    default:
                                        throw {error: "El tipo " + val.value + " no es asignable con " + this.getType(valor.type), row: this.row, column : this.column};
                                        break;
                                }
                            } else if (val.type == 1) {
                                
                                switch (valor.type) {
                                    case 1:
                                        ambit.setVariable(this.id, val.value, val.type, false);
                                        break;
                                    default:
                                        throw {error: "El tipo " + val.value + " no es asignable con " + this.getType(valor.type), row: this.row, column : this.column};
                                        break;
                                }
                            } else if (val.type ==2) {
                                switch (valor.type) {
                                    case 2:
                                        ambit.setVariable(this.id, val.value, val.type, false);                        
                                        break;
                                    default:
                                        throw {error: "El tipo " + val.value + " no es asignable con " + this.getType(valor.type), row: this.row, column : this.column};
                                    break;
                                }
                                
                            } else {
                                throw {error: "El tipo " + val.value + " no es asignable con " + this.getType(valor.type), row: this.row, column : this.column};
                            }
            } else {

                throw {error: "No es posible cambiar el valor de la variable " + this.id +" por que es una constante " , row: this.row, column : this.column};
        
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
    public getType(type: TypeAll):string {
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