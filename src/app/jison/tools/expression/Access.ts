import { Expression } from '../abstract/expression';
import { Ambit } from '../id/ambit.identifier';
import { Returned } from '../abstract/enums';
import { ErrorController } from '../../../components/controller/error.controller';
import { OutputController } from 'src/app/components/controller/output.controller';


export class Access extends Expression {

    private id:string;  
    public row: number;
    public column:number;
    public name = "Access";
    constructor(i: string, r : number, c: number){
        super(r, c, "Access");
        this.id = i;
        this.row =r;
        this.column = c;
    }

    
    public exec(ambit: Ambit): Returned {

        var value = ambit.getVariable(this.id);

        if(value == null) {
            OutputController.getinstance().setValue("Este es un error: La variable '" + this.id + "' no ha sido declarada o no existe en este ambito" + ", en la linea: " + this.row + ", en la columna: " + this.column)
            ErrorController.getInstance().add("Variable '" + this.id + "' no definida ", "Semantico", this.row, this.column);
            return {value : 'undefined', type : 8};
    
        }
        return {value : value.value, type : value.type};
    }

    public getName(){
        return this.name;
    }
    public getId(){
        return this.id;
    }
}