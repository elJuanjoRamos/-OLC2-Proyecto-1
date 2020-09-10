//import { Type } from '../abstract/type';

export class Identifier {
   /* public valor: any;
    public id: string;
    public name: string;
    public type: Type;
    public row: number;
    public column : number;*/
    

    /**
     * CONSTRUCTOR
     * @param valor 
     * @param id 
     * @param type 
     * @param row 
     * @param column 
     */
    constructor(valor, id, type, row, column){
        this.name = "Identifier"
        this.valor = valor;
        this.id = id;
        this.type = type;
        this.row = row;
        this.column = column;
    }
}

