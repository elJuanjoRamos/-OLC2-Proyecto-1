export class Token {
    
    constructor(i,des, l, c, le){
        this.id = i;
        this.line = l;
        this.column = c;
        this.description = des;
        this.lex = le;
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




