import { Component, OnInit } from '@angular/core';
import * as astgram from '../../jison/grammar/ast';
import * as grammar from '../../jison/grammar/grammar';
import * as astGraph from '../../jison/tools/ast/ast';
import { OutputController } from '../controller/output.controller';
import { Ambit } from '../../jison/tools/id/ambit.identifier';
import { ErrorController } from '../controller/error.controller';
import { TablaSimbolosController } from '../controller/tablasimbolo.conroller';
import { Function } from '../../jison/tools/sentences/Function'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  data: any = [];
  tabla: any = [];
  constructor() { }

  ngOnInit(): void {
  }

  strEntrada: string;
  strSalida: string;
  textoSalida: string;

  analize() {
    if (document.getElementById("grafo")) {
      document.getElementById("grafo").remove();
    }
    try {
      /**
       * LIMPIAR VARIABLES
       */
      OutputController.getinstance().clear();
      TablaSimbolosController.getInstance().clear();
      console.clear()
      const env = new Ambit(null, "Global");
      //let analisisAST = grammar.parse(this.strEntrada);
      let analisisGraico = astgram.parse(this.strEntrada)
     
      setTimeout(() => {
        astGraph.generarArbol([analisisGraico.node]);

      }, 1000);



     
      /*for (const element of analisisAST) {
        try {
          if (element instanceof Function)
            element.exec(env);
        } catch (error) {
          console.log(error)
        }
      }
     
      for (const element of analisisAST) {
        try {
          const actual = element.exec(env);
          if (actual != null || actual != undefined) {
            //errores.push(new Error_(actual.line, actual.column, 'Semantico', actual.type + ' fuera de un ciclo'));
            console.error("ERROR SEMANTICO")
          }
        } catch (error) {
          console.error(error)
        }
      }*/
    } catch (error) {
      /**
       * INGRESAR ERRORES PARA REPORTE
       */
      console.error(error)
      //ErrorControlador.getInstancia().agregarError(error.error, "Semántico", error.fila, error.columna);
    }
    this.strSalida = OutputController.getinstance().getOut;
    this.tabla = TablaSimbolosController.getInstance().getArray()
    console.log(this.tabla)
    console.log(OutputController.getinstance().getOut)
    // IMPRIMIR ERRORES
    ErrorController.getInstance().print();

    this.obtenerErrores();
  }

  obtenerErrores() {
    this.data = [];
    this.data = ErrorController.getInstance().getArray;
  }
}
