import {Expression} from '../abstract/expression';
import { TypeAll, Returned } from '../abstract/enums';


export class Literal extends Expression {

    constructor(private value : any, row : number, col: number, private type : number){
        super(row, col);
    }

    public exec() : Returned {
       
        switch (this.type) {
            case 0:
                return {value : Number(this.value), type : TypeAll.NUMBER};
            case 1:
                return {value : this.value, type : TypeAll.STRING};
            case 2:
                return {value : (this.value=="false")?false:true, type : TypeAll.BOOLEAN};
            case 7:
                return {value : this.value, type : TypeAll.ANY};
        }
    }
}