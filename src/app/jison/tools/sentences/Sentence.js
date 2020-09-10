import { Instruction } from '../abstract/instruction';
import { AmbitIdentifier } from '../id/ambit.identifier';

export class Sentence extends Instruction{

    constructor(code, row, col){
        super(row, col);
    }

    exec(env) {
        const newEnv = new AmbitIdentifier(env);
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
