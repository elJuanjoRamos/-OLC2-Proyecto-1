import { Expression } from '../abstract/expression';
import { Returned, TypeAll, OpRelational } from '../abstract/enums';
import { Ambit } from '../id/ambit.identifier';



export class Relational extends Expression {

    constructor(private left: Expression, private right: Expression, private type: OpRelational, row: number, col: number) {
        super(row, col);
    }

    public exec(ambit: Ambit): Returned {

        const leftValue = this.left.exec(ambit);
        const rightValue = this.right.exec(ambit);
        switch (this.type) {
            case OpRelational.EQUALS:

                return { value: (leftValue.value == rightValue.value), type: TypeAll.BOOLEAN };

                break;
            case OpRelational.DISCTINCT:
                return { value: (leftValue.value != rightValue.value), type: TypeAll.BOOLEAN };
                break;
            case OpRelational.LESS:

                return { value: (leftValue.value < rightValue.value), type: TypeAll.BOOLEAN };
                break;
            case OpRelational.LESS_EQUALS:
                return { value: (leftValue.value <= rightValue.value), type: TypeAll.BOOLEAN };

                break;
            case OpRelational.HIGHER:
                return { value: (leftValue.value > rightValue.value), type: TypeAll.BOOLEAN };

                break;
            case OpRelational.HIGHER_EQUALS:
                return { value: (leftValue.value >= rightValue.value), type: TypeAll.BOOLEAN };

                break;
            default:
                break;
        }

        return { value: false, type: TypeAll.BOOLEAN }
    }
}
