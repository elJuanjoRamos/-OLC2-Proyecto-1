import {Expression} from '../abstract/expression';

export class Access extends Expression {

    /**
     * CONSTRUCTOR
     * @param id 
     * @param row 
     * @param col 
     */
    constructor(id, row, col){
        super(row, col);
    }

    exec(environment) {
        // console.error("ACCESO")
        // console.log(environment)
        const value = environment.getVariable(this.id);
        // console.log(value)

        if(value == null) {
            throw new Error("La variable no esta definida:");
        }
        return {value : value.valor, type : value.type};
    }
}