import { Ambit } from '../id/ambit.identifier';

export abstract class Instruction {

    public row: number;
    public column: number;

    /**
     * CONSTRUCTOR
     * @param row 
     * @param column 
     */
    constructor(row: number, column: number) {
        this.row = row;
        this.column = column;
    }

    public abstract exec(ambit : Ambit) : any;

}
