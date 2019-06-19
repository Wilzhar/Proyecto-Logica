class ArbolView
{
    constructor(arbol, scale)
    {
        this.arbol = arbol;
        this.altura = this.arbol.calcularAltura(arbol.getRaiz(), 0, 0);;
        this.scale = scale;
    }
    
    show()
    {
        this.arbol.imprimirArbol(this.arbol.getRaiz(), 0);
        this.arbol.imprimirArbol(this.arbol.getRaiz(), 0);
        this.altura = this.arbol.calcularAltura(this.arbol.getRaiz(), 0, 0);
        this.altura--;
        createCanvas(pow(2, this.altura - 1) * (this.scale + (this.scale / 2)) , this.altura * this.scale * 2);
        background(100);
        showNodes(this.arbol.getRaiz(), 0, width, null);
        drawLines(this.arbol.getRaiz());
        showNodes(this.arbol.getRaiz(), 0, width, null);
    }

    drawLines(nodoActual)
    {
        if(nodoActual != null)
        {
            nodoActual.drawLine();
            drawLines(nodoActual.getIzquierdo());
            drawLines(nodoActual.getDerecho())
        }
    }

    showNodes(nodoActual, level, ancho, tipo) {

        if (nodoActual != null) 
        {
            nodoActual.radio = this.scale / 2;
            let padre;
            switch (tipo) {
                default:
                    nodoActual.x = ancho / 2;
                    break;

                case "left":	
                    padre = nodoActual.getPadre();
                    nodoActual.x = padre.x - ancho / 2;
                    break;

                case "right":
                    padre = nodoActual.getPadre();
                    nodoActual.x = padre.x + ancho / 2;
                    break;
            }
            
            nodoActual.y = scale * level + this.scale / 2;
            
            var nodoDerecho = nodoActual.getDerecho();
            var nodoIzquierdo = nodoActual.getIzquierdo();
            var nivelHijo = level + 1;

            nodoActual.show();

            showNodes(nodoIzquierdo, nivelHijo, ancho / 2, "left");
            showNodes(nodoDerecho, nivelHijo, ancho / 2, "right");
        }

    }
}