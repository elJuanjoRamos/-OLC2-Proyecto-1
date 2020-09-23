export class Error {
    constructor(id, descrip, type, row, col){
        this.id = id;
        this.row = row;
        this.column = col;
        this.description = descrip;
        this.lex = type;
    }


    getId() {
        return this.id;  
    } 

    setId(v) {
        this.id = v;
    }
    
    getDescription() {
        return this.description;
    }
    
    setDescription(v) {
        this.description = v;
    }
    
    getLex() {
        return this.lex;
    }

    setLex(v) {
        this.lex = v;
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

    toString() {
        return {
            "id" : this.id,
            "lex" : this.lex,
            "description" : this.description,
            "row" : this.row,
            "column" : this.column
        };
    }
}


