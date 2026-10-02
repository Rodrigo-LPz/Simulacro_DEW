<?php
    //$letras = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E'];
    $letras = 'TRWAGMYFPDXBNJZSQVHLCKE';

    $numeros = readline("Por favor, ingrese su DNI (sin letra): ");
    
    $incompleto = trim($numeros);
    
    if ($incompleto === null || $incompleto === "" || ctype_digit($incompleto) == false /*!is_numeric($incompleto)*/ || strlen($incompleto) != 8){
        die ("\n\nEl campo del DNI ingresado es incorretco.\t(por favor, ingrese un DNI válido (sin letra) y de 8 dígitos).");

        //exit;       // Detención simple.
        //die();      // Detención mostrando un mensaje antes de terminar.
        //exit(1);    // Detención devolviendo un código de estado numérico (útil para la consola).
    }

    $codigoLetra = $incompleto % 23;

    $letra = strpos($letras, $letras[$codigoLetra]);

    echo $letra;
    // echo $incompleto . $letra;