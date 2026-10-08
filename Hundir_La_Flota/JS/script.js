// Activa el modo estricto: evita errores graves obligándote a declarar todas tus variables y prohibiendo malas prácticas.
"use strict";

// Controlador de la decisión de repetir la ejecución del programa (se establece inicialmente en "false" para evitar repeticiones innecesarias).
var decisionRepetirEjecucion = false;

/**
 * Solicita al usuario si desea volver a ejecutar el programa después de producirse una respuesta no válida.
 *      Se devuelve:
 *          "true"  → Si el usuario desea volver a intentarlo.
 *          "false" → Si el usuario no desea volver a intentarlo.
 *          "null"  → Si el usuario cancela la solicitud.
 */
function solicitarReintento(){
    // Bucle controlador de reintentos sobre la solicitud de confirmación.
    do{
        // Solicita al usuario si desea volver a intentarlo (recolector de respuesta por pantalla).
        var respuesta = prompt("¿Quieres retroceder, volver a intentarlo? ('Sí' o 'No')");

        // Condicional para comprobar si el usuario ha cancelado la solicitud.
        if (respuesta === null){
            // Muestreo de un mensaje informativo indicando que el usuario ha cancelado la ejecución.
            alert("La ejecución ha sido cancelada.");
            return null;

        // Condicional para comprobar que la respuesta esperada únicamente contenga letras.
            /**
             * Comprueba/Verifica que la respuesta únicamente pueda contener caracteres alfabéticos.
             *      Se permiten:
             *          Letras mayúsculas y minúsculas.
             *          Vocales acentuadas y con diéresis.
             *          'Ñ' y 'ñ'.
             */
        } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ]+$/.test(respuesta)){
            // Muestreo de un mensaje de error indicando que la respuesta introducida contiene caracteres no permitidos.
            alert("ERROR: La respuesta únicamente puede contener letras.");
            
            // Registra en la consola la respuesta introducida.
            console.log (respuesta);

        // Condicional para respuestas que únicamente contienen letras.
        } else{
            // Normaliza la respuesta eliminando los espacios y convirtiendo las letras a minúsculas (facilitar las comparaciones).
            respuesta = respuesta.toLowerCase().trim();
            
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
 *      Parámetros:
 *          mensaje → Texto de la pregunta que se muestra al usuario.
 *          minimo  → Valor mínimo permitido (incluido).
 *          maximo  → Valor máximo permitido (incluido). Si no se indica, no hay límite superior.
 *      Se devuelve:
 *          El número introducido   → Si la respuesta es válida.
 *          "null"                  → Si el usuario cancela o no desea volver a intentarlo.
 */
function solicitarCantidad(mensaje, minimo, maximo = Infinity){
    // Bucle controlador de reintentos sobre la misma pregunta.
    do{
        // Solicita al usuario la respuesta (recolector de respuesta por pantalla).
        var respuesta = prompt(mensaje);

        // Condicional para comprobar si el usuario ha cancelado la solicitud.
        if (respuesta === null){
            // Muestreo de un mensaje informativo indicando que el usuario ha cancelado la ejecución.
            alert("La ejecución ha sido cancelada.");

            // Registra en la consola la respuesta introducida (null al cancelar).
            console.log (respuesta);

            return null;
        }

        // Convierte la respuesta de texto a número.
        var respuestaNumerica = Number(respuesta);

        /**
         * Condicional para comprobar/verificar que la respuesta sea válida.
         *      La primera condición comprueba si la respuesta está vacía.
         *      La segunda condición comprueba si es un número entero (se descartan textos y decimales).
         *      La tercera y cuarta condición comprueban que esté dentro del rango permitido.
         */
        if (respuesta.trim() == "" || !Number.isInteger(respuestaNumerica) || respuestaNumerica < minimo || respuestaNumerica > maximo){
            // Construye el mensaje de error según el rango permitido.
            var rango = (maximo == Infinity) ? `mayor o igual que ${minimo}` : `comprendido entre ${minimo} y ${maximo}`;

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









// Bucle controlador de reintentos (se fuerza a que su contenido se ejecute mínimo una vez desde el arranque/inicio del programa).
do{
    // Estructura de control de flujo para la captura de posibles excepciones y errores de ejecución que se produzcan mientras el programa está arrancado.
    try{
        alert("Inicializando el juego.");
        alert("Mapeando el campo de batalla.");
        alert("Detalle las siguientes instrucciones que se le soliciten.");

        // <========== Variables ==========>
        let nFilas, nFColumnas, nCasillas;
        

        // <========== Filas ==========>
            // Solicitud del úmero de filas.
        //nFilas  = parseInt(prompt("¿Cuántas filas tendrá?"));
        nFilas  = solicitarCantidad("¿Cuántas filas tendrá?");   /* El uso de "Number()" sustituye la línea completa: "nFilas = Number(nFilas);" */

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
            // Solicitud del úmero de columnas.
        nFColumnas = solicitarCantidad(prompt("¿Cuántas columnas tendrá?"));

        // Condicional para comprobar si el usuario ha cancelado la solicitud.
        if (nFColumnas === null){
            // Detiene la repetición del programa.
            decisionRepetirEjecucion = false;

            // Finaliza la ejecución del bucle "do-while" que controla la repetición del programa.
            break;
        }

        // Registra en la consola la cantidad de filas introducidas.
        console.log (nFilas);


        // <========== Tablero ==========>
            // Calcula el núemero de casillas totales dentro del tablero.
        nCasillas = nFilas * nFColumnas;

        alert(`Dadas las directrices, el campo de batalla se compondrá de un total de ${nCasillas}.`);

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
} while (decisionRepetirEjecucion == true);