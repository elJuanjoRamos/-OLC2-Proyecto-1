import {Tabla} from '../../jison/tools/model/tabla';

export class TablaSimbolosController {
    private arrayTabla: Tabla[] = [];
    
    //SINGLETON
    private static instancia: TablaSimbolosController;

    private constructor() { }

    public static getInstance(): TablaSimbolosController {
        if (this.instancia == null) {
            this.instancia = new TablaSimbolosController();
        }
        return this.instancia;
    }

    public get getArrayTabla() : Tabla[] {
        return this.arrayTabla; 
    }
    
    

    add(names:string, type:string, ambit:string, returned:any, variable:boolean, funcion:boolean, row: number, col:number){
       
        if (!this.searchVariable(names)) { //Guarda la variable siempre y cuando no haya sido agregado antes
            this.arrayTabla.push(new Tabla(names, type, ambit, returned, variable, funcion, row, col));
            
        }    
    }


    searchVariable(id: string) : boolean {
        var flag = false
        this.arrayTabla.forEach(element => {
            if (element.getName() == id) {
                flag = true
            }
        });

        return flag
    }


    public variablesByAmbit(name: string) : any[] {
        var arrayTemp: any[] = [];

        this.arrayTabla.forEach(element => {
            if (element.getAmbit() == name) {
                arrayTemp.push(element); 
            }    
        });
        return arrayTemp
    }


    getArray(){
        return this.arrayTabla
    }


    clear(){
        this.arrayTabla = [];
    }

}