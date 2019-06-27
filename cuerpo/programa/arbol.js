class ArbolBinario
{
    constructor() 
	{
        this.__raiz = null;
        this.__peso = 0;
	}
	
	/**
	 * Verifica si un árbol está vacío
	 * @return true si está vacío
	 */
	estaVacio() {
		return this.__raiz == null;
	}
	
	/**
	 * @return the this.__raiz
	 */
	getRaiz() {
		return this.__raiz;
	}
	/**
	 * @param this.__raiz the this.__raiz to set
	 */
	setRaiz(nodo) {
		this.__raiz = nodo;
	}
	/**
	 * @return the peso
	 */
	getPeso() {
		return this.__peso;
	}

	/**
	 * Metodo que retorna el arbol en postorden
	 * @param {*} nodo 
	 */
	postorden(nodo){
    	
		if(nodo == null) 
		{
			return "";
		}
		else 
		{
			return this.postorden(nodo.getIzquierdo()) + this.postorden(nodo.getDerecho()) + nodo.getElemento();
		}
	
    }
	
	/**
	 * Metodo para calcular la altura del arbol
	 * @param {*} nodoActual 
	 * @param {*} max 
	 * @param {*} localMax 
	 */
    calcularAltura(nodoActual, max, localMax) 
    {
        if (nodoActual == null) 
        {
            if (localMax > max) 
            {
				max = localMax;
			}
			return max;
        }
        else 
        {
            let n1 = this.calcularAltura(nodoActual.getIzquierdo(), max, localMax + 1);
			let n2 = this.calcularAltura(nodoActual.getDerecho(), max, localMax + 1);
            if (n1 > n2) 
            {
				return n1;
            }
            else 
            {
				return n2;
			}
		}
	}
	
	/**
	 * Cuenta las hojas del arbol
	 * @param {*} nodo 
	 * @param {*} cont 
	 */
	contarHojas(nodo, cont)  
	{
		if(this.__raiz != null) 
		{
			if(nodo == null) 
			{
				return 0;
			}
			else if(nodo.esHoja()) 
			{
				return 1;
			}
			else 
			{
				cont = this.contarHojas(nodo.getDerecho(), cont) + this.contarHojas(nodo.getIzquierdo(), cont);
				return cont;
			}			
		}
		return -1;
	}
}