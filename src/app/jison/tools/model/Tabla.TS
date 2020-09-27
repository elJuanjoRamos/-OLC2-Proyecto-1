
export class Tabla {

    private name;
    private type;
    private ambit;
    private value;
    private returned;
    private variable;
    private funcion;
    private row
    private column

    constructor(n, t, a, val, r, v, f, ro, col) {
        console.log(r)
        this.name = n;
        this.type = t;
        this.ambit = a;
        this.value = val;
        this.returned = r;
        this.variable = v;
        this.funcion = f;
        this.row = ro;
        this.column = col
    }


    getName() {
        return this.name;
    }

    setName(v) {
        this.name = v;
    }

    getType() {
        return this.type;
    }

    setType(v) {
        this.type = v;
    }

    getAmbit() {
        return this.ambit;
    }

    setAmbit(v) {
        this.ambit = v;
    }

    getRow() {
        return this.row;
    }

    setRow(v) {
        this.row = v;
    }

    getColumn() {
        return this.column;
    }

    setColumn(v) {
        this.column = v;
    }

    getReturned() {
        return String(this.returned);
    }

    setReturned(v) {
        this.returned = v;
    }

    getVariable() {
        return this.variable;
    }

    setVariable(v) {
        this.variable = v;
    }
    getFuncion() {
        return this.funcion;
    }

    setValue(v) {
        this.value = v;
    }

    getValue() {
        return this.value;
    }

    setFuncion(v) {
        this.funcion = v;
    }
 
}




