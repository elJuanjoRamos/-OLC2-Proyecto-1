
import { Returned } from './enums';
import { Ambit } from '../id/ambit.identifier';

 export abstract class Expression {
    public row: number;
    public column: number;

    constructor(row: number, column: number) {
        this.row = row;
        this.column = column;
    }

    public abstract exec(ambit: Ambit) : Returned;
}
