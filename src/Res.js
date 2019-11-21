// Lista re recursos a precargar
var imagenes = {
    fondo : "res/fondo.png",
    jugador: "res/heroes/knight/knight_idle_anim_f0.png",
    jugador_idle_derecha : "res/heroes/knight/knight_idle_spritesheet.png",
    jugador_idle_izquierda : "res/heroes/knight/knight_idle_spritesheet_izquierda.png",
    jugador_corriendo_derecha : "res/heroes/knight/knight_run_spritesheet.png",
    jugador_corriendo_izquierda : "res/heroes/knight/knight_run_spritesheet_izquierda.png",
    jugador_ataque_derecha : "res/effects/player_attack_derecha.png" ,
    jugador_ataque_izquierda : "res/effects/player_attack_izquierda.png" ,
    jugador_ataque_abajo: "res/effects/player_attack_abajo.png",
    jugador_ataque_arriba: "res/effects/player_attack_arriba.png",
    jugador_disparando_izquierda : "res/jugador_disparando_izquierda.png",
    jugador_saltando_derecha : "res/jugador_saltando_derecha.png",
    jugador_saltando_izquierda : "res/jugador_saltando_izquierda.png",
    enemigo : "res/enemies/goblin/goblin_idle_anim_f0.png",
    enemigo_movimiento : "res/enemies/goblin/goblin_run_spritesheet.png",
    enemigo_movimiento_izquierda: "res/enemies/goblin/goblin_run_spritesheet_izquierda.png",
    enemigo_morir_derecha : "res/enemies/goblin/goblin_muerte_derecha.png",
    enemigo_morir_izquierda: "res/enemies/goblin/goblin_muerte_izquierda.png",
    espada: "res/heroes/knight/weapon_sword_1.png",
    vacio: "res/effects/vacio.png",
    barril:"res/props_itens/barrel1.png",
    mesa:"res/props_itens/mesa.png",
    mesa_rota: "res/props_itens/mesa_rota.png"

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
