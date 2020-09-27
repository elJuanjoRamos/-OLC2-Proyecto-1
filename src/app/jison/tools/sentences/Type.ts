import { Ambit } from '../id/ambit.identifier';
import { Instruction } from '../abstract/instruction';
import { ErrorController } from '../../../components/controller/error.controller'
export class Type extends Instruction {

    public id;
     public type;
      public value;
      public row;
      public col

    constructor(i, t, v,r,c) {
        super(r, c);
        this.id = i;
        this.value = v;
        this.type = t;
        this.row = r;
        this.col = c;
    }

    public exec(ambit: Ambit) {
        try {
            
            ambit.saveTypes(this.id, this.value, this.type);

        } catch (error) {
            ErrorController.getInstance().add(error.error, "Semantico", this.row, this.col);
        }
        
    }

}