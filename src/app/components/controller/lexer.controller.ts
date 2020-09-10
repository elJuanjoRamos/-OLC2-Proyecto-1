//import { TokenControlador } from './token.controlador';

import { AmbitIdentifier } from '../../jison/tools/id/ambit.identifier'
import * as parser from '../../jison/grammar/gram';
import * as analisis from '../../jison/grammar/analisis';
import * as graficar from '../../jison/tools/ast/ast';


import { While } from '../../jison/tools/sentences/while';
import { Declaration } from '../../jison/tools/sentences/Declaration';
import { Console } from '../../jison/tools/sentences/Console';


export class LexerController {
    //SINGLETON
    private static instancia: LexerController;

    private constructor() { }

    public static getInstancia(): LexerController {
        if (this.instancia == null) {
            this.instancia = new LexerController();
        }
        return this.instancia;
    }

    analize(strEntrada:string) {
        let columna = 0;
        let fila = 0;
        console.clear()
        const env = new AmbitIdentifier(null);
        //var symbols = fs.readFileSync('./jison/lexico.jison', 'utf8');
        //var parser = new JisonLex(symbols);
        let ast = parser.parse(strEntrada);
        let ast2 = analisis.parse(strEntrada);
        console.log("==========AST===========")
        console.log(ast)

        setTimeout(() => {
            graficar.generateTree([ast.node]);
            //console.log(grafica)
        }, 1000);

        console.log("=========PRIMERA ITERACION=========")
        for (const iterator of ast2) {
            if (iterator instanceof Declaration) {
                console.log(iterator)
                iterator.exec(env);
            }
            if (iterator instanceof Console) {
                iterator.exec(env);
            }
            if (iterator instanceof While) {
                iterator.exec(env);
            }
        }
        console.log("=========SEGUNDA ITERACION=========")

        for(const instr of ast2){
            if (instr instanceof Declaration) {
                console.log(instr)
                instr.exec(env);

            }
            if (instr instanceof Console) {
                instr.exec(env);
            }
            if (instr instanceof While) {
                instr.exec(env);
            }
            try {
                const actual = instr.exec(env);
                console.log(actual)
                if(actual != null || actual != undefined){
                    //errores.push(new Error_(actual.line, actual.column, 'Semantico', actual.type + ' fuera de un ciclo'));
                    console.error("ERROR SEMANTICO")
                }
            } catch (error) {
               // errores.push(error);  
               console.error(error)
            }
        }
    }

}