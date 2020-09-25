
import { Type } from '../abstract/type';
import { Identifier } from './Identifier';
import { Function } from '../sentences/Function';


export class Ambit {
    private variables: Map<string, Identifier>;
    public functions: Map<string, Function>;

   /**
     * CONSTRUCTOR
     * @param anterior 
     */
    constructor(public anterior : Ambit | null){
        this.variables = new Map();
        this.functions = new Map();
    }


    public getVariable(id) : Identifier | undefined | null{
        let amb : Ambit | null = this;
        while(amb != null){
            if(amb.variables.has(id)){
                return amb.variables.get(id);
            }
            amb = amb.anterior;
        }
        return null;
    }

    public setVariable(id, valor: any, type: Type){
        let amb : Ambit | null = this;
        while(amb != null){
            if(amb.variables.has(id)){
                amb.variables.set(id, new Identifier(valor, id, type))
                return;
            }
            amb = amb.anterior;
        }
    }

    public save(id, valor: any, type: Type){
        let amb : Ambit | null = this;
        while(amb != null){
            if(amb.variables.has(id)){
                amb.variables.set(id, new Identifier(valor, id, type));
                return;
            }
            amb = amb.anterior;
        }
        this.variables.set(id, new Identifier(valor, id, type));
    }





    public getFunc(id) : Function | undefined{
        let amb : Ambit | null = this;
        while(amb != null){
            if(amb.functions.has(id)){
                return amb.functions.get(id);
            }
            amb = amb.anterior;
        }
        return undefined;
    }

    public getGlobal() : Ambit{
        let amb : Ambit | null = this;
        while(amb?.anterior != null){
            amb = amb.anterior;
        }
        return amb;
    }

    public saveFunc(id, funcion){
        this.functions.set(id, funcion);
    }










}
