class ArbolView
{
    constructor(arbol, scale)
    {
        this.arbol = arbol;
        this.altura = this.arbol.calcularAltura(this.arbol.getRaiz(), 0, 0);;
        this.scale = scale;
        
    }
    
    show()
    {
        this.altura = this.arbol.calcularAltura(this.arbol.getRaiz(), 0, 0);
        this.altura--;
        createCanvas(pow(2, this.altura - 1) * (this.scale + (this.scale / 2)) , this.altura * this.scale * 2);
        background(100);
        this.showNodes(this.arbol.getRaiz(), 0, width, null);
        this.drawLines(this.arbol.getRaiz());
        this.showNodes(this.arbol.getRaiz(), 0, width, null);
    }

    drawLines(nodoActual)
    {
        if(nodoActual != null)
        {
            nodoActual.drawLine();
            this.drawLines(nodoActual.getIzquierdo());
            this.drawLines(nodoActual.getDerecho())
        }
    }

    showNodes(nodoActual, level, ancho, tipo) 
    {
        if (nodoActual != null) 
        {
            // if(nodoActual.getElemento() == TipoOperadorString.NOT)
            // {
            //     if(nodoActual.getIzquierdo() != null)
            //     {
            //         if(nodoActual.getIzquierdo().getElemento() )
            //     }
            // }
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