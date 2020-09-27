
import { TypeAll } from '../abstract/enums';
import { Identifier } from './Identifier';
import { Function } from '../sentences/Function';


export class Ambit {
    private variables: Map<string, Identifier>;
    public functions: Map<string, Function>;
    private types: Map<string, Identifier>;
    private name: string = "";
   /**
     * CONSTRUCTOR
     * @param anterior 
     */
    constructor(public anterior : Ambit | null, public n){
        this.variables = new Map();
        this.functions = new Map();
        this.types = new Map();
        this.name = n;
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

    public setVariable(id, valor: any, type: TypeAll, esconstante:boolean){
        let amb : Ambit | null = this;
        while(amb != null){
            if(amb.variables.has(id)){
                amb.variables.set(id, new Identifier(valor, id, type, esconstante))
                return;
            }
            amb = amb.anterior;
        }
    }

    public save(id, valor: any, type: TypeAll, esconstante:boolean){
        let amb : Ambit | null = this;
        while(amb != null){
            if(amb.variables.has(id)){
                amb.variables.set(id, new Identifier(valor, id, type, esconstante));
                return;
            }
            amb = amb.anterior;
        }
        this.variables.set(id, new Identifier(valor, id, type, esconstante));
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
    public getName(): string {
        return this.name;
    }

    public saveFunc(id, funcion){
        this.functions.set(id, funcion);
    }




    public saveTypes(id, valor, type: TypeAll){
        let amb : Ambit | null = this;
        while(amb != null){
            if(amb.types.has(id)){
                amb.types.set(id, new Identifier(valor, id, type, false));
                return;
            }
            amb = amb.anterior;
        }
        this.types.set(id, new Identifier(valor, id, type, false));
    }

    public getTypes(id: string) : Identifier | undefined | null{
        let amb : Ambit | null = this;
        while(amb != null){
            if(amb.types.has(id)){
                return amb.types.get(id);
            }
            amb = amb.anterior;
        }
        return null;
    }









}
