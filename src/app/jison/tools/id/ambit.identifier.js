
export class AmbitIdentifier {
    

   
    constructor(anterior){
        this.variables = new Map();
        this.funciones = new Map();
    }
    getVariable(id){
        let env = this;
        while(env != null){
            if(env.variables.has(id)){
                return env.variables.get(id);
            }
            env = env.anterior;
        }
        return null;
    }

    setVariable(id, valor, type){
        let env = this;
        while(env != null){
            if(env.variables.has(id)){
                env.variables.set(id, new Identifier(valor, id, type))
                return;
            }
            env = env.anterior;
        }
    }

    save(id, valor, type){
        let env  = this;
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
