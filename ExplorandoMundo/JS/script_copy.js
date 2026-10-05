class calle{
    #carteles;
    #puertas;
    #escaparates;
    #horaReloj;
    #minutosReloj;
    #semaforo;
    #coches;

    // Constructor para inicializar los atributos de la clase calle.
    constructor (carteles, puertas, numero, escaparates, hora, minutos, semaforo, coches){
        this.cantidadCarteles = carteles;
        this.cantidadPuertas = puertas;
        this.numeroPrimeraPuerta = numero;
        this.cantidadEscaparates = escaparates;
        this.horaReloj = hora;
        this.minutosReloj = minutos;
        this.colorLuzSemaforo = semaforo;
        this.cantidadCoches = coches;
        this.calle = function(){ console.log("Cuántas calles hay: "); };
    }
}

// Array para almacenar las instancias de la clase calle.
const calles = [];

const numCalles = parseInt(prompt("¿Cuántas calles hay?"));

if (!isNaN(numCalles) && numCalles > 0){
    for (let i = 0; i < numCalles; i++){
        const numcalle = `Calle ${i + 1}`;
        alert (`Introduce los datos para la calle ${numcalle}: `);

        const cantidadCarteles = parseInt(prompt("¿Cuántos carteles hay?"));
        const cantidadPuertas = parseInt(prompt("¿Cuántas puertas hay?"));
        const numeroPrimeraPuerta = parseInt(prompt("¿Cuál es el número de la primera puerta?"));
        const cantidadEscaparates = parseInt(prompt("¿Cuántos escaparates hay?"));
        const horaReloj = parseInt(prompt("¿Qué hora marca el reloj? (0-23)"));
        const minutosReloj = parseInt(prompt("¿Qué minutos marca el reloj? (0-59)"));
        const colorLuzSemaforo = prompt("¿De qué color está la luz del semáforo? (rojo, amarillo, verde)");
        const cantidadCoches = parseInt(prompt("¿Cuántos coches hay?"));

        // Crear una nueva instancia de la clase calle con los datos proporcionados.
        //calles.push(new calle(cantidadCarteles, cantidadPuertas, numeroPrimeraPuerta, cantidadEscaparates, horaReloj, minutosReloj, colorLuzSemaforo, cantidadCoches));

        // Crear una nueva instancia de la clase calle y la guarda en el array.
        var nuevaCalle = new calle(numCalles, cantidadCarteles, cantidadPuertas, numeroPrimeraPuerta, cantidadEscaparates, horaReloj, minutosReloj, colorLuzSemaforo, cantidadCoches);
        calles.push(nuevaCalle);
    }

    // Mostrar los datos de cada calle en una nueva pestaña del navegador.
    for (let i = 0; i < calles.length; i++){
        var calle = calles[i];

        // Abrir una nueva ventana para mostrar los datos de la calle.
        var nuevaVentana = window.open("", "_blank");

        if (nuevaVentana){
            nuevaVentana.document.write(`<h1>Datos de la Calle ${i + 1}</h1>`);
            nuevaVentana.document.write(`<p>Cantidad de carteles: ${calle.cantidadCarteles}</p>`);
            nuevaVentana.document.write(`<p>Cantidad de puertas: ${calle.cantidadPuertas}</p>`);
            nuevaVentana.document.write(`<p>Número de la primera puerta: ${calle.numeroPrimeraPuerta}</p>`);
            nuevaVentana.document.write(`<p>Cantidad de escaparates: ${calle.cantidadEscaparates}</p>`);
            nuevaVentana.document.write(`<p>Hora del reloj: ${calle.horaReloj}:${calle.minutosReloj}</p>`);
            nuevaVentana.document.write(`<p>Color de la luz del semáforo: ${calle.colorLuzSemaforo}</p>`);
            nuevaVentana.document.write(`<p>Cantidad de coches: ${calle.cantidadCoches}</p>`);
        } else{
            alert("Valor introducido no válido para el sistema.");
        }
    }
}

// Te pregunta por las calles
// Te pregunta por los datos de cada calle
// Te crea una pestaña nueva por cada calle con los objetos de cada calle ya puestos