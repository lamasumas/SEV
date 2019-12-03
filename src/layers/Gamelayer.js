class GameLayer extends Layer {
    /**
     *
     * Constructor
     */
    constructor() {
        super();
        this.iniciar();
    }

    /**
     * Funcion que inicializa todas las variables
     */
    iniciar() {
        this.scrollX = 0;
        controles.pausa = false;
        this.victoria = false;
        this.scrollY = 0;
        this.fondo = new Fondo(imagenes.fondo, 480 * 0.5, 320 * 0.5);
        this.espacios = new Espacio(0);
        this.enemigos = [];
        this.ataques = [];
        this.obstaculos = [];
        this.destruibles = [];
        this.triggers = [];
        this.cofres = [];
        this.powerups = [];
        this.teletransportes = [];
        this.bloquesAnimados =[];
        this.contadorFlechas = new Fondo(imagenes.powerup_flechas,400,20);
        this.contadorDaños = new Fondo(imagenes.powerup_daño,350, 20);
        this.contadorDañosNumero = new Texto(0,370,28);
        this.contadorFlechasNumeros = new Texto(0, 420,28);
        this.cargarMapa("res/mapas/"+ brujula.getNombreMapaActual(), 1);
        this.mapa;
        this.pausa = new Fondo(imagenes.pausa, 420/1.8, 320 /2.2);
        this.menuVictoria = new Fondo(imagenes.menu_victoria, 420/1.8, 320 /2.2);
        this.menuMuerte = new FondoAnimado(imagenes.menu_muerte_estatico, imagenes.menu_muerte,
            420/1.8,320/2.2, 120, 125, 4, 6);
        this.ajustarPosicionEntrada();
        this.counterMuerte= 10;
        this.cofreIdGenerator = 1;
        reproducirMusica();
        this.muerteEffect = false;
        this.victoriaEffecto = false;
    }


    /**
     * Funcion que se llama en cada frame
     */
    actualizar (){
        //Control de pausa
        if(controles.pausa && !this.victoria)
            return;

        //Control de menu de muerte
        if (this.jugador.vidas == 0 )
        {
            if(!this.muerteEffect)
                 reproducirEfecto(efectos.muerte_jugador);
            cofresAbiertos = [];
            this.menuMuerte.actualizar();
            if(teclas.length > 0 && this.counterMuerte <=0)
            {
                pararMusica();
                layer = menuLayer;
                brujula = new Brujula();
                controles.continuar = false;
                return;
            }
            this.counterMuerte--;
            this.muerteEffect = true;
            return ;
        }

        //Control de menu de victoria
        if(this.victoria )
        {
            if(!this.victoriaEffecto)
                reproducirEfecto(efectos.vicotria);

            if(teclas.length > 0)
            {
                pararMusica();
                layer = menuLayer;
                brujula = new Brujula();
                controles.continuar = false;
                return;
            }

        }

        //Llama a actualizar el waveframe, para los enemigos
        this.mapa.updateMap(this.jugador, this.obstaculos, this.destruibles, this.cofres);

        //Actualizacion de los espacios estaticos
        this.espacios.getEstaticos().forEach( x => x.actualizar());

        //Actualizacion de un ataque, para borrarlo si a acabado
        this.ataques.forEach(elAtaque =>  {
            if(elAtaque.estado == estados.finAnimacion)
                this.ataques.splice(this.ataques.indexOf(elAtaque), 1);
            else
                elAtaque.actualizar();
        });

        //Destruir un objeto destruible si colisiona con un ataque
        for( i = 0; i < this.ataques.length; i++){
            for( j = 0; j< this.destruibles.length; j++)
            {
                if(this.ataques[i].colisiona(this.destruibles[j]))
                {
                    this.destruibles[j].loHanGolpeado();
                    this.espacios.eliminarCuerpoEstatico(this.destruibles[j]);
                }
            }
        }
        //Si acabo la animacion del objeto destruible se borra
        this.destruibles.forEach( destruible =>
            (destruible.estado == estados.finAnimacion ?
                this.destruibles.splice(this.destruibles.indexOf(destruible),1):destruible.actualizar()))
        //Se actualizan los espacions (fisicas)
        this.espacios.actualizar();
        //Los bloques estaticos animados se actualizan
        this.bloquesAnimados.forEach(x => x.actualizar());


        //Eliminar el cofre si abierto
        for(i = 0; i< this.cofres.length; i++)
        {
            if(this.cofres[i].estado == estados.finAnimacion)
            {
                this.espacios.eliminarCuerpoEstatico(this.cofres[i]);
                this.cofres.splice(i,1);
            }
        }

        this.fondo.vx = -1;
        //Actualizar la posicion del jugador en el wavefront
        this.jugador.mapa = this.mapa.mapaEsquema;
        this.jugador.actualizar()


        //colisiones ataque-enemigo o ataque-jugador, si colisionan se elimina
        var i,j;
        for( i = 0; i < this.ataques.length; i++){
            if (this.ataques[i].objetoASeguir.mapType =="P")
            {
                for( j = 0; j< this.enemigos.length; j++)
                {
                    if(this.ataques[i].colisiona(this.enemigos[j]) && this.enemigos[j].invencibilidad <= 0)
                    {
                        this.enemigos[j].vida -= this.ataques[i].dano;
                        this.enemigos[j].invencibilidad = 10;
                        if(this.enemigos[j].vida <=0) {
                            this.enemigos[j].estado = estados.muriendo;
                            this.espacios.eliminarCuerpoDinamico(this.enemigos[j]);
                        }
                    }


                }
                }
        }

        //Si colisiona un ataque con un obstaculo, se elimina el ataque
        {
            for( i = 0; i < this.ataques.length; i++){
                for( j = 0; j< this.obstaculos.length; j++)
                {
                    if(this.ataques[i].colisiona(this.obstaculos[j]))
                    {
                        this.ataques.splice(i,1);
                        break;
                    }

                }
            }
        }


        //Activacion de triggers
        for( i = 0; i< this.triggers.length; i++)
        {
            if(this.jugador.colisiona(this.triggers[i]) && controles.interactuar)
            {
                this.triggers[i].triggered();
                this.triggers.splice(i,1);
            }
        }

      //Si un enemigo colisiona con el jugador, el jugador pierde una vida
        this.enemigos.forEach( theEnemigo => {
            if (theEnemigo.colisiona(this.jugador) && this.jugador.invencibilidad <=0 &&
                (theEnemigo.estado != estados.muriendo && theEnemigo.estado != estados.muerto)) {
                this.jugador.vidas--;
                this.jugador.invencibilidad = 30;
            }});


        //Se actualiza la version del waveframe de los enemigos, y se actualiza
        this.enemigos.forEach(theEnemigo => {
            theEnemigo.mapa= this.mapa.mapaEsquema;
            if(theEnemigo.estado == estados.muerto)
            {
                this.enemigos.splice(this.enemigos.indexOf(theEnemigo), 1)
            }
            if(theEnemigo.estado == estados.victoria)
            {
                this.victoria = true;
            }
            theEnemigo.actualizar(this.jugador);
        });

        //colisiones powerup-jugador
        for(i = 0; i< this.powerups.length; i++){

            if(this.powerups[i].colisiona(this.jugador)){
                this.powerups[i].colisionado();
                this.powerups[i].actualizar();
            }
            if(this.powerups[i].borrar == true)
            {
                this.powerups[i].effecto(this.jugador);
                this.powerups.splice(i,1)

            }
        }

        //Colisiones con los teletransportes
        for(i = 0; i< this.teletransportes.length; i++)
        {
            if(this.jugador.colisiona(this.teletransportes[i]) && brujula.salaActual.getSala(this.teletransportes[i].posicion) != null)
            {
                this.teletransportes[i].teleport();
                //carga el siguiente mapa
                this.cambiarMapa(this.jugador.dano,this.jugador.flechas, this.jugador.vidas)
                break;
            }

        }

        //Actualizar los contadores
        this.contadorFlechasNumeros.valor= this.jugador.flechas;
        this.contadorDañosNumero.valor = this.jugador.dano;
    }

    /**
     * Se realiza una copia en el cambio de mapa del daño del jugador, la vida y la flechas
     * @param dano del jugaor
     * @param flechas del jugador
     * @param vidadel jugador
     */
    cambiarMapa(dano, flechas, vida){

        this.iniciar();
        this.jugador.vidas = vida;
        this.jugador.flechas = flechas;
        this.jugador.dano = dano;

    }

    /**
     * Ajusta la posicion del jugador al entrar en una sala, para que no colisione con el teletransporte,
     * y entre en un bucle infinto del que no pueda salir y no pueda seguir jugando a este juego favuloso.
     */
    ajustarPosicionEntrada() {
        if (brujula.salaActual.entradaAnteriorSala != NaN) {

            switch (brujula.salaActual.entradaAnteriorSala) {
                case posicionSala.izquierda:
                    var entrada = this.teletransportes.filter(x => x.posicion == posicionSala.derecha)[0];
                    this.jugador.x = entrada.x - 30;
                    this.jugador.y = entrada.y;
                    break;
                case posicionSala.derecha:
                    var entrada = this.teletransportes.filter(x => x.posicion == posicionSala.izquierda)[0];
                    this.jugador.x = entrada.x + 30;
                    this.jugador.y = entrada.y;
                    break;
                case posicionSala.abajo:
                    var entrada = this.teletransportes.filter(x => x.posicion == posicionSala.arriba)[0];
                    this.jugador.x = entrada.x;
                    this.jugador.y = entrada.y + 25;
                    break;
                case posicionSala.arriba:
                    var entrada = this.teletransportes.filter(x => x.posicion == posicionSala.abajo)[0];
                    this.jugador.x = entrada.x;
                    this.jugador.y = entrada.y - 25;
                    break;


            }
    }



    }

    /**
     * Actualiza la informacion visual en pantalla (animacion, volver a ppintar objetos)
     */
    dibujar() {

        this.fondo.dibujar();
        this.espacios.getEstaticos().forEach( x => x.dibujar());
        this.bloquesAnimados.forEach(x => x.dibujar());

        this.teletransportes.forEach(x => x.dibujar());
        //Pinta a los enemigos y si es golpeado, se modifica el alfa
        this.enemigos.forEach(theEnemigo =>{
            (theEnemigo.invencibilidad > 0) ? contexto.globalAlpha = 0.5: contexto.globalAlpha=1;
            theEnemigo.dibujar(this.scrollX);
            contexto.globalAlpha = 1;
        });
        this.jugador.dibujar(this.scrollX);
        this.ataques.forEach(elAtaque => elAtaque.dibujar(this.scrollX));
        this.destruibles.forEach(destruible => destruible.dibujar(this.scrollX));

        if(controles.pausa && !this.victoria)
        {
            this.pausa.dibujar();
        }
        if(this.victoria)
        {
            this.menuVictoria.dibujar();
        }
        if (this.jugador.vidas == 0)
        {
            this.menuMuerte.dibujar(this.scrollX);
        }
 

        this.powerups.forEach( powerup => powerup.dibujar());

        //Contador dinamico de vida
        contexto.globalAlpha = 0.5;
        for(var i=1; i<= this.jugador.vidas;i++)
        {
            new Fondo(imagenes.corazon, 20*i, 20).dibujar();
        }
        this.contadorFlechasNumeros.dibujar();
        this.contadorFlechas.dibujar(scrollX);
        this.contadorDaños.dibujar(scrollX);
        this.contadorDañosNumero.dibujar();
        contexto.globalAlpha = 1;
    }

    /**
     * Carga el mapa del txt
     * @param ruta
     * @param extraSize
     */
    cargarMapa(ruta , extraSize) {
        var fichero = new XMLHttpRequest();
        fichero.open("GET", ruta, false);

        fichero.onreadystatechange = function () {
            var texto = fichero.responseText;
            var lineas = texto.split('\n');
            this.anchoMapa = (lineas[0].length-1) ;
            this.altoMapa = lineas.length;
            this.mapa = new Mapa(this.anchoMapa+1, this.altoMapa)
            for (var i = 0; i < lineas.length; i++) {
                var linea = lineas[i];
                for (var j = 0; j < linea.length; j++) {
                    var simbolo = linea[j];
                   // var x = 40 / 2 + j * 40; // x central
                    //var y = 32 + i * 32; // y de abajo
                    this.cargarObjetoMapa(simbolo, j*32, i*32);
                }
            }
        }.bind(this);

        fichero.send(null);
    }

    /**
     * Interpreta el txt
     * @param simbolo, objeto simbolico
     * @param x, posicion
     * @param y, posicion
     */
    cargarObjetoMapa(simbolo, x, y) {
        switch(simbolo) {

            case "1":
                this.jugador = new Jugador(x, y +12, this.generarAtaque.bind(this));
                // modificación para empezar a contar desde el suelo
                //this.jugador.y = this.jugador.y - this.jugador.alto / 2;
                this.espacios.agregarCuerpoDinamico(this.jugador);
                break;
            case "E":
                var enemigo = new Enemigo(x,y+12, imagenes.enemigo);
                this.enemigos.push(enemigo);
                this.espacios.agregarCuerpoDinamico(enemigo);
                break;
            case "B":
                var barril = new Bloque( imagenes.barril, x+12,y +12, 30);
                this.obstaculos.push(barril)
                this.espacios.agregarCuerpoEstatico(barril);
                break;
            case "D":
                var destruible = new Bloque_Destruible(imagenes.mesa, imagenes.mesa_rota,x +12,
                    y +12,32,32, 4, 2 );
                this.destruibles.push(destruible);
                this.espacios.agregarCuerpoEstatico(destruible);
                break;
            case "C":
                var cofre = new Cofre(imagenes.cofre_cerrado, imagenes.cofre_abierto, imagenes.vacio, x + 12,
                    y +12,this.generarEnemigo.bind(this), this.generarPowerup.bind(this), this.cofreIdGenerator);
                var theTrigger = new Trigger(x +12 , y+36, cofre);
                this.triggers.push(theTrigger);
                this.cofres.push(cofre);
                this.espacios.agregarCuerpoEstatico(cofre);
                this.cofreIdGenerator++;
                break;
            case "P":
                var elPowerup = new PowerUp(powerup.dano, x +12, y+12, this.jugador);
                this.powerups.push(elPowerup);
                break;
            case "S":
                var enemigoSlime = new EnemigoSlime(x +12, y+12, imagenes.slime, true);
                this.enemigos.push(enemigoSlime);
                this.espacios.agregarCuerpoDinamico(enemigoSlime);
                break;
            case "V":
                var enemigoVolador = new EnemigoVolador(x+12, y+12, imagenes.volador,true);
                this.enemigos.push(enemigoVolador);
                this.espacios.agregarCuerpoDinamico(enemigoVolador);
                break;
            case "R":
                //Si no tiene conexion con la sala de la derecha, se pinta una pared, para que parezca cerrado
                if(brujula.salaActual.derecha != null) {
                    var teleport = new Teletransporte(x + 10, y + 12, imagenes.vacio, posicionSala.derecha);
                    this.teletransportes.push(teleport);
                }
                else
                {
                    this.cargarObjetoMapa("W",x,y)
                }
                break;
            case "L":
                //Si no tiene conexion con la sala de la izquierda, se pinta una pared, para que parezca cerrado
                if(brujula.salaActual.izquierda != null) {
                var teleport = new Teletransporte(x - 10, y +12, imagenes.vacio, posicionSala.izquierda);
                this.teletransportes.push(teleport);
                }
                else
                {
                  this.cargarObjetoMapa("W",x,y)
                }
                break;
            case "U":
                //Si no tiene conexion con la sala de arriba, se pinta una pared, para que parezca cerrado
                if(brujula.salaActual.arriba != null) {
                    var teleport = new Teletransporte(x + 12, y - 5, imagenes.vacio, posicionSala.arriba);
                    this.teletransportes.push(teleport);
                }else{
                    this.cargarObjetoMapa("W",x,y)
                }
                break;
            case "A":
               // Si no tiene conexion con la sala de abajo, se pinta una pared, para que parezca cerrado
                if(brujula.salaActual.abajo != null){
                    var teleport = new Teletransporte(x + 12, y + 20, imagenes.vacio, posicionSala.abajo);
                    this.teletransportes.push(teleport);
                }else{
                    this.cargarObjetoMapa("W",x,y)
                }
                break;
            case "T":
                var torch = new  BloqueAnimado(imagenes.torch, x+12, y+12, imagenes.torch);
                this.bloquesAnimados.push(torch);

                break;
            case "W":
                var aleatorio = Math.floor((Math.random()*3) +1);
                var imagenWall = imagenes.wall_1;
                //ESscoge un tipo muro aleatorio
                switch (aleatorio)
                {
                    case 1: imagenWall = imagenes.wall_1; break;
                    case 2: imagenWall = imagenes.wall_2; break;
                    case 3: imagenWall = imagenes.wall_3; break;
                }
                var wall = new Bloque(imagenWall, x+12, y+12, 30)
                this.obstaculos.push(wall)
                this.espacios.agregarCuerpoEstatico(wall);
                break;
            case "N":
                //Carga la sala del jefe final
                var entradaBoss = new Teletransporte(x + 12, y +12, imagenes.escaleras, posicionSala.bossBatle);
                this.teletransportes.push(entradaBoss);
                break;
            case "F":
                //Un enemigo super chungo
                var boss = new Boss(x+12, y+12,imagenes.boss_idle);
                this.enemigos.push(boss);
                this.espacios.agregarCuerpoDinamico(boss);


        }
    }

    calcularScroll() {
        // limite izquierda
        if (this.jugador.x > 480 * 0.3) {
            if (this.jugador.x - this.scrollX < 480 * 0.3) {
                this.scrollX = this.jugador.x - 480 * 0.3;
            }
        }

        // limite derecha
        if (this.jugador.x < this.anchoMapa - 480 * 0.3) {
            if (this.jugador.x - this.scrollX > 480 * 0.7) {
                this.scrollX = this.jugador.x - 480 * 0.7;
            }


        }


    }

    /**
     *
     * Callback para que el jugador genere un ataque, y se modularize algo el codigo
     * @param ataque, objeto de ataque
     */
    generarAtaque(ataque){
        this.ataques.push(ataque);
        (ataque.flecha)?reproducirEfecto(efectos.flecha): reproducirEfecto(efectos.espada);
    }

    /**
     * Callback para que el cofre (trampa) genere un enemigo
     * @param x
     * @param y
     */
    generarEnemigo(x,y)
    {
        var enemigo = new Enemigo(x, y, imagenes.enemigo);
        this.espacios.agregarCuerpoDinamico(enemigo);
        this.enemigos.push(enemigo);
    }

    /**
     * Callback para que el cofre te genere un powerup
     * @param opcion
     * @param x
     * @param y
     */
    generarPowerup(opcion, x,y){

        this.powerups.push( new PowerUp(opcion,x,y, this.jugador));
    }


}
