import { Expression } from '../abstract/expression';
import { TypeAll, Returned } from '../abstract/enums';


export class Literal extends Expression {
    public name = "Literal";
    private value: any;
    public row: number;
    public column: number;
    private type: number;
    constructor(v: any, r: number, c: number, t: number) {
        super(r, c, "Literal");
        this.value = v;
        this.row = r;
        this.column = c;
        this.type = t;
    }

    public exec(): Returned {

        if (this.type == 0) {
            return { value: Number(this.value), type: TypeAll.NUMBER };
        }
        else if (this.type == 1) {
            return { value: this.value, type: TypeAll.STRING };
        }
        else if (this.type == 2) {
            if (this.value == "false") {
                return { value: false, type: TypeAll.BOOLEAN };
            } else {
                return { value: true, type: TypeAll.BOOLEAN };
            }
        }
        else if (this.type == 7) {
            return { value: this.value, type: TypeAll.ANY };
        }

    }

    public getName(){
        return this.name;
    }
}