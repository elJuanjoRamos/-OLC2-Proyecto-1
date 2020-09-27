import { Ambit } from '../id/ambit.identifier';
export class Break  {

    private row: number;
    private column:number;

    constructor(r : number, c: number){
        this.row = r;
        this.column = c;
    }
    public exec(ambit : Ambit) {

        return { type: 'break', row : this.row, column: this.column }

    }
}