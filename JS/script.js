// Controlador de la decisión de repetir la ejecución del programa (se establece inicialmente en "false" para evitar repeticiones innecesarias).
var decisionRepetirEjecucion = false;

/**
 * Solicita al usuario si desea volver a ejecutar el programa después de producirse una respuesta no válida.
 *      Se devuelve:
 *          "true"  → Si el usuario desea volver a intentarlo.
 *          "false" → Si el usuario no desea volver a intentarlo.
 */
function solicitarReintento(){
    // Solicita al usuario si desea volver a intentarlo (recolector de respuesta por pantalla).
    var respuesta = prompt ("¿Quieres retroceder, volver a intentarlo? ('Sí' o 'No)");

    // Condicional para comprobar si el usuario ha cancelado la solicitud.
    if (respuesta == null){
        return false;
    }

    // Normaliza la respuesta eliminando los espacios y convirtiendo las letras a minúsculas (facilitar las comparaciones).
    respuesta = respuesta.toLowerCase().trim();

    // Condicional para determinar si el usuario desea repetir la ejecución.
    switch (respuesta){
        // Condicional para el estado afirmativo de la respuesta.
            // Como ambos casos de respuesta están consecutivos y el primero no tiene instrucciones, los dos ejecutan el mismo bloque de código. "fall-through" permite agrupar varios valores que deben recibir el mismo tratamiento operativo.
        case "sí":
        case "si":
            return true;
            /**
             * Si no fuese por función y si por un comportamiento lineal dentro del bloque de código:
             *      decisionRepetirEjecucion = true;
             *      //return; // No habríala función "return". 
             *      break;
             */

        // Condicional para el estado negativo de la respuesta.
        case "no":
            return false;
            /**
             * Si no fuese por función y si por un comportamiento lineal dentro del bloque de código:
             *      decisionRepetirEjecucion = false;
             *      break;
             */

        // Condicional para respuestas no esperadas por el sistema.
        default:
            alert("ERROR: La respuesta introducida no es válida. Recuerde que debe responder con un 'Sí' o 'No'.");
            return true;
            /**
             * Si no fuese por función y si por un comportamiento lineal dentro del bloque de código:
             *      alert("ERROR: La respuesta introducida no es válida. Recuerde que debe responder con un 'Sí' o 'No'.");
             *      decisionRepetirEjecucion = true;
             *      break;
             */
            
    }
}


// Controlador de reintentos (se fuerza a que su contenido se esjecute mínimo una vez desde elarranque/inicio del programa).
do{
    // Controlador de excepciones (su contenido se ejecuta bajo la seguridad de capturar cualquier fallo que se produzca sobre el código mientras el programa está arrancado).
    try{
        // Solicita al usuario el color de las luces del semáforo (recolector de respuesta por pantalla).
        var colorLuzSemaforo = prompt ("¿Cuál es el color de luz del semáforo? ('Rojo', 'Verde' o 'Ámbar')");

        // Condicional para comprobar si el usuario ha cancelado la solicitud.
        if (colorLuzSemaforo == null){
            // Muestreo de un mensaje informativo indicando que el usuario ha cancelado la ejecución.
            alert("La ejecución ha sido cancelada.");

            // Registra en la consola el color introducido.
            console.log (colorLuzSemaforo);
            
            // Detiene la repetición del programa.
            decisionRepetirEjecucion = false;

        // Condicional para comprobar que la respuesta esperada únicamente contenga letras.
            /**
             * Comprueba/Verifica que la respuesta únicamente pueda contener caracteres alfabéticos.
             *      Se permiten:
             *          Letras mayúsculas y minúsculas.
             *          Vocales acentuadas y con diéresis.
             *          'Ñ' y 'ñ'.
             */
        } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ]+$/.test(colorLuzSemaforo)){
            // Muestreo de un mensaje de error indicando que la respuesta introducida contiene caracteres no permitidos.
            alert("ERROR: La respuesta únicamente puede contener letras.");
            
            // Registra en la consola el color introducido.
            console.log (colorLuzSemaforo);

            // Solicita al usuario si desea volver a intentarlo.
            decisionRepetirEjecucion = solicitarReintento();

        // Condicional para respuestas esperadas.
        } else{
            // Normaliza la entrada.
                /** 
                 * Elima los espacios y convierte la respuesta a minúsculas para facilitar las comparaciones.
                 *      Se sustituye:
                 *          "if (colorLuzSemaforo == "rojo" || colorLuzSemaforo == "ROJO" || colorLuzSemaforo == "Rojo"){"
                 *      Por:
                 *          "if (colorLuzSemaforo == "rojo"){"
                 */
            colorLuzSemaforo = colorLuzSemaforo.toLowerCase().trim();

            // Condicional para la luz roja del semáforo.
            if (colorLuzSemaforo == "rojo"){
                document.write ("<div>");
                document.write ("<h1>");
                //document.write ("La luz del semáforo es roja");
                document.write("<img src='Images/ColorSemaforo/rojo.png'>");
                document.write ("</h1>");
                document.write ("</div>");

                // Registra en la consola el color introducido.
                console.log (colorLuzSemaforo);

            // Condicional para la luz ámbar del semáforo.
            } else if (colorLuzSemaforo == "ámbar" || colorLuzSemaforo == "ambar"){
                document.write ("<div>");
                document.write ("<h1>");
                //document.write ("La luz del semáforo es ámbar");
                document.write("<img src='Images/ColorSemaforo/ambar.png'>");
                document.write ("</h1>");
                document.write ("</div>");

                // Registra en la consola el color introducido.
                console.log (colorLuzSemaforo);

            // Condicional para la luz verde del semáforo.
            } else if (colorLuzSemaforo == "verde"){
                document.write ("<div>");
                document.write ("<h1>");
                //document.write ("La luz del semáforo es verde");
                document.write("<img src='Images/ColorSemaforo/verde.png'>");
                document.write ("</h1>");
                document.write ("</div>");

                // Registra en la consola el color introducido.
                console.log (colorLuzSemaforo);

            // Condicional para respuestas no esperadas.
            } else{
                document.write ("<div>");
                document.write ("<h1>");
                document.write ("ERROR: El color introducido no coincide con uno de los solicitados ('Rojo', 'Verde' o 'Ámbar').");
                document.write ("</h1>");
                document.write ("</div>");

                // Registra en la consola el color introducido.
                console.log (colorLuzSemaforo);

                // Solicita al usuario si desea volver a intentarlo.
                decisionRepetirEjecucion = solicitarReintento();
            }
        }
    } catch (error){
        // Muestreo por pantalla de un mensaje de error al usuario indicando que se ha producido un fallo durante la ejecución del programa.
        alert("ERROR: Se ha producido un fallo durante la ejecución del programa: " + error.message);

        // Muestreo por consola de un mensaje de error indicando que se ha producido un fallo durante la ejecución del programa.
        console.error ("ERROR: Se ha producido un fallo durante la ejecución del programa:", error);

        // Finaliza/Detiene la posibilidad de volver a ejecutar del programa después de producirse una excepción.
        decisionRepetirEjecucion = false;
    }

// Comprueba si el usuario ha solicitado volver a ejecutar el programa.
} while (decisionRepetirEjecucion == true);
















    // Bloque de código para la solicitud sobre la cantidad de coches que hay en el camino.
        // Recolector de respuesta por pantalla.
    var cantidadDeCoches = prompt ("¿Cuántos coches hay en el la carretera/camino?");

    while (cantidadDeCoches > 0){
        document.write ("Coche");
        cantidadDeCoches--;
    }

    // Salto de línea.
    document.write ("<br>");


    // Bloque de código para la solicitud sobre la cantidad de carteles que hay en el camino.
        // Recolector de respuesta por pantalla.
    var cantidadDeCarteles = prompt ("¿Cuántos carteles hay por el camino?");

    while (cantidadDeCarteles > 0){
        document.write ("Coche");
        cantidadDeCarteles--;
    }

    // Salto de línea.
    document.write ("<br>");

    // Bloque de código para la solicitud sobre la cantidad de puertas que hay en el camino.
        // Recolector de respuesta por pantalla.
    var cantidadDePuertas = prompt ("¿Cuántos puertas hay por el camino?");

    while (cantidadDePuertas > 0){
        document.write ("Coche");
        cantidadDePuertas--;
    }

    // Salto de línea.
    document.write ("<br>");