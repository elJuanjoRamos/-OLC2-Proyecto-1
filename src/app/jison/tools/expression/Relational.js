import {Expression} from '../abstract/expression';
import { Returned, Type, OpRelational } from '../abstract/type';



export class Relational extends Expression {

    constructor(left,right,type,row, col){
        super(row,col);
    }

    exec(ambit) {
        console.error("RELACIONAL") 
        console.error(this.left)
        console.error(this.right)
        const leftValue = this.left.exec(ambit);
        const rightValue = this.right.exec(ambit);
        //IGUAL
        if(this.type == OpRelational.EQUALS){
            console.error(leftValue.value)
            console.error(rightValue.value)
            console.error(leftValue.value == rightValue.value)
            const result = leftValue.value == rightValue.value;
            return {value : result, type : Type.BOOLEAN};
        }
        //DIFERENTE
        else if(this.type == OpRelational.DISCTINCT){
            const result = leftValue.value != rightValue.value;
            return {value : result, type : Type.BOOLEAN};
        } 
        //MENOR
        else if(this.type == OpRelational.LESS){
            const result = leftValue.value < rightValue.value;
            return {value : result, type : Type.BOOLEAN};
        }
        //MENOR IGUAL
        else if(this.type == OpRelational.LESS_EQUALS){
            const result = leftValue.value <= rightValue.value;
            return {value : result, type : Type.BOOLEAN};
        } 
        //MAYOR
        else if(this.type == OpRelational.HIGHER){
            const result = leftValue.value > rightValue.value;
            return {value : result, type : Type.BOOLEAN};
        }
        //MAYOR IGUAL
        else if(this.type == OpRelational.HIGHER_EQUALS){
            const result = leftValue.value >= rightValue.value;
            return {value : result, type : Type.BOOLEAN};
        }
        return {value:0, type : Type.NUMBER}
    }
}
