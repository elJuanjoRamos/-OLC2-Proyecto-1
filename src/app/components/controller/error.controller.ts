import {Error} from '../../jison/tools/model/error'


export class ErrorController {
    private arrayError: Error[] = [];
    private id:number = 1;

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

    add(descrip:string, type:string, row: number, col:number){
        var token = new Error(this.id, descrip, type, row, col);
        this.arrayError.push(token);
        this.id++;
    }

    print(){
        console.log("MOSTRAR REPORTE DE ERRORES")
        this.arrayError.forEach(e => {
            console.error(e.toString());
        });
    }

    clear(){
        this.arrayError = [];
        this.id = 1;
    }

}