import { Instruction } from '../abstract/instruction';
import { TypeAll } from '../abstract/enums'
import { Expression } from '../abstract/expression';
import { Ambit } from '../id/ambit.identifier';
import { ErrorController } from '../../../components/controller/error.controller';
import { OutputController } from 'src/app/components/controller/output.controller';

export class DoWhile extends Instruction{

    private condicion:Expression;
    private sentences:Instruction;
    public row:number;
    public column:number;


    constructor(con: Expression, s: Instruction,r: number,c: number){
        super(r, c);
        this.condicion = con;
        this.sentences = s;
        this.row = r;
        this.column = c;
    }

    public exec(ambit : Ambit) {
        var ambitName = "Global_DoWhile";
        if (ambit != null) {
            ambitName = ambit.getName()+"_DoWhile";
        }
        var newAmbit = new Ambit(ambit, ambitName);
        let condicion = this.condicion.exec(newAmbit);
        
        if(condicion.type != TypeAll.BOOLEAN){
            OutputController.getinstance().setValue("La condicion del Do While no es booleana" + ", en la linea: " + this.row + ", en la columna: " + this.column)
            ErrorController.getInstance().add("La condicion del Do While no es booleana", "Semántico", this.column, this.row);

        }
        do {
            const element = this.sentences.exec(newAmbit);
            if(element != null || element != undefined){
                if(element.type == 'break')
                    break;
                else if(element.type == 'Continue')
                    continue;
            }
            condicion = this.condicion.exec(newAmbit);
            if(condicion.type != TypeAll.BOOLEAN){
                OutputController.getinstance().setValue("La condicion del Do While no es booleana" + ", en la linea: " + this.row + ", en la columna: " + this.column)
                ErrorController.getInstance().add("La condicion del Do While no es booleana", "Semántico", this.column, this.row);
            }
        } while(condicion.value == true);
    }
}