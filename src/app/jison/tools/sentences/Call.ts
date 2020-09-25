import { Expression } from '../abstract/expression';
import { Instruction } from '../abstract/instruction';
import { Ambit } from '../id/ambit.identifier';

export class Call extends Instruction {


    constructor( public id, public expresiones : Array<Expression>, public row,  public col ){
        super(row, col);
    }

    public exec(ambit : Ambit) {
        
        var procedimiento = ambit.getFunc(this.id);

        if(procedimiento != undefined){
            
            const newEnv = new Ambit(ambit.getGlobal());

            for(let i = 0; i < this.expresiones.length; i++){

                const value = this.expresiones[i].exec(ambit);
                
                newEnv.save(procedimiento.params[i], value.value, value.type);
            }
            procedimiento.sentecias.exec(newEnv);
        }
    }
}