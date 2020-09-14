
import { Type } from '../abstract/type';
import { Identifier } from './Identifier';

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


    public getVariable(id: string) : Identifier | undefined | null{
        let env : Ambit | null = this;
        while(env != null){
            if(env.variables.has(id)){
                return env.variables.get(id);
            }
            env = env.anterior;
        }
        return null;
    }

    public setVariable(id: string, valor: any, type: Type){
        let env : Ambit | null = this;
        while(env != null){
            if(env.variables.has(id)){
                env.variables.set(id, new Identifier(valor, id, type))
                return;
            }
            env = env.anterior;
        }
    }

    public save(id: string, valor: any, type: Type){
        let env : Ambit | null = this;
        while(env != null){
            if(env.variables.has(id)){
                env.variables.set(id, new Identifier(valor, id, type));
                return;
            }
            env = env.anterior;
        }
        this.variables.set(id, new Identifier(valor, id, type));
    }
}
