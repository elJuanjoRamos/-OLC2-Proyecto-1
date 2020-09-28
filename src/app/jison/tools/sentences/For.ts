import { Instruction } from '../abstract/instruction';
import { TypeAll } from '../abstract/enums'
import { Expression } from '../abstract/expression';
import { Ambit } from '../id/ambit.identifier';
import { NoType } from './NoType';
import { Declaration } from './Declaration';
import { Sentence } from './Sentence';
import { ErrorController } from '../../../components/controller/error.controller';
import { OutputController } from 'src/app/components/controller/output.controller';
import { Relational } from '../expression/Relational';
import { Access } from '../expression/Access';
import { Literal } from '../expression/Literal';

export class FOR extends Instruction {

    

    private declaration:NoType | Declaration;
    private condition: Relational;
    private incrementDecrement: Expression;
    private sentencias: Sentence;
    public row: number;
    public column: number;

    constructor(d:NoType | Declaration, c: Relational,i: Expression,s: Sentence,r: number,col: number){
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
        
        var forCondition;
        if (this.condition.getRight().name =="Access") {
            
            var temp:any = this.condition.getRight();

            var array:any = ambit.getVariable(temp.getId());

            if (array != null) {

                if (array.type == 7 || array.type == 4|| array.type == 5|| array.type == 6) {
                    var len = array.value.length;
                    
                    this.condition.setRight(new Literal(len, 0,0, 0));
                    
                    forCondition = this.condition.exec(newAmbit);
                    
                } else {
                    OutputController.getinstance().setValue("La variable " + temp.getId() + " no es un arreglo" + ", en la linea: " + this.row + ", en la columna: " + this.column)
                }    
            } else {
                forCondition = { type:false }
                OutputController.getinstance().setValue("La variable " + temp.getId() + " no esta definida" + ", en la linea: " + this.row + ", en la columna: " + this.column)
            }

        } else {
            forCondition = this.condition.exec(newAmbit);
        }

        
        if(forCondition.type != TypeAll.BOOLEAN){
            OutputController.getinstance().setValue("La condicion del For no es booleana" + ", en la linea: " + this.row + ", en la columna: " + this.column)
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
                    OutputController.getinstance().setValue("La condicion del For no es booleana" + ", en la linea: " + this.row + ", en la columna: " + this.column)
                    ErrorController.getInstance().add("La condicion del For no es booleana", "Semántico", this.column, this.row);
                }
            }
        //}

        
    }
}