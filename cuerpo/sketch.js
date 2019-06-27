/**
 * Matriz que me guarda los valores de verdad de las formas atomicas encontradas
 */
var matrizValoresFormasAtomicas;

/**
 * Matriz que me guarda los valores de verdad del conjunto de subformulas del argumento
 */
var tablaValores;

/**
 * Contador para determinar que columna de la matriz de tablaValores va a utilizarse
 */
var contCol;


/**
 * Metodo de inicializacion
 */
function setup() {
	traducirAlertas('Espaniol');
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

/**
 * Ejecuta la aplicacion
 */
function desplegarAplicacion()
{
	//Parte las presmisas y la conclusion y concatenarlas con AND usando el colorario
	strFormulaCorolario = splitPremisas();	
	//Ejecuta el algoritmo de descomposicion
	if(strFormulaCorolario != null)
	{
		arbol = construirArbol(strFormulaCorolario);
		//muestra el arbol
		mostrarArbol(arbol);
		//Escribe la fomula en postorden
		let formulaPostOrden = arbol.postorden(arbol.getRaiz());
		//Obtiene los atomos de la formula
		formasAtomicas = obtenerFormasAtomicas(formulaPostOrden);
		//Crear matriz de valores de verdad de los atomoss
		crearMatrizValoresFormasAtomicas(formasAtomicas);
		//Genera la tabla de verdad de las subformulas
		generarTablaVerdad(formulaPostOrden);
		//Opera la formula en posorden
		let finalResult = apilarYOperar(formulaPostOrden);
		//Valida el argumento
		let res = validarArgumento(finalResult);
		if(res)
		{
			document.getElementById("argumentoValido").innerHTML = argumentoValido;
		}
		else
		{
			document.getElementById("argumentoValido").innerHTML = argumentoInvalido;
		}
		//Genera la tabla grafica de los valores de verdad de las subformulas
		generarTablaGrafica(tablaValores);
		document.getElementById("btnValidar").disabled = true;
	}
}

/**
 * Metodo para crear la tablaValores de acuerdo al numero de subformulas
 * @param {String} formulaPostOrden 
 */
function generarTablaVerdad(formulaPostOrden)
{
	//Cuenta el numero de operadores en la formula
	let nOperadores = contarNumeroOperadores(formulaPostOrden);
	let filas = matrizValoresFormasAtomicas.length;
	
	let columnas = nOperadores + matrizValoresFormasAtomicas[0].length;
	tablaValores = new Array(filas);
	//Define el numero de filas y columnas de la tabla de verdad de acuerdo al numero de operadores y formas atomicas
	for(let i = 0; i < filas; i++)
	{
		tablaValores[i] = new Array(columnas)
		for(let j = 0; j < columnas; j++)
		{
			tablaValores[i][j] = 0;
		}
	}
	

	//Llena las primeras columnas de la tabla de valores con las formas atomicas de la formula
	let flag = true;
	contCol = 0;
	for(let j = 0; j < columnas && flag; j++)
	{
		for(let i = 0; i < filas && flag; i++)
		{
			if(contCol < matrizValoresFormasAtomicas[0].length)
			{
				tablaValores[i][j] = matrizValoresFormasAtomicas[i][j];
			}
			else{
				flag = false;
			}
		}
		contCol++;
	}

	contCol--;
}

/**
 * Metodo para particionar las premisas en arreglos
 * Concatena las premisas por medio de AND y la negacion de la conclusion usando el colorario de consecuencia logica
 */
function splitPremisas()
{
	strPremisas = document.getElementById("formulasValidas").innerHTML;
	strConclusion = document.getElementById("conclusion").innerHTML;
	arregloFormulas = strPremisas.split("<br>");
	let strFormulaCorolario;
	
	if(arregloFormulas.length >= 2 && strConclusion != "") //Si hay minimo dos premisas y una conclusion
	{

		arregloFormulas.push(TipoOperadorString.NOT+"("+strConclusion+")");
		strFormulaCorolario = "";

		strFormulaCorolario = construirFormulaPremisas(arregloFormulas,"",0);
		construirArbol(strFormulaCorolario);
		
	}
	else
	{
		alert(alerta1)
	}

	return strFormulaCorolario;
}

/**
 * Este metodo verifica que la formula no tenga subcadenas tipo : "pp", "pppp",...etc
 * Si las tiene, pues arroja un error.
 * @param {*} strFormula 
 */
function validarFormasAtomicas(strFormula)
{	
	chActual = null;
	chSiguiente = null;

	for(let i = 0 ; i < strFormula.length ; i++)
	{
		chActual = strFormula.charCodeAt(i);
		chSiguiente = strFormula.charCodeAt(i+1);

		if(chActual > 96 && chActual < 123 && chSiguiente > 96 && chSiguiente < 123 )
		{

			alert(alerta2);
			return false;
		}

		if(chActual == 41 && chSiguiente > 96 && chSiguiente < 123 )
		{

			alert(alerta2);
			return false;
		}

		if(chActual > 96 && chActual < 123 && chSiguiente == 40 )
		{
			alert(alerta2);
			return false;
		}

		if(chActual == 40 && chSiguiente == 41)
		{
			alert(alerta2+strFormula+alerta3);
			return false;
		}	
	}

	return true;

	
	
}


/**
 * Este metodo permite determinar la validez de un argumento por medio de un arrego de 1 y 0.
 * Todo en 0 significa que el argumento es valido 
 * Con un solo 1 el argumento ya no es valido.
 * @param {*} arregloFormulaPostOrden 
 */
function validarArgumento(arregloFormulaPostOrden)
{
	for(let i = 0; i < arregloFormulaPostOrden.length; i++)
	{
		if(arregloFormulaPostOrden[i] == 1)
		{
			return false;
		}
	}
	return true;
}


/**
 * Este metodo recibe la formula de solo premisas y hace parejas de subformulas (las proteje con parentesis), ya que
 * el metodo ejecutarAlgoritmoDescomposicion solo opera de a dos subformulas por vez.
 * @param {*} formula 
 */
function construirFormulaPremisas(arregloPremisas, solucion, i)
{
	if(i == arregloPremisas.length)
	{
		return solucion;
	}
	else
	{
		if(i == 0)
		{
			solucion = "("+arregloPremisas[i]+")"+TipoOperadorString.AND+"("+arregloPremisas[i+1]+")";
			i+=2;
			return construirFormulaPremisas(arregloPremisas,solucion,i);
		}
		else{

			solucion = "("+solucion+")"+TipoOperadorString.AND+"("+arregloPremisas[i]+")";
			i++;
			return construirFormulaPremisas(arregloPremisas,solucion,i);

		}
	}


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
	return arbol;
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
		alert(alerta4);
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
	if(fNueva!="" && validarFormasAtomicas(fNueva) )
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
		alert(alerta3);
		document.getElementById("textFormula").value = "";
	}
	
}

/**
 * Este metodo es para el correcto funcionamiento de las TABS
 * @param {*} evt 
 * @param {*} cityName 
 */
function abrirManual(evt, cityName) {
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
	arbolView = new ArbolView(arbol);
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
function operacionBinaria(arreglo1, arreglo2, operador, title){

	if(arreglo1.length != arreglo2.length){
  		throw new Error("Error al operar dos funciones");
  	}

	arregloSalida = new Array();
	arregloSalida.push(title);
	for(let i = 1; i < arreglo1.length; i++)
	{
		switch(operador)
		{
			case TipoOperadorString.AND : arregloSalida.push(operarAtomosAnd(arreglo1[i], arreglo2[i]));
			break;

			case TipoOperadorString.OR : arregloSalida.push(operarAtomosOr(arreglo1[i], arreglo2[i]));
			break;

			case TipoOperadorString.COND : arregloSalida.push(operarAtomoCond(arreglo1[i], arreglo2[i]));
			break;

			case TipoOperadorString.BICOND : arregloSalida.push(operarAtomosBicon(arreglo1[i], arreglo2[i]));
			break;
		}
	}

	return arregloSalida;
}

/**
  *	Metodo obtener la negacion de un arreglo de unos (valor de verdad) y ceros (valor de falsedad) 
  */
function operacionUnaria(arreglo, title){

	let arregloSalida = new Array();
	arregloSalida.push(title);

	for(let i = 1; i< arreglo.length; i++)
	{
		let elemento = arreglo[i];
		if(elemento == 1){
			arregloSalida.push(0);
		}else{
			arregloSalida.push(1);
		}
	}

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
			nodoAux = new Nodo(formula.substring(2, formula.length-1), nodo);
			if(nodo.esNodoDerecho()){
				nodo.setDerecho(nodoAux);
			}else{
				nodo.setIzquierdo(nodoAux);
			}			
			ejecutarAlgoritmoDescomposicion(nodoAux, nodoAux.getElemento());
		}else{
			nodoAux = new Nodo(formula.substring(1, posRaiz-1), nodo);
			nodo.setIzquierdo(nodoAux);
			ejecutarAlgoritmoDescomposicion(nodoAux, nodoAux.getElemento());

			nodoAux = new Nodo(formula.substring(posRaiz+2, formula.length-1), nodo);
			nodo.setDerecho(nodoAux);
			ejecutarAlgoritmoDescomposicion(nodoAux, nodoAux.getElemento());			
		}

		nodo.setElemento(formula[posRaiz]);				
	}

}



/**
 * Metodo en construccion que va a apilar lo que hay en el arbol
 * @param {String} formulaPostOrden 
 */
function apilarYOperar(formulaPostOrden)
{
	arreglo1 = null;
	arreglo2 = null;
	let pila = new Array();
	
	//Este for va a recorrer la formula postorden, agrega sus elementos uno por uno en una fila
	for(let i = 0 ; i < formulaPostOrden.length ; i++)
	{	
		let elementoActual = formulaPostOrden[i];
		if(isOperador(elementoActual))
		{
			let atomo1 = pila.pop();
			let arregloResult;
			let title;
			if(isOperadorBinario(elementoActual))
			{
				let atomo2 = pila.pop();
				title = "(" + atomo2[0] + elementoActual + atomo1[0] + ")";
				arregloResult = operacionBinaria(atomo2, atomo1, elementoActual, title);
			}
			else
			{
				title = elementoActual + "(" + atomo1[0] + ")";
				arregloResult = operacionUnaria(atomo1, title);
			}
			agregarALaTabla(arregloResult);
			pila.push(arregloResult);
		}
		else
		{
			let valorVerdad = buscarArregloEnMatriz(elementoActual);
			pila.push(valorVerdad);
		}
	}
	return pila.pop();
}

/**

 * Este metodo busca en la matriz de unos y ceros si hay algun arreglo que tenga el 
 * identificacdor deseado.
 * Busca el arreglo de unos y ceros de una forma atomica indicada.
 * @param {*} matriz 
 * @param {*} identificador 
 */
function buscarArregloEnMatriz(identificador)
{
	arreglo = null;
	//El deber de este for es encontrar el arreglo de 1 o 0 de cada forma atomica
	//Va a buscar mientras no se haya recorrido toda la primera fila de la matriz y 
	// mientras alguno de los dos arreglos continue siendo nulo.
	let msj = "";
	for(let i = 0; i < matrizValoresFormasAtomicas.length; i++)
	{
		for(let j = 0; j < matrizValoresFormasAtomicas[0].length; j++)
		{
			msj += matrizValoresFormasAtomicas[i][j] + " ";
		}
		msj += "\n";
	}
	for(let i = 0 ; i < matrizValoresFormasAtomicas[0].length && arreglo == null ; i++) 
	{
		if(matrizValoresFormasAtomicas[0][i] == identificador) // Busca(en la matriz) el arreglo identificado con el caracter del atomo 
		{
			arreglo = new Array();
			for(let j = 0; j < matrizValoresFormasAtomicas.length; j++)
			{
				arreglo[j] = matrizValoresFormasAtomicas[j][i];
			}
		}
		
	}
	return arreglo;		

}

/**
 * Veridfica si hay un atomo repetido en el arreglo 
 */
function verificarAtomoRepetido(arregloFormas, atomo){

	var flag = false;

	arregloFormas.forEach(function(elemento){
		if(elemento === atomo){
			flag = true;
 		}
	});
	
	return flag;
}
/**
 * Metodo para crear una lista de atomos que esten en la cadena(formula en LP)
 * @arregloFormas el arreglo de atomos
 * @atomo el atomo a verificar en el arreglo
 */
function obtenerFormasAtomicas(formula){

	let arregloFormas = new Array();
	let posicionActual = 0;

	for (let i = 0; i < formula.length; i++) {
		
		if(formula.charCodeAt(i) >= 'a'.charCodeAt(0) && formula.charCodeAt(i) <= 'z'.charCodeAt(0)){

			if(verificarAtomoRepetido(arregloFormas, formula[i]) == false){
				arregloFormas[posicionActual] = formula[i];
				posicionActual++;				
			}
		}
	}

	return arregloFormas;
}
/**
 * 
 * Metodo que me dice si un operador es de tipo binario
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

/**
 * Metodo para definir si un elemento es un operador
 * @param {String} operador 
 */
function isOperador(operador)
{
	if(operador == TipoOperadorString.OR || operador == TipoOperadorString.AND || operador == TipoOperadorString.COND || operador == TipoOperadorString.BICOND || operador == TipoOperadorString.NOT)
	{
		return true;
	}
	return false;
}

/**
 * Genera la matriz con los valores de verdad dado las formas atomicas del argumento
 * @param {*} formasAtomicas 
 */
function crearMatrizValoresFormasAtomicas(formasAtomicas)
{
	let columnas = formasAtomicas.length;
	let nValoresVerdad = pow(2, formasAtomicas.length);
	let filas = nValoresVerdad + 1;
	matrizValoresFormasAtomicas = new Array(filas);
	for (i = 0; i < filas; i++) {
		matrizValoresFormasAtomicas[i] = new Array(columnas);
	}

	for(let i = 0; i < columnas; i++)
	{
		matrizValoresFormasAtomicas[0][i] = formasAtomicas[i];
	}

	let cont = 0;
	let valor = 1;
	nValoresVerdad = nValoresVerdad / 2;
	for(let j = 0; j < columnas; j++)
	{
		for(let i = 1; i < filas; i++)
		{
			if(cont < nValoresVerdad)
			{
				matrizValoresFormasAtomicas[i][j] = valor;
				cont++;
			}
			else
			{
				if(valor == 1)
				{
					valor = 0;
				}
				else
				{
					valor = 1;
				}
				matrizValoresFormasAtomicas[i][j] = valor;
				cont = 1;
			}
		}
		valor = 1;
		cont = 0;
		nValoresVerdad = nValoresVerdad / 2;
	}
}

/**
 * Metodo que genera una tabla que se muestre graficamente al usuario segun los valores de una matriz
 * @param {*} matriz 
 */
function generarTablaGrafica(matriz) {

	// Obtener la referencia del elemento body
	let body = document.getElementById("argumentoValido");
   
	// Crea un elemento <table> y un elemento <tbody>
	let tabla   = document.createElement("table");
	let tblBody = document.createElement("tbody");
   
	// Crea las celdas
	for (let i = 0; i < matriz.length; i++) {
	  // Crea las hileras de la tabla
	  let hilera = document.createElement("tr");
   
	  for (let j = 0; j < matriz[0].length; j++) {
		// Crea un elemento <td> y un nodo de texto, haz que el nodo de
		// texto sea el contenido de <td>, ubica el elemento <td> al final
		// de la hilera de la tabla
		let celda = document.createElement("td");
		let textoCelda = document.createTextNode(matriz[i][j]);
		celda.appendChild(textoCelda);
		hilera.appendChild(celda);
	  }
   
	  // agrega la hilera al final de la tabla (al final del elemento tblbody)
	  tblBody.appendChild(hilera);
	}
   
	// posiciona el <tbody> debajo del elemento <table>
	tabla.appendChild(tblBody);
	// appends <table> into <body>
	body.appendChild(tabla);
	
  }

  /**
   * Agregua un valor de verdad de una subformula
   */
  function agregarALaTabla(arreglo)
  {
	  for(let i = 0; i < arreglo.length; i++)
	  {
		  tablaValores[i][contCol] = arreglo[i];
	  }
	  contCol++;
  }

  /**
   * Metodo para contar el numero de operadores en la formula
   * @param {String} formulaPostOrden 
   */
  function contarNumeroOperadores(formulaPostOrden)
  {
	  let cont = 0;
	  for(let i = 0 ; i < formulaPostOrden.length; i++)
	  {
		  let elementoActual = formulaPostOrden[i]
		  if(isOperador(elementoActual))
		  {
			  cont++;
		  }
	  }

	  return cont;
  }
