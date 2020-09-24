 
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
"push"                  return 'RESERV_PUSH'
"pop"                   return 'RESERV_POP'
"new"                   return 'RESERV_NEW'
"Array"                 return 'RESERV_ARRAY'
"any"                   return 'RESERV_ANY'
"length"                return 'RESERV_LENGTH'
"type"                  return 'RESERV_TYPE'

([a-zA-Z_])[a-zA-Z0-9_ñÑ]*	return 'ID';
<<EOF>>               return 'EOF';
.                     return 'TOKEN_DESC';

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
    : VAR_DECLARATION
    {
        $$ = { node: newNode(yy, yystate, $1.node) };
    }
    |
    LET_DECLARATION
    {
        $$ = {node: newNode(yy, yystate, $1.node)};
    }
    |
    CONST_DECLARATION
    {
        $$ = {node: newNode(yy, yystate, $1.node)};
    }
    |
    DECLARATION_NOTYPE
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
        $$ = {node: newNode(yy, yystate, $1.node)};
    }
    |
    CALL_FUNCTION
    {
        $$ = {node: newNode(yy, yystate, $1.node)};
    }
    |
    FUNCTIONS
    {
        $$ = {node: newNode(yy, yystate, $1)};
    }
;




LET_DECLARATION
    : 'RESERV_LET' ID ':' TIPO '=' EXPRESSION ';'
    {
        $$ = {node: newNode(yy, yystate, $1, $2, $3, $4.node, $5, $6.node, $7)};
    }
    |
    'RESERV_LET' ID ':' TIPO ';'
    {
        $$ = {node: newNode(yy, yystate, $1, $2, $3, $4.node, $5)};
    }
    |
    'RESERV_LET' ID '=' EXPRESSION ';'
    {
        $$ = {node: newNode(yy, yystate, $1, $2, $3, $4.node, $5)};
    }
    |
    'RESERV_LET' ID ';'
    {
        $$ = {node: newNode(yy, yystate, $1, $2, $3)};
    }

    ////// ESTO ES PARA ARREGLOS
    
    // var array: string[] = []
    | 'RESERV_LET' ID ':' TIPO ARRAY '=' '['  NULLORDATA ']' ';'
    {
        $$ = {node: newNode(yy, yystate, $1, $2, $3, $4.node, $5.node, $6, $7, $8.node, $9,$10)};
    }
    // var array: string[];
    | 'RESERV_LET' ID ':' TIPO ARRAY';'
    {
        $$ = {node: newNode(yy, yystate, $1, $2, $3, $4.node, $5.node, $6)};
    }
    // var array: string[] = new Array(); 
    | 'RESERV_LET' ID ':' TIPO ARRAY '=' 'RESERV_NEW'  'RESERV_ARRAY' '(' NULLORDATA ')'  ';'
    {
        $$ = {node: newNode(yy, yystate, $1, $2, $3, $4.node, $5.node, $6, $7, $8, $9, $10.node, $11, $12)};
    }
    // var arreglo1: Array<string> = []
    | 'RESERV_LET' ID ':' 'RESERV_ARRAY' '<' TIPO '>' '=' '['  NULLORDATA ']' ';'
    {
        $$ = {node: newNode(yy, yystate, $1, $2, $3, $4, $5, $6.node, $7, $8, $9, $10.node, $11, $12)};
    }
    //var arreglo1: Array<string>;
    | 'RESERV_LET' ID ':' 'RESERV_ARRAY' '<' TIPO '>' ';'
    {
        $$ = {node: newNode(yy, yystate, $1, $2, $3, $4, $5, $6.node, $7, $8)};
    }
    // var arreglo1: Array<string> = new Array(4);
    | 'RESERV_LET' ID ':' 'RESERV_ARRAY' '<' TIPO '>' '=' 'RESERV_NEW'  'RESERV_ARRAY' '(' NULLORDATA ')'  ';'
    {
        $$ = {node: newNode(yy, yystate, $1, $2, $3, $4, $5, $6.node, $7, $8, $9, $10.node, $11, $12.node, $13, $14)};
    }
    // var array = []
    | 'RESERV_LET' ID '=' '['  NULLORDATA ']' ';'
    {
        $$ = {node: newNode(yy, yystate, $1, $2, $3, $4, $5, $6.node, $7, $8)};
    }
    | 'RESERV_LET' ID  '=' 'RESERV_NEW'  'RESERV_ARRAY' '(' NULLORDATA ')'  ';'
    {
        $$ = {node: newNode(yy, yystate, $1, $2, $3, $4, $5, $6, $7.node, $8, $9)};
    }
;




CONST_DECLARATION
    : 'RESERV_CONST' ID ':' TIPO '=' EXPRESSION ';'
    {
        $$ = {node: newNode(yy, yystate, $1, $2, $3, $4.node, $5, $6.node, $7)};
    }
    |
    'RESERV_CONST' ID '=' EXPRESSION ';'
    {
        $$ = {node: newNode(yy, yystate, $1, $2, $3, $4.node, $5)};
    }
;


NULLORDATA
    :ARRAY_CONTENT { $$ = {node: newNode(yy, yystate, $1.node)}; }
    | /*epsilon*/ { $$ = null }
    ;
ARRAY_CONTENT 
    : ARRAY_CONTENT ',' MORE_ARRAY 
    {
        $$ = {node: newNode(yy, yystate, $1.node, $3.node)};
    }
    |  MORE_ARRAY
    {
         $$ = {node: newNode(yy, yystate, $1.node)};
    
    }
    ;

MORE_ARRAY
    : EXPRESSION
    {
        $$ = {node: newNode(yy, yystate, $1.node)};
    }
    | '[' ARRAY_CONTENT ']' 
    {
        $$ = {node: newNode(yy, yystate, $1, $2.node, $3)};  
    }
    ;



PRODUCCION_ID
    : ID  MATRIZ_IDEN '.'           {  $$ = {node: newNode(yy, yystate, $1, $2.node, $3)};   }  
    | ID  MATRIZ_IDEN               {  $$ = {node: newNode(yy, yystate, $1, $2.node)};   }
    | ID  '.'  'RESERV_LENGTH'      {  $$ = {node: newNode(yy, yystate, $1, $2, $3)};   }
    | ID  '.'                       {  $$ = {node: newNode(yy, yystate, $1, $2)};   }
    | ID                            {  $$ = {node: newNode(yy, yystate, $1)};   }
    ;

PUSH
    :   PRODUCCION_ID  'RESERV_PUSH' '(' EXPRESSION ')' ';'
    {
         $$ = {node: newNode(yy, yystate, $1.node, $2, $3, $4.node, $5, $6)};  
    }
    ;

POP 
    :   PRODUCCION_ID 'RESERV_POP' '(' ')' 
    {
        $$ = {node: newNode(yy, yystate, $1.node, $2, $3, $4)};  
    }
    ;


DECLARATION_NOTYPE
    : ID ':' TIPO '=' EXPRESSION ';'
    {
        $$ = {node: newNode(yy, yystate, $1, $2, $3.node, $4, $5.node, $6)};
    }
    |
    ID ':' TIPO ARRAY '=' EXPRESSION ';'
    {
        $$ = {node: newNode(yy, yystate, $1, $2, $3.node, $4, $5, $6.node, $7)};
    }
    |
    ID '=' EXPRESSION ';'
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

//////////// ARRAY ///////////
ARRAY
    : '[' ']' { $$ = {node: newNode(yy, yystate, $1, $2)}; }
    
    /*| '[' ']' '[' ']'
    { 
        $$ = {node: newNode(yy, yystate, $1, $2, $3, $4)};
    }*/
;


EXPRESSION     
    : EXPRESSION '+' EXPRESSION
    {
        $$ = {node: newNode(yy, yystate, $1.node, $2, $3.node)};
    } 
    |
    EXPRESSION '-' EXPRESSION
    {
        $$ = {node: newNode(yy, yystate, $1.node, $2, $3.node)};
    } 
    |
    EXPRESSION '*' EXPRESSION
    {
        $$ = {node: newNode(yy, yystate, $1.node, $2, $3.node)};
    } 
    |
    EXPRESSION '/' EXPRESSION
    {
        $$ = {node: newNode(yy, yystate, $1.node, $2, $3.node)};
    } 
    |
    EXPRESSION '%' EXPRESSION
    {
        $$ = {node: newNode(yy, yystate, $1.node, $2, $3.node)};
    } 
    |
    EXPRESSION '^' EXPRESSION
    {
        $$ = {node: newNode(yy, yystate, $1.node, $2, $3.node)};
    } 
    |
    EXPRESSION '<' EXPRESSION
    {
        $$ = {node: newNode(yy, yystate, $1.node, $2, $3.node)};
    } 
    |
    EXPRESSION '>' EXPRESSION
    {
        $$ = {node: newNode(yy, yystate, $1.node, $2, $3.node)};
    } 
    |
    EXPRESSION '<' '=' EXPRESSION
    {
        $$ = {node: newNode(yy, yystate, $1.node, "<=", $4.node)};
    }
    |
    EXPRESSION '>' '=' EXPRESSION
    {
        $$ = {node: newNode(yy, yystate, $1.node, "<=", $4.node)};
    } 
    |
    EXPRESSION '==' EXPRESSION
    {
        $$ = {node: newNode(yy, yystate, $1.node, $2, $3.node)};
    } 
    |
    EXPRESSION '!=' EXPRESSION
    {
        $$ = {node: newNode(yy, yystate, $1.node, $2, $3.node)};
    }
    |
    EXPRESSION '&&' EXPRESSION
    {
        $$ = {node: newNode(yy, yystate, $1.node, $2, $3.node)};
    }
    |
    EXPRESSION '||' EXPRESSION
    {
        $$ = {node: newNode(yy, yystate, $1.node, $2, $3.node)};
    }
    |
    '!' EXPRESSION
    {
        $$ = {node: newNode(yy, yystate, $1, $2.node)};
    }
    |
    EXPRESSION '+' '+'
    {
        $$ = {node: newNode(yy, yystate, $1.node, $2, $3)};
    }
    |
    EXPRESSION '-' '-'
    {
        $$ = {node: newNode(yy, yystate, $1.node, $2, $3)};
    }
    |
    POP
    {
        $$ = {node: newNode(yy, yystate, $1.node)};
    }
    |
    IDENTIFICADOR
    {
        $$ = {node: newNode(yy, yystate, $1.node)};
    }
;

IDENTIFICADOR
    : '(' EXPRESSION ')'
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
    | PRODUCCION_ID
    { 
        $$ = {
            node: newNode(yy, yystate, $1.node),
            ejecutar: new Access($1, @1.first_line, @1.first_column)
        };
    }
;



MATRIZ_IDEN
    : MATRIZ_IDEN '[' IDEN_ARRAY ']'
    { 
        $$ = {node: newNode(yy, yystate, $1.node, $2, $3.node, $4)};
    }
    | '[' IDEN_ARRAY ']'
    { 
        $$ = {node: newNode(yy, yystate, $1, $2.node, $3)};
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
    | 'RESERV_RETURN' EXPRESSION ';'
    {
        $$ = {node: newNode(yy, yystate, $1, $2.node, $3)};
    }
;

IF 
    : 'RESERV_IF' '(' EXPRESSION ')' SENTENCIA ELSEIF
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
    : 'RESERV_WHILE' '(' EXPRESSION ')' SENTENCIA
    {
        $$ = {node: newNode(yy, yystate, $1, $2, $3.node, $4, $5.node)};
    }
;

DOWHILE 
    : 'RESERV_DO' SENTENCIA 'RESERV_WHILE' '(' EXPRESSION ')' ';'
    {
        $$ = {node: newNode(yy, yystate, $1, $2.node, $3, $4, $5.node, $6, $7)};
    }
;

SWITCH
    : 'RESERV_SWITCH' '(' EXPRESSION ')' '{' CASES DEFAULT '}'
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
    : 'RESERV_CASE'  EXPRESSION ':' INSTRUCCIONES
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
    | DECLARACION_FOR ';' EXPRESSION ';' EXPRESSION
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
    : 'RESERV_VAR' ID ':' TIPO '=' EXPRESSION
    {
        $$ = {node: newNode(yy, yystate, $1, $2, $3, $4.node, $5, $6.node)};
    }
    |
    'RESERV_VAR' ID '=' EXPRESSION
    {
        $$ = {node: newNode(yy, yystate, $1, $2, $3, $4.node)};
    }
    | 'RESERV_LET' ID ':' TIPO '=' EXPRESSION
    {
        $$ = {node: newNode(yy, yystate, $1, $2, $3, $4.node, $5, $6.node)};
    }
    |
    'RESERV_LET' ID '=' EXPRESSION
    {
        $$ = {node: newNode(yy, yystate, $1, $2, $3, $4.node)};
    }
;

CONSOLE: 
    'RESERV_CONSOLE' '.' 'RESERV_LOG' '(' EXPRESSION ')' ';'
    {
        $$ = {
            node: newNode(yy, yystate, $1, $2, $3, $4, $5.node, $6, $7),
            ejecutar: new Console($5, @1.first_line, @1.first_column)
        };
    }
;

FUNCTIONS: 
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

CALL_FUNCTION:
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
    PARAMETROS_LLAMADA ',' EXPRESSION
    {
        $$ = {node: newNode(yy, yystate, $1.node, $2, $3.node)};
    }
    |
    EXPRESSION
    {
        $$ = {node: newNode(yy, yystate, $1.node)};
    }
;
