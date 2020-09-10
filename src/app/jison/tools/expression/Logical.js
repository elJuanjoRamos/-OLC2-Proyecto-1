import {Expression} from '../abstract/expression';
import { Returned, Type, OpLogical } from '../abstract/type';




export class Logical extends Expression {

    constructor(left,right,type,row,col){
        super(row,col);
    }

    exec(ambit){
        console.error("LOGICA")
        console.error(this.left)
        console.error(this.right)
        const leftValue = this.left.exec(ambit);
        const rightValue = this.right.exec(ambit);

        //AND
        if(this.type == OpLogical.AND){
            const result = leftValue.value && rightValue.value;
            return {value : result, type : Type.BOOLEAN};
        }
        //OR
        else if(this.type == OpLogical.OR){
            const result = leftValue.value || rightValue.value;
            return {value : result, type : Type.BOOLEAN};
        } 
        //NOT
        else if(this.type == OpLogical.NOT){
            const result = !leftValue.value;
            return {value : result, type : Type.BOOLEAN};
        }
        return {value:false, type : Type.BOOLEAN}
    }
}