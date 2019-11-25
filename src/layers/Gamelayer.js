class GameLayer extends Layer {

    constructor() {
        super();

        this.iniciar();
    }

    iniciar() {
        this.scrollX = 0;
        controles.pausa = false;
        this.scrollY = 0;
        this.fondo = new Fondo(imagenes.fondo, 480 * 0.5, 320 * 0.5);
        this.jugador ;
        this.espacios = new Espacio(0);
        this.enemigos = [];
        this.ataques = [];
        this.obstaculos = [];
        this.destruibles = [];
        this.triggers = [];
        this.cofres = [];
        this.powerups = [];
        this.teletransportes = [];
        this.contadorFlechas = new Fondo(imagenes.powerup_flechas,400,20);
        this.contadorFlechasNumeros = new Texto(0, 420,28);
        this.cargarMapa("res/mapas/"+ brujula.getNombreMapaActual(), 1);
        this.mapa;
        this.pausa = new Fondo(imagenes.pausa, 420/1.8, 320 /2.2);
        this.menuMuerte = new FondoAnimado(imagenes.menu_muerte_estatico, imagenes.menu_muerte,
            420/1.8,320/2.2, 120, 125, 4, 6);
        this.ajustarPosicionEntrada();
    }


    actualizar (){
        if(controles.pausa)
            return;

        if (this.jugador.vidas == 0)
        {
            this.menuMuerte.actualizar();
            return ;
        }

        //this.calcularScroll();
        this.mapa.updateMap(this.jugador, this.obstaculos);


        this.espacios.getEstaticos().forEach( x => x.actualizar());

        this.ataques.forEach(elAtaque =>  {
            if(elAtaque.estado == estados.finAnimacion)
                this.ataques.splice(this.ataques.indexOf(elAtaque), 1);
            else
                elAtaque.actualizar();
        })

        this.destruibles.forEach( destruible =>
            (destruible.estado == estados.finAnimacion ?
                this.destruibles.splice(this.destruibles.indexOf(destruible),1):destruible.actualizar()))
        this.espacios.actualizar();


        for(i = 0; i< this.cofres.length; i++)
        {
            if(this.cofres[i].estado == estados.finAnimacion)
            {
                this.espacios.eliminarCuerpoEstatico(this.cofres[i]);
                this.cofres.splice(i,1);
            }
        }

      //  this.espacio.actualizar();
        this.fondo.vx = -1;
        this.jugador.mapa = this.mapa.mapaEsquema;
        this.jugador.actualizar()
        this.enemigos.forEach(theEnemigo => {
            theEnemigo.mapa= this.mapa.mapaEsquema;
            if(theEnemigo.estado == estados.muerto)
            {
                this.enemigos.splice(this.enemigos.indexOf(theEnemigo), 1)
            }
            theEnemigo.actualizar();
        });

        //colisiones ataque-enemigo
        var i,j;
        for( i = 0; i < this.ataques.length; i++){
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

        //colisiones ataque-obstaculo
        {
            for( i = 0; i < this.ataques.length; i++){
                for( j = 0; j< this.obstaculos.length; j++)
                {
                    if(this.ataques[i].colisiona(this.obstaculos[j]))
                    {
                        this.ataques.splice(i,1);
                    }

                }
            }
        }

        //colisiones destruible
        for( i = 0; i < this.ataques.length; i++){
            for( j = 0; j< this.destruibles.length; j++)
            {
                if(this.ataques[i].colisiona(this.destruibles[j]))
                {
                    this.destruibles[j].loHanGolpeado()
                    this.espacios.eliminarCuerpoEstatico(this.destruibles[j]);
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

      //colisiones enemigo-jugador
        this.enemigos.forEach( theEnemigo => {
            if (theEnemigo.colisiona(this.jugador) && this.jugador.invencibilidad <=0 &&
                (theEnemigo.estado != estados.muriendo && theEnemigo.estado != estados.muerto)) {
                this.jugador.vidas--;
                this.jugador.invencibilidad = 30;
            }});


        //colisiones powerup
        for(i = 0; i< this.powerups.length; i++){

            if(this.powerups[i].colisiona(this.jugador)){
                this.powerups[i].colisionado();
                this.powerups[i].actualizar();
            }
            if(this.powerups[i].borrar == true)
            {
                this.powerups[i].effecto();
                this.powerups.splice(i,1)

            }
        }

        //Teletransporte
        for(i = 0; i< this.teletransportes.length; i++)
        {
            if(this.jugador.colisiona(this.teletransportes[i]))
            {
                this.teletransportes[i].teleport();
                var copia_vidas = this.jugador.vidas;
                var copia_dano = this.jugador.dano;
                var copia_flechas = this.jugador.flechas;
                this.iniciar();
                this.jugador.vidas = copia_vidas;
                this.jugador.flechas = copia_flechas;
                this.jugador.dano = copia_dano;
                break;
            }

        }





        this.contadorFlechasNumeros.valor= this.jugador.flechas;
    }
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

    dibujar() {

        //this.calcularScroll();

        this.fondo.dibujar();
        contexto.globalAlpha = 0.5;
        for(var i=1; i<= this.jugador.vidas;i++)
        {
            new Fondo(imagenes.corazon, 20*i, 20).dibujar();
        }
        this.contadorFlechasNumeros.dibujar();
        this.contadorFlechas.dibujar(scrollX);
        contexto.globalAlpha = 1;

        this.espacios.getEstaticos().forEach( x => x.dibujar())

        this.jugador.dibujar(this.scrollX);

        this.ataques.forEach(elAtaque => elAtaque.dibujar(this.scrollX))
        this.enemigos.forEach(theEnemigo =>{
            (theEnemigo.invencibilidad > 0) ? contexto.globalAlpha = 0.5: contexto.globalAlpha=1;
            theEnemigo.dibujar(this.scrollX)
            contexto.globalAlpha = 1;
        });
        this.destruibles.forEach(destruible => destruible.dibujar(this.scrollX));



        if(controles.pausa)
        {
            this.pausa.dibujar();
        }
        if (this.jugador.vidas == 0)
        {
            this.menuMuerte.dibujar(this.scrollX);
        }


        this.powerups.forEach( powerup => powerup.dibujar());


    }


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
                var barril = new Bloque( imagenes.barril, x+12,y +12);
                this.obstaculos.push(barril)
                this.espacios.agregarCuerpoEstatico(barril);
                break;
            case "D":
                var destruible = new Bloque_Destruible(imagenes.mesa, imagenes.mesa_rota,x +12,
                    y +12,32,32, 4, 2);
                this.destruibles.push(destruible);
                this.espacios.agregarCuerpoEstatico(destruible);
                break;
            case "C":
                var cofre = new Cofre(imagenes.cofre_cerrado, imagenes.cofre_abierto, imagenes.vacio, x + 12,
                    y +12,this.generarEnemigo.bind(this), this.generarPowerup.bind(this));
                var theTrigger = new Trigger(x +12 , y+36, cofre);
                this.triggers.push(theTrigger);
                this.cofres.push(cofre);
                this.espacios.agregarCuerpoEstatico(cofre);
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
                var teleport = new Teletransporte(x +10, y +12, imagenes.vacio, posicionSala.derecha);
                this.teletransportes.push(teleport);
                break;
            case "L":
                var teleport = new Teletransporte(x - 12, y +12, imagenes.vacio, posicionSala.izquierda);
                this.teletransportes.push(teleport);
                break;
            case "U":
                var teleport = new Teletransporte(x + 12, y - 5 , imagenes.vacio, posicionSala.arriba);
                this.teletransportes.push(teleport);
                break;
            case "A":
                var teleport = new Teletransporte(x + 12, y + 20, imagenes.vacio, posicionSala.abajo);
                this.teletransportes.push(teleport);
                break;

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

    generarAtaque(ataque){

        this.ataques.push(ataque);
    }
    generarEnemigo(x,y)
    {
        var enemigo = new Enemigo(x, y, imagenes.enemigo);
        this.espacios.agregarCuerpoDinamico(enemigo);
        this.enemigos.push(enemigo);
    }

    generarPowerup(opcion, x,y){

        this.powerups.push( new PowerUp(opcion,x,y, this.jugador));
    }


}
