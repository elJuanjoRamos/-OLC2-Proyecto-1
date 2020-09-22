export class ArrayParam {
    
    private element:any;
    private isArray:boolean;
    constructor(elem: any, isA: boolean){
        this.element = elem;
        this.isArray = isA;
    }


    getElement() {
        return this.element;  
    } 

    setElement(v) {
        this.element = v;
    }
    
    getIsArray() {
        return this.isArray;
    }
    
    setIsArray(v) {
        this.isArray = v;
    }
}




