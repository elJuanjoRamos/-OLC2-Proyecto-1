import { Ambit } from '../id/ambit.identifier';
export class Break  {

    constructor(private row : number, private column: number){
    }
    public exec(ambit : Ambit) {

        return { type: 'break', row : this.row, column: this.column }

    }
}