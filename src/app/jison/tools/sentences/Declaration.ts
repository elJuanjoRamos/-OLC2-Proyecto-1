import { Instruction } from '../abstract/instruction';
import { Expression } from '../abstract/expression';
import { ErrorController } from '../../../components/controller/error.controller';
import { Type } from '../abstract/type';
import { Ambit } from '../id/ambit.identifier';



export class Declaration extends Instruction{

    constructor(private id: string, private type:any, private value: Expression, row: number, column: number){
        super(row, column);
    }


    public exec(ambit: Ambit) {
        try {
            const val = this.value.exec(ambit);
            
            if(this.type == undefined) {
                ambit.save(this.id, val.value, val.type);
            } else {
                if(this.type != val.type) {
                    throw {error: "El tipo " + val.value + " no es asignable con " + this.getType(this.type), row: this.row, column : this.column};
                } else {
                    ambit.save(this.id, val.value, val.type);
                }
            }
        } catch (error) {
            /**
             * INGRESAR ERRORES SEMANTICOS
             */
            ErrorController.getInstance().add(error.error, "Semántico", error.row, error.column);
        }
        
    }

    public getId(): string{ 
        return this.id;
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