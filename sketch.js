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
	txtField = document.getElementById("textFomula");
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
	selectText(txtField, txtField.selectionStart);

}

function selectText(txtField, inicio)
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
		selectText(txtField, buscarCampoVacio(txtField));
	}
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