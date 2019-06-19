class Nodo 
{
    
    /**
     * Constructor de la clase
     * @param elemento Dato del nodo
	 */
    constructor(elemento, padre) {
        this.__elemento = elemento;
        this.__izquierdo;
        this.__derecho;
        this.__padre = padre;
        this.x;
        this.y;
        this.radio;
    }
    
    drawLine()
    {
        if(this.__padre != null)
        {
            line(this.__padre.x, this.__padre.y, this.x, this.y);
        }
    }

    show()
    {
        
        fill(color("Green"));
        ellipse(this.x, this.y, this.radio + 15);
        textAlign(CENTER, CENTER);
        fill(255);
        textSize(20);
        text(this.__elemento, this.x, this.y);
    }
	
	/**
	 * Agrega un nuevo elemento en el árbol
	 * @param elemento Nuevo dato
	 * @return true si lo pudo guardar
	 */
    agregar(nuevo) 
	{
		if(nuevo < this.__elemento) 
		{
			if(this.__izquierdo == null) {
				this.__izquierdo = new Nodo(nuevo, this);
				return true;
			}else {
				return this.__izquierdo.agregar(nuevo);
			}
		}
		else 
		{
			if(nuevo > this.__elemento) 
			{
				if(this.__derecho == null) {
					this.__derecho = new Nodo(nuevo, this);
					return true;
				}else {
					return this.__derecho.agregar(nuevo);
				}
			}
		}
		
		return false;
	}
	
	/**
	 * Determina si un Nodo es una Hoja
	 * @return true si es Hoja
	 */
	esHoja() {
		return this.__izquierdo == null && this.__derecho == null;
	}

	/**
	 * 
	 * @return
	 */
	tieneUnHijo() {
		return (this.__izquierdo != null && this.__derecho == null) || (this.__derecho != null && this.__izquierdo == null );
	}
	
	/**
	 * @return the izq
	 */
	getIzquierdo() {
		return this.__izquierdo;
	}

	/**
	 * @param izq the izq to set
	 */
	setIzquierdo(izq) {
		this.__izquierdo = izq;
		izq.setPadre(this);
	}

	/**
	 * @return the der
	 */
    getDerecho() {
		return this.__derecho;
	}

	/**
	 * @param der the der to set
	 */
	setDerecho(der) {
		this.__derecho = der;
		der.setPadre(this);
	}

	/**
	 * @return the elemento
	 */
	getElemento() {
		return this.__elemento;
	}

	/**
	 * @param elemento the elemento to set
	 */
    setElemento(elemento) {
		this.__elemento = elemento;
	}

	/**
	 * @return the padre
	 */
    getPadre() {
		return this.__padre;
	}

	/**
	 * @param padre the padre to set
	 */
    setPadre(padre) {
		this.__padre = padre;
	}
	
}