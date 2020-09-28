import { ErrorController } from '../../../components/controller/error.controller';
import { Ambit } from '../id/ambit.identifier';
import { Literal } from '../expression/Literal';
import { Console } from './Console';



export class LexicoProduccion {

    private data:string;
    private type:String;
    public row:number;
    public column:number;
    public tipoError: number;

    constructor(i: string, t:any, r: number, c: number, tp:number){
        this.data = i;
        this.type = t;
        this.row = r;
        this.column = c;
        this.tipoError = tp;
    }
    public exec(ambit: Ambit) {

        var texto = "Este es un error " + this.type +": '" + this.data + "', en la linea: " + this.row + ", en la columna: " + this.column
        
        ErrorController.getInstance().addlexico(this.data, this.type, this.row, this.column)
        
        
        var lit = new Literal(texto, 0,0,1);
        var temp = new Console(lit, this.column, this.column);
        temp.exec(ambit); 
        
    }

}