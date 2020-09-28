 
%{
    const { OpRelational, OpLogical,OpArithmetic} = require('../tools/abstract/enums');
    const { Arithmetic} = require('../tools/expression/Arithmetic');
    const { Relational } = require('../tools/expression/Relational');
    const { Logical } = require('../tools/expression/Logical');
    const { Access } = require('../tools/expression/Access');
    const { NullEx } = require('../tools/expression/Null');
    const { TypeAccess } = require('../tools/expression/TypeAccess');
    const { Literal } = require('../tools/expression/Literal');
    const { ObjectLiteral } = require('../tools/expression/ObjectLiteral');
    const { Declaration } = require('../tools/sentences/Declaration');
    const { NoType } = require('../tools/sentences/NoType');
    const { TypeNoType } = require('../tools/sentences/TypeNoType');
    const { Console } = require('../tools/sentences/Console');
    const { While } = require('../tools/sentences/While');
    const { DoWhile } = require('../tools/sentences/DoWhile');
    const { IF } = require('../tools/sentences/If');
    const { FOR } = require('../tools/sentences/For');
    const { FORIN } = require('../tools/sentences/ForIn');
    const { FOROF } = require('../tools/sentences/ForOf');
    const { Sentence } = require('../tools/sentences/Sentence');
    const { Switch } = require('../tools/sentences/Switch');
    const { Case } = require('../tools/sentences/Case');
    const { Default } = require('../tools/sentences/Default');
    const { Break } = require('../tools/sentences/Break');
    const { Arrays } = require('../tools/declaration_type/Arrays');
    const { ArrayObject } = require('../tools/declaration_type/ArrayObject');
    const { ArrayParam } = require('../tools/model/ArrayParam');
    const { Pushs } = require('../tools/sentences/Push');
    const { Pop } = require('../tools/sentences/Pop');
    const { TypeValue } = require('../tools/sentences/TypeValue');
    const { Return } = require('../tools/sentences/Return');
    const { Continue } = require('../tools/sentences/Continue');
    const { Type } = require('../tools/sentences/Type');
    const { PrimType } = require('../tools/sentences/PrimType');
    const { Call } = require('../tools/sentences/Call');
    const { Function } = require('../tools/sentences/Function');
    const { Constant } = require('../tools/sentences/Constant');
    const { ErrorProduction } = require('../tools/sentences/ErrorProduction');
    const { LexicoProduccion } = require('../tools/sentences/LexicoProduccion');
    const { ArrayAccess } = require('../tools/expression/ArrayAccess');
        


%}
%lex
%options case-insensitive
BSL                 "\\".
BSL2                 "\"".
number              ([0-9]+)
decimal             ([0-9]+("."[0-9]+))
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
"null"                  return 'RESERV_NULL'

([a-zA-Z_])[a-zA-Z0-9_ñÑ]*	return 'ID';
<<EOF>>               return 'EOF';
.                     return new LexicoProduccion(yytext, "Lexico", yylloc.first_line, yylloc.first_column, 2);;

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
        return $$;
    }
;

INSTRUCCIONES
    : INSTRUCCIONES INSTRUCCION{
        $1.push($2);
        $$ = $1
    }
    | INSTRUCCION{
        $$ = [$1]
    }
;

INSTRUCCION
    :
    LET_DECLARATION
    {
        $$ = $1
    }
    |
    TYPE_DECLARATION
    {
        $$ = $1
    }
    |
    CONST_DECLARATION
    {
        $$ = $1
    }
    |
    DECLARATION_NOTYPE
    {
        $$ = $1
    }
    
    |
    CONTINUE
    {
        $$ = $1
    }
    
    |
    BREAK
    {
        $$ = $1;
    }
    |
    SWITCH
    {
        $$ = $1;
    }
    |
    IF
    {
        $$ = $1
    }
    |
    DOWHILE
    {
        $$ = $1
    }
    |
    WHILE
    {
        $$ = $1
    }
    |
    FOR
    {
        $$ = $1
    }
    |
    CALL_FUNCTION
    {
        $$ = $1;
    }
    |
    FUNCTIONS
    {
        $$ = $1;
    }
    |
    RETURN
    {
        $$ = $1
    }
    |
    CONSOLE
    {
        $$ = $1
    }
    |
    PUSH
    {
        $$ = $1;
    }
    /*|
    POP1
    {
        $$ = $1;
    }*/
    | error { 
        $$ = new ErrorProduction(yytext, "Sitactico",this._$.first_line, this._$.first_column, 1);
    }
;


LET_DECLARATION
    : 'RESERV_LET' ID ':' TIPO '=' EXPRESSION ';'
    {
        $$ = new Declaration($2, $4, $6, @1.first_line, @1.first_column);
    }
    |
    'RESERV_LET' ID ':' TIPO ';'
    {
        $$ = new Declaration($2, $4, null, @1.first_line, @1.first_column);
    }
    |
    'RESERV_LET' ID '=' EXPRESSION ';'
    {
        $$ = new Declaration($2, null, $4, @1.first_line, @1.first_column);
    }
    |
    'RESERV_LET' ID ';'
    {
        $$ = new Declaration($2, null, null, @1.first_line, @1.first_column);
    }

    ////// ESTO ES PARA ARREGLOS
    
    // var array: string[] = []
    | 'RESERV_LET' ID ':' TIPO ARRAY '=' '['  NULLORDATA ']' ';'
    {
        $$ = new Arrays($2, $4, $8,  @1.first_line, @1.first_column);
    }
    // var array: string[];
    | 'RESERV_LET' ID ':' TIPO ARRAY';'
    {
        $$ = new Arrays($2, $4, null,  @1.first_line, @1.first_column);
    }
    // var array: string[] = new Array(); 
    | 'RESERV_LET' ID ':' TIPO ARRAY '=' 'RESERV_NEW'  'RESERV_ARRAY' '(' NULLORDATA ')'  ';'
    {
        $$ = new ArrayObject($2, $4, $10,  @1.first_line, @1.first_column);
    }
    // var arreglo1: Array<string> = []
    | 'RESERV_LET' ID ':' 'RESERV_ARRAY' '<' TIPO '>' '=' '['  NULLORDATA ']' ';'
    {
        $$ = new Arrays($2, $6, $9,  @1.first_line, @1.first_column);
    }
    //var arreglo1: Array<string>;
    | 'RESERV_LET' ID ':' 'RESERV_ARRAY' '<' TIPO '>' ';'
    {
        $$ = new Arrays($2, $6, null,  @1.first_line, @1.first_column);
    }
    // var arreglo1: Array<string> = new Array(4);
    | 'RESERV_LET' ID ':' 'RESERV_ARRAY' '<' TIPO '>' '=' 'RESERV_NEW'  'RESERV_ARRAY' '(' NULLORDATA ')'  ';'
    {
        $$ = new ArrayObject($2, $6, $12,  @1.first_line, @1.first_column);
    }
    // var array = []
    | 'RESERV_LET' ID '=' '['  NULLORDATA ']' ';'
    {
        $$ = new Arrays($2, 7, $5,  @1.first_line, @1.first_column);
    }
    | 'RESERV_LET' ID  '=' 'RESERV_NEW'  'RESERV_ARRAY' '(' NULLORDATA ')'  ';'
    {
        $$ = new ArrayObject($2, 7, $7,  @1.first_line, @1.first_column);
    }
;



//////////// ARRAY ///////////
ARRAY
    : '[' ']' {  }
    
    /*| '[' ']' '[' ']'
    { 
        $$ = {node: newNode(yy, yystate, $1, $2, $3, $4)};
    }*/
;

NULLORDATA
    :ARRAY_CONTENT { $$ = $1 }
    | /*epsilon*/ { $$ = null }
    ;
ARRAY_CONTENT 
    : ARRAY_CONTENT ',' MORE_ARRAY 
    {
        $1.push($3);
        $$ = $1
    }
    |  MORE_ARRAY
    {
        $$ = [$1]
    
    }
    ;


MORE_ARRAY
    : EXPRESSION
    {
        var cont = new ArrayParam($1, false);
        $$= cont
    }
    | '[' ARRAY_CONTENT ']' 
    {
        var cont = new ArrayParam($2, true);
        $$= cont    
    }
    ;



PRODUCCION_ID
    : ID  MATRIZ_IDEN '.'           { $$ = new ArrayAccess($1,$2, @1.first_line, @1.first_column) }  
    | ID  MATRIZ_IDEN               { $$ = new ArrayAccess($1,$2, @1.first_line, @1.first_column) }
    | ID  '.'  'RESERV_LENGTH'      { $$= new Access($1, @1.first_line, @1.first_column) }
    | ID  '.'   ID                  { $$ = new TypeAccess($1, $3, @1.first_line, @1.first_column) }
    | ID  '.'                       { $$= new Access($1, @1.first_line, @1.first_column) }
    | ID                            { $$= new Access($1, @1.first_line, @1.first_column) }
    ;

PUSH
    :   PRODUCCION_ID  'RESERV_PUSH' '(' EXPRESSION ')' ';'
    {
        $$ = new Pushs($1, $4, @1.first_line, @1.first_column)
    }
    ;




POP 
    :   PRODUCCION_ID 'RESERV_POP' '(' ')' 
    {
        $$ = new Pop($1, @1.first_line, @1.first_column)
    }
    ;


/*POP 
    :   PRODUCCION_ID 'RESERV_POP' '(' ')' 
    {
        $$ = new Pop($1, @1.first_line, @1.first_column)
    }
    ;
*/

//////////////// END ARRAY   ///////////////////////

CONST_DECLARATION
    : 'RESERV_CONST' ID ':' TIPO '=' EXPRESSION ';'
    {
        $$ = new Constant($2, $4, $6, @1.first_line, @1.first_column);
    }
    |
    'RESERV_CONST' ID '=' EXPRESSION ';'
    {
        $$ = new Constant($2, 7, $4, @1.first_line, @1.first_column);
    }
;




DECLARATION_NOTYPE
    : 
    ID '=' EXPRESSION ';'
    {
        $$ = new NoType($1, $3, @1.first_line, @1.first_column);
    }
    |
    ID '.' ID '=' EXPRESSION ';'
    {
        $$ = new TypeNoType($1, $3, $5, @1.first_line, @1.first_column);
    }
    |
    EXPRESSION ';'
    {
        $$ = $1
    }
;

TIPO
    : 'RESERV_STRING'
    {
        $$ = 1;
    }
    | 'RESERV_NUMBER'
    { 
        $$ = 0;
    }
    | 'RESERV_BOOLEAN'
    { 
        $$ = 2;
    }
    | 'RESERV_ANY'
    { 
        $$ = 7;
    }
    | ID
    { 
        $$ = {type: 9, tipo: $1};
    }

;







EXPRESSION     
    : EXPRESSION '+' EXPRESSION
    {
        $$ = new Arithmetic($1, $3, OpArithmetic.SUM, @1.first_line,@1.first_column);
    } 
    |
    EXPRESSION '-' EXPRESSION
    {
        $$ = new Arithmetic($1, $3, OpArithmetic.SUBTRACTION, @1.first_line,@1.first_column);
    } 
    |
    EXPRESSION '*' EXPRESSION
    {
        $$ = new Arithmetic($1, $3, OpArithmetic.MULTIPLICATION, @1.first_line,@1.first_column);
    }
    |
    EXPRESION '^' EXPRESION
    {
        $$ = new Aritmetica($1, $3, OpcionAritmetica.EXPONENTE, @1.first_line,@1.first_column);
    }
    |
    EXPRESION '**' EXPRESION
    {
        $$ = new Aritmetica($1, $3, OpcionAritmetica.EXPONENTE, @1.first_line,@1.first_column);
    } 
      
    |
    EXPRESSION '%' EXPRESSION
    {
        $$ = new Arithmetic($1, $3, OpArithmetic.MODULE, @1.first_line,@1.first_column);
    }
    |
    EXPRESSION '/' EXPRESSION
    {
        $$ = new Arithmetic($1, $3, OpArithmetic.DIVISION, @1.first_line,@1.first_column);
    } 
    |
    EXPRESSION '*' '*' EXPRESSION
    {
        $$ = new Arithmetic($1, $4, OpArithmetic.EXPONENT, @1.first_line,@1.first_column);
    } 
    |
    '-' EXPRESSION
    {
        $$ = new Arithmetic($2, $2, OpArithmetic.NEGATIVE, @1.first_line,@1.first_column);
    } 
    |
    EXPRESSION '<' EXPRESSION
    {
        $$ = new Relational($1, $3, OpRelational.LESS, @1.first_line,@1.first_column);
    } 
    |
    EXPRESSION '>' EXPRESSION
    {
        $$ = new Relational($1, $3, OpRelational.HIGHER, @1.first_line,@1.first_column);
    } 
    |
    EXPRESSION '<' '=' EXPRESSION
    {
        $$ = new Relational($1, $4, OpRelational.LESS_EQUALS, @1.first_line,@1.first_column);
    } 
    |
    EXPRESSION '>' '=' EXPRESSION
    {
        $$ = new Relational($1, $4, OpRelational.HIGHER_EQUALS, @1.first_line,@1.first_column);
    } 
    |
    EXPRESSION '==' EXPRESSION
    {
        $$ = new Relational($1, $3, OpRelational.EQUALS, @1.first_line,@1.first_column);
    } 
    |
    EXPRESSION '!=' EXPRESSION
    {
        $$ = new Relational($1, $3, OpRelational.DISCTINCT, @1.first_line,@1.first_column);
    }
    |
    EXPRESSION '&&' EXPRESSION
    {
        $$ = new Logical($1, $3, OpLogical.AND, @1.first_line,@1.first_column);
    }
    |
    EXPRESSION '||' EXPRESSION
    {
        $$ = new Logical($1, $3, OpLogical.OR, @1.first_line,@1.first_column);
    }
    |
    '!' EXPRESSION
    {
        $$ = new Logical($2, $2, OpLogical.NOT, @1.first_line,@1.first_column);
    }
    |
    EXPRESSION '+' '+'
    {
        $$ = new Arithmetic($1, $1, OpArithmetic.INCREASE, @1.first_line,@1.first_column);
    }
    |
    EXPRESSION '-' '-'
    {
        $$ = new Arithmetic($1, $1, OpArithmetic.DECREME, @1.first_line,@1.first_column);
    }
    |
    POP
    {
        $$ = $1
    }
    |
    IDENTIFICADOR
    {
        $$ = $1
    }
    |
    JSON_EXPRESSION
    {
        $$ = $1
    }
    

    
;

IDENTIFICADOR
    : '(' EXPRESSION ')'
    {
        $$ = $2;
    }
    | CADENA
    { 
        var cad = String($1)
        cad = cad.replace('"', '')
        cad = cad.replace('"', '')
        //cad = cad.trim();
        $$ = new Literal(cad, @1.first_line, @1.first_column, 1);
    }
    | NUMERO
    { 
        $$ = new Literal($1, @1.first_line, @1.first_column, 0)
    }
    | 'RESERV_NULL'
    { 
        $$ = new NullEx(@1.first_line, @1.first_column, 4)
    }
    | DECIMAL
    { 
        $$ = new Literal($1, @1.first_line, @1.first_column, 0)
    }
    | 'RESERV_TRUE'
    { 
        $$ = new Literal($1, @1.first_line, @1.first_column, 2)
    }
    | 'RESERV_FALSE'
    { 
        $$ = new Literal($1, @1.first_line, @1.first_column, 2)
    }
    
    /*| ID  MATRIZ_IDEN //esto es para arreglos y matrices
    { 
        $$ = new Access($1 + $2, @1.first_line, @1.first_column)
    }*/
    | PRODUCCION_ID
    { 
        $$ = $1
    }
    
;

MATRIZ_IDEN
    : MATRIZ_IDEN '[' IDENTIFICADOR ']'
    { 
        $$ = $1.push($3) 
    }
    | '[' IDENTIFICADOR ']'
    { 
        $$ = [$2] 
    }
    ;


RETURN 
    
    : 'RESERV_RETURN' EXPRESSION ';'
    {
        $$ = new Return($2, @1.first_line, @1.first_column);
    }
    | 'RESERV_RETURN'  ';'
    {
        $$ = new Return(null, @1.first_line, @1.first_column);
    }
;


BREAK 
    : 'RESERV_BREAK'  ';'
    {
        $$ = new Break(@1.first_line, @1.first_column);
    }
;


CONTINUE 
    : 'RESERV_CONTINUE'  ';'
    {
        $$ = new Continue(@1.first_line, @1.first_column);
    }
;






IF 
    : 'RESERV_IF' '(' EXPRESSION ')' SENTENCIA ELIF
    {
        $$ = new IF($3, $5, $6, @1.first_line, @1.first_column);
    }
;

ELIF 
    : 'RESERV_ELSE' SENTENCIA
    {
        $$ = $2;
    }
    | 'RESERV_ELSE' IF
    {
        $$ = $2;
    }
    | /* EPSILON */
    {
        $$ = null;
    }
;

SENTENCIA 
    : '{' INSTRUCCIONES '}'
    {
        $$ = new Sentence($2, @1.first_line, @1.first_column)
    }
    | '{' '}'
    {
        $$ = null;
    }
;



WHILE 
    : 'RESERV_WHILE' '(' EXPRESSION ')' SENTENCIA
    {
        $$ = new While($3, $5, @1.first_line, @1.first_column);
    }
;

DOWHILE 
    : 'RESERV_DO' SENTENCIA 'RESERV_WHILE' '(' EXPRESSION ')' ';'
    {
        $$ = new DoWhile($5, $2, @1.first_line, @1.first_column);
    }
;

SWITCH
    : 'RESERV_SWITCH' '(' EXPRESSION ')' '{' CASES DEFAULT '}'
    {
        if($7 == undefined) {
            $$ = new Switch($3, $6,null, @1.first_line, @1.first_column);
        } else {
            $$ = new Switch($3, $6,$7, @1.first_line, @1.first_column);
        }
    }
;

CASES 
    : CASES CASE
    {
        $1.push($2);
        $$ = $1
    }
    | CASE
    {
        $$ = [$1]
    }
;

CASE
    : 'RESERV_CASE'  EXPRESSION ':' INSTRUCCIONES 
    {
        var sent = new Sentence($4, @1.first_line, @1.first_column)
        //private condition: Expression,private code: Sentence,row: number,column: number
        $$ = new Case($2, sent, @1.first_line, @1.first_column);
    }
;

DEFAULT 
    : 'RESERV_DEFAULT' ':' INSTRUCCIONES
    {
        var sent = new Sentence($3, @1.first_line, @1.first_column)
        $$ = new Default(sent, @1.first_line, @1.first_column);
    }
    | /* EPSILON */
    {
        $$ = null;
    }
;

FOR 
    : 'RESERV_FOR' '(' DECLA_FOR ';' EXPRESSION ';' EXPRESSION ')' SENTENCIA
    {
        $$ = new FOR($3, $5, $7, $9, @1.first_line, @1.first_column);
    }
    | 'RESERV_FOR''(' 'RESERV_VAR' ID 'RESERV_IN' ID ')' SENTENCIA
    {
        var declar = new Declaration($4, 7, new Literal('0', @1.first_line, @1.first_column, 0), @1.first_line, @1.first_column);
        $$ = new FORIN(declar, $6, $8, @1.first_line, @1.first_column);
    }
    | 'RESERV_FOR''(' 'RESERV_LET' ID 'RESERV_IN' ID ')' SENTENCIA
    {
        var declar = new Declaration($4, 7, new Literal('0', @1.first_line, @1.first_column, 0), @1.first_line, @1.first_column);
        $$ = new FORIN(declar, $6, $8, @1.first_line, @1.first_column);
    }


    | 'RESERV_FOR''(' 'RESERV_VAR' ID 'RESERV_OF' ID ')' SENTENCIA
    {
        var declar = new Declaration($4, 7, new Literal('0', @1.first_line, @1.first_column, 0), @1.first_line, @1.first_column);
        $$ = new FOROF(declar, $6, $8, @1.first_line, @1.first_column);
    }
    | 'RESERV_FOR''(' 'RESERV_LET' ID 'RESERV_OF' ID ')' SENTENCIA
    {
        var declar = new Declaration($4, 7, new Literal('0', @1.first_line, @1.first_column, 0), @1.first_line, @1.first_column);
        $$ = new FOROF(declar, $6, $8, @1.first_line, @1.first_column);
    }
;

DECLA_FOR
    : FOR_DECLARATION  { $$ = $1 }
    | ID '=' EXPRESSION { $$ = new NoType($1, $3, @1.first_line, @1.first_column); }
    ;


FOR_DECLARATION
    : 'RESERV_VAR' ID ':' TIPO '=' EXPRESSION
    {
         $$ = new Declaration($2, $4, $6, @1.first_line, @1.first_column);
    }
    |
    'RESERV_VAR' ID '=' EXPRESSION
    {
        $$ = new Declaration($2, 0, $4, @1.first_line, @1.first_column);
    }
    | 'RESERV_LET' ID ':' TIPO '=' EXPRESSION
    {
        $$ = new Declaration($2, $4, $6, @1.first_line, @1.first_column);
    }
    |
    'RESERV_LET' ID '=' EXPRESSION
    {
         $$ = new Declaration($2, 0, $4, @1.first_line, @1.first_column);
    }
;

CONSOLE: 
    'RESERV_CONSOLE' '.' 'RESERV_LOG' '(' EXPRESSION ')' ';'
    {
        $$ =  new Console($5, @1.first_line, @1.first_column)
    }
;


//================ JSON

JSON_EXPRESSION
    : '{' OBJECTS '}'
    {
        $$ = new ObjectLiteral($2, @1.first_line, @1.first_column);
    }
;


OBJECTS
    : 
    OBJECTS ',' OBJECT
    {
        $1.push($3)
        $$ = $1
    }
    | OBJECT
    {
        $$ = [$1]
    }
;

OBJECT
    : ID ':' EXPRESSION
    {
        $$ = new TypeValue($1, $3, @1.first_line, @1.first_column);
    }
;


///================== TYPES

TYPE_DECLARATION
    : 'RESERV_TYPE' ID '=' '{' PRIMITIVE_DATAS '}' ';' 
    {
        $$ = new Type($2, 9, $5, @1.first_line, @1.first_column);
    }
;


PRIMITIVE_DATAS
    : PRIMITIVE_DATAS ',' PRIMITIVE_DATA
    {
        $1.push($3)
        $$ = $1;
    }
    | PRIMITIVE_DATA
    {
        $$ = [$1];
    }
;

PRIMITIVE_DATA
    : ID ':' TYPE_TIPO
    {
        $$ = new PrimType($1, $3, @1.first_line, @1.first_column)
    }
;

TYPE_TIPO
    : 'RESERV_NUMBER'
    { 
        $$ = $1;
    }
    | 'RESERV_STRING'
    {
        $$ = $1;
    }
    | 'RESERV_BOOLEAN'
    { 
        $$ = $1;
    }
    | ID
    { 
        $$ = $1;
    }
;

///================ FUNCIONES

FUNCTIONS
    :
    'RESERV_FUNCTION' ID '(' PARAMETERS ')' ':' TIPO SENTENCIA
    {
        $$ = new Function($2, $8, $4, @1.first_line, @1.first_column);
    }
    |
    'RESERV_FUNCTION' ID '(' PARAMETERS ')' SENTENCIA
    {
        $$ = new Function($2, $6, $4, @1.first_line, @1.first_column);
    }
    |
    'RESERV_FUNCTION' ID '(' ')' ':' TIPO SENTENCIA
    {
        $$ = new Function($2, $7, [], @1.first_line, @1.first_column);
    }
    
    |
    'RESERV_FUNCTION' ID '(' ')' SENTENCIA
    {
        $$ = new Function($2, $5, [], @1.first_line, @1.first_column);
    }
;








FUNCTION_SENTENCE: 
    '{' CHILDFUNCTION '}'
    {
        $$ = $1;
    }
    |
    '{' '}'
    {
        $$ = $1;
    }
;

CHILDFUNCTION: 
    CHILD_FUNCTION NEW_INSTRUCTION
    {
        $$ = $1;
    }
;

CHILD_FUNCTION: 
    'PR_FUNCTION' ID '(' ')' FUNCTION_SENTENCE
    {
        $$ = $1;
    }
    |
    'PR_FUNCTION' ID '(' PARAMETERS ')' FUNCTION_SENTENCE
    {
        $$ = $1;
    }
;

NEW_INSTRUCTION: 
    CHILD_FUNCTION NEW_INSTRUCTION
    {
        $$ = $1;
    }
    | /*EPSILON*/
    {
        $$ = $1;
    }
;














PARAMETERS: 
    PARAMETERS ',' PARAMS
    {
        $1.push($3);
        $$ = $1;
    }
    |
    PARAMS
    {
        $$ = [$1];
    }
;

PARAMS: 
    ID ':' TIPO
    {
        $$ = $1;
    }
;


CALL_FUNCTION
    :
    ID '(' ')' ';'
    {
        $$ = new Call($1, [], @1.first_line, @1.first_column);
    }
    |
    ID '(' CALL_PARAMS ')' ';'
    {
        $$ = new Call($1, $3, @1.first_line, @1.first_column);
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
