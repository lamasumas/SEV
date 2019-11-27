// Lista re recursos a precargar
var cache = [];
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
    enemigo : "res/enemies/goblin/goblin_idle_anim_f0.png",
    enemigo_movimiento : "res/enemies/goblin/goblin_run_spritesheet.png",
    enemigo_movimiento_izquierda: "res/enemies/goblin/goblin_run_spritesheet_izquierda.png",
    enemigo_morir_derecha : "res/enemies/goblin/goblin_muerte_derecha.png",
    enemigo_morir_izquierda: "res/enemies/goblin/goblin_muerte_izquierda.png",
    espada: "res/heroes/knight/weapon_sword_1.png",
    vacio: "res/effects/vacio.png",
    barril:"res/props_itens/barrel1.png",
    mesa:"res/props_itens/mesa.png",
    mesa_rota: "res/props_itens/mesa_rota.png",
    cofre_cerrado: "res/props_itens/cofre_cerrado.png",
    cofre_abierto: "res/props_itens/cofre_abrir.png",
    corazon: "res/props_itens/vida.png",
    pausa :"res/ui (new)/PausaMenu1.png",
    menu_muerte: "res/ui (new)/Menu.muerte.png",
    menu_muerte_estatico: "res/ui (new)/MenuMuerto2.png",
    powerup_flechas:"res/ui (new)/icono_flechas.png",
    flecha_derecha:"res/heroes/knight/flecha_derecha.png",
    flecha_izquierda:"res/heroes/knight/flecha_izquierda.png",
    flecha_arriba:"res/heroes/knight/flecha_arriba.png",
    flecha_abajo:"res/heroes/knight/flecha_abajo.png",
    powerup_daño:"res/props_itens/potion_yellow.png",
    slime: "res/enemies/slime/slime_idle_anim_f0.png",
    slime_derecha: "res/enemies/slime/slime_run_spritesheeet.png",
    slime_izquierda: "res/enemies/slime/slime_run_spritesheeet_izquierda.png",
    slime_muerte_derecha: "res/enemies/slime/slime_morir_spritesheeet_derecha.png",
    slime_muerte_izquierda:"res/enemies/slime/slime_morir_spritesheeet_izquierda.png",
    volador: "res/enemies/flying creature/fly_anim_f0.png",
    volador_movimiento: "res/enemies/flying creature/fly_anim_spritesheet.png",
    volador_muerte: "res/enemies/flying creature/fly_morir_spritesheet.png",
    torch: "res/props_itens/torch_spritesheet.png",
    wall_1: "res/tiles/wall/wall_1.png",
    wall_2: "res/tiles/wall/wall_2.png",
    wall_3: "res/tiles/wall/wall_3.png",
    fondo_menu: "res/ui (new)/fondoMenu.png",
    menu_info: "res/ui (new)/InfoMenu.png",
    escaleras: "res/props_itens/escaleras.png",
    boss_idle: "res/enemies/floating_skull_enemy/boss_idle1.png",
    boss_idle_izquierda: "res/enemies/floating_skull_enemy/boss_idle1_izquierda.png",
    boss_idle: "res/enemies/floating_skull_enemy/boss_idle1.png",
    boss_basico: "res/enemies/floating_skull_enemy/boss_ataqueBasico.png",
    boss_basico_izquierda: "res/enemies/floating_skull_enemy/boss_ataqueBasico_izquierda.png",
    boss_muerte:"res/enemies/floating_skull_enemy/boss_muerte.png",
    boss_muerte_izquierda:"res/enemies/floating_skull_enemy/boss_muerte_izquierda.png",
    menu_victoria: "res/ui (new)/menu_victoria.png"


};

var rutasImagenes = Object.values(imagenes);
cargarImagenes(0);

function cargarImagenes(indice){
    cache[rutasImagenes[indice]] = new Image();
    cache[rutasImagenes[indice]].src = rutasImagenes[indice];
    cache[rutasImagenes[indice]].onload = function(){
        if ( indice < rutasImagenes.length-1 ){
            indice++;
            cargarImagenes(indice);
        } else {
            iniciarJuego();
        }
    }
}
