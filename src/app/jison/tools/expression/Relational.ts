import { Expression } from '../abstract/expression';
import { Returned, TypeAll, OpRelational } from '../abstract/enums';
import { Ambit } from '../id/ambit.identifier';



export class Relational extends Expression {
    public name = "Relational";
    private left:Expression;
    private right:Expression;
    private type: OpRelational;
    public row:number;
    public column: number;

    constructor(l: Expression, r: Expression, t: OpRelational, ro: number, col: number) {
        super(ro, col, "Relational");
        this.left = l;
        this.right = r;
        this.type = t;
        this.row = ro;
        this.column = col;
    }

    public exec(ambit: Ambit): Returned {

        var valIz = this.left.exec(ambit);
        var valDer = this.right.exec(ambit);
        switch (this.type) {
            case OpRelational.EQUALS:

                return { value: (valIz.value == valDer.value), type: TypeAll.BOOLEAN };

                break;
            case OpRelational.DISCTINCT:
                return { value: (valIz.value != valDer.value), type: TypeAll.BOOLEAN };
                break;
            case OpRelational.LESS:

                return { value: (valIz.value < valDer.value), type: TypeAll.BOOLEAN };
                break;
            case OpRelational.LESS_EQUALS:
                return { value: (valIz.value <= valDer.value), type: TypeAll.BOOLEAN };

                break;
            case OpRelational.HIGHER:
                return { value: (valIz.value > valDer.value), type: TypeAll.BOOLEAN };

                break;
            case OpRelational.HIGHER_EQUALS:
                return { value: (valIz.value >= valDer.value), type: TypeAll.BOOLEAN };

                break;
            default:
                break;
        }

        return { value: false, type: TypeAll.BOOLEAN }
    }

    public getLeft(){
        return this.left;
    }

    public getRight(){
        return this.right;
    }
    public setRight(r){
        this.right = r;
    }
    public getName(){
        return this.name;
    }
}
