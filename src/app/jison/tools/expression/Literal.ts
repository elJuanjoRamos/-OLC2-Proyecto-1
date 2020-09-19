import {Expression} from '../abstract/expression';
import {  Type, Returned } from '../abstract/type';


export class Literal extends Expression {

    /**
     * CONSTRUCTOR
     * @param value 
     * @param row 
     * @param col 
     * @param type 
     */
    constructor(private value : any, row : number, col: number, private type : number){
        super(row, col);
    }

    public exec() : Returned {
       
        switch (this.type) {
            case 0:
                return {value : Number(this.value), type : Type.NUMBER};
            case 1:
                return {value : this.value, type : Type.STRING};
            case 2:
                return {value : (this.value=="false")?false:true, type : Type.BOOLEAN};
            case 7:
                return {value : this.value, type : Type.ANY};
        }
    }
}