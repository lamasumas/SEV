// Lista re recursos a precargar
var imagenes = {
    fondo : "res/fondo.png",
    jugador: "res/jugador.png",
    jugador_idle_derecha : "res/jugador_idle_derecha.png",
    jugador_idle_izquierda : "res/jugador_idle_izquierda.png",
    jugador_corriendo_derecha : "res/jugador_corriendo_derecha.png",
    jugador_corriendo_izquierda : "res/jugador_corriendo_izquierda.png",
    jugador_disparando_derecha : "res/jugador_disparando_derecha.png",
    jugador_disparando_izquierda : "res/jugador_disparando_izquierda.png",
    jugador_saltando_derecha : "res/jugador_saltando_derecha.png",
    jugador_saltando_izquierda : "res/jugador_saltando_izquierda.png",
    enemigo_morir: "res/enemigo_morir.png",
    enemigo_movimiento: "res/enemigo_movimiento.png",
    enemigo: "res/enemigo.png"

};

var rutasImagenes = Object.values(imagenes);
cargarImagenes(0);

function cargarImagenes(indice){
    var imagenCargar = new Image();
    imagenCargar.src = rutasImagenes[indice];
    imagenCargar.onload = function(){
        if ( indice < rutasImagenes.length-1 ){
            indice++;
            cargarImagenes(indice);
        } else {
            iniciarJuego();
        }
    }
}
