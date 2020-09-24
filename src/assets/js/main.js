
function newNode(yy, state, ...nodes) {
    const parent = getNonTerminal(yy, state);
    const children = [];
    //console.log('==============NODES=============')
    //console.log(nodes)
    for (let node of nodes) {
        node.parent = node.parent ? node.parent : parent;
        if (node.parent == parent) {
            children.push(node);
        } else if (typeof node == 'string') {
            children.push({
                name: node,
                parent,
                children: []
            });
        } else {
            children.push({
                name: node.parent,
                parent,
                children: [node]
            });
        }
    }

    return {
        name: parent,
        parent: null,
        children
    }
}

function getNonTerminal(yy, state) {
    const simbolos = yy.parser.symbols_;
    const produccion = yy.parser.productions_[state];
    let nonTerminal = '';
    for (let sim in simbolos) {
        if (simbolos[sim] === produccion[0]) {
            nonTerminal = sim;
            break;
        }
    }
    return nonTerminal;
}

const templist = [];

function getTemp() {
    const temp = `t${templist.length}`;
    templist.push(temp);
    return temp;
}