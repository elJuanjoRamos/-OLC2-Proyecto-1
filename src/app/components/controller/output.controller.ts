
export class OutputController {
    private strSalida:string = "";

    //SINGLETON
    private static instance: OutputController;

    /**
     * CONSTRUCTOR
     */
    private constructor() { }

    public static getinstance(): OutputController {
        if (this.instance == null) {
            this.instance = new OutputController();
        }
        return this.instance;
    }

    /**
     * ASIGNAR VALOR
     */
    public setValue(strSalida: string) {
        this.strSalida += strSalida;
    }

    /**
     * OBTENER SALIDA
     */
    public get getOut() : string {
        return this.strSalida
    }

    /**
     * LIMPIAR VARIABLE
     */
    public clear() {
        this.strSalida = "";
    }
    
}