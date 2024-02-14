/*
 * Simulación yteoria de la decisión
 *
 * 2020
 *
 * Docente Juan Sebastián Valencia Arias.
 * 
 * Jose Gabriel Cortazar Ocampo
 * Juan Camilo Perez
 *
 */


/*
 *Función encargada de revisar que el dato que entra como parámetro sea un número positivo 
 *
 */
function formato(dato) {
    var num = dato.value;
    if (validar(dato)) {
        dato.value = num;
    } else {
        alert("Solo se permiten números enteros positivos"); //Solo se permiten numeros enteros positivos
        dato.value = ""; //Limpia el campo de texto
    }

}


function formatoConfianza(dato) {
    var num = dato.value;
    var verificacion = /^\d*$/;
    if (verificacion.test(num)) {
        if (num > 0 && num < 100) {
            dato.value = num;
        } else {
           alert("Solo se permiten números mayores a 0 y  menores a 100"); //Solo se permiten numeros enteros positivos
            dato.value = ""; //Limpia el campo de texto
        }

    } else {
        alert("Solo se permiten números mayores a 0 y  menores a 100"); //Solo se permiten numeros enteros positivos
        dato.value = ""; //Limpia el campo de texto
    }

}

function validar(dato) {
    var num = dato.value;
    var verificacion = /^\d*$/;

    if (verificacion.test(num)) {
        if (num > 0) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

function enviarValores() {
    var elmSem = document.getElementById("semilla");
    var elmConstAdi = document.getElementById("constAditiva");
    var elmConstMult = document.getElementById("constMultiplicativa");
    var elmMod = document.getElementById("modulo");
    var elmCant = document.getElementById("cantidadN");
    var elmConfianza =document.getElementsByName("nConfianza");

    var semilla = new Number(elmSem.value);
    var constAditiva = new Number(elmConstAdi.value);
    var constMultiplicativa = new Number(elmConstMult.value);
    var modulo = new Number(elmMod.value);
    var cantidadN = new Number(elmCant.value);

    var confianza;

    if (elmConfianza[0].checked) {
        confianza = new Number(0.1);
    }else if (elmConfianza[1].checked) {
        confianza = new Number(0.05);
    }else if (elmConfianza[2].checked) {
        confianza = new Number(0.025);
    }else if (elmConfianza[3].checked) {
        confianza = new Number(0.001);
    }
    
    
    console.log("nivel");
    console.log(confianza);


    if (!(semilla == "" || constAditiva == "" || constMultiplicativa == "" || modulo == "" || cantidadN == "" || confianza == "")) {

        elmSem = document.getElementById("txtSemilla");
        elmConstAdi = document.getElementById("txtConstAditiva");
        elmConstMult = document.getElementById("txtConstMultiplicativa");
        elmMod = document.getElementById("txtModulo");
        elmCant = document.getElementById("txtCantidadN");
        elmConfianza = document.getElementById("txtConfianza");

        elmSem.innerHTML = semilla;
        elmConstAdi.innerHTML = constAditiva;
        elmConstMult.innerHTML = constMultiplicativa;
        elmMod.innerHTML = modulo;
        elmCant.innerHTML = cantidadN;
        elmConfianza.innerHTML = confianza;

        calcularNumeros(semilla, constAditiva, constMultiplicativa, modulo, cantidadN, confianza);

        var elmMostrarDatos = document.getElementById("mostrarDatos");
        if (elmMostrarDatos.style.display === "none") {
            elmMostrarDatos.style.display = "block";
        }

    } else {
        alert("Por favor ingrese los datos necesarios.");
    }

}

function calcularNumeros(semilla, constAditiva, constMultiplicativa, modulo, cantidadN, confianza) {

    var nSemilla = (constAditiva + constMultiplicativa * semilla) % (modulo);

    var numeros = new Array();


    for (var i = 0; revisarPeriodo(numeros, nSemilla); i++) {
        var tmp = (constAditiva + constMultiplicativa * nSemilla) % (modulo);
        if(typeof tmp === 'number'){
            numeros[i] = nSemilla;
            nSemilla = tmp;    
        }

    }

    mostrarCantidadSolicitada(cantidadN, numeros, modulo, confianza);

    var elmPeriodo = document.getElementById("txtPeriodo");
    elmPeriodo.innerHTML = numeros.length;

   // var elmArearNum = document.getElementById("areaNumeros");
   // elmArearNum.innerHTML = numeros;

    var elFormularioDatos = document.getElementById("formDatos");
    if (elFormularioDatos.style.display === "block") {
        elFormularioDatos.style.display = "none";
    }

}

function revisarPeriodo(numeros, nSemilla) {

    for (var i = 0; i < numeros.length; i++) {
        if (numeros[i] == nSemilla) {
            return false;
        }
    }

    return true;
}


function restablecerValores() {
    var elFormularioDatos = document.getElementById("formDatos");
    if (elFormularioDatos.style.display === "none") {
        elFormularioDatos.style.display = "block";

        elmSem = document.getElementById("semilla");
        elmConstAdi = document.getElementById("constAditiva");
        elmConstMult = document.getElementById("constMultiplicativa");
        elmMod = document.getElementById("modulo");
        elmCant = document.getElementById("cantidadN");
        elmConfianza = document.getElementById("nConfianza");

        elmSem.value = "";
        elmConstAdi.value = "";
        elmConstMult.value = "";
        elmMod.value = "";
        elmCant.value = "";
    }
    var elmMostrarDatos = document.getElementById("mostrarDatos");
    if (elmMostrarDatos.style.display === "block") {
        elmMostrarDatos.style.display = "none";

    }
}

function mostrarCantidadSolicitada(cantidadN, numeros, modulo, confianza) {

    var numerosSolicitados = new Array();

    for (var i = 0; i < cantidadN; i++) {
        numerosSolicitados[i] = numeros[i]/modulo;
    }

    PruebaKosmogorov(numerosSolicitados, modulo, confianza);
    Corridas(numerosSolicitados, confianza);

    var elmAreaNumSoli = document.getElementById("areaNumSoli");
    elmAreaNumSoli.innerHTML = numerosSolicitados;
}

function PruebaKosmogorov(numeros, modulo, confianza) {
    
    var numOrdenados = new Array();
    var fnX = new Array();
    var numAbs = new Array();

    for (let i = 0; i < numeros.length; i++) {
        numOrdenados[i] = numeros[i];
    }

    numOrdenados = numOrdenados.sort();

    for (let i = 0; i < numOrdenados.length; i++) {

        valor = numOrdenados[i];
        m = i;
        n = i + 1;
        i = m;
        fnX[i] = n / numOrdenados.length;
        numAbs[i] = Math.abs(valor - fnX[i]);

    }

    for (let i = 0; i < numAbs.length; i++) {
        numAbs[i] = Math.round(numAbs[i]*1000)/1000;
    }
    

    valor = Math.max(...numAbs);

 //   var elmArearNum = document.getElementById("areaNumerosKS");
 //   elmArearNum.innerHTML = numAbs;

    var elmValorKS = document.getElementById("valorKS");
    elmValorKS.innerHTML = valor;


    var raiz = Math.sqrt(numOrdenados.length);

    var elmTablasKS = document.getElementById("tablasKS");
    var tablasKS=0;

    if (confianza == 0.1) {
        tablasKS = Math.round((1.22/raiz)*100)/100;
    }else if (confianza == 0.05) {
        tablasKS = Math.round((1.36/raiz)*100)/100;;
    }else if (confianza == 0.025) {
        tablasKS = Math.round((1.48/raiz)*100)/100;;
    }else if (confianza == 0.001) {
        tablasKS = Math.round((1.63/raiz)*100)/100;;
    }

    elmTablasKS.innerHTML = tablasKS - 0.01;

    var elmConclusionKS = document.getElementById("txtConclusionKS");

    if (valor<tablasKS) {
        elmConclusionKS.innerHTML = "No se rechaza la hipotesis de que los números generados tienen distribución uniforme";
    }else{
        elmConclusionKS.innerHTML = "Se rechazala hipotesis de que los números generados no tienen distribución uniforme";
    }
}

function Corridas(numeros, confianza) {
    var numeros3 = new Array();
    var corridas = new Array();
    var corridas2 = new Array();
    var alfa = confianza;
    var numCorridos = 0;
    var n = 0;

    for (let i = 0; i < numeros.length; i++) {
        y = numeros[i];
        numeros3[i] = y;
    }

    for (let i = 0; i < numeros3.length - 2; i++) {

        if (numeros3[i + 1] > numeros3[i]) {
            corridas[n] = "+";
            n++;
        } else {
            corridas[n] = "-";
            n++;
        }

    }
    for (let i = 0; i < corridas.length; i++) {
        if (corridas[i + 1] == corridas[i]) {
            corridas2[i] = 0;
        } else {
            corridas2[i] = 1;
        }
        if (corridas2[i] === 1) {
            numCorridos++;

        }

    }
    var resultado;
    console.log(numCorridos);
    corridas = document.getElementById("corridas");
    conclusion = document.getElementById("conclusion");

    corridas.innerHTML = numCorridos;

    var r = (1 / 3) * (2 * (numeros3.length) - 1);
    var varianza = (16 * (numeros3.length) - 29) / 90;

    alfa = alfa / 2;

    var expresion = (numCorridos - r) / (Math.sqrt(varianza));

    expresion = std_n_cdf(expresion);
    console.log(alfa);
    console.log(expresion);

    if (numeros.length>20) {
        if (alfa <= expresion && expresion <= (1 - alfa)) {
            resultado = "No se rechaza la hipotesis de que los números generados tienen distribución uniforme";
        } else {
            resultado = "Se rechazala hipotesis de que los números generados no tienen distribución uniforme";
        }
        
    }else{
        resultado = "No es posible dar una conclusión, ya que el n de la muestra es menor o igual a 20";
    }
    conclusion.innerHTML = resultado;

}


//Funciones para hallar la desvicion estandar normal
function std_n_cdf(x) {
    return cdf(x, 0, 1);
}

function cdf(x, mean, variance) {
    return 0.5 * (1 + erf((x - mean) / (Math.sqrt(2 * variance))));
}

function erf(x) {
    // save the sign of x
    var sign = (x >= 0) ? 1 : -1;
    x = Math.abs(x);

    // constants
    var a1 = 0.254829592;
    var a2 = -0.284496736;
    var a3 = 1.421413741;
    var a4 = -1.453152027;
    var a5 = 1.061405429;
    var p = 0.3275911;

    // A&S formula 7.1.26
    var t = 1.0 / (1.0 + p * x);
    var y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
    return sign * y; // erf(-x) = -erf(x);
}
