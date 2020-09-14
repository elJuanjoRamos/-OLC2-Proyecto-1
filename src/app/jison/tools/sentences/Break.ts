import { Ambit } from '../id/ambit.identifier';
export class Break  {

    constructor(private id: string, private row : number, private column: number){
    }
    public exec(ambit : Ambit) {

        return { value: 'break', row : this.row, column: this.column }

    }
}