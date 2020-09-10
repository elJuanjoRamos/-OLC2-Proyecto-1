const Type ={
    NUMBER: 0,
    STRING:1,
    BOOLEAN: 2,
    NULL: 3,
    ARRAY: 4
}

const OpRelational ={
    EQUALS: 'EQUALS',
    DISCTINCT: 'DISCTINCT',
    LESS: 'LESS',
    LESS_EQUALS: 'LESS_EQUALS',
    HIGHER: 'HIGHER',
    HIGHER_EQUALS: 'HIGHER_EQUALS'
}

const OpLogical ={
    AND: 'AND',
    OR: 'OR',
    NOT: 'NOT'
}

const OpArithmetic = {
    SUM: 'SUM',
    SUBTRACTION: 'SUBTRACTION',
    MULTIPLICATION: 'MULTIPLICATION',
    DIVISION: 'DIVISION',
    EXPONENT: 'EXPONENT',
    MODULE: 'MODULE',
    INCREASE: 'INCREASE',
    DECREME: 'DECREME',
}

const Returned ={
    value : '',
    type : Type
}

export { Type, OpRelational, OpLogical, OpArithmetic,  Returned }

