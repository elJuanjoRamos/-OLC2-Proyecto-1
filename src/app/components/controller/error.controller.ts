import {Error} from '../../jison/tools/model/error'


export class ErrorController {
    private arrayError: Error[] = [];
    private id:number = 1;


    private arraylexico: Error[] = [];
    private idlexico:number = 1;

    //SINGLETON
    private static instancia: ErrorController;

    private constructor() { }

    public static getInstance(): ErrorController {
        if (this.instancia == null) {
            this.instancia = new ErrorController();
        }
        return this.instancia;
    }

    public get getArray() : Error[] {
        return this.arrayError; 
    }

    public get getArrayLexico() : Error[] {
        return this.arraylexico; 
    }

    add(descrip:String, type:String, row: number, col:number){
        var token = new Error(this.id, descrip, type, row, col);
        this.arrayError.push(token);
        this.id++;
    }


    addlexico(descrip:String, type:String, row: number, col:number){
        var token = new Error(this.idlexico, descrip, type, row, col);
        this.arraylexico.push(token);
        this.idlexico++;
    }

    

    clear(){
        this.arrayError = [];
        this.arraylexico = [];
        this.id = 1;
        this.idlexico = 1;
    }

}