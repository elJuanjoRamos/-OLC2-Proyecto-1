import { Expression } from '../abstract/expression';
import { Ambit } from '../id/ambit.identifier';
import { Returned } from '../abstract/enums';
import { ErrorController } from '../../../components/controller/error.controller';
import { OutputController } from 'src/app/components/controller/output.controller';


export class ArrayAccess extends Expression {

    private id:string;  
    public row: number;
    public column:number;
    public name = "Access";
    public acceso2: any;
    constructor(i: string, ac: any,  r : number, c: number){
        super(r, c, "Access");
        this.id = i;
        this.row =r;
        this.column = c;
        this.acceso2 = ac;
    }

    
    public exec(ambit: Ambit): Returned {
        var test = this.id
        var flag = false;
        for (let i = 0; i < this.acceso2.length; i++) {
            var element:any = this.acceso2[i];
            if (element.name == "Access") {
                
                var variableTemp = ambit.getVariable(element.id);

                if (variableTemp != null) {
                    test = test + '['+ variableTemp.value +']'
                    flag = true
                } else {
                    break;
                }
            } else if(element.name == "Literal"){
                test = test + '['+ element.value +']'
            }
        }

        if (flag) {
            var value = ambit.getVariable(test);

            if(value == null) {
                OutputController.getinstance().setValue("Este es un error: La variable '" + this.id + "' no ha sido declarada o no existe en este ambito" + ", en la linea: " + this.row + ", en la columna: " + this.column)
                ErrorController.getInstance().add("Variable '" + this.id + "' no definida ", "Semantico", this.row, this.column);
                return {value : 'undefined', type : 8};
            }    
            return {value : value.value, type : value.type};
        } else {
            return {value : 'undefined', type : 8};
        }
    }

    public getName(){
        return this.name;
    }
    public getId(){
        return this.id;
    }
}