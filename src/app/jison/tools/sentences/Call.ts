import { Console } from './Console';
import { TablaSimbolosController } from 'src/app/components/controller/tablasimbolo.conroller';
import { Expression } from '../abstract/expression';
import { Instruction } from '../abstract/instruction';
import { Ambit } from '../id/ambit.identifier';
import { Literal } from '../expression/Literal';

export class Call extends Instruction {


    constructor( public id:string, public expresiones : Array<Expression>, public row,  public col ){
        super(row, col);
    }

    public exec(ambit : Ambit) {


        if (this.id.includes("graficar_ts")) {
            

            var tempo: any[] = TablaSimbolosController.getInstance().variablesByAmbit(ambit.getName())

            if (tempo != []) {
                
                this.printAmbit("==========  " + ambit.getName() + " AMBIT ==========")

                this.printAmbit("Nombre |Tipo   |Ambito |Retorno    |Vari   |Func");

                for (let i = 0; i < tempo.length; i++) {
                    const element = tempo[i];
                    
                    var temp = element.getName() + "   |" + element.getType() + "   |" + element.getAmbit() + "   |" + element.getReturned() + "   |" + element.getVariable() +  "   |" + element.getFuncion()
                    this.printAmbit(  temp  );    
                }
                this.printAmbit("========== END AMBIT ==========")
            }
            


        } else {

            var ambitName = "Function_"+this.id;
            var func = ambit.getFunc(this.id);

            if(func != undefined){
                

                
                const newEnv = new Ambit(ambit.getGlobal(), ambitName);

                for(let i = 0; i < this.expresiones.length; i++){

                    const value = this.expresiones[i].exec(ambit);
                    
                    newEnv.save(func.params[i], value.value, value.type, false);
                }
                if (func.sentecias != null) {
                    func.sentecias.exec(newEnv);
                }
                
            }

        }
        
    }

    public printAmbit(texto: string){
        var lit = new Literal(texto, 0,0,1);
        var temp = new Console(lit, 0, 0);
        temp.exec(null);
    }
}