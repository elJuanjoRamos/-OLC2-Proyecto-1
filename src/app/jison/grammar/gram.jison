 
%{
    const { Access } = require('../tools/expression/Access');
    const { Literal } = require('../tools/expression/Literal');
    const { Declaration } = require('../tools/sentences/Declaration');
    const { Console } = require('../tools/sentences/Console');
%}

%lex
%options case-insensitive
BSL                 "\\".
BSL2                 "\"".
number              ([-]?[0-9]+)
decimal             ([-]?[0-9]+("."[0-9]+))
string              (\"([^"]|{BSL})*\")
string2             (\'([^']|{BSL}|{BSL2})*\')
string3             (\`([^`]|{BSL}|{BSL2})*\`)
%%

\s+                   /* skip whitespace */
"//".*                /* skip comments */
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]   /* IGNORE */

{decimal}               return 'DECIMAL'
{number}                return 'NUMERO'
{string}                return 'CADENA'
{string2}               return 'CADENA'
{string3}               return 'CADENA'
"*"                     return '*'
"/"                     return '/'
"-"                     return '-'
"+"                     return '+'
"%"                     return '%'
"^"                     return '^'
";"                     return ';'
":"                     return ':'
","                     return ','
"."                     return '.'

"<"                     return '<'
">"                     return '>'
"<="                    return '<='
">="                    return '>='
"=="                    return '=='
"!="                    return '!='
"||"                    return '||'
"&&"                    return '&&'
"!"                     return '!'
"="                     return '='

"("                     return '('
")"                     return ')' 
"{"                     return '{'
"}"                     return '}'
"["                     return '['
"]"                     return ']'
"}"                     return '}'
"}"                     return '}'


"let"                   return 'RESERV_LET'
"var"                   return 'RESERV_VAR'
"const"                 return 'RESERV_CONST'
"if"                    return 'RESERV_IF'
"else"                  return 'RESERV_ELSE'
"switch"                return 'RESERV_SWITCH'
"default"               return 'RESERV_DEFAULT'
"case"                  return 'RESERV_CASE'
"while"                 return 'RESERV_WHILE'
"do"                    return 'RESERV_DO'
"for"                   return 'RESERV_FOR'
"console"               return 'RESERV_CONSOLE'
"log"                   return 'RESERV_LOG'
"break"                 return 'RESERV_BREAK'
"continue"              return 'RESERV_CONTINUE'
"return"                return 'RESERV_RETURN'
"function"              return 'RESERV_FUNCTION'
"string"                return 'RESERV_STRING'
"number"                return 'RESERV_NUMBER'
"boolean"               return 'RESERV_BOOLEAN'
"true"                  return 'RESERV_TRUE'
"false"                 return 'RESERV_FALSE'
"of"                    return 'RESERV_OF'
"in"                    return 'RESERV_IN'

([a-zA-Z_])[a-zA-Z0-9_ñÑ]*	return 'ID';
<<EOF>>               return 'EOF';
.                     return 'TK_Desconocido';

/lex

%left '||'
%left '&&'
%left '==', '!='
%left '>=', '<=', '<', '>'
%left '+' '-'
%left '*' '/'
%left '%' '^'
%left '!'

%start Init

%%

Init    
    : INSTRUCCIONES EOF 
    {
        $$ = { node: newNode(yy, yystate, $1.node) };
        return $$;
    } 
;

INSTRUCCIONES
    : INSTRUCCIONES INSTRUCCION{
        $$ = { node: newNode(yy, yystate, $1.node, $2.node) };
    }
    | INSTRUCCION{
        $$ = { node: newNode(yy, yystate, $1.node)};
    }
;

INSTRUCCION
    : DECLARACION_VAR
    {
        $$ = { node: newNode(yy, yystate, $1.node) };
    }
    |
    DECLARACION_LET
    {
        $$ = {node: newNode(yy, yystate, $1.node)};
    }
    |
    DECLARACION_CONST
    {
        $$ = {node: newNode(yy, yystate, $1.node)};
    }
    |
    DECLARACION_SIN_TIPO
    {
        $$ = {node: newNode(yy, yystate, $1.node)};
    }
    |
    BREAK
    {
        $$ = {node: newNode(yy, yystate, $1.node)};
    }
    |
    CONTINUE
    {
        $$ = {node: newNode(yy, yystate, $1.node)};
    }
    |
    RETURN
    {
        $$ = {node: newNode(yy, yystate, $1.node)};
    }
    |
    IF
    {
        $$ = {node: newNode(yy, yystate, $1.node)};
    }
    |
    SWITCH
    {
        $$ = {node: newNode(yy, yystate, $1.node)};
    }
    |
    WHILE
    {
        $$ = {node: newNode(yy, yystate, $1.node)};
    }
    |
    DOWHILE
    {
        $$ = {node: newNode(yy, yystate, $1.node)};
    }
    |
    FOR
    {
        $$ = {node: newNode(yy, yystate, $1.node)};
    }
    |
    CONSOLE
    {
        $$ = {
            node: newNode(yy, yystate, $1.node),
            ejecutar: $1
        };
    }
    |
    LLAMADA_FUNCION
    {
        $$ = {node: newNode(yy, yystate, $1.node)};
    }
    |
    FUNCIONES
    {
        $$ = $1;
    }
;

DECLARACION_VAR 
    : 'RESERV_VAR' ID ':' TIPO '=' EXPRESION ';'
    {
        $$ = { node: newNode(yy, yystate, $1, $2, $3, $4.node, $5, $6.node, $7) };
    }
    |
    'RESERV_VAR' ID ':' TIPO ';'
    {
        $$ = { node: newNode(yy, yystate, $1, $2, $3, $4.node, $5)};
    }
    |
    'RESERV_VAR' ID '=' EXPRESION ';'
    {
        $$ = { node: newNode(yy, yystate, $1, $2, $3, $4.node, $5)};
    }
    |
    'RESERV_VAR' ID ';'
    {
        $$ = { node: newNode(yy, yystate, $1, $2, $3) };
    }
    | 'RESERV_VAR' ID ':' TIPO ARREGLO '=' EXPRESION ';'
    {
        $$ = {node: newNode(yy, yystate, $1, $2, $3, $4.node, $5.node, $6, $7.node, $8)};
    }
    |
    'RESERV_VAR' ID ':' TIPO ARREGLO ';'
    {
        $$ = {node: newNode(yy, yystate, $1, $2, $3, $4.node, $5.node, $6)};
    }
    |
    'RESERV_VAR' ID ARREGLO '=' EXPRESION ';'
    {
        $$ = {node: newNode(yy, yystate, $1, $2, $3.node, $4, $5.node, $6)};
    }
    |
    'RESERV_VAR' ID ARREGLO ';'
    {
        $$ = {node: newNode(yy, yystate, $1, $2, $3.node, $4)};
    }
;

DECLARACION_LET
    : 'RESERV_LET' ID ':' TIPO '=' EXPRESION ';'
    {
        $$ = {node: newNode(yy, yystate, $1, $2, $3, $4.node, $5, $6.node, $7)};
    }
    |
    'RESERV_LET' ID ':' TIPO ';'
    {
        $$ = {node: newNode(yy, yystate, $1, $2, $3, $4.node, $5)};
    }
    |
    'RESERV_LET' ID '=' EXPRESION ';'
    {
        $$ = {node: newNode(yy, yystate, $1, $2, $3, $4.node, $5)};
    }
    |
    'RESERV_LET' ID ';'
    {
        $$ = {node: newNode(yy, yystate, $1, $2, $3)};
    }
    | 'RESERV_LET' ID ':' TIPO ARREGLO '=' EXPRESION ';'
    {
        $$ = {node: newNode(yy, yystate, $1, $2, $3, $4.node, $5.node, $6, $7.node, $8)};
    }
    |
    'RESERV_LET' ID ':' TIPO ARREGLO ';'
    {
        $$ = {node: newNode(yy, yystate, $1, $2, $3, $4.node, $5.node, $6)};
    }
    |
    'RESERV_LET' ID ARREGLO '=' EXPRESION ';'
    {
        $$ = {node: newNode(yy, yystate, $1, $2, $3.node, $4, $5.node, $6)};
    }
    |
    'RESERV_LET' ID ARREGLO ';'
    {
        $$ = {node: newNode(yy, yystate, $1, $2, $3.node, $4)};
    }
;

DECLARACION_CONST
    : 'RESERV_CONST' ID ':' TIPO '=' EXPRESION ';'
    {
        $$ = {node: newNode(yy, yystate, $1, $2, $3, $4.node, $5, $6.node, $7)};
    }
    |
    'RESERV_CONST' ID '=' EXPRESION ';'
    {
        $$ = {node: newNode(yy, yystate, $1, $2, $3, $4.node, $5)};
    }
;

DECLARACION_SIN_TIPO
    : ID ':' TIPO '=' EXPRESION ';'
    {
        $$ = {node: newNode(yy, yystate, $1, $2, $3.node, $4, $5.node, $6)};
    }
    |
    ID ':' TIPO ARREGLO '=' EXPRESION ';'
    {
        $$ = {node: newNode(yy, yystate, $1, $2, $3.node, $4, $5, $6.node, $7)};
    }
    |
    ID '=' EXPRESION ';'
    {
        $$ = {node: newNode(yy, yystate, $1, $2, $3.node, $4)};
    }
;

TIPO
    : 'RESERV_STRING'
    {
        $$ = {node: newNode(yy, yystate, $1)};
    }
    | 'RESERV_NUMBER'
    { 
        $$ = {node: newNode(yy, yystate, $1)};
    }
    | 'RESERV_BOOLEAN'
    { 
        $$ = {node: newNode(yy, yystate, $1)};
    }
;

ARREGLO
    : '[' ']'
    {
        $$ = {node: newNode(yy, yystate, $1, $2)};
    }
    | '[' ']' '[' ']'
    { 
        $$ = {node: newNode(yy, yystate, $1, $2, $3, $4)};
    }
;

EXPRESION     
    : EXPRESION '+' EXPRESION
    {
        $$ = {node: newNode(yy, yystate, $1.node, $2, $3.node)};
    } 
    |
    EXPRESION '-' EXPRESION
    {
        $$ = {node: newNode(yy, yystate, $1.node, $2, $3.node)};
    } 
    |
    EXPRESION '*' EXPRESION
    {
        $$ = {node: newNode(yy, yystate, $1.node, $2, $3.node)};
    } 
    |
    EXPRESION '/' EXPRESION
    {
        $$ = {node: newNode(yy, yystate, $1.node, $2, $3.node)};
    } 
    |
    EXPRESION '%' EXPRESION
    {
        $$ = {node: newNode(yy, yystate, $1.node, $2, $3.node)};
    } 
    |
    EXPRESION '^' EXPRESION
    {
        $$ = {node: newNode(yy, yystate, $1.node, $2, $3.node)};
    } 
    |
    EXPRESION '<' EXPRESION
    {
        $$ = {node: newNode(yy, yystate, $1.node, $2, $3.node)};
    } 
    |
    EXPRESION '>' EXPRESION
    {
        $$ = {node: newNode(yy, yystate, $1.node, $2, $3.node)};
    } 
    |
    EXPRESION '<' '=' EXPRESION
    {
        $$ = {node: newNode(yy, yystate, $1.node, "<=", $4.node)};
    }
    |
    EXPRESION '>' '=' EXPRESION
    {
        $$ = {node: newNode(yy, yystate, $1.node, "<=", $4.node)};
    } 
    |
    EXPRESION '==' EXPRESION
    {
        $$ = {node: newNode(yy, yystate, $1.node, $2, $3.node)};
    } 
    |
    EXPRESION '!=' EXPRESION
    {
        $$ = {node: newNode(yy, yystate, $1.node, $2, $3.node)};
    }
    |
    EXPRESION '&&' EXPRESION
    {
        $$ = {node: newNode(yy, yystate, $1.node, $2, $3.node)};
    }
    |
    EXPRESION '||' EXPRESION
    {
        $$ = {node: newNode(yy, yystate, $1.node, $2, $3.node)};
    }
    |
    '!' EXPRESION
    {
        $$ = {node: newNode(yy, yystate, $1, $2.node)};
    }
    |
    EXPRESION '+' '+'
    {
        $$ = {node: newNode(yy, yystate, $1.node, $2, $3)};
    }
    |
    EXPRESION '-' '-'
    {
        $$ = {node: newNode(yy, yystate, $1.node, $2, $3)};
    }
    |
    IDENTIFICADOR
    {
        $$ = {node: newNode(yy, yystate, $1.node)};
    }
;

IDENTIFICADOR
    : '(' EXPRESION ')'
    {
        $$ = {node: newNode(yy, yystate, $1, $2.node, $3)};
    }
    | CADENA
    { 
        $$ = {
            node: newNode(yy, yystate, $1),
            ejecutar: new Literal($1, @1.first_line, @1.first_column, 1)
        };
    }
    | NUMERO
    { 
        $$ = {
            node: newNode(yy, yystate, $1),
            ejecutar: new Literal($1, @1.first_line, @1.first_column, 0)
        };
    }
    | DECIMAL
    { 
        $$ = {
            node: newNode(yy, yystate, $1),
            ejecutar: new Literal($1, @1.first_line, @1.first_column, 0)
        };
    }
    | 'RESERV_TRUE'
    { 
        $$ = {
            node: newNode(yy, yystate, $1),
            ejecutar: new Literal($1, @1.first_line, @1.first_column, 2)
        };
    }
    | 'RESERV_FALSE'
    { 
        $$ = {
            node: newNode(yy, yystate, $1),
            ejecutar: new Literal($1, @1.first_line, @1.first_column, 2)
        };
    }
    | ID
    { 
        $$ = {
            node: newNode(yy, yystate, $1),
            ejecutar: new Access($1, @1.first_line, @1.first_column)
        };
    }
;

BREAK 
    : 'RESERV_BREAK'  ';'
    {
        $$ = {node: newNode(yy, yystate, $1, $2)};
    }
;

CONTINUE 
    : 'RESERV_CONTINUE'  ';'
    {
        $$ = {node: newNode(yy, yystate, $1, $2)};
    }
;

RETURN 
    : 'RESERV_RETURN'  ';'
    {
        $$ = {node: newNode(yy, yystate, $1, $2)};
    }
    | 'RESERV_RETURN' EXPRESION ';'
    {
        $$ = {node: newNode(yy, yystate, $1, $2.node, $3)};
    }
;

IF 
    : 'RESERV_IF' '(' EXPRESION ')' SENTENCIA ELSEIF
    {
        if($6 == undefined) {
            $$ = {node: newNode(yy, yystate, $1, $2, $3.node, $4, $5.node)};
        } else {
            $$ = {node: newNode(yy, yystate, $1, $2, $3.node, $4, $5.node, $6.node)};
        }
    }
;

SENTENCIA 
    : '{' INSTRUCCIONES '}'
    {
        $$ = {node: newNode(yy, yystate, $1, $2.node, $3)};
    }
    | '{' '}'
    {
        $$ = {node: newNode(yy, yystate, $1, $2)};
    }
;

ELSEIF 
    : 'RESERV_ELSE' SENTENCIA
    {
        $$ = {node: newNode(yy, yystate, $1, $2.node)};
    }
    | 'RESERV_ELSE' IF
    {
        $$ = {node: newNode(yy, yystate, $1, $2.node)};
    }
    | /* EPSILON */
    {
        $$ = null;
    }
;

WHILE 
    : 'RESERV_WHILE' '(' EXPRESION ')' SENTENCIA
    {
        $$ = {node: newNode(yy, yystate, $1, $2, $3.node, $4, $5.node)};
    }
;

DOWHILE 
    : 'RESERV_DO' SENTENCIA 'RESERV_WHILE' '(' EXPRESION ')' ';'
    {
        $$ = {node: newNode(yy, yystate, $1, $2.node, $3, $4, $5.node, $6, $7)};
    }
;

SWITCH
    : 'RESERV_SWITCH' '(' EXPRESION ')' '{' CASES DEFAULT '}'
    {
        if($7 == undefined) {
            $$ = {node: newNode(yy, yystate, $1, $2, $3.node, $4, $5, $6.node, $8)};
        } else {
            $$ = {node: newNode(yy, yystate, $1, $2, $3.node, $4, $5, $6.node, $7.node, $8)};
        }
    }
;

CASES 
    : CASES CASE
    {
        $$ = {node: newNode(yy, yystate, $1.node, $2.node)};
    }
    | CASE
    {
        $$ = {node: newNode(yy, yystate, $1.node)};
    }
;

CASE
    : 'RESERV_CASE'  EXPRESION ':' INSTRUCCIONES
    {
        $$ = {node: newNode(yy, yystate, $1, $2.node, $3, $4.node)};
    }
;

DEFAULT 
    : 'RESERV_DEFAULT' ':' INSTRUCCIONES
    {
        $$ = {node: newNode(yy, yystate, $1, $2, $3.node)};
    }
    | /* EPSILON */
    {
        $$ = null;
    }
;

FOR 
    : 'RESERV_FOR' '(' FOREXP ')' SENTENCIA
    {
        $$ = {node: newNode(yy, yystate, $1, $2, $3.node, $4, $5.node)};
    }
;

FOREXP
    : 'RESERV_LET' ID TIPOFOR ID
    {
       $$ = {node: newNode(yy, yystate, $1, $2, $3.node, $4)};
    }
    | 'RESERV_VAR' ID TIPOFOR ID
    {
        $$ = {node: newNode(yy, yystate, $1, $2, $3.node, $4)};
    }
    | 'RESERV_CONST' ID TIPOFOR ID
    {
        $$ = {node: newNode(yy, yystate, $1, $2, $3.node, $4)};
    }
    | DECLARACION_FOR ';' EXPRESION ';' EXPRESION
    {
        $$ = {node: newNode(yy, yystate, $1.node, $2, $3.node, $4, $5.node)};
    }
;

TIPOFOR
    : 'RESERV_OF'
    {
        $$ = {node: newNode(yy, yystate, $1)};
    }
    | 'RESERV_IN'
    { 
        $$ = {node: newNode(yy, yystate, $1)};
    }
;

DECLARACION_FOR
    : 'RESERV_VAR' ID ':' TIPO '=' EXPRESION
    {
        $$ = {node: newNode(yy, yystate, $1, $2, $3, $4.node, $5, $6.node)};
    }
    |
    'RESERV_VAR' ID '=' EXPRESION
    {
        $$ = {node: newNode(yy, yystate, $1, $2, $3, $4.node)};
    }
    | 'RESERV_LET' ID ':' TIPO '=' EXPRESION
    {
        $$ = {node: newNode(yy, yystate, $1, $2, $3, $4.node, $5, $6.node)};
    }
    |
    'RESERV_LET' ID '=' EXPRESION
    {
        $$ = {node: newNode(yy, yystate, $1, $2, $3, $4.node)};
    }
;

CONSOLE: 
    'RESERV_CONSOLE' '.' 'RESERV_LOG' '(' EXPRESION ')' ';'
    {
        $$ = {
            node: newNode(yy, yystate, $1, $2, $3, $4, $5.node, $6, $7),
            ejecutar: new Console($5, @1.first_line, @1.first_column)
        };
    }
;

FUNCIONES: 
    'RESERV_FUNCTION' ID '(' ')' SENTENCIA_FUNCION
    {
        $$ = $1;
    }
    |
    'RESERV_FUNCTION' ID '(' PARAMETROS ')' SENTENCIA_FUNCION
    {
        $$ = $1;
    }
;

SENTENCIA_FUNCION: 
    '{' FUNCIONHIJA '}'
    {
        $$ = $1;
    }
    |
    '{' '}'
    {
        $$ = $1;
    }
;

FUNCIONHIJA: 
    FUNCION_HIJA OTRA_INSTRUCCION
    {
        $$ = $1;
    }
;

FUNCION_HIJA: 
    'RESERV_FUNCTION' ID '(' ')' SENTENCIA_FUNCION
    {
        $$ = $1;
    }
    |
    'RESERV_FUNCTION' ID '(' PARAMETROS ')' SENTENCIA_FUNCION
    {
        $$ = $1;
    }
;

OTRA_INSTRUCCION: 
    FUNCION_HIJA OTRA_INSTRUCCION
    {
        $$ = $1;
    }
    | /*EPSILON*/
    {
        $$ = $1;
    }
;

PARAMETROS: 
    PARAMETROS ',' PARAMETRO
    {
        $$ = $1;
    }
    |
    PARAMETRO
    {
        $$ = $1;
    }
;

PARAMETRO: 
    ID ':' TIPO
    {
        $$ = $1;
    }
;

LLAMADA_FUNCION:
    ID '(' ')' ';'
    {
        $$ = {node: newNode(yy, yystate, $1, $2, $3, $4)};
    }
    |
    ID '(' PARAMETROS_LLAMADA ')' ';'
    {
        $$ = {node: newNode(yy, yystate, $1, $2, $3.node, $4, $5)};
    }
;

PARAMETROS_LLAMADA: 
    PARAMETROS_LLAMADA ',' EXPRESION
    {
        $$ = {node: newNode(yy, yystate, $1.node, $2, $3.node)};
    }
    |
    EXPRESION
    {
        $$ = {node: newNode(yy, yystate, $1.node)};
    }
;
