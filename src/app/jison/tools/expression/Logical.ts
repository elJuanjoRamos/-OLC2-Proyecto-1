import { Expression } from '../abstract/expression';
import { Returned, Type, OpLogical } from '../abstract/type';
import { Ambit } from '../id/ambit.identifier'



export class Logical extends Expression {

    constructor(private left: Expression, private right: Expression, private type: OpLogical, row: number, column: number) {
        super(row, column);
    }


    public exec(ambit: Ambit): Returned {
       
        switch (this.type) {
            case OpLogical.AND:
            
                var res = ((this.left.exec(ambit)).value && (this.right.exec(ambit)).value )
                return { value: res, type: Type.BOOLEAN };

                break;
            case OpLogical.OR:


                var res = ((this.left.exec(ambit)).value || (this.right.exec(ambit)).value )
                return { value: res, type: Type.BOOLEAN };

                break;
            case OpLogical.NOT:
                
                var res:any = !((this.left.exec(ambit)).value)
                return { value: res, type: Type.BOOLEAN };

                break;

            default:
                break;
        }


        return { value: false, type: Type.BOOLEAN }
    }
}