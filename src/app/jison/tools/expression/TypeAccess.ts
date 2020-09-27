
import { Expression } from '../abstract/expression';
import { Ambit } from '../id/ambit.identifier';
import { Returned } from '../abstract/enums';
import { ErrorController } from '../../../components/controller/error.controller';


export class TypeAccess extends Expression {

    private id:string;  
    public idtemp:string;  
    public row: number;
    public column:number

    constructor(i: string, it: string, r : number, c: number){
        super(r, c);
        this.id = i;
        this.idtemp = it;
        this.row = r;
        this.column = c;
    }

    public exec(ambit: Ambit): Returned {
        
        const value = ambit.getVariable(this.id);
    

        if(value == null) {
            ErrorController.getInstance().add("La variable '" + this.id + "' no ha sido declarada o no existe en este ambito", "Semantico", this.row, this.column);
            return {value : 'undefined', type : 8};
        }

        for (const element of value.value.value) {
            if(element.id == this.idtemp) {
                return {value : element.value.value, type : element.value.type};
            }
        }

        return {value : value.value, type : value.type};
    }
}