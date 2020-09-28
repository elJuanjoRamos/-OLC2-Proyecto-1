import { Expression } from '../abstract/expression';
import { Returned, TypeAll, OpLogical } from '../abstract/enums';
import { Ambit } from '../id/ambit.identifier'



export class Logical extends Expression {
    public name = "Logical"
    private left:Expression;
    private right: Expression;
    private type: OpLogical;
    public row:number;
    public column:number;

    constructor(l: Expression, r: Expression, t: OpLogical, ro: number, c: number) {
        super(ro, c, "Logical");
        this.left = l;
        this.right = r;
        this.type = t;
        this.row = ro;
        this.column = c;
    }


    public exec(ambit: Ambit): Returned {
       
        switch (this.type) {
            case OpLogical.AND:
            
                var res = ((this.left.exec(ambit)).value && (this.right.exec(ambit)).value )
                return { value: res, type: TypeAll.BOOLEAN };

                break;
            case OpLogical.OR:


                var res = ((this.left.exec(ambit)).value || (this.right.exec(ambit)).value )
                return { value: res, type: TypeAll.BOOLEAN };

                break;
            case OpLogical.NOT:
                
                var res:any = !((this.left.exec(ambit)).value)
                return { value: res, type: TypeAll.BOOLEAN };

                break;

            default:
                break;
        }


        return { value: false, type: TypeAll.BOOLEAN }
    }
    public getName(){
        return this.name;
    }
}