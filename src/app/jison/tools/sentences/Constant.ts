import { Instruction } from '../abstract/instruction';
import { Expression } from '../abstract/expression';
import { ErrorController } from '../../../components/controller/error.controller';
import { TypeAll } from '../abstract/enums';
import { Ambit } from '../id/ambit.identifier';
import { OutputController } from 'src/app/components/controller/output.controller';



export class Constant extends Instruction{

    private id:string;
    private type:any;
    private value:Expression;
    public row:number;
    public column:number;

    constructor(i: string, t:any, v: Expression, r: number, c: number){
        super(r, c);
        this.id = i;
        this.type = t;
        this.value = v;
        this.row = r;
        this.column = c;
    }
    public exec(ambit: Ambit) {
        try {
            const val = this.value.exec(ambit);
            
            if(this.type == undefined) {
                ambit.save(this.id, val.value, val.type, true);
            } else {
                if((this.type != val.type) && this.type != 7) {

                    ErrorController.getInstance().add("El tipo " + val.value + " no es asignable con " + this.getType(this.type), "Semantico" ,this.row, this.column);
                    OutputController.getinstance().setValue("El tipo " + val.value + " no es asignable con " + this.getType(this.type) + ", en la linea: " + this.row + ", en la columna: " + this.column)
                 
                    
                } else {
                    ambit.save(this.id, val.value, val.type, true);
                }
            }
        } catch (error) {
           
            ErrorController.getInstance().add(error.error, "Semántico", error.row, error.column);
        }
        
    }

    public getId(): string{ 
        return this.id;
    }

    
    public getType(type: TypeAll):string {
        switch (type) {
            case 0:
                return "NUMBER"
            case 1:
                return "STRING"
            case 2:
                return "BOOLEAN"
                case 7:
                    return "ANY"
            }
        return ""
    }

}