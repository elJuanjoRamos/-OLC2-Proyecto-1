import { Instruction } from '../abstract/instruction';
import { TypeAll } from '../abstract/enums'
import { Expression } from '../abstract/expression';
import { Ambit } from '../id/ambit.identifier';
import { NoType } from './NoType';
import { Declaration } from './Declaration';
import { Sentence } from './Sentence';
import { ErrorController } from '../../../components/controller/error.controller';

export class FOR extends Instruction {

    

    private declaration:NoType | Declaration;
    private condition: Expression;
    private incrementDecrement: Expression;
    private sentencias: Sentence;
    public row: number;
    public column: number;

    constructor(d:NoType | Declaration, c: Expression,i: Expression,s: Sentence,r: number,col: number){
        super(r, col);
        this.declaration = d;
        this.condition = c;
        this.incrementDecrement = i;
        this.sentencias = s;
        this.row = r;
        this.column = col;
    
    }

    public exec(ambit : Ambit){
       
        var ambitName = "Global_For";
        if (ambit != null) {
            ambitName = ambit.getName()+"_For";
        }
       var newAmbit = new Ambit(ambit, ambitName)
       
        this.declaration.exec(newAmbit)
        
        var forCondition = this.condition.exec(newAmbit);

        if(forCondition.type != TypeAll.BOOLEAN){
            ErrorController.getInstance().add("La condicion del For no es booleana", "Semántico", this.column, this.row);
        }

       // let temporal: any = this.sentencias
        //if (temporal.length > 0) {
            while(forCondition.value == true){

           
                const element = this.sentencias.exec(newAmbit);
       
    
                if(element != null || element != undefined){
                    if(element.type == 'break')
                        break;
                    else if(element.type == 'continue')
                        this.incrementDecrement.exec(newAmbit);
                        continue;
                }
    
                const val = this.incrementDecrement.exec(newAmbit);
               
                
                newAmbit.setVariable(this.declaration.getId(), val.value, val.type, false)
                
    
                forCondition = this.condition.exec(newAmbit);
    
                if(forCondition.type != TypeAll.BOOLEAN){
                    ErrorController.getInstance().add("La condicion del For no es booleana", "Semántico", this.column, this.row);
                }
            }
        //}

        
    }
}