class ArbolView
{
    constructor(arbol)
    {
        this.arbol = arbol;
        this.altura = this.arbol.calcularAltura(this.arbol.getRaiz(), 0, 0);;
        this.scale = 80;
        
    }
    
    show()
    {
        this.altura = this.arbol.calcularAltura(this.arbol.getRaiz(), 0, 0);
        if(this.arbol.getRaiz() == TipoOperadorString.NOT)
        {
            this.altura= this.altura - 3;
        }
        else
        {
            this.altura= this.altura - 2;
        }
        createCanvas(pow(2, this.altura) * (this.scale + (this.scale / 2)) , this.altura * this.scale * 2);
        // createCanvas(pow(2, this.altura) * (3*this.scale/4) , this.altura * this.scale * 1.5);
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