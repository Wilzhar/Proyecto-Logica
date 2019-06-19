function setup() {
  // put setup code here

  let x1 = [1, 1, 0, 1, 0, 0, 1];
  let x2 = [1, 0, 0, 0, 1, 1, 1, 1];

  //var x = operacionBinaria(x1, x2, TipoOperador.BICOND);
  let y = operacionUnaria(x2);

  let arbol = new ArbolBinario();
  arbol.setRaiz(new Nodo('', null));

  algoritmoDescomposicion(arbol.getRaiz(), '((p)'+TipoOperadorString.COND+'(q))'+TipoOperadorString.AND+'(r)');

  console.log(arbol.getRaiz().getElemento())
}

function draw() {
	// put drawing code here
}

const TipoOperador = {
	NOT: 0,
	OR: 1,
	AND: 2,
	COND: 3,
	BICOND: 4,
};

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

function inicializarArgumento()
{
	
	 strArgumento = document.getElementById("formulasValidas").innerHTML;
	 arregloFormulas = strArgumento.split("<br>");
	console.log(arregloFormulas);
}

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
function posicionarCursor(txtField, inicio)
{
	txtField.setSelectionRange(inicio, inicio);
	txtField.focus();
}

function keyPressed()
{
	txtFieldV = document.getElementById("textFormula");
	if(keyCode === UP_ARROW)
	{
		posicionarCursor(txtField, buscarCampoVacio(txtField));
	}
}

function verificarPosicionCursor(textField)
{	
	let valida = false;
	let escudoValido = "()";
	let escudoActual = textField.value.substring(textField.selectionStart-1,textField.selectionStart+1);	

	return escudoActual == escudoValido ? true : false;
}

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
			document.getElementById("formulasValidas").innerHTML = antigua+'<br>'+fNueva;
		
		}
	}
	else{
		alert("Por favor ingrese una formula correcta.");
	}
	
}
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
  function definirNumeroCamposProposicionlales()
  {
	  comboBoxNForms = document.getElementById("comboBoxNForms");
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

	var arregloSalida = new Array(arreglo1.length);

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

function posicionRaiz(formula){

	let posicion = 0;
	for(let i=0; i<formula.length; i++){
	
		//console.log(formula[i]);

		if(formula[i] == '('){
			console.log('sumo');
			posicion++;
		}else if(formula[i] == ')'){
			console.log('resto');
			posicion--;
		}

		if(posicion == 0){
			return i+1;
		}
	}

	return 0;
}

function algoritmoDescomposicion(nodo, formula){

	if(formula.length > 1){
		let nodoAux;
		let posRaiz = posicionRaiz(formula);

		nodoAux = new Nodo(formula.substring(1, posRaiz-1));
		nodo.setIzquierdo(nodoAux);
		algoritmoDescomposicion(nodo.getIzquierdo(), nodoAux.getElemento());

		nodoAux = new Nodo(formula.substring(posRaiz+2, formula.length-1));
		nodo.setDerecho(nodoAux);
		algoritmoDescomposicion(nodo.getDerecho, nodoAux.getElemento());

		nodo.setElemento(formula[posRaiz]);
	}

}
