import { Component, OnInit } from '@angular/core';
import * as parser from '../../jison/grammar/gram';
import * as analisis from '../../jison/grammar/analisis';
import { OutputController } from '../controller/output.controller';
import { Ambit } from '../../jison/tools/id/ambit.identifier';
import { ErrorController } from '../controller/error.controller';
import { flushMicrotasks } from '@angular/core/testing';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  data:any = [];
  textoSalida = ""

  constructor() { }

  ngOnInit(): void {
  }

  strEntrada:string;
  strSalida:string;

  analize() {
    try {
      /**
       * LIMPIAR VARIABLES
       */
      OutputController.getinstance().clear();
      console.clear()
      this.strSalida = "";
      const env = new Ambit(null);
      //let graficaAST = parser.parse(this.strEntrada);
      let analisisAST = analisis.parse(this.strEntrada);

      setTimeout(() => {
          //graficar.generateTree([graficaAST.node]);
      }, 1000);

      /**
       * EJECUTAR EJECUCION
       */
      for(const instr of analisisAST){
        try {
            const actual = instr.exec(env);
            if(actual != null || actual != undefined){
                //errores.push(new Error_(actual.line, actual.column, 'Semantico', actual.type + ' fuera de un ciclo'));
                console.error("ERROR SEMANTICO")
            }
        } catch (error) {
            console.error(error)
        }
      }
    } catch (error) {
      /**
       * INGRESAR ERRORES PARA REPORTE
       */
      console.error(error)
      //ErrorControlador.getInstancia().agregarError(error.error, "Semántico", error.fila, error.columna);
    }
    this.strSalida = OutputController.getinstance().getOut;
    this.textoSalida = OutputController.getinstance().getOut;
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
