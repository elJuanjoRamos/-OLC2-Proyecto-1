export enum Type {
    NUMBER=0,
    STRING=1,
    BOOLEAN= 2,
    NULL= 3,
    ARRAY= 4
}

export enum OpRelational{
    EQUALS,
    DISCTINCT,
    LESS,
    LESS_EQUALS,
    HIGHER,
    HIGHER_EQUALS
}

export enum OpLogical{
    AND,
    OR,
    NOT
}

export enum OpArithmetic {
    SUM,
    SUBTRACTION,
    MULTIPLICATION,
    DIVISION,
    EXPONENT,
    MODULE,
    INCREASE,
    DECREME,
    NEGATIVE
}


export enum Transfer {
    BREAK,
    CONTINUE,
    RETURN,
    RETURNDATA
}

export type Returned ={
    value : any,
    type : Type
}

