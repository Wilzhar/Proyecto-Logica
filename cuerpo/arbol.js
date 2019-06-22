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
	 * Agrega un nuevo elemento al árbol
	 * @param elemento Nuevo dato
	 * @return true si lo pudo guardar
	 */
	agregar(elemento) {		
		if(this.estaVacio()) {
			this.__raiz = new Nodo(elemento);
			this.__peso++;
		}else if(this.__raiz.agregar(elemento)){			
			this.__peso++;
		}		
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
	
	preorden(nodo) 
	{
		if(nodo == null) 
		{
			return;
		}
		else 
		{
			console.log(nodo.getElemento());
			this.preorden(nodo.getIzquierdo());
			this.preorden(nodo.getDerecho());
		}
	}

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
	
	obtenerMenorRec(nodo) 
	{
		if(this.__raiz != null) 
		{
			if(nodo.getIzquierdo() == null) 
			{
				return nodo.getElemento();
			}
			else 
			{
				return this.obtenerMenorRec(nodo.getIzquierdo());
			}			
		}
		return null;
	}
	
	obtenerMenorIte(nodo) 
	{
		if(this.__raiz != null) 
		{
			while(nodo.getIzquierdo() != null) 
			{
				nodo = nodo.getIzquierdo();
			}
			return nodo.getElemento();			
		}
		return null;
	}
	
	isEqualTo(arbol, nodo1, nodo2, identicos) 
	{
		if(this.__raiz != null && arbol.getthis.__raiz() != null) 
		{
			if(nodo1 == null || nodo2 == null) 
			{
				if((nodo1 == null && nodo2 != null) || (nodo1 != null && nodo2 == null)) 
				{
					return false;
				}
				return identicos;
			}
			else if(!identicos) 
			{
				return false;
			}
			else 
			{
				console.log("1: " + nodo1.getElemento());
				console.log("2: " + nodo2.getElemento());
				console.log("3: " + (nodo1.getElemento() == nodo2.getElemento()));
				if(nodo1.getElemento() == nodo2.getElemento()) 
				{
					console.log("asd1");
					identicos = this.isEqualto(arbol, nodo1.getIzquierdo(), nodo2.getIzquierdo(), identicos) &&
							this.isEqualto(arbol, nodo1.getDerecho(), nodo2.getDerecho(), identicos);					
					return identicos;
				}
				else 
				{
					console.log("asd2");
					return false;
				}
			}
			
		}
		return false;
	}

	eliminar(nodoActual, nodoPadre, eliminado, nodoAux, valor) 
	{
		if(nodoActual.getElemento() == 11)console.log("el ndo 1111111111111111111");
		if(nodoActual == null)
		{
			console.log("El nodo es nullo");
			return;
		}
		else 
		{
			if(nodoPadre != null) 
			{
				console.log("nodoPadre: " + nodoPadre.getElemento());
			}
			console.log("nodoActual: " + nodoActual.getElemento());				
			if(!eliminado) 
			{
				console.log("Eliminado es falso");
				if((int)(nodoActual.getElemento()) == (int)(valor)) 
				{					
					console.log("El nodo es igual al valor");
					if(nodoActual.esHoja())
					{
						console.log("El nodo es hoja");
						console.log("Eliminelo");
						console.log(nodoActual.getElemento()); 
						if(nodoPadre.getDerecho() == nodoActual) 
						{
							nodoPadre.setDerecho(null);
						}
						else 
						{
							nodoPadre.setIzquierdo(null);
						}
					}
					else if(nodoActual.tieneUnHijo())
					{
						console.log("El nodo tiene un hijo");
						if(nodoActual.getDerecho() != null) 
						{
							console.log("Eliminemos el nodo con hijo derecho");
							if(nodoPadre.getIzquierdo() == nodoActual) 
							{
								nodoPadre.setIzquierdo(nodoActual.getDerecho());
								nodoPadre.getIzquierdo().setPadre(nodoPadre);
								nodoActual.getDerecho().setPadre(nodoPadre);
							}
							else 
							{
								nodoPadre.setDerecho(nodoActual.getDerecho());
								nodoPadre.getDerecho().setPadre(nodoPadre);
								nodoActual.getDerecho().setPadre(nodoPadre);
							}
						}
						else 
						{
							console.log("Eliminemos el nodo con hijo izquierdo");
							if(nodoPadre.getIzquierdo() == nodoActual) 
							{
								nodoPadre.setIzquierdo(nodoActual.getIzquierdo());
								nodoPadre.getIzquierdo().setPadre(nodoPadre);
								nodoActual.getDerecho().setPadre(nodoPadre);
							}
							else 
							{
								nodoPadre.setDerecho(nodoActual.getIzquierdo());
								nodoPadre.getDerecho().setPadre(nodoPadre);
								nodoActual.getDerecho().setPadre(nodoPadre);
							}
							this.eliminar(nodoActual, nodoPadre, true, nodoAux, valor);
						}
					}
					else 
					{
						nodoAux = nodoActual.getDerecho();
						console.log("nodoAux: " + nodoAux.getElemento());
						console.log("El nodo tiene dos hijos");
						if(nodoPadre.getDerecho() == nodoActual) 
						{
							nodoPadre.setDerecho(nodoActual.getIzquierdo());
							nodoPadre.getDerecho().setPadre(nodoPadre);
							nodoActual.getDerecho().setPadre(nodoPadre);
						}
						else 
						{
							nodoPadre.setIzquierdo(nodoActual.getIzquierdo());
							nodoPadre.getIzquierdo().setPadre(nodoPadre);
							nodoActual.getDerecho().setPadre(nodoPadre);
						}

						console.log("existe padre: ", nodoPadre.getElemento(), nodoActual.getElemento(), nodoActual.getPadre().getElemento());
						if(nodoPadre.getIzquierdo() != null)console.log("izq Padre: " + nodoPadre.getIzquierdo().getElemento());
						if(nodoPadre.getDerecho() != null)console.log("der Padre: " + nodoPadre.getDerecho().getElemento());
						this.eliminar(nodoActual.getIzquierdo(), nodoPadre, true, nodoAux, valor);
					}				
				}
				else if((int)(nodoActual.getElemento()) < (int)(valor)) 
				{
					console.log("El valor es mayor");
					this.eliminar(nodoActual.getDerecho(), nodoActual,false, nodoAux, valor);
				}
				else 
				{
					console.log("El valor es menor");
					this.eliminar(nodoActual.getIzquierdo(), nodoActual,false, nodoAux, valor);
				}
			}
			else 
			{
				console.log("ok");
				
				if(nodoActual.getDerecho() == null) 
				{
					console.log("Le añado el aux");
					nodoActual.setDerecho(nodoAux);
					nodoActual.getDerecho().setPadre(nodoActual);
					console.log("nodoActualsssssssssssssssssssssssssssss: ", nodoActual.getElemento());
					console.log("nodoAux: ", nodoAux.getElemento());

					nodoAux.setPadre(nodoActual);
				}
				else 
				{
					this.eliminar(nodoActual.getDerecho(), nodoActual, true, nodoAux, valor);
				}
			}				
		}		
	}
	
	hallarNivelNodo() 
	{
		
	}
	
	imprimirArbol(nodo, nivel) 
	{
		if(nodo != null) 
		{
			let msj = "";
			for(let i = 0; i < nivel; i++) 
			{
				msj += "\t";
			}
			console.log(msj + "- " + nodo.getElemento());
			this.imprimirArbol(nodo.getIzquierdo(), nivel + 1);
			this.imprimirArbol(nodo.getDerecho(), nivel + 1);
		}
    }
    
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