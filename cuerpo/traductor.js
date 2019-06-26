/**
 * Guarda el mensaje traducido de la alerta1
 */
var alerta1 = "";

/**
 * Guarda el mensaje traducido de la alerta2
 */
var alerta2 = "";

/**
 * Guarda el mensaje traducido de la alerta3
 */
var alerta3 = "";

/**
 * Guarda el mensaje traducido de la alerta4
 */
var alerta4 = "";

/**
 * Guarda el mensaje tradcido para los argumentos valido
 */
var argumentoValido = "";

/**
 *  Guarda el mensaje traducido para los argumentos invalidos
 */
var argumentoInvalido = "";

/**
 * Metodo para traducir las alertas
 * @param {String} idioma 
 */
function traducirAlertas(idioma){
	if(idioma === 'Espaniol'){
		alerta1 = 'Deben haber minimo 2 premisas y una conclusion para construir un argumento.';
		alerta2 = 'La formula no es valida.';
		alerta3 = 'Por favor ingrese una formula correcta.';
		alerta4 = 'Posicion no valida, por favor seleccione otra';
		argumentoValido = 'El argumento es válido.';
		argumentoInvalido = 'El argumento no es valido';
	}else if(idioma === 'English'){
		alerta1 = 'There must be at least 2 premises and a conclusion to build an argument.';
		alerta2 = 'The formula is not valid.';
		alerta3 = 'Please enter a correct formula.';
		alerta4 = 'Position not valid, please select another.';
		argumentoValido = 'The argument is valid.';
		argumentoInvalido = 'The argument is invalid.';
	}
}

/*
 * Traduce la pagina pricipal a español recargando la pagina
 */
function cambiarIdiomaEspaniol() {
    location.reload(true);
}

/*
 * Traduce la pagina pricipal a ingles con una especie de properties en javascript
 */
function cambiarIdiomaEnglish() {

    traducirAlertas('English');

    document.getElementById('txtValidacionArgumentos').textContent = "ARGUMENT VALIDATION";
    document.getElementById('txtIngresoFormulas').textContent = "FORMULAS ENTRY";
    document.getElementById('txtFormulasValidadas').textContent = "VALIDATED FORMULAS"
    document.getElementById('btnGuardarFormula').value = "SAVE FORMULA";
    document.getElementById('btnValidar').value = "VALIDATE ARGUMENT";
    document.getElementById('chbConclusion').textContent = "Check this box if you want to enter the conclusion: ";
}
    
/*
 * Traduce la pagina del manual a español recargando la pagina
 */
function cambiarIdiomaEspaniolManual(){

  location.reload(true);

}

/*
 * Traduce la pagina del manual a ingles con una especie de properties en javascript
 */
function cambiarIdiomaEnglishManual(){

	traducirAlertas('English');

	document.getElementById('tabMarcoTeorico').textContent = "theoretical framework";
	document.getElementById('tabComoFunciona').textContent = "How it works?";
	document.getElementById('tabComoUsarlo').textContent = "How use it?";
	document.getElementById('tituloIntroduccion').textContent = "Introduction";
	document.getElementById('introduccion').textContent = 'The human being in his daily activities must communicate, this communication can'+
	             'be done in different ways, one of them is communication through a language the'+
	             'which can be constituted among others by interrogative phrases, imperatives and declarative phrases.'+
	             'Only through the latter is a description of knowledge possible. <br /> <br />'+
	             'Logic provides the necessary elements to represent knowledge through'+
	            'methods of formalization of declarative phrases. In this chapter the logic will be worked'+
	             'propositional from the simple declarative sentences (statements or propositions) that are the'+
	             'basic elements of transmission of human knowledge.';
	document.getElementById('tituloProposiciones').textContent = "Propositions";
	document.getElementById('x80').textContent = 'A mathematical proposition is a statement or expressions that have a certain meaning and that'+
	             'by a defined criterion'+
	             'it can be unequivocally classified as true or false. A proposition is a phrase or statement that'+
	             'can be evaluated with'+
	             'a value of true or false. In natural languages such as Spanish, German, English,'+
	             'among others, propositions can not be imperative or interrogative, they can only'+
	             'be declarative';
	document.getElementById('ejemplos').textContent = "Examples: ";
	document.getElementById('ejemplo1').textContent = 'According to the above, the following statements are propositions: <br />'+
	            '- Students go to the march. <br />'+
	            '- On Sundays he rests. <br />'+
	            '- The early bird gets the best. <br />'+
	            '- Java is a programming language. <br />'+
	            '- 5 is an odd number. <br />'+
	            '- 9 is a composite number. <br /> <br />'+
	            'There are some statements that are not propositions: <br />'+
	            '- Who am I? <br />'+
	            '- Hello friend! <br />'+
	            '- What time is it? <br /> <br />'+

	            'The propositions of traditional form are represented with lowercase letters of the alphabet'+
	            'p, q, r, s, t, ..., each of these letters can receive the name of atom. The form of representation'+
	            'It will be the following: <br />'+
	            '- p: statement or proposition. <br />'+
	            '- p: 2 × 3 = 6. <br />'+
	            '- q: 3x + 4z = 8. <br />'+
	            '- r: 7'+
	            ' 3. <br />'+
	            '- t: Egypt is located in Asia. <br />'+
	            '- u: The lionesses are not the champions. <br />'+
	            '- v: Java is an object-oriented programming language. <br />';
	document.getElementById('x1').textContent = "Denial of a Proposition";
	document.getElementById('x2').textContent = "";
	document.getElementById('x3').textContent = "Examples: ";
	document.getElementById('x4').textContent = 'Some examples of phrases in which the denial appears are the following: <br />'+
	           '- No p. <br />'+
	           '- Its false p. <br />'+
	           '- Not true p. <br /> <br />'+
	           'The symbol of negation (& not;) is a unary operator, initially we will apply it to atoms, but'+
	           'after'+
	           'It will show how to apply it to a compound expression. Next,'+
	           'show examples in which the denial of a proposition to atoms is applied.';
	document.getElementById('x5').textContent = "Truth value of the proposition";
	document.getElementById('x6').textContent = "Value of truth of the denial of the proposition";
	document.getElementById('x7').textContent = "v(q) = False";
	document.getElementById('x8').textContent = "v(¬q) = True";
	document.getElementById('x9').textContent = "v(¬p) = True";
	document.getElementById('x10').textContent = "v(p) = False";
	document.getElementById('x11').textContent = "v(s) = True";
	document.getElementById('x12').textContent = "v(¬s) = False";
	document.getElementById('x13').textContent = "Logical connectives";
	document.getElementById('x14').textContent = 'Compound propositions are joined by logical connectives, which are'+
	             'operators that allow to combine propositions to form others. Compound propositions have a lot'+
	             'ability of expression within logic. Below are shown'+
	             'the main logical connectives.';
	document.getElementById('x15').textContent = "NAME";
	document.getElementById('x16').textContent = "LOGICAL CONECTIVE";
	document.getElementById('x17').textContent = "SYMBOL";
	document.getElementById('x18').textContent = "conjunction";
	document.getElementById('x19').textContent = "and";
	document.getElementById('x20').textContent = "Disjunction";
	document.getElementById('x21').textContent = "Conditional";
	document.getElementById('x22').textContent = "yes... then";
	document.getElementById('x23').textContent = "Biconditional";
	document.getElementById('x24').textContent = "if and only if";
	document.getElementById('x25').textContent = "Arguments in logic";
	document.getElementById('x26').textContent = 'By an argument is meant a reasoning used to defend an idea (thesis or conclusion) or to'+
	             'to convince'+
	             'to others of the truth of a statement.';
	document.getElementById('x27').textContent = "Definition: ";
	document.getElementById('x28').textContent = 'It is a finite sequence of statements. The last statement is the conclusion (when you are in shape'+
	             'standard)'+
	             'while the others are premises of the argument.';
	document.getElementById('x29').textContent = "Example: ";
	document.getElementById('x30').textContent = 'Si pedro estudia logica, entonces pedro es capaz de argumentar.<br />'+
	            'Pedro estudia logica.<br />'+
	            '______________________________________________________________<br />'+
	            'Pedro es capaz de argumentar<br /><br />'+

	            'Traducido al lenguaje proposicional usando formas atomicas y los conectores lógicos:<br /><br />'+
	            'p : pedro estudia logica.<br />'+
	            'q : pedro es capaz de argumentar.<br /><br />'+
	            'Quedará de la siguiente manera<br /><br />'+
	            'p&#8594;q<br />'+
	            'p<br />'+
	            '______<br />'+
	            'q';
	document.getElementById('x31').textContent = "Truth tables";
	document.getElementById('x32').textContent = "Below are the truth tables of the logical connectives mentioned above.";
	document.getElementById('x33').textContent = "Notation of tables";
	document.getElementById('x34').textContent = 'In the following tables, 1 will be placed to refer to the truth value True (V) and 0 to '+
	             'refererirse to the truth value False (F)';
	document.getElementById('x35').textContent = "Negation";
	document.getElementById('x36').textContent = "Conjunction";
	document.getElementById('x37').textContent = "Disjunction";
	document.getElementById('x38').textContent = "Conditional";
	document.getElementById('x39').textContent = "Biconditional";
	document.getElementById('x40').textContent = "Classification of the formulas according to the result of their truth tables";
	document.getElementById('x41').textContent = "Tautology";
	document.getElementById('x42').textContent = 'It is a composite proposition whose truth table is always true (V or 1),'+
	'independently of the values of the truth of the simple propositions that make up.';
	document.getElementById('x43').textContent = "Example: ";
	document.getElementById('x44').textContent = "Contradiction";
	document.getElementById('x45').textContent = 'A proposition whose truth table is all false (F or 0), regardless of the values'+
	             'of truth of the simple propositions that compose it.';
	document.getElementById('x46').textContent = "Example: ";
	document.getElementById('x47').textContent = "Indetermination";
	document.getElementById('x48').textContent = "It is a composite proposition whose truth table always has falsehood (F or 0) and truth (V or 1)";
	document.getElementById('x49').textContent = "Example: ";
	document.getElementById('x50').textContent = "Satisfaction and logical consequence";
	document.getElementById('x51').textContent = "Interpretation";
	document.getElementById('x52').textContent = 'It is an assignment of truth values of the atoms (variables) of a molecule & alpha; (it is a line of the'+
	             'truth table, it is denoted I)';
	document.getElementById('x53').textContent = "Model";
	document.getElementById('x54').textContent = 'An I & alpha Interpretation; its a model if it meets <br />'+
	             'VI (& alpha;) = 1';
	document.getElementById('x55').textContent = "Satisfactory";
	document.getElementById('x56').textContent = 'A formula & alpha; It is satisfying there is an interpretation I such that: <br />'+
	             'VI (& alpha;) = 1';
	document.getElementById('x57').textContent = "Logical consequence";
	document.getElementById('x58').textContent = 'A formula B is the logical consequence of a set A = {A1, A2, A3, ..., An} if any interpretation that'+
	             'satisfy A also satisfies B <br />'+
	             'The logical consequence is denoted (A | = B) and is related to the validity of an argument being B the'+
	             'conclusion and A set of premises.';
	document.getElementById('x59').textContent = 'The above definition is to find the validity of an argument using the definition of consequence'+
	             'logic <br />'+
	             'But there are other results that allow to show logical consequence different from the definition';
	document.getElementById('x60').textContent = "Logical consequence theorem 1 (TCL1)";
	document.getElementById('x61').textContent = "Let A = {A1, A2, A3, ..., An} a set of premises, and B the conclusion. <br />+"
	             "If A | = B then (A1 & # 94; A2 & # 94; A3 & # 94; ... & # 94; An) & # 8594; B is a Tautology.";
	document.getElementById('x62').textContent = "Logical consequence theorem 2 (TCL2)";
	document.getElementById('x63').textContent = "Let A = {A1, A2, A3, ..., An} a set of premises, and B the conclusion. <br />"+
	             "A | = B if and only if A U {& not; B} is unsatisfiable.";
	document.getElementById('x64').textContent = "Corollary of logical consequence";
	document.getElementById('x65').textContent = "Let A = {A1, A2, A3, ..., An} a set of premises, and B the conclusion. <br />"+
	             "A | = B if and only if (A1 ^ A2 ^ A3 ^ ... ^ An ^ & not; B) is unsatisfiable.";
	document.getElementById('x66').textContent = "Excess parenthesis";
	document.getElementById('x67').textContent = "In order to apply algorithms and logical operations in the arguments, they must have excess of"+
	             "parenthesis. <br />"+
	             "the excesses of parentheses are not necessary to make propositional logic exercises, just enough"+
	             "with a couple of parentheses to make clear"+
	             "the precedence of the operators. <br />"+
	             "But having a formula with excess parentheses, are key to be able to apply the algorithm of"+
	             "decomposition for the creation of the tree. <br />"+
	             "The following shows how the formulas look by applying excess parenthesis.";
	document.getElementById('x68').textContent = "Form with the necessary parentheses";
	document.getElementById('x69').textContent = "Formula with excessive parentheses";
	document.getElementById('x70').textContent = "Decomposition algorithm";
	document.getElementById('x71').textContent = "This algorithm is used for the creation of a tree that shows the precedence of operators to operate the formula. <br/> "+
	             "It consists in going decomposing the formula looking for the main operators, and at the same time adding them to a tree. <br/>" +
	             "The decomposition algorithm is used on a formula with excess parenthesis.";
	document.getElementById('x72').textContent = "Example: ";
	document.getElementById('x73').textContent = "(((p) → (q)) Ʌ (p)) Ʌ (¬ (q)) <br/>"+
	             "The tree for the previous formula after applying the decomposing algorithm is shown below.";
	document.getElementById('x74').textContent = "Formula in postfix notation";
	document.getElementById('x75').textContent = "Postfix notation is used to operate the formula more easily <br/>"+
	           "In order to write the formula in this notation, you must go through the tree in the following way: <br/>"+
	             "- Cross the left sub-tree. <br/>"+
	             "- Cross the right sub-tree. <br/>"+
	             "- Visit the root. <br/>";
	document.getElementById('x76').textContent = "Example: ";
	document.getElementById('x77').textContent = "Given the previous tree traversing it in postorden, the formula in postfix notation would be the following: <br/>"+
	                "- \"pq → p ^ q & not; p ^\" <br/> <br/>";
	document.getElementById('x78').textContent = "Determining the validity of the arguments";
	document.getElementById('x79').textContent = "To determine if an argument is valid, the logical consequence Colorarium was used (see theoretical framework)";
	//El x80 esta arriba
	document.getElementById('x81').textContent = "In this section, we will do a step by step for the input of arguments for validation. <br/>"+
	             "For this we will use the following argument as an example: <br/>"+
	             "p & # 8594; q <br/>"+
	             "r & # 8594; s <br/>"+
	             "pvr <br/>"+
	             "____________ <br/>"+
	             "qvs <br/> <br/>"+
	             "1) We position ourselves in the formula entry field and proceed to write the formula"+
	             "starting with the main operator through the buttons, depending on the operator needed. <br/>"*
	             "If we want to add more operators we just have to position ourselves between a pair of empty parentheses and continue with the entry of the formula.";
	document.getElementById('x82').textContent = "2) Once we have finished putting all the operators, we position ourselves inside a pair of empty parentheses and place"+
	             "the atomic form or proposional letter that we need";
	document.getElementById('x83').textContent = "3) At the end of entering one of the premises press the validate argument button, and if everything goes well it will appear in the part of validated formulas. <br/>"+
	             "We repeat these steps until we finish entering our premises.";
	document.getElementById('x84').textContent = "4) When we are going to enter the conclusion, we follow steps 1 and 2, but this time before going to step 3 we select the box to indicate that this will be the conclusion";
	document.getElementById('x85').textContent = "Finally, we press the validate argument button";
	document.getElementById('x86').textContent = "Once this is done, a message will appear informing us if the argument is valid or invalid with its respective procedure";

}