import { Instruction } from '../abstract/instruction';
import { ErrorController } from '../../../components/controller/error.controller';
import { Ambit } from '../id/ambit.identifier';
import { Expression } from '../abstract/expression';

export class TypeNoType extends Instruction{

    public id;
    public idtemp;
    public value: Expression;
    public row;
    public column;


    constructor( i, t, v: Expression, r, c){
        super(r, c);
        this.id = i;
        this.value = v;
        this.idtemp = t;
        this.row = r;
        this.column = c;
    }

    public exec(environment: Ambit) {
        try {
            
            var val = this.value.exec(environment);
            
            const value = environment.getVariable(this.id);
            
            if(value == null) {
                ErrorController.getInstance().add("La variable " + this.id + " no existe o no esta declarada", "Semántico", this.row, this.column);
            }
            for (const iterator of value.value.value) {

                if(iterator.id == this.idtemp) {

                    iterator.value.value = val.value;
                    
                    return {value : iterator.value.value, type : iterator.value.type};
                }
            }
           
        } catch (error) {
            ErrorController.getInstance().add(error.error, "Semántico", error.row, error.col);
        }
        
    }


}