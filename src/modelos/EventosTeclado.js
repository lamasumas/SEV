var teclas = [];

window.addEventListener('keydown', onKeyDown, false);
window.addEventListener('keyup', onKeyUp, false);

function onKeyDown( event) {
    entrada = entradas.teclado;
    controles.pausa = false;
    // agregar la tecla pulsada si no estaba
    var posicion = teclas.indexOf(event.keyCode);
    if ( posicion == -1 ) {
        teclas.push(event.keyCode);
        switch ( event.keyCode ){
            case 32:
                controles.continuar = true;
                break;
            case 38:
                controles.moverY = 1;
                break;
            case 40:
                controles.moverY = -1;
                break;
            case 39:
                controles.moverX = 1;
                break;
            case 37:
                controles.moverX = -1;
                break;
            case 68:
                controles.atacarDerecha = true;
                break;
            case 65:
                controles.atacarIzuierda = true;
                break;
            case 83:
                controles.atacarAbajo = true;
                break;
            case 87:
                controles.atacarArriba = true;
                break;
            case 69:
                controles.interactuar = true;
                break;
            case 27:
                controles.pausa = !controles.pausa;
        }

    }

}

function onKeyUp( event) {
    // sacar la tecla pulsada
    var posicion = teclas.indexOf(event.keyCode);
    teclas.splice( posicion, 1);
    switch ( event.keyCode ){
        case 32:

            controles.continuar = false;
            break;
        case 38:
            if ( controles.moverY == 1 ){
                controles.moverY = 0;
            }
            break;
        case 40:
            if ( controles.moverY == -1 ){
                controles.moverY = 0;
            }
            break;
        case 39:
            if ( controles.moverX == 1 ){
                controles.moverX = 0;
            }
            break;
        case 37:
            if ( controles.moverX == -1 ){
                controles.moverX = 0;
            }
            break;
        case 68:
            controles.atacarDerecha = false;
            break;
        case 65:
            controles.atacarIzuierda = false;
            break;
        case 83:
            controles.atacarAbajo = false;
            break;
        case 87:
            controles.atacarArriba = false;
            break;
        case 69:
            controles.interactuar = false;
            break;
    }

}
