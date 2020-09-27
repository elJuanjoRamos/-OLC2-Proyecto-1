import { Instruction } from '../abstract/instruction';
import { Ambit } from '../id/ambit.identifier';

export class Sentence extends Instruction{

    private sentences : Array<Instruction> = new Array();
    public row : number;
    public column : number
    constructor(s : Array<Instruction>, r : number, c : number){
        super(r, c);
        this.sentences = s;
        this.row = r;
        this.column = c;
    }

    public exec(amb : Ambit) {

        var ambitName = "Global";
        if (amb != null) {
            ambitName = amb.getName();
        }

        const newAmbit = new Ambit(amb, ambitName);
        
        for(const instr of this.sentences){
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
