import {Expression} from '../abstract/expression';
import {  Type, OpArithmetic } from '../abstract/type';



export class Arithmetic extends Expression {
    /**
     * CONSTRUCTOR
     * @param left 
     * @param right 
     * @param type 
     * @param row 
     * @param col 
     */
    constructor(left,right,type,row, col){
        super(row,col);
    }

    exec(ambit)  {
        let result;
        const leftValue = this.left.exec(ambit);
        const rightValue = this.right.exec(ambit);

        if(this.type == OpArithmetic.SUM) {
            switch (leftValue.type) {
                /**
                 * SI EL IZQUIERDO ES NUMBER
                 * NUMBER + NUMBER : NUMBER
                 * NUMBER + STRING : STRING
                 * NUMBER + OTHER : ERROR
                 */
                case 0:
                    switch (rightValue.type) {
                        case 0:
                            result = {value : (leftValue.value + rightValue.value), type : Type.NUMBER};
                            break;
                        case 1:
                            result = {value : (leftValue.value.toString() + rightValue.value.toString()), type : Type.STRING};
                            break;
                        default:
                            throw {error: "Operador " + this.getOperator(this.type) + " NO puede ser aplicado a los tipos " + this.getType(leftValue.type) + " con " + this.getType(rightValue.type), row: this.row, col : this.col};
                    }
                    break;
                /**
                 * SI EL IZQUIERDO ES STRING
                 * STRING + OTHER : STRING
                 */
                case 1:
                    result = {value : (leftValue.value.toString() + rightValue.value.toString()), type : Type.STRING};
                    break;
                /**
                 * SI EL IZQUIERDO ES BOOLEAN
                 * BOOLEAN + STRING : STRING
                 * BOOLEAN + OTHER : ERROR
                 */
                case 2:
                    switch (rightValue.type) {
                        case 1:
                            result = {value : (leftValue.value.toString() + rightValue.value.toString()), type : Type.STRING};
                            break;
                        default:
                            throw {error: "Operador " + this.getOperator(this.type) + " NO puede ser aplicado a los tipos " + this.getType(leftValue.type) + " con " + this.getType(rightValue.type), row: this.row, col : this.col};
                    }
                    break;
                default:
                    throw {error: "Operador " + this.getOperator(this.type) + " NO puede ser aplicado a los tipos " + this.getType(leftValue.type) + " con " + this.getType(rightValue.type), row: this.row, col : this.col};
            }
        } else if(this.type == OpArithmetic.SUBTRACTION) {
            /**
             * SI EL IZQUIERDO ES NUMBER
             * NUMBER - NUMBER : NUMBER
             * NUMBER - OTHER : ERROR
             */
            switch (leftValue.type) {
                case 0:
                    if(rightValue.type == 0) {
                        result = {value : (leftValue.value - rightValue.value), type : Type.NUMBER};
                    } else {
                        throw {error: "Operador " + this.getOperator(this.type) + " NO puede ser aplicado a los tipos " + this.getType(leftValue.type) + " con " + this.getType(rightValue.type), row: this.row, col : this.col};
                    }
                    break;
                default:
                    throw {error: "Operador " + this.getOperator(this.type) + " NO puede ser aplicado a los tipos " + this.getType(leftValue.type) + " con " + this.getType(rightValue.type), row: this.row, col : this.col};
            }
        } else if(this.type == OpArithmetic.MULTIPLICATION) {
            /**
             * SI EL IZQUIERDO ES NUMBER
             * NUMBER * NUMBER : NUMBER
             * NUMBER * OTHER : ERROR
             */
            switch (leftValue.type) {
                case 0:
                    if(rightValue.type == 0) {
                        result = {value : (leftValue.value * rightValue.value), type : Type.NUMBER};
                    } else {
                        throw {error: "Operador " + this.getOperator(this.type) + " NO puede ser aplicado a los tipos " + this.getType(leftValue.type) + " con " + this.getType(rightValue.type), row: this.row, col : this.col};
                    }
                    break;
                default:
                    throw {error: "Operador " + this.getOperator(this.type) + " NO puede ser aplicado a los tipos " + this.getType(leftValue.type) + " con " + this.getType(rightValue.type), row: this.row, col : this.col};
            }
        } else if(this.type == OpArithmetic.DIVISION) {
            /**
             * SI EL IZQUIERDO ES NUMBER
             * NUMBER / NUMBER : NUMBER
             * NUMBER / OTHER : ERROR
             */
            switch (leftValue.type) {
                case 0:
                    if(rightValue.type == 0) {
                        result = {value : (leftValue.value / rightValue.value), type : Type.NUMBER};
                    } else {
                        throw {error: "Operador " + this.getOperator(this.type) + " NO puede ser aplicado a los tipos " + this.getType(leftValue.type) + " con " + this.getType(rightValue.type), row: this.row, col : this.col};
                    }
                    break;
                default:
                    throw {error: "Operador " + this.getOperator(this.type) + " NO puede ser aplicado a los tipos " + this.getType(leftValue.type) + " con " + this.getType(rightValue.type), row: this.row, col : this.col};
            }
        } else if(this.type == OpArithmetic.EXPONENT) {
            /**
             * SI EL IZQUIERDO ES NUMBER
             * NUMBER ^ NUMBER : NUMBER
             * NUMBER ^ OTHER : ERROR
             */
            switch (leftValue.type) {
                case 0:
                    if(rightValue.type == 0) {
                        result = {value : Math.pow(leftValue.value, rightValue.value), type : Type.NUMBER};
                    } else {
                        throw {error: "Operador " + this.getOperator(this.type) + " NO puede ser aplicado a los tipos " + this.getType(leftValue.type) + " con " + this.getType(rightValue.type), row: this.row, col : this.col};
                    }
                    break;
                default:
                    throw {error: "Operador " + this.getOperator(this.type) + " NO puede ser aplicado a los tipos " + this.getType(leftValue.type) + " con " + this.getType(rightValue.type), row: this.row, col : this.col};
            }
        } else if(this.type == OpArithmetic.MODULE) {
            /**
             * SI EL IZQUIERDO ES NUMBER
             * NUMBER % NUMBER : NUMBER
             * NUMBER % OTHER : ERROR
             */
            switch (leftValue.type) {
                case 0:
                    if(rightValue.type == 0) {
                        result = {value : (leftValue.value % rightValue.value), type : Type.NUMBER};
                    } else {
                        throw {error: "Operador " + this.getOperator(this.type) + " NO puede ser aplicado a los tipos " + this.getType(leftValue.type) + " con " + this.getType(rightValue.type), row: this.row, col : this.col};
                    }
                    break;
                default:
                    throw {error: "Operador " + this.getOperator(this.type) + " NO puede ser aplicado a los tipos " + this.getType(leftValue.type) + " con " + this.getType(rightValue.type), row: this.row, col : this.col};
            }
        } else if(this.type == OpArithmetic.INCREASE) {
            /**
             * SI EL IZQUIERDO ES NUMBER
             * NUMBER ++ : NUMBER
             * OTHER ++ : ERROR
             */
            switch (leftValue.type) {
                case 0:
                    if(rightValue.type == 0) {
                        result = {value : (leftValue.value+1), type : Type.NUMBER};
                    } else {
                        throw {error: "Operador " + this.getOperator(this.type) + " NO puede ser aplicado a los tipos " + this.getType(leftValue.type), row: this.row, col : this.col};
                    }
                    break;
                default:
                    throw {error: "Operador " + this.getOperator(this.type) + " NO puede ser aplicado a los tipos " + this.getType(leftValue.type), row: this.row, col : this.col};
            }
        }else if(this.type == OpArithmetic.DECREME) {
            /**
             * SI EL IZQUIERDO ES NUMBER
             * NUMBER -- : NUMBER
             * OTHER -- : ERROR
             */
            switch (leftValue.type) {
                case 0:
                    if(rightValue.type == 0) {
                        result = {value : (leftValue.value-1), type : Type.NUMBER};
                    } else {
                        throw {error: "Operador " + this.getOperator(this.type) + " NO puede ser aplicado a los tipos " + this.getType(leftValue.type), row: this.row, col : this.col};
                    }
                    break;
                default:
                    throw {error: "Operador " + this.getOperator(this.type) + " NO puede ser aplicado a los tipos " + this.getType(leftValue.type), row: this.row, col : this.col};
            }
        } else {
            throw {error: "Operador " + this.getOperator(this.type) + " NO puede ser aplicado a los tipos " + this.getType(leftValue.type) + " con " + this.getType(rightValue.type), row: this.row, col : this.col};
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