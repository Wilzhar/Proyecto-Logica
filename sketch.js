function setup() {
  // put setup code here
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

function sumar()
{
	var a = parseInt(document.getElementById("numA").value, 10);
	var b = parseInt(document.getElementById("numB").value, 10);
	var res = a + b;
	document.getElementById('result').value = res;
}

function fijarEstructuraOperador(operador)
{
	//Primero verificar que la posicion donde se pretende insertar el operador, si es valida.
	txtField = document.getElementById("textFomula");
	
	if(verificarPosicionCursor(txtField) || txtField.value == "")
	{

		var msj = "";
		tipoOperador = TipoOperador.NOT;
		switch(operador)
		{
			case TipoOperador.NOT:
				msj = "\u00AC()";
				tipoOperador = TipoOperador.NOT;
				break;
			case TipoOperador.OR:
				tipoOperador = TipoOperador.OR;
				msj = "()V()";
				break;
			case TipoOperador.AND:
				tipoOperador = TipoOperador.AND;
				msj = "()\u0245()";
				break;
			case TipoOperador.COND:
				tipoOperador = TipoOperador.COND;
				msj = "()=>()";
				break;
			case TipoOperador.BICOND:
				tipoOperador = TipoOperador.BICOND;
				msj = "()<=>()"
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
	txtField = document.getElementById("textFomula");
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
	var valida = false;
	var escudoValido = "()";
	var escudoActual = textField.value.substring(textField.selectionStart-1,textField.selectionStart+1);	

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




function openCity(evt, cityName) {
	// Declare all variables
	var i, tabcontent, tablinks;
  
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






