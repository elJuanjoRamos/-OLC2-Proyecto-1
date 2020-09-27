import { Expression } from '../abstract/expression';
import { TypeAll, OpArithmetic, Returned } from '../abstract/enums';



export class Arithmetic extends Expression {

    private left: Expression;
    private right: Expression;
    private type: OpArithmetic;
    public row: number;
    public column: number;

    constructor(l: Expression, ri: Expression, t: OpArithmetic, r: number, c: number) {
        super(r, c);
        this.left = l;
        this.right = ri;
        this.type = t;
        this.row = r;
        this.column = c;
    }

    public exec(ambit) {


        let result: Returned;
        var varIz = this.left.exec(ambit);
        var valDer = this.right.exec(ambit);

        switch (this.type) {
            case OpArithmetic.SUM:
                /**
                    * SI EL IZQUIERDO ES NUMBER
                    * NUMBER + NUMBER : NUMBER
                    * NUMBER + STRING : STRING
                    * NUMBER + ANY : ANY
                    * 
                    */
                if (varIz.type == 0) {
                    if (valDer.type == 0) {
                        result = { value: (varIz.value + valDer.value), type: TypeAll.NUMBER };
                    } else if (valDer.type == 1) {
                        result = { value: (varIz.value.toString() + valDer.value.toString()), type: TypeAll.STRING };
                    }
                    else {
                        throw { error: "Operador " + this.getOperator(this.type) + " NO puede ser aplicado a los tipos " + this.getType(varIz.type) + " con " + this.getType(valDer.type), row: this.row, column: this.column };
                    }
                }
                /**
                     * SI EL IZQUIERDO ES STRING
                     * STRING + OTHER : STRING
                     * 
                     */
                else if (varIz.type == 1) {
                    result = { value: (varIz.value.toString() + valDer.value.toString()), type: TypeAll.STRING };
                }
                /**
                     * SI EL IZQUIERDO ES ANY
                     * ANY + OTHER : ANY
                     * 
                     */

                else if (varIz.type == 8) {
                    result = { value: (varIz.value.toString() + valDer.value.toString()), type: TypeAll.ANY };
                }

                /**
                    * SI EL IZQUIERDO ES BOOLEAN
                    * BOOLEAN + STRING : STRING
                    * BOOLEAN + OTHER : ERROR
                    */
                else if (varIz.type == 2) {

                    switch (valDer.type) {
                        case 1:
                            result = { value: (varIz.value.toString() + valDer.value.toString()), type: TypeAll.STRING };
                            break;
                        default:
                            throw { error: "Operador " + this.getOperator(this.type) + " NO puede ser aplicado a los tipos " + this.getType(varIz.type) + " con " + this.getType(valDer.type), row: this.row, column: this.column };
                    }

                } else {
                    throw { error: "Operador " + this.getOperator(this.type) + " NO puede ser aplicado a los tipos " + this.getType(varIz.type) + " con " + this.getType(valDer.type), row: this.row, column: this.column };
                }

                break;
            case OpArithmetic.SUBTRACTION:

                if (varIz.type == 0) {
                    if (valDer.type == 0) {
                        result = { value: (varIz.value - valDer.value), type: TypeAll.NUMBER };
                    } else {
                        throw { error: "Operador " + this.getOperator(this.type) + " NO puede ser aplicado a los tipos " + this.getType(varIz.type) + " con " + this.getType(valDer.type), row: this.row, column: this.column };
                    }
                } else {
                    throw { error: "Operador " + this.getOperator(this.type) + " NO puede ser aplicado a los tipos " + this.getType(varIz.type) + " con " + this.getType(valDer.type), row: this.row, column: this.column };
                }
                break
            case OpArithmetic.MULTIPLICATION:
                if (varIz.type == 0) {
                    if (valDer.type == 0) {
                        result = { value: (varIz.value * valDer.value), type: TypeAll.NUMBER };
                    } else {
                        throw { error: "Operador " + this.getOperator(this.type) + " NO puede ser aplicado a los tipos " + this.getType(varIz.type) + " con " + this.getType(valDer.type), row: this.row, column: this.column };
                    }
                } else {
                    throw { error: "Operador " + this.getOperator(this.type) + " NO puede ser aplicado a los tipos " + this.getType(varIz.type) + " con " + this.getType(valDer.type), row: this.row, column: this.column };
                }
                break;
            case OpArithmetic.DIVISION:
                /**
                 * SI EL IZQUIERDO ES NUMBER
                 * NUMBER / NUMBER : NUMBER
                 * NUMBER / OTHER : ERROR
                 */
                if (varIz.type == 0) {
                    if (valDer.type == 0) {
                        result = { value: (varIz.value / valDer.value), type: TypeAll.NUMBER };
                    } else {
                        throw { error: "Operador " + this.getOperator(this.type) + " NO puede ser aplicado a los tipos " + this.getType(varIz.type) + " con " + this.getType(valDer.type), row: this.row, column: this.column };
                    }
                } else {
                    throw { error: "Operador " + this.getOperator(this.type) + " NO puede ser aplicado a los tipos " + this.getType(varIz.type) + " con " + this.getType(valDer.type), row: this.row, column: this.column };
                }
                break;
            case OpArithmetic.EXPONENT:
                /**
                * SI EL IZQUIERDO ES NUMBER
                * NUMBER ^ NUMBER : NUMBER
                * NUMBER ^ OTHER : ERROR
                */
                if (varIz.type == 0) {
                    if (valDer.type == 0) {
                        result = { value: Math.pow(varIz.value, valDer.value), type: TypeAll.NUMBER };
                    } else {
                        throw { error: "Operador " + this.getOperator(this.type) + " NO puede ser aplicado a los tipos " + this.getType(varIz.type) + " con " + this.getType(valDer.type), row: this.row, column: this.column };
                    }
                } else {
                    throw { error: "Operador " + this.getOperator(this.type) + " NO puede ser aplicado a los tipos " + this.getType(varIz.type) + " con " + this.getType(valDer.type), row: this.row, column: this.column };
                }
                break;
            case OpArithmetic.MODULE:
                /**
                * SI EL IZQUIERDO ES NUMBER
                * NUMBER % NUMBER : NUMBER
                * NUMBER % OTHER : ERROR
                */
                if (varIz.type == 0) {
                    if (valDer.type == 0) {
                        result = { value: (varIz.value % valDer.value), type: TypeAll.NUMBER };
                    } else {
                        throw { error: "Operador " + this.getOperator(this.type) + " NO puede ser aplicado a los tipos " + this.getType(varIz.type) + " con " + this.getType(valDer.type), row: this.row, column: this.column };
                    }
                } else {
                    throw { error: "Operador " + this.getOperator(this.type) + " NO puede ser aplicado a los tipos " + this.getType(varIz.type) + " con " + this.getType(valDer.type), row: this.row, column: this.column };
                }
                break;
            case OpArithmetic.INCREASE:
                /**
                 * SI EL IZQUIERDO ES NUMBER
                 * NUMBER ++ : NUMBER
                 * OTHER ++ : ERROR
                 */
                if (varIz.type == 0) {
                    if (valDer.type == 0) {
                        result = { value: (varIz.value + 1), type: TypeAll.NUMBER };
                    } else {
                        throw { error: "Operador " + this.getOperator(this.type) + " NO puede ser aplicado a los tipos " + this.getType(varIz.type), row: this.row, column: this.column };
                    }
                } else {
                    throw { error: "Operador " + this.getOperator(this.type) + " NO puede ser aplicado a los tipos " + this.getType(varIz.type), row: this.row, column: this.column };

                }
                break;
            case OpArithmetic.DECREME:
                /**
                 * SI EL IZQUIERDO ES NUMBER
                 * NUMBER -- : NUMBER
                 * OTHER -- : ERROR
                 */
                if (varIz.type == 0) {
                    if (valDer.type == 0) {
                        result = { value: (varIz.value - 1), type: TypeAll.NUMBER };
                    } else {
                        throw { error: "Operador " + this.getOperator(this.type) + " NO puede ser aplicado a los tipos " + this.getType(varIz.type), row: this.row, column: this.column };
                    }
                } else {
                    throw { error: "Operador " + this.getOperator(this.type) + " NO puede ser aplicado a los tipos " + this.getType(varIz.type), row: this.row, column: this.column };

                }
                break;
            case OpArithmetic.NEGATIVE:
                /**
                 * SI EL IZQUIERDO ES -
                 * - NUMBER : NUMBER
                 * - BOOLEAN : 0 o -1
                 * - STRING: NAN
                 */
                if (varIz.type == 0) {
                    result = { value: (-varIz.value), type: TypeAll.NUMBER };
                } else if (varIz.type == 1) {
                    result = { value: (-varIz.value), type: TypeAll.NUMBER };
                } else if (varIz.type == 2) {
                    result = { value: (-varIz.value), type: TypeAll.NUMBER };
                } else {
                    throw { error: "Operador " + this.getOperator(this.type) + " NO puede ser aplicado a los tipos " + this.getType(varIz.type), row: this.row, column: this.column };
                }
                break;
            default:
                throw { error: "Operador " + this.getOperator(this.type) + " NO puede ser aplicado a los tipos " + this.getType(varIz.type) + " con " + this.getType(valDer.type), row: this.row, column: this.column };
                break;
        }


        return result;
    }

    getType(type) {

        if (type == 0) {
            return "NUMBER"

        }
        if (type == 1) {
            return "STRING"
        }
        if (type == 2) {
            return "BOOLEAN"
        }

        return ""
    }

    getOperator(type) {

        if (type == 0) {
            return "+"

        } else if (type == 1) {
            return "-"
        }
        else if (type == 2) {
            return "*"
        }
        else if (type == 3) {
            return "/"
        }
        else if (type == 4) {
            return "^"
        }
        else if (type == 5) {
            return "%"
        } 
        else if (type == 6) {
            return "++"
        } 
        else if (type == 7) {
            return "--"
        }

        return ""
    }
}