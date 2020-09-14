import { Instruction } from '../abstract/instruction';
import { Ambit } from '../id/ambit.identifier';

export class Sentence extends Instruction{

    constructor(private code : Array<Instruction>, row : number, column : number){
        super(row, column);
    }

    public exec(env : Ambit) {
        const newEnv = new Ambit(env);
        for(const instr of this.code){
            try {
                const element = instr.exec(newEnv);
                if(element != undefined || element != null)
                    return element;                
            } catch (error) {
                console.error(error)
            }
        }
    }
}
