function setup() {
  // put setup code here

//   let x1 = [1, 1, 0, 1, 0, 0, 1];
//   let x2 = [1, 0, 0, 0, 1, 1, 1, 1];

//   //var x = operacionBinaria(x1, x2, TipoOperador.BICOND);
//   let y = operacionUnaria(x2);

//   let arbol = new ArbolBinario();
//   arbol.setRaiz(new Nodo('', null));

//   algoritmoDescomposicion(arbol.getRaiz(), '((p)'+TipoOperadorString.COND+'(q))'+TipoOperadorString.AND+'(r)');

//   console.log(arbol.getRaiz().getElemento())
	
  
	// algoritmoDescomposicion(arbol.getRaiz(), '('+TipoOperadorString.NOT+'((p)'+TipoOperadorString.COND+'(q)))'+TipoOperadorString.AND+'(r)');
	// let fbf = "¬((((p)↔((¬(¬(p)))→((p)V(p))))Ʌ(¬((p)V(p))))V(¬(p)))"
	// console.log(fbf); 
	// algoritmoDescomposicion(arbol.getRaiz(), fbf);
	// mostrarArbol(arbol);
}

function draw() {
	// put drawing code here
}

/**
 * Esta enumeracion contiene los operadores binarios y unarios.
 */
const TipoOperador = {
	NOT: 0,
	OR: 1,
	AND: 2,
	COND: 3,
	BICOND: 4,
};

/**
 * Esta enumeracion contiene todas las representaciones de los operadores binarios y unarios en UNICODE
 */
const TipoOperadorString = {
	NOT: '\u00AC',
	OR: 'V',
	AND: '\u0245',
	COND: '\u2192',
	BICOND: '\u2194',
};

function sumar()
{
	let a = parseInt(document.getElementById("numA").value, 10);
	let b = parseInt(document.getElementById("numB").value, 10);
	let res = a + b;
	document.getElementById('result').value = res;
}

/**
 * Este metodo busca los parrafos que estan en el html. EL de premisas y el de conclusion. Una vez los tiene, 
 * hace split a la cadena de premisas, estas quedan en un arreglo de premisas. Se unen por medio de disyunciones y al final se 
 * une por medio de una disyuncion la negacion de la conclusion.
 * Para quedar una formula con exceso de parentesis.
 */
function inicializarArgumento()
{
	
	strPremisas = document.getElementById("formulasValidas").innerHTML;
	strConsecuencia = document.getElementById("conclusion").innerHTML;
	arregloFormulas = strPremisas.split("<br>");
	strFormulaCorolario = "";
	console.log(strPremisas);

	for(var premisaTemp of arregloFormulas)
	{
		if(premisaTemp.length == 1 || premisaTemp[0] == TipoOperadorString.NOT )
		{
			strFormulaCorolario += "("+premisaTemp+")"+'\u0245';
		}
		else
		{
			strFormulaCorolario+= premisaTemp+'\u0245';
		}

		
	}
	
	console.log(strFormulaCorolario);

	strFormulaCorolario = construirFormulaPremisas(strFormulaCorolario);

	console.log(strFormulaCorolario);

	strFormulaCorolario+= "("+'\u00AC'+"("+strConsecuencia+"))";
	
	strFormulaCorolario = strFormulaCorolario.substring(1,strFormulaCorolario.length)

	console.log(strFormulaCorolario);

	construirArbol(strFormulaCorolario);
}

/**
 * Este metodo recibe la formula de solo premisas y hace parejas de subformulas (las proteje con parentesis), ya que
 * el metodo ejecutarAlgoritmoDescomposicion solo opera de a dos subformulas por vez.
 * @param {*} formula 
 */
function construirFormulaPremisas(formula)
{
	let posicion = 0;
	segundoUno = 0;
	formula = "("+formula;
	tamVariable = formula.length;
	console.log("Formula antes del for: "+formula+" su tamanio: "+tamVariable);
	for(let i=0; i<tamVariable; i++){
	
		

		if(formula[i] == '('){
			console.log('sumo');
			posicion++;
			
		}else if(formula[i] == ')'){
			console.log('resto');
			posicion--;

			if(posicion == 1)
			{
				segundoUno+=1;
				console.log("parentesis con 1 "+ segundoUno );
			}
		}

		

		if(posicion == 1 && segundoUno == 2){

			console.log("ENTRO!!!!");
			console.log("Posicion: "+posicion);
			console.log("Segundo uno"+segundoUno);
			//Aca se toma la formula y se dividira en tres partes, se agregara un parentesis de cierre a la primera parte
			//y se agregara un parentesis de apertura antes de la segunda parte
			parte1Formula = formula.substring(0,i+1);	//Captura de la primera parte (hasta el segundo uno) y el Op principal
			
			parte2Formula = formula.substring(i+1,formula.length+1);
			console.log("parte1: "+parte1Formula+" parte2: "+parte2Formula);

			formula = "("+parte1Formula+")"+parte2Formula;

			console.log(formula);
			i = 0;
			tamVariable+=2;
			segundoUno = 0;
		}
		
	}

	return formula;
}

/**
 * Metodo de interfaz entre el ingreso de datos y el algoritmo de descomposicion.
 * Este metodo toma la formula bien formada (con exceso de parentesis) y se la manda al algoritmo de descomposicion
 * @param {String} strFormula 
 */
function construirArbol(strFormula)
{
	let arbol = new ArbolBinario();
	arbol.setRaiz(new Nodo('', null));
	ejecutarAlgoritmoDescomposicion(arbol.getRaiz(),strFormula);
	mostrarArbol(arbol);
}


/**
 * Este metodo recibe el operador presionado en el panel de botones, posteriormente, toma toda la cadena previa
 * y lo adiciona en el lugar (valido) donde estuviera el cursor al momento de presionarlo.
 * Crea una nueva cadena con todo eso y lo setea nuevamente en el campo de texto.
 * 
 * @param {*} operador 
 */
function fijarEstructuraOperador(operador)
{
	//Primero verificar que la posicion donde se pretende insertar el operador, si es valida.
	txtField = document.getElementById("textFormula");
	
	if(verificarPosicionCursor(txtField) || txtField.value == "")
	{

		let msj = "";
		tipoOperador = TipoOperador.NOT;
		switch(operador)
		{
			case TipoOperador.NOT:
				msj = TipoOperadorString.NOT+"()";
				tipoOperador = TipoOperador.NOT;
				break;
			case TipoOperador.OR:
				tipoOperador = TipoOperador.OR;
				msj = "()"+TipoOperadorString.OR+"()";
				break;
			case TipoOperador.AND:
				tipoOperador = TipoOperador.AND;
				msj = "()"+TipoOperadorString.AND+"()";
				break;
			case TipoOperador.COND:
				tipoOperador = TipoOperador.COND;
				msj = "()"+TipoOperadorString.COND+"()";
				break;
			case TipoOperador.BICOND:
				tipoOperador = TipoOperador.BICOND;
				msj = "()"+TipoOperadorString.BICOND+"()"
				break;
		}
		
		selStar = txtField.selectionStart;
		txtField.value = txtField.value.substring(0, txtField.selectionStart) + msj 
			+ txtField.value.substring(txtField.selectionStart, txtField.value.length);
		if(tipoOperador == TipoOperador.NOT)
		{
			txtField.selectionStart = selStar + 2;
		}
		else
		{
			txtField.selectionStart = selStar + 1;
		}
		posicionarCursor(txtField, txtField.selectionStart);
	}	
	else
	{
		alert("Posicion no valida, por favor seleccione otra");
	}	

}

/**
 * Este metodo posiciona el cursor en el campo de texto justo en la posicion indicada por parametros
 * @param {*} txtField 
 * @param {*} inicio 
 */
function posicionarCursor(txtField, inicio)
{
	txtField.setSelectionRange(inicio, inicio);
	txtField.focus();
}

/**
 * Este metodo permitira pasar de un escudo valido a otro sin pasar por sus intermedios.
 */
function keyPressed()
{
	txtFieldV = document.getElementById("textFormula");
	if(keyCode === UP_ARROW)
	{
		posicionarCursor(txtField, buscarCampoVacio(txtField));
	}
}

/**
 * Este metodo está relacionado con el metodo keyPressed para buscar un escudo vacio.
 * @param {*} txtField 
 */
function buscarCampoVacio(txtField)
{	
	txtFieldV = txtField.value;
	for(let i = 0; i < txtFieldV.length; i++)
	{
		if(i + 1 != txtFieldV.length)
		{
			if(txtFieldV[i] == "(" && txtFieldV[i + 1] == ")")
			{
				return i + 1;
			}
		}
	}
	return 0;
}


/**
 * Este metodo determina si la posicion actual del cursor es una posicion valida para insertar un operador.
 * 
 * @param {*} textField 
 */
function verificarPosicionCursor(textField)
{	
	let valida = false;
	let escudoValido = "()";
	let escudoActual = textField.value.substring(textField.selectionStart-1,textField.selectionStart+1);	

	return escudoActual == escudoValido ? true : false;
}


/**
 * Este metodo se dispara cuando se presiona el boton guardar formula e indica que el usuario esta listo para 
 * almacenar una premisa en el parrafo de premisas y una conclusion en el parrafo de conclusiones del html. 
 */
function guardarFormula()
{
	let fNueva = document.getElementById("textFormula").value;
	let antigua =  document.getElementById("formulasValidas").innerHTML;
	if(fNueva!="")
	{
		if(document.getElementById("cbConclusion").checked)
		{
			document.getElementById("conclusion").innerHTML = fNueva;
		}
		else
		{
			if(antigua!="")
			{
				document.getElementById("formulasValidas").innerHTML = antigua+'<br>'+fNueva;
			}
			else
			{
				document.getElementById("formulasValidas").innerHTML = fNueva;
			}
		
		}

		document.getElementById("textFormula").value = "";
	}
	else{
		alert("Por favor ingrese una formula correcta.");
	}
	
}

/**
 * Este metodo es para el correcto funcionamiento de las TABS
 * @param {*} evt 
 * @param {*} cityName 
 */
function openCity(evt, cityName) {
	// Declare all variables

	let i, tabcontent, tablinks;

  
	// Get all elements with class="tabcontent" and hide them
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
	  tabcontent[i].style.display = "none";
	}
  
	// Get all elements with class="tablinks" and remove the class "active"
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
	  tablinks[i].className = tablinks[i].className.replace(" active", "");
	}
  
	// Show the current tab, and add an "active" class to the button that opened the tab
	document.getElementById(cityName).style.display = "block";
	evt.currentTarget.className += " active";
  }

 /**
  * Metodo simple que grafica el arbol en el html.
  * @param {*} arbol 
  */ 
  function mostrarArbol(arbol)
  {
	arbolView = new ArbolView(arbol, 80);
	arbolView.show();
  }

  /**
  *	Metodo para operar dos atomos con la operacion AND
  */
  function operarAtomosAnd(atomo1, atomo2){

  	if(atomo1 == atomo2 && atomo1 == 1){
  		return 1;
  	}else{
  		return 0;
  	}

  }

  /**
  *	Metodo para operar dos atomos con la operacion OR
  */
  function operarAtomosOr(atomo1, atomo2){

  	if(atomo1 == atomo2 && atomo1 == 0){
  		return 0;
  	}else{
  		return 1;
  	}

  }

  /**
  *	Metodo para operar dos atomos con la operacion CONDICIONAL
  */
  function operarAtomoCond(atomo1, atomo2){

  	if(atomo1 == 1 && atomo2 == 0){
  		return 0;
  	}else{
  		return 1;
  	}

  }

  /**
  *	Metodo para operar dos atomos con la operacion BICONDICIONAL
  */
  function operarAtomosBicon(atomo1, atomo2){

  	if(atomo1 == atomo2){
  		return 1;
  	}else{
  		return 0;
  	}

  }

/**
  *	Metodo para operar dos arreglos de unos (valor de verdad) y ceros (valor de falsedad)
  */
function operacionBinaria(arreglo1, arreglo2, operador){

	if(arreglo1.length != arreglo2.length){
  		throw new Error("Error al operar dos funciones");
  	}

	arregloSalida = new Array(arreglo1.length);

	arreglo1.forEach(function(elemento, indice){
		switch(operador){
			case TipoOperador.AND : arregloSalida[indice] = (operarAtomosAnd(elemento, arreglo2[indice]));
			break;

			case TipoOperador.OR : arregloSalida[indice] = (operarAtomosOr(elemento, arreglo2[indice]));
			break;

			case TipoOperador.COND : arregloSalida[indice] = (operarAtomoCond(elemento, arreglo2[indice]));
			break;

			case TipoOperador.BICOND : arregloSalida[indice] = (operarAtomosBicon(elemento, arreglo2[indice]));
			break;
		}
	});

	return arregloSalida;
}

/**
  *	Metodo obtener la negacion de un arreglo de unos (valor de verdad) y ceros (valor de falsedad) 
  */
function operacionUnaria(arreglo){

	let arregloSalida = new Array(arreglo.length);

	arreglo.forEach(function(elemento, indice){
		if(elemento == 1){
			arregloSalida.push(0);
		}else{
			arregloSalida.push(1);
		}
	});

	return arregloSalida;
}


/**
 * Este metodo encuentra la posicion del operador principal dada una subformula.
 * @param {*} formula 
 */
function posicionRaiz(formula){

	let posicion = 0;
	for(let i=0; i<formula.length; i++){

		if(formula[i] == '('){
			posicion++;
		}else if(formula[i] == ')'){
			posicion--;
		}else if(formula[0] == TipoOperadorString.NOT){
			return 0;
		}

		if(posicion == 0){
			return i+1;
		}
	}

	return 0;
}

/**
 * Este metodo ejecuta el algoritmo de descomposicion dada una formula.
 * Como parametros se le manda una formula con exceso de parentesis y un nodo nulo para empezar a adherirle mas 
 * nodos.
 * 
 * @param {*} nodo 
 * @param {*} formula 
 */
function ejecutarAlgoritmoDescomposicion(nodo, formula){

	if(formula.length > 1){		
		let nodoAux = null;
		let posRaiz = posicionRaiz(formula);

		if(posRaiz == 0){
			nodoAux = new Nodo(formula.substring(2, formula.length-1));
			nodo.setIzquierdo(nodoAux);
			ejecutarAlgoritmoDescomposicion(nodo.getIzquierdo(), nodoAux.getElemento());

			nodo.setElemento(formula[posRaiz]);
		}else{
			nodoAux = new Nodo(formula.substring(1, posRaiz-1));
			nodo.setIzquierdo(nodoAux);
			ejecutarAlgoritmoDescomposicion(nodo.getIzquierdo(), nodoAux.getElemento());

			nodoAux = new Nodo(formula.substring(posRaiz+2, formula.length-1));
			nodo.setDerecho(nodoAux);
			ejecutarAlgoritmoDescomposicion(nodo.getDerecho(), nodoAux.getElemento());

			nodo.setElemento(formula[posRaiz]);
		}	
	}
}



/**
 * Metodo en construccion que va a apilar lo que hay en el arbol
 * @param {*} matriz Matriz que contiene las combinaciones de 1 y 0 de todas las formas atomicas que hay en la fbf 
 * @param {String} formulaPostOrden 
 */
function apilarYOperar(matriz, formulaPostOrden)
{
	arreglo1 = null;
	arreglo2 = null;
	arregloAuxiliar = null;
	
	//Este for va a recorrer la formula postorden, agrega sus elementos uno por uno en una fila
	for(let i = 0 ; i < formulaPostOrden.length ; i++)
	{	
		pila.push(formulaPostOrden[i]);
		
		//Si el tamaño de la fila es de 3, primero buscará los arreglos de unos y ceros de las formas atomicas y posteriormente operará
		if(pila.length == 3 && pila[2] != TipoOperadorString.NOT)
		{	
			operador = pila[2]; //Toma el ultimo elemento ingresado a la pila (debe ser un operador)
			
			
			if(buscarArregloEnMatriz(matriz,pila[0]) != null)
				arreglo1 = buscarArregloEnMatriz(matriz,pila[0]);//El id es la letra 0 de la pila

			
			arreglo2 = buscarArregloEnMatriz(matriz,pila[1]);//El id es la letra 1 de la pila
			
			//Captura el arreglo resusltante de la operacion binaria
			arreglo1 = operacionBinaria(arreglo1,arreglo2,operador); 
			//Se lo asigna a la primer posicion de la fila para que en la siguiente iteracion
			
			pila.pop();				//Vacio la pila
			pila.pop();				//Vacio la pila
			pila.pop();				//Vacio la pila

			pila.push(arreglo1);	//Pongo la nueva posicion en la pila

		}

		if(pila.length == 3 && pila[2] == TipoOperadorString.NOT)
		{	

			operador = pila[2];
			arreglo2 = buscarArregloEnMatriz(matriz,pila[1]); //Tiene que ser a2 porque el a1 ya tiene la informacion del arreglo anterior que no se puede perder
			arreglo2 = operacionUnaria(arreglo2);

		}

		if(pila[1] == TipoOperadorString.NOT)
		{
			
		}
	}
}

/**
 * Este metodo busca en la matriz de unos y ceros si hay algun arreglo que tenga el 
 * identificacdor deseado.
 * Busca el arreglo de unos y ceros de una forma atomica indicada.
 * @param {*} matriz 
 * @param {*} identificador 
 */
function buscarArregloEnMatriz(matriz,identificador)
{
	arreglo = null;
	//El deber de este for es encontrar el arreglo de 1 o 0 de cada forma atomica
	//Va a buscar mientras no se haya recorrido toda la primera fila de la matriz y 
	// mientras alguno de los dos arreglos continue siendo nulo.
	for(let i = 0 ; i < matriz.length && arreglo == null ; i++) 
	{
		if(matriz[0][i] == identificador) // Busca(en la matriz) el arreglo identificado con el caracter del atomo 
		{
			arreglo = matriz[i];
		}
		
	}

	if(arreglo == null)
	{
		console.log("La letra "+identificador+" no se encuentra en la matriz");
	}
	return arreglo;		

}

/**
 * Metodo que me dice si un operador es de tipo binario o no
 * @param {String} operador 
 */
function isOperadorBinario(operador)
{
	if(operador == TipoOperadorString.OR || operador == TipoOperadorString.AND || operador == TipoOperadorString.COND || operador == TipoOperadorString.BICOND)
	{
		return true;
	}
	return false;
}