import {Expression} from '../abstract/expression';
import {  Type } from '../abstract/type';


export class Literal extends Expression {

    /**
     * CONSTRUCTOR
     * @param value 
     * @param row 
     * @param col 
     * @param type 
     */
    constructor(value, row, col, type){
        super(row, col);
    }

    exec() {
        //console.error("LITERAL")
        //console.log(this.value)
        //console.log(this.type)
        switch (this.type) {
            case 0:
                return {value : Number(this.value), type : Type.NUMBER};
            case 1:
                return {value : this.value, type : Type.STRING};
            case 2:
                return {value : (this.value=="false")?false:true, type : Type.BOOLEAN};
        }
    }
}