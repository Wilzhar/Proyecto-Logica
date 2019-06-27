class ArbolView
{
    /**
     * Constructor de la clase
     * @param {} arbol
     */
    constructor(arbol)
    {
        this.arbol = arbol;
        this.altura = this.arbol.calcularAltura(this.arbol.getRaiz(), 0, 0);;
        this.scale = 80;
        
    }
    
    /**
     * Metodo para mostrar el arbol
     */
    show()
    {
        this.altura = this.arbol.calcularAltura(this.arbol.getRaiz(), 0, 0);
        if(this.arbol.getRaiz() == TipoOperadorString.NOT)
        {
            this.altura= this.altura - 2.5;
        }
        else
        {
            this.altura= this.altura - 1.5;
        }
        createCanvas(pow(2, this.altura) * (this.scale + (this.scale / 2)) , this.altura * this.scale * 2);
        background(100);
        this.showNodes(this.arbol.getRaiz(), 0, width, null);
        this.drawLines(this.arbol.getRaiz());
        this.showNodes(this.arbol.getRaiz(), 0, width, null);
    }

    /**
     * Metodo para dibujar las lineas que unen los nodos
     * @param {*} nodoActual 
     */
    drawLines(nodoActual)
    {
        if(nodoActual != null)
        {
            nodoActual.drawLine();
            this.drawLines(nodoActual.getIzquierdo());
            this.drawLines(nodoActual.getDerecho())
        }
    }

    /**
     * Metodo para dinujar los nodos del arbol
     * @param {*} nodoActual 
     * @param {*} level 
     * @param {*} ancho 
     * @param {*} tipo 
     */
    showNodes(nodoActual, level, ancho, tipo) 
    {
        if (nodoActual != null) 
        {
            let padre;
            nodoActual.radio = this.scale / 2;
            padre = nodoActual.getPadre();
            if(padre != null)
            {
                if(padre.getElemento() == TipoOperadorString.NOT && padre.getPadre() == null)
                {
                    nodoActual.x = padre.x;
                }
                else if(padre.getElemento() == TipoOperadorString.NOT && isOperadorBinario(nodoActual.getElemento()))
                {
                    nodoActual.x = padre.x;
                }
                else
                {
                    switch (tipo) {
                               
                        case "left":	
                            padre = nodoActual.getPadre();
                            nodoActual.x = padre.x - ancho / 2;
                            break;
        
                        case "right":
                            padre = nodoActual.getPadre();
                            nodoActual.x = padre.x + ancho / 2;
                            break;
                    }
                }
            }
            else
            {
                nodoActual.x = ancho / 2;
            }
            
            nodoActual.y = this.scale * level + this.scale / 2;
            
            var nodoDerecho = nodoActual.getDerecho();
            var nodoIzquierdo = nodoActual.getIzquierdo();
            var nivelHijo = level + 1;

            nodoActual.show();

            this.showNodes(nodoIzquierdo, nivelHijo, ancho / 2, "left");
            this.showNodes(nodoDerecho, nivelHijo, ancho / 2, "right");
        }
    }
}