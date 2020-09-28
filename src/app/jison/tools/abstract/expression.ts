
import { Returned } from './enums';
import { Ambit } from '../id/ambit.identifier';

 export abstract class Expression {
    public row: number;
    public column: number;
    public name: string;
    constructor(row: number, column: number, name: string) {
        this.row = row;
        this.column = column;
    }

    public abstract exec(ambit: Ambit) : Returned;
}
