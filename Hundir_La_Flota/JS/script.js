// Activa el modo estricto: evita errores graves obligándote a declarar todas tus variables y prohibiendo malas prácticas.
"use strict";


// <========== Variables ==========>

// Controlador de la decisión de repetir la ejecución del programa (se establece inicialmente en "false" para evitar repeticiones innecesarias).
let decisionRepetirEjecucion = false;

// Dimensión máxima permitida para las filas y columnas del tablero.
const DIMENSION_MAXIMA = 10;

// Dimensión mínima permitida para las filas y columnas del tablero.
const DIMENSION_MINIMA = 1;

// Atributos, elementos y objetos para la construcción del juego.
let nFilas, nColumnas, nCasillas;

// Matriz (array bidimensional) auxiliar que representa el campo de batalla:
    /**
     * Cada posición almacena:
     *     - "0" (agua),
     *     - "-1" (agua espaciadora, zona/casilla de agua bloqueada junto a un barco)
     *     - El tamaño del barco que la ocupa ("1", "2" o "3").
     */
const tablero = [];

// Valor que representa una casilla de agua libre dentro del tablero.
const aguaLibre = 0;

// Valor que representa una casilla de agua bloqueada (adyacente a un barco, incluidas las diagonales), donde no se puede colocar otro barco.
const aguaBloqueada = -1;


/**
 * Solicita al usuario si desea volver a ejecutar el programa después de producirse una respuesta no válida.
 *     Se devuelve:
 *         "true"  → Si el usuario desea volver a intentarlo.
 *         "false" → Si el usuario no desea volver a intentarlo.
 *         "null"  → Si el usuario cancela la solicitud.
 */
function solicitarReintento(){
    // Bucle controlador de reintentos sobre la solicitud de confirmación.
    do{
        // Solicita al usuario si desea volver a intentarlo (recolector de respuesta por pantalla).
        let respuesta = prompt("¿Quieres retroceder, volver a intentarlo? ('Sí' o 'No')");

        // Condicional para comprobar si el usuario ha cancelado la solicitud.
        if (respuesta === null){
            // Muestreo de un mensaje informativo indicando que el usuario ha cancelado la ejecución.
            alert("La ejecución ha sido cancelada.");
            return null;
        }

        // Normaliza la respuesta eliminando los espacios y convirtiendo las letras a minúsculas (facilitar las comparaciones).
        respuesta = respuesta.toLowerCase().trim();

        // Condicional para comprobar que la respuesta esperada únicamente contenga letras.
            /**
             * Comprueba/Verifica que la respuesta únicamente pueda contener caracteres alfabéticos.
             *      Se permiten:
             *          Letras mayúsculas y minúsculas.
             *          Vocales acentuadas y con diéresis.
             *          'Ñ' y 'ñ'.
             */
        if (!/^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ]+$/.test(respuesta)){
            // Muestreo de un mensaje de error indicando que la respuesta introducida contiene caracteres no permitidos.
            alert("ERROR: La respuesta únicamente puede contener letras.");
            
            // Registra en la consola la respuesta introducida.
            console.log (respuesta);

        // Condicional para respuestas que únicamente contienen letras.
        } else{
            // Condicional para determinar si el usuario desea repetir la ejecución.
            switch (respuesta){
                // Condicional para el estado afirmativo de la respuesta.
                    // Como ambos casos de respuesta están consecutivos y el primero no tiene instrucciones, los dos ejecutan el mismo bloque de código. "fall-through" permite agrupar varios valores que deben recibir el mismo tratamiento operativo.
                case "sí":
                case "si":
                    return true;

                // Condicional para el estado negativo de la respuesta.
                case "no":
                    return false;

                // Condicional para respuestas no esperadas por el sistema.
                default:
                    alert("ERROR: La respuesta introducida no es válida. Recuerde que debe responder con un 'Sí' o 'No'.");

                    // Registra en la consola la respuesta introducida.
                    console.log (respuesta);

                    // Finaliza la ejecución del bloque "switch".
                    break;
            }
        }

    // Repite la solicitud (pregunta de reintento) hasta que no se haya recibido una respuesta válida.
    } while (true);
}


/**
 * Solicita al usuario un número entero comprendido entre un mínimo y un máximo, y repite la pregunta mientras la respuesta no sea válida y el usuario quiera reintentarlo.
 *     Parámetros:
 *         mensaje → Texto de la pregunta que se muestra al usuario.
 *         minimo  → Valor mínimo permitido (incluido).
 *         maximo  → Valor máximo permitido (incluido). Si no se indica, no hay límite superior.
 *     Se devuelve:
 *         El número introducido   → Si la respuesta es válida.
 *         "null"                  → Si el usuario cancela o no desea volver a intentarlo.
 */
function solicitarCantidad(mensaje, minimo, maximo = Infinity){
    // Bucle controlador de reintentos sobre la misma pregunta.
    do{
        // Solicita al usuario la respuesta (recolector de respuesta por pantalla).
        let respuesta = prompt(mensaje);

        // Condicional para comprobar si el usuario ha cancelado la solicitud.
        if (respuesta === null){
            // Muestreo de un mensaje informativo indicando que el usuario ha cancelado la ejecución.
            alert("La ejecución ha sido cancelada.");

            // Registra en la consola la respuesta introducida (null al cancelar).
            console.log (respuesta);

            return null;
        }

        // Normaliza la respuesta eliminando los espacios del principio y del final.
        respuesta = respuesta.trim();

        // Convierte la respuesta de texto a número.
        const respuestaNumerica = Number(respuesta);

        /**
         * Condicional para comprobar/verificar que la respuesta sea válida.
         *      La segunda condición comprueba si es un número entero (se descartan respuestas vacías, textos, signos, decimales y notaciones como "0x0A" o "1e1").
         *      La tercera y cuarta condición comprueban que esté dentro del rango permitido.
         */
        if (!/^\d+$/.test(respuesta) /*!Number.isInteger(respuestaNumerica)*/ || respuestaNumerica < minimo || respuestaNumerica > maximo){
            // Construye el mensaje de error según el rango permitido.
            const rango = (maximo === Infinity) ? `mayor o igual que ${minimo}` : `comprendido entre ${minimo} y ${maximo}`;

            // Muestreo de un mensaje de error indicando que la respuesta no es válida.
            alert(`ERROR: La respuesta únicamente puede contener un número entero ${rango}.`);

            // Registra en la consola la respuesta introducida.
            console.log(respuesta);

            // Si el usuario no desea volver a intentarlo (o cancela), se finaliza la solicitud.
            if (!solicitarReintento()){
                return null;
            }

        // Condicional para respuestas válidas.
        } else{
            return respuestaNumerica;
        }

    // Repite la solicitud hasta recibir una respuesta válida o hasta que el usuario decida no reintentarlo.
    } while (true);
}


/**
 * Bloquea (marca con "-1") todas las casillas de agua que rodean a una casilla ocupada por un barco, incluidas las diagonales, para impedir que otro barco pueda colocarse junto a ella.
 *     Parámetros:
 *         tablero → Matriz (array bidimensional) que representa el campo de batalla.
 *         fila    → Índice de la fila de la casilla ocupada (empieza en 0).
 *         columna → Índice de la columna de la casilla ocupada (empieza en 0).
 */
function bloquearAlrededor(tablero, fila, columna){
    // Bucle para recorrer la fila anterior, la actual y la siguiente a la casilla ocupada.
    for (let i = fila - 1; i <= fila + 1; i++){
        // Bucle para recorrer la columna anterior, la actual y la siguiente a la casilla ocupada.
        for (let j = columna - 1; j <= columna + 1; j++){
            /**
             * Condicional para comprobar/verificar que la casilla vecina se pueda bloquear.
             *     La primera y segunda condición comprueban que la fila esté dentro del tablero (evita salirse por arriba o por abajo).
             *     La tercera y cuarta condición comprueban que la columna esté dentro del tablero (evita salirse por la izquierda o por la derecha).
             *     La quinta condición comprueba que la casilla sea agua libre (no se sobrescriben barcos ni casillas ya bloqueadas).
             */
            if (i >= 0 && i < tablero.length && j >= 0 && j < tablero[i].length && tablero[i][j] === aguaLibre){
                // Bloquea la casilla vecina.
                    /**
                     * Solo se bloquean casillas que valgan 0. Así:
                     *     La casilla central (el barco, que vale 1, 2 o 3) no se toca, aunque los bucles pasen por ella.
                     *     Otro barco que esté cerca no se sobrescribe.
                     *     Una casilla ya bloqueada (-1) se deja como está.
                     */
                tablero[i][j] = aguaBloqueada;
            }
        }
    }
}


/**
 * Pinta en la página el tablero recibido como una tabla HTML.
 *     Parámetros:
 *         tablero → Matriz (array bidimensional) con el contenido de cada casilla.
 *             "-1"             → Agua (bloqueada).
 *             "0"              → Agua (libre).
 *             "1", "2" o "3"   → Tamaño del barco que ocupa la casilla.
 */
function pintarTablero(tablero){
    document.write ("<table class = \"tablero\">");


    // <========== Cabecera (numeración de columnas) ==========>
    
    document.write ("<tr>");

    // Casilla vacía de la esquina superior izquierda (cruce entre la numeración de filas y columnas. Soluciona el desfase creado por la numeración de los arrays al empezar por 0).
    document.write ("<th>");
    document.write ("</th>");

    // Bucle para recorrer cada una de las columnas (se toma la primera fila como referencia, ya que todas tienen la misma longitud).
    for (let j = 0; j < tablero[0].length; j++){
        document.write ("<th>");
        document.write (j + 1);
        document.write ("</th>");
    }

    document.write ("</tr>");


    // <========== Casillas ==========>
    
    // Bucle para recorrer cada una de las filas del tablero.
    for (let i = 0; i < tablero.length; i++){
        document.write ("<tr>");

        // Numeración de la fila actual.
        document.write ("<th>");
        document.write (i + 1);
        document.write ("</th>");

        // Bucle para recorrer cada una de las casillas de la fila actual.
        for (let j = 0; j < tablero[i].length; j++){
            // Determina la clase de la casilla según su contenido (las casillas bloqueadas se muestran como agua, ya que únicamente sirven para controlar la colocación).
            const claseCasilla = (tablero[i][j] === aguaLibre || tablero[i][j] === aguaBloqueada) ? "agua" : `barco${tablero[i][j]}`;

            // Determina el valor a mostrar en la casilla (las casillas bloqueadas se muestran como agua).
            const valorCasilla = (tablero[i][j] === aguaBloqueada) ? aguaLibre : tablero[i][j];

            document.write (`<td class = "${claseCasilla}">`);
            document.write (valorCasilla);
            document.write ("</td>");
        }

        document.write ("</tr>");
    }

    document.write ("</table>");
}


// Bucle controlador de reintentos (se fuerza a que su contenido se ejecute mínimo una vez desde el arranque/inicio del programa).
do{
    // Estructura de control de flujo para la captura de posibles excepciones y errores de ejecución que se produzcan mientras el programa está arrancado.
    try{
        // Vacía el tablero para que no se mezcle con el de una ejecución anterior.
        tablero.length = 0;

        alert("Inicializando el juego.");
        alert("Mapeando el campo de batalla.");
        alert("Detalle las siguientes instrucciones que se le soliciten.");


        // <========== Filas ==========>
        
        // Solicitud del número de filas.
        nFilas = solicitarCantidad(`¿Cuántas filas tendrá?\n(Se solicita un número entero positivo comprendido entre ${DIMENSION_MINIMA} y ${DIMENSION_MAXIMA}, ambos incluidos)`, DIMENSION_MINIMA, DIMENSION_MAXIMA);

        // Condicional para comprobar si el usuario ha cancelado la solicitud.
        if (nFilas === null){
            // Detiene la repetición del programa.
            decisionRepetirEjecucion = false;

            // Finaliza la ejecución del bucle "do-while" que controla la repetición del programa.
            break;
        }

        // Registra en la consola la cantidad de filas introducidas.
        console.log (nFilas);


        // <========== Columnas ==========>

        // Solicitud del número de columnas.
        nColumnas = solicitarCantidad(`¿Cuántas columnas tendrá?\n(Se solicita un número entero positivo comprendido entre ${DIMENSION_MINIMA} y ${DIMENSION_MAXIMA}, ambos incluidos)`, DIMENSION_MINIMA, DIMENSION_MAXIMA);

        // Condicional para comprobar si el usuario ha cancelado la solicitud.
        if (nColumnas === null){
            // Detiene la repetición del programa.
            decisionRepetirEjecucion = false;

            // Finaliza la ejecución del bucle "do-while" que controla la repetición del programa.
            break;
        }

        // Registra en la consola la cantidad de columnas introducidas.
        console.log (nColumnas);


        // <========== Matriz auxiliar ==========>

        // Bucle para recorrer cada una de las filas del tablero.
        for (let i = 0; i < nFilas; i++){
            // Crea una fila vacía (array) dentro del tablero.
            tablero.push([]);

            // Bucle para recorrer cada una de las columnas de la fila actual.
            for (let j = 0; j < nColumnas; j++){
                // Inicializa la casilla con agua (0).
                tablero[i].push(aguaLibre);
            }
        }

        // Registra en la consola el tablero inicializado (en formato tabla).
        console.table (tablero);


        // <========== Tablero ==========>
        
        // Calcula el número de casillas totales dentro del tablero.
        nCasillas = nFilas * nColumnas;

        alert(`Dadas las directrices, el campo de batalla se compondrá de un total de ${nCasillas} casillas/posiciones.`);

        // Pinta en la página el tablero inicializado (vacío, únicamente con agua).
        pintarTablero(tablero);

    // Captura de posibles excepciones/errores de tipo genérico, "error", que ocurran/se produzcan durante el proceso de ejecución del programa (se lanza cuando se produce un fallo que no ha sido controlado previamente por el código, bajo las condiciones establecidas por el programa).
    } catch (error){
        // Muestreo por pantalla de un mensaje de error al usuario indicando que se ha producido un fallo durante la ejecución del programa.
        alert("ERROR: Se ha producido un fallo durante la ejecución del programa: " + error.message);

        // Muestreo por consola de un mensaje de error indicando que se ha producido un fallo durante la ejecución del programa.
        console.error ("ERROR: Se ha producido un fallo durante la ejecución del programa:", error);

        // Finaliza/Detiene la posibilidad de volver a ejecutar el programa después de producirse una excepción.
        decisionRepetirEjecucion = false;
    }

// Comprueba si el usuario ha solicitado volver a ejecutar el programa.
} while (decisionRepetirEjecucion === true);