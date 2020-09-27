import { Instruction } from '../abstract/instruction';
import { ErrorController } from '../../../components/controller/error.controller';
import { Expression } from '../abstract/expression';
import { Ambit } from '../id/ambit.identifier';
import { TypeAll } from '../abstract/enums';

export class NoType extends Instruction{
    private type: any;
    private id: string;
    private value: Expression;
    public row: number;
    public  column: number;

    constructor(i: string, v: Expression, r: number, c: number){
        super(r, c);
        this.id = i;
        this.value = v;
        this.row = r;
        this.column = c;
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
                                        ErrorController.getInstance().add("El tipo " + val.value + " no es asignable con " + this.getType(valor.type), "Semántico", this.row, this.column);
                                    break;
                                }
                                
                            } else {
                                ErrorController.getInstance().add("El tipo " + val.value + " no es asignable con " + this.getType(valor.type), "Semántico", this.row, this.column);
                            }
            } else {

                ErrorController.getInstance().add("No se puede cambiar el tipo de la variable " + this.id + " por que es una constante", "Semántico", this.row, this.column);
        
            }

            
        } catch (error) {
           
            ErrorController.getInstance().add(error.error, "Semántico", error.row, error.column);
        }
        
    }

    public getId(): string{
        return this.id
    }
    public getType(type: TypeAll):string {


        if (type == 0) {
            return "NUMBER"
            
        }
        if (type == 1) {
            return "STRING"
            
        }

        if (type == 2) {
            return "BOOLEAN"
         
        }
        
        return ""
    }

}