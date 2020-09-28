 
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
.                     return 'DESCONICIDO';

/lex

%left '||'
%left '&&'
%left '==', '!='
%left '>=', '<=', '<', '>'
%left '+' '-'
%left '*' '/'
%left '%' '^' '**'
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
    :
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
    TYPE_DECLARATION
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
        $$ = {node: newNode(yy, yystate, $1.node)};
    }
    |
    PUSH
    {
        $$ = {node: newNode(yy, yystate, $1)};
    }
    | error {
        $$ = {node: newNode(yy, yystate, 'error')};
     
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
        $$ = {node: newNode(yy, yystate, $1, $2, $3, $4, $5, $6.node, $7, $8, $9, $10, $11, $12.node, $13, $14)};
    }
    // var array = []
    | 'RESERV_LET' ID '=' '['  NULLORDATA ']' ';'
    {
        $$ = {node: newNode(yy, yystate, $1, $2, $3, $4, $5.node, $6, $7)};
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
    :ID '=' EXPRESSION ';'
    {
        $$ = {node: newNode(yy, yystate, $1, $2, $3.node, $4)};  
    }
    |
    ID '.' ID '=' EXPRESSION ';'
    {
        $$ = {node: newNode(yy, yystate, $1, $2, $3, $4, $5.node)};  
    }
    |
    EXPRESSION ';'
    {
        $$ = {node: newNode(yy, yystate, $1.node, $2)};  
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
    EXPRESSION '**' EXPRESSION
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
    |
    JSON_EXPRESSION
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
    : MATRIZ_IDEN '[' IDENTIFICADOR ']'
    { 
         $$ = {node: newNode(yy, yystate, $1.node, $2, $3.node, $4)};
    }
    | '[' IDENTIFICADOR ']'
    { 
       $$ = {node: newNode(yy, yystate, $1, $2.node, $3)};
    }
    ;

IDEN_ARRAY 
    :
    NUMERO
    { 
         $$ = {node: newNode(yy, yystate, $1)};
    }
    | ID
    { 
         $$ = {node: newNode(yy, yystate, $1)};
    }
    ;

CONTINUE 
    : 'RESERV_CONTINUE'  ';'
    {
        $$ = {node: newNode(yy, yystate, $1, $2)};
    }
;


BREAK 
    : 'RESERV_BREAK'  ';'
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
DOWHILE 
    : 'RESERV_DO' SENTENCIA 'RESERV_WHILE' '(' EXPRESSION ')' ';'
    {
        $$ = {node: newNode(yy, yystate, $1, $2.node, $3, $4, $5.node, $6, $7)};
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
WHILE 
    : 'RESERV_WHILE' '(' EXPRESSION ')' SENTENCIA
    {
        $$ = {node: newNode(yy, yystate, $1, $2, $3.node, $4, $5.node)};
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
    : 'RESERV_FOR' '(' DECLA_FOR ';' EXPRESSION ';' EXPRESSION ')' SENTENCIA
    {
         $$ = {node: newNode(yy, yystate, $1, $2, $3.node, $4, $5.node, $6, $7.node, $8, $9.node)};
    }
    | 'RESERV_FOR''(' 'RESERV_VAR' ID 'RESERV_IN' ID ')' SENTENCIA
    {
         $$ = {node: newNode(yy, yystate, $1, $2, $3, $4, $5, $6, $7, $8.node)};
    }
    | 'RESERV_FOR''(' 'RESERV_LET' ID 'RESERV_IN' ID ')' SENTENCIA
    {
         $$ = {node: newNode(yy, yystate, $1, $2, $3, $4, $5, $6, $7, $8.node)};
    }
    | 'RESERV_FOR''(' 'RESERV_VAR' ID 'RESERV_OF' ID ')' SENTENCIA
    {
         $$ = {node: newNode(yy, yystate, $1, $2, $3, $4, $5, $6, $7, $8.node)};
    }
    | 'RESERV_FOR''(' 'RESERV_LET' ID 'RESERV_OF' ID ')' SENTENCIA
    {
        $$ = {node: newNode(yy, yystate, $1, $2, $3, $4, $5, $6, $7, $8.node)};
    }
;

DECLA_FOR
    : FOR_DECLARATION  { $$ = {node: newNode(yy, yystate, $1.node)}; }
    | ID '=' EXPRESSION { $$ = {node: newNode(yy, yystate, $1, $2, $3.node)}; }
    ;


FOR_DECLARATION
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

JSON_EXPRESSION
    : '{' OBJECTS '}'
    {
        $$ = {node: newNode(yy, yystate, $1, $2.node, $3)};
    }
;


OBJECTS
    : 
    OBJECTS ',' OBJECT
    {
        $$ = {node: newNode(yy, yystate, $1.node, $2, $3.node)};
    }
    | OBJECT
    {
        $$ = {node: newNode(yy, yystate, $1.node)};
    }
;

OBJECT
    : ID ':' EXPRESSION
    {
        $$ = {node: newNode(yy, yystate, $1, $2, $3.node)};
    }
;
























///================== TYPES

TYPE_DECLARATION
    : 'RESERV_TYPE' ID '=' '{' PRIMITIVE_DATAS '}' ';' 
    {
         $$ = {node: newNode(yy, yystate, $1, $2, $3, $4, $5.node, $6, $7)};
    }
;


PRIMITIVE_DATAS
    : PRIMITIVE_DATAS ',' PRIMITIVE_DATA
    {
         $$ = {node: newNode(yy, yystate, $1.node, $2, $3.node)};
    }
    | PRIMITIVE_DATA
    {
         $$ = {node: newNode(yy, yystate, $1.node)};
    }
;

PRIMITIVE_DATA
    : ID ':' TYPE_TIPO
    {
        $$ = {node: newNode(yy, yystate, $1, $2, $3.node)};
    }
;

TYPE_TIPO
    : 'RESERV_NUMBER'
    { 
        $$ = {node: newNode(yy, yystate, $1)};
    }
    | 'RESERV_STRING'
    {
        $$ = {node: newNode(yy, yystate, $1)};
    }
    | 'RESERV_BOOLEAN'
    { 
        $$ = {node: newNode(yy, yystate, $1)};
    }
    | ID
    { 
        $$ = {node: newNode(yy, yystate, $1)};
    }
;


///================ FUNCIONES

FUNCTIONS
    : 
    'RESERV_FUNCTION' ID '(' PARAMETERS ')' ':' TIPO SENTENCIA
    {
        $$ = {node: newNode(yy, yystate, $1, $2, $3, $4.node, $5, $6, $7.node, $8.node)}; 
    }
    | 
    'RESERV_FUNCTION' ID '(' PATAMETERS ')' SENTENCIA
    {
        $$ = {node: newNode(yy, yystate, $1, $2, $3, $4.node, $5, $6.node)};    
    }
    |
    'RESERV_FUNCTION' ID '(' ')' ':' TIPO SENTENCIA
    {
         $$ = {node: newNode(yy, yystate, $1, $2, $3, $4, $5, $6.node, $7.node)}; 
    }
    |
    'RESERV_FUNCTION' ID '(' ')' SENTENCIA
    {
        $$ = {node: newNode(yy, yystate, $1, $2, $3, $4, $5.node)};    
    }
;





FUNCTION_SENTENCE: 
    '{' CHILDFUNCTION '}'
    {
        $$ = {node: newNode(yy, yystate, $1, $2.node, $3)}; 
    }
    |
    '{' '}'
    {
        $$ = {node: newNode(yy, yystate, $1, $2, $3)}; 
    }
;

CHILDFUNCTION: 
    CHILD_FUNCTION NEW_INSTRUCTION
    {
        $$ = {node: newNode(yy, yystate, $1.node, $2.node)}; 
    }
;

CHILD_FUNCTION: 
    'PR_FUNCTION' ID '(' ')' FUNCTION_SENTENCE
    {
        $$ = {node: newNode(yy, yystate, $1, $2, $3, $4, $5.node)}; 
    }
    |
    'PR_FUNCTION' ID '(' PATAMETERS ')' FUNCTION_SENTENCE
    {
        $$ = {node: newNode(yy, yystate, $1, $2, $3, $4.node,$5, $6.node)}; 
    }
;

NEW_INSTRUCTION: 
    CHILD_FUNCTION NEW_INSTRUCTION
    {
        $$ = {node: newNode(yy, yystate, $1.node, $2.node)}; 
    }
    | /*EPSILON*/
    {
        $$ = null;
    }
;






PATAMETERS: 
    PATAMETERS ',' PARAMS
    {
        $$ = {node: newNode(yy, yystate, $1.node,$2, $3.node)}; 
    }
    |
    PARAMS
    {
        $$ = {node: newNode(yy, yystate, $1.node)}; 
    }
;

PARAMS: 
    ID ':' TIPO
    {
        $$ = {node: newNode(yy, yystate, $1, $2, $3.node)}; 
    }
;


CALL_FUNCTION
    :
    ID '(' ')' ';'
    {
       $$ = {node: newNode(yy, yystate, $1, $2, $3, $4)}; 
    }
    |
    ID '(' CALL_PARAMS ')' ';'
    {
        $$ = {node: newNode(yy, yystate, $1, $2, $3.node, $4, $5)}; 
    }
;

CALL_PARAMS: 
    CALL_PARAMS ',' EXPRESSION
    {
        $1.push($3);
        $$ = $1;
    }
    |
    EXPRESSION
    {
        $$ = [$1]
    }
;
