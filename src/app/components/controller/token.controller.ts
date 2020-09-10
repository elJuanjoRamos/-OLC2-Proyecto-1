import {Token} from '../../jison/tools/model/token';

export class TokenControlador {
    private arrayTokek: Token[] = [];
    private arrayError: Token[] = [];
    private idToken:number = 1;
    private idError:number = 1;

    //SINGLETON
    private static instancia: TokenControlador;

    private constructor() { }

    public static getInstancia(): TokenControlador {
        if (this.instancia == null) {
            this.instancia = new TokenControlador();
        }
        return this.instancia;
    }

    public get getArrayTokek() : Token[] {
        return this.arrayTokek; 
    }
    
    public get getArrayError() : Token[] {
        return this.arrayError; 
    }

    addTK(lex: string, description:string, row: number, col:number){
        this.arrayTokek.push(new Token(this.idToken, lex, description, row, col));
        this.idToken++;
    }

    addErr(lex: string, description:string, row: number, col:number){
        this.arrayError.push(new Token(this.idError, lex, description, row, col));
        this.idError++;
    }

    printTk(){
        this.arrayTokek.forEach(e => {
            console.log(e.toString());
        });
    }

    printErr(){
        this.arrayError.forEach(e => {
            console.error(e.toString());
        });
    }

    clear(){
        this.arrayTokek = [];
        this.arrayError = [];
        this.idError = 1;
        this.idToken = 1;
    }

}