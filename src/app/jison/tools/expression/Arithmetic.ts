import { Expression } from '../abstract/expression';
import { Type, OpArithmetic, Returned } from '../abstract/type';



export class Arithmetic extends Expression {
    /**
     * CONSTRUCTOR
     * @param left 
     * @param right 
     * @param type 
     * @param row 
     * @param column 
     */
    constructor(private left: Expression, private right: Expression, private type: OpArithmetic, row: number, column: number) {
        super(row, column);
    }

    public exec(ambit) {
        let result: Returned;
        const leftValue = this.left.exec(ambit);
        const rightValue = this.right.exec(ambit);

        switch (this.type) {
            case OpArithmetic.SUM:
                /**
                    * SI EL IZQUIERDO ES NUMBER
                    * NUMBER + NUMBER : NUMBER
                    * NUMBER + STRING : STRING
                    * NUMBER + OTHER : ERROR
                    */
                if (leftValue.type == 0) {
                    if (rightValue.type == 0) {
                        result = { value: (leftValue.value + rightValue.value), type: Type.NUMBER };
                    } else if (rightValue.type == 1) {
                        result = { value: (leftValue.value.toString() + rightValue.value.toString()), type: Type.STRING };
                    } else {
                        throw { error: "Operador " + this.getOperator(this.type) + " NO puede ser aplicado a los tipos " + this.getType(leftValue.type) + " con " + this.getType(rightValue.type), row: this.row, column: this.column };
                    }
                }
                /**
                     * SI EL IZQUIERDO ES STRING
                     * STRING + OTHER : STRING
                     */
                else if (leftValue.type == 1) {
                    result = { value: (leftValue.value.toString() + rightValue.value.toString()), type: Type.STRING };
                }
                /**
                    * SI EL IZQUIERDO ES BOOLEAN
                    * BOOLEAN + STRING : STRING
                    * BOOLEAN + OTHER : ERROR
                    */
                else if (leftValue.type == 2) {

                    switch (rightValue.type) {
                        case 1:
                            result = { value: (leftValue.value.toString() + rightValue.value.toString()), type: Type.STRING };
                            break;
                        default:
                            throw { error: "Operador " + this.getOperator(this.type) + " NO puede ser aplicado a los tipos " + this.getType(leftValue.type) + " con " + this.getType(rightValue.type), row: this.row, column: this.column };
                    }

                } else {
                    throw { error: "Operador " + this.getOperator(this.type) + " NO puede ser aplicado a los tipos " + this.getType(leftValue.type) + " con " + this.getType(rightValue.type), row: this.row, column: this.column };
                }

                break;
            case OpArithmetic.SUBTRACTION:

                if (leftValue.type == 0) {
                    if (rightValue.type == 0) {
                        result = { value: (leftValue.value - rightValue.value), type: Type.NUMBER };
                    } else {
                        throw { error: "Operador " + this.getOperator(this.type) + " NO puede ser aplicado a los tipos " + this.getType(leftValue.type) + " con " + this.getType(rightValue.type), row: this.row, column: this.column };
                    }
                } else {
                    throw { error: "Operador " + this.getOperator(this.type) + " NO puede ser aplicado a los tipos " + this.getType(leftValue.type) + " con " + this.getType(rightValue.type), row: this.row, column: this.column };
                }
                break
            case OpArithmetic.MULTIPLICATION:
                if (leftValue.type == 0) {
                    if (rightValue.type == 0) {
                        result = { value: (leftValue.value * rightValue.value), type: Type.NUMBER };
                    } else {
                        throw { error: "Operador " + this.getOperator(this.type) + " NO puede ser aplicado a los tipos " + this.getType(leftValue.type) + " con " + this.getType(rightValue.type), row: this.row, column: this.column };
                    }
                } else {
                    throw { error: "Operador " + this.getOperator(this.type) + " NO puede ser aplicado a los tipos " + this.getType(leftValue.type) + " con " + this.getType(rightValue.type), row: this.row, column: this.column };
                }
                break;
            case OpArithmetic.DIVISION:
                /**
                 * SI EL IZQUIERDO ES NUMBER
                 * NUMBER / NUMBER : NUMBER
                 * NUMBER / OTHER : ERROR
                 */
                if (leftValue.type == 0) {
                    if (rightValue.type == 0) {
                        result = { value: (leftValue.value / rightValue.value), type: Type.NUMBER };
                    } else {
                        throw { error: "Operador " + this.getOperator(this.type) + " NO puede ser aplicado a los tipos " + this.getType(leftValue.type) + " con " + this.getType(rightValue.type), row: this.row, column: this.column };
                    }
                } else {
                    throw { error: "Operador " + this.getOperator(this.type) + " NO puede ser aplicado a los tipos " + this.getType(leftValue.type) + " con " + this.getType(rightValue.type), row: this.row, column: this.column };
                }
                break;
            case OpArithmetic.EXPONENT:
                /**
                * SI EL IZQUIERDO ES NUMBER
                * NUMBER ^ NUMBER : NUMBER
                * NUMBER ^ OTHER : ERROR
                */
                if (leftValue.type == 0) {
                    if (rightValue.type == 0) {
                        result = { value: Math.pow(leftValue.value, rightValue.value), type: Type.NUMBER };
                    } else {
                        throw { error: "Operador " + this.getOperator(this.type) + " NO puede ser aplicado a los tipos " + this.getType(leftValue.type) + " con " + this.getType(rightValue.type), row: this.row, column: this.column };
                    }
                } else {
                    throw { error: "Operador " + this.getOperator(this.type) + " NO puede ser aplicado a los tipos " + this.getType(leftValue.type) + " con " + this.getType(rightValue.type), row: this.row, column: this.column };
                }
                break;
            case OpArithmetic.MODULE:
                /**
                * SI EL IZQUIERDO ES NUMBER
                * NUMBER % NUMBER : NUMBER
                * NUMBER % OTHER : ERROR
                */
                if (leftValue.type == 0) {
                    if (rightValue.type == 0) {
                        result = { value: (leftValue.value % rightValue.value), type: Type.NUMBER };
                    } else {
                        throw { error: "Operador " + this.getOperator(this.type) + " NO puede ser aplicado a los tipos " + this.getType(leftValue.type) + " con " + this.getType(rightValue.type), row: this.row, column: this.column };
                    }
                } else {
                    throw { error: "Operador " + this.getOperator(this.type) + " NO puede ser aplicado a los tipos " + this.getType(leftValue.type) + " con " + this.getType(rightValue.type), row: this.row, column: this.column };
                }
                break;
            case OpArithmetic.INCREASE:
                /**
                 * SI EL IZQUIERDO ES NUMBER
                 * NUMBER ++ : NUMBER
                 * OTHER ++ : ERROR
                 */
                if (leftValue.type == 0) {
                    if (rightValue.type == 0) {
                        result = { value: (leftValue.value + 1), type: Type.NUMBER };
                    } else {
                        throw { error: "Operador " + this.getOperator(this.type) + " NO puede ser aplicado a los tipos " + this.getType(leftValue.type), row: this.row, column: this.column };
                    }
                } else {
                    throw { error: "Operador " + this.getOperator(this.type) + " NO puede ser aplicado a los tipos " + this.getType(leftValue.type), row: this.row, column: this.column };

                }
                break;
            case OpArithmetic.DECREME:
                /**
                 * SI EL IZQUIERDO ES NUMBER
                 * NUMBER -- : NUMBER
                 * OTHER -- : ERROR
                 */
                if (leftValue.type == 0) {
                    if (rightValue.type == 0) {
                        result = { value: (leftValue.value - 1), type: Type.NUMBER };
                    } else {
                        throw { error: "Operador " + this.getOperator(this.type) + " NO puede ser aplicado a los tipos " + this.getType(leftValue.type), row: this.row, column: this.column };
                    }
                } else {
                    throw { error: "Operador " + this.getOperator(this.type) + " NO puede ser aplicado a los tipos " + this.getType(leftValue.type), row: this.row, column: this.column };

                }
                break;
            case OpArithmetic.NEGATIVE:
                /**
                 * SI EL IZQUIERDO ES -
                 * - NUMBER : NUMBER
                 * - BOOLEAN : 0 o -1
                 * - STRING: NAN
                 */
                if (leftValue.type == 0) {
                    result = { value: (-leftValue.value), type: Type.NUMBER };
                } else if (leftValue.type == 1) {
                    result = { value: (-leftValue.value), type: Type.NUMBER };
                } else if (leftValue.type == 2) {
                    result = { value: (-leftValue.value), type: Type.NUMBER };
                } else {
                    throw { error: "Operador " + this.getOperator(this.type) + " NO puede ser aplicado a los tipos " + this.getType(leftValue.type), row: this.row, column: this.column };
                }
                break;
            default:
                throw { error: "Operador " + this.getOperator(this.type) + " NO puede ser aplicado a los tipos " + this.getType(leftValue.type) + " con " + this.getType(rightValue.type), row: this.row, column: this.column };
                break;
        }


        return result;
    }

    getType(type) {
        switch (type) {
            case 0:
                return "NUMBER"
            case 1:
                return "STRING"
            case 2:
                return "BOOLEAN"
        }
        return ""
    }

    getOperator(type) {
        switch (type) {
            case 0:
                return "+"
            case 1:
                return "-"
            case 2:
                return "*"
            case 3:
                return "/"
            case 4:
                return "^"
            case 5:
                return "%"
            case 6:
                return "++"
            case 7:
                return "--"
        }
        return ""
    }
}