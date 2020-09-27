import { Instruction } from '../abstract/instruction';
import { Ambit } from '../id/ambit.identifier';

export class Sentence extends Instruction{

    constructor(private code : Array<Instruction>, row : number, column : number){
        super(row, column);
    }

    public exec(amb : Ambit) {

        var ambitName = "Global";
        if (amb != null) {
            ambitName = amb.getName();
        }

        const newAmbit = new Ambit(amb, ambitName);
        
        for(const instr of this.code){
            try {
                const element = instr.exec(newAmbit);
                if(element != undefined || element != null)
                    return element;                
            } catch (error) {
                console.error(error)
            }
        }
    }
}
