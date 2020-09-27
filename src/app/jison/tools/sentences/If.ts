import { Instruction } from '../abstract/instruction';
import { TypeAll } from '../abstract/enums'
import { Expression } from '../abstract/expression';
import { Ambit } from '../id/ambit.identifier';
import { ErrorController } from '../../../components/controller/error.controller';


export class IF extends Instruction {

    private condition : Expression;
    private sentences : Instruction;
    private elif : Instruction
    public row: number;
    public column: number

    constructor(cond: Expression, sent: Instruction, elseif: Instruction | null,r: number,c: number){
        super(r, c);
        this.condition = cond;
        this.sentences = sent;
        this.elif = elseif
        this.row = r;
        this.column = c;
    }

    public exec(ambit : Ambit) {
        var ambitName = "Global_If";
        if (ambit != null) {
            ambitName = ambit.getName()+"_If";
        }



        var ifAmbit = new Ambit(ambit, ambitName);

        const condition = this.condition.exec(ifAmbit);
        if(condition.type != TypeAll.BOOLEAN){
            ErrorController.getInstance().add("La condicion del If no es booleana", "Semantico" ,this.row, this.column);
        }

        if(condition.value == true){

            if (this.sentences != null) {
                return this.sentences.exec(ifAmbit);                
            }

        }
        else{
            
            if (this.elif != null) {
                var elseAmbit = new Ambit(ambit, ambitName);    
                return this.elif.exec(elseAmbit);        
            }

        }
    }
}