import { Instruction } from '../abstract/instruction';
import { Expression } from '../abstract/expression';
import { Ambit } from '../id/ambit.identifier';
import { ErrorController } from '../../../components/controller/error.controller';

export class TypeValue extends Instruction{

    public id;
    public value: Expression;
    public row;
    public column;
    constructor( i, v: Expression, r:number, c:number){
        super(r, c);
        this.id = i;
        this.value = v;
        this.row = r;
        this.column = c;
    }

    public exec(ambit: Ambit) {
        try {
           
            const val = this.value.exec(ambit);

            return {id: this.id, value: val.value, type: val.type};
            
        } catch (error) {
            
            ErrorController.getInstance().add(error.error, "Semántico", error.row, error.col);
        }
        
    }

}