class Jugador extends Modelo {

    constructor(x, y, generarAtaqueCallback) {
        super(imagenes.jugador , x, y)
        this.vidas = 3;
        this.tiempoInvulnerable = 0;
        this.mapType = "P";
        this.mapa;
        this.dano = 1;
        this.ataqueCallback = generarAtaqueCallback;
        this.counterAtaque = 0;
        this.estado = estados.moviendo;
        this.flechas = 0;
        this.vidas = 3;
        this.invencibilidad = 0;

        this.orientacion = orientaciones.derecha;

        this.vx = 0; // velocidadX
        this.vy = 0; // velocidadY


        // Animaciones
        this.aIdleDerecha = new Animacion(imagenes.jugador_idle_derecha,
            this.ancho, this.alto, 6, 6);
        this.aIdleIzquierda = new Animacion(imagenes.jugador_idle_izquierda,
            this.ancho, this.alto, 6, 6);
        this.aCorriendoDerecha =
            new Animacion(imagenes.jugador_corriendo_derecha,
                this.ancho, this.alto, 6, 6);
        this.aCorriendoIzquierda = new Animacion(imagenes.jugador_corriendo_izquierda,
            this.ancho, this.alto, 6, 6);

        this.animacion = this.aIdleDerecha;
    }

    actualizar(){



        this.animacion.actualizar();

        this.counterAtaque--;
        // Establecer orientación
        if ( this.vx > 0 ){
            this.orientacion = orientaciones.derecha;
        }
        if ( this.vx < 0 ){
            this.orientacion = orientaciones.izquierda;
        }

        switch (this.estado){
            case estados.saltando:
                if (this.orientacion == orientaciones.derecha){
                    this.animacion = this.aSaltandoDerecha;
                }
                if (this.orientacion == orientaciones.izquierda){
                    this.animacion = this.aSaltandoIzquierda;
                }
                break;
            case estados.disparando:
                if (this.orientacion == orientaciones.derecha) {
                    this.animacion = this.aDispararDerecha;
                }
                if (this.orientacion == orientaciones.izquierda) {
                    this.animacion = this.aDispararIzquierda;
                }
                break;
            case estados.moviendo:
                if ( this.vx != 0  || this.vy != 0) {
                    if (this.orientacion == orientaciones.derecha) {
                        this.animacion = this.aCorriendoDerecha;
                    }
                    if (this.orientacion == orientaciones.izquierda) {
                        this.animacion = this.aCorriendoIzquierda;
                    }
                }
                if ( this.vx == 0 && this.vy == 0){
                    if (this.orientacion == orientaciones.derecha) {
                        this.animacion = this.aIdleDerecha;
                    }
                    if (this.orientacion == orientaciones.izquierda) {
                        this.animacion = this.aIdleIzquierda;
                    }
                }
                break;



        }

        (this.invencibilidad > 0)? this.invencibilidad--: this.invencibilidad=0;
        this.actualizarPosicion();

    }

    moverX (direccion){
            this.vx = direccion * 3;

    }

    moverY (direccion){
        this.vy = direccion * 3;
    }





    dibujar (scrollX){
        scrollX = scrollX || 0;
        if(this.invencibilidad > 0)
            contexto.globalAlpha = 0.5;
        this.animacion.dibujar(this.x - scrollX, this.y);

        contexto.globalAlpha = 1;

    }


    actualizarPosicion(){

        var lanzarFlecha = (this.flechas > 0)? true:false;
        // Eje X
        if (controles.moverX > 0 &&  (this.x - gameLayer.scrollX) - this.ancho/2 < 450) {
            this.moverX(1);

        } else if (controles.moverX < 0 && (this.x - gameLayer.scrollX) + this.ancho/2 > 29) {
            this.moverX(-1);

        } else {
            this.moverX(0);
        }

        // Eje Y
        if (controles.moverY > 0 && (this.y - gameLayer.scrollY) + this.alto/2 > 35) {
            this.moverY(-1);

        } else if (controles.moverY < 0 && (this.y - gameLayer.scrollY - this.alto/2 )< 270){
            this.moverY(1);

        } else {
            this.moverY(0);
        }


        if (this.counterAtaque <= 0) {
            //Ataques

            if (controles.atacarDerecha) {
                var ataque = new Ataque(22, 0 , imagenes.jugador_ataque_derecha, imagenes.flecha_derecha, this,lanzarFlecha);
                this.ataqueCallback(ataque);
                this.counterAtaque = 50;
                (lanzarFlecha)?this.flechas--:this.flechas=0;

            }
            else if (controles.atacarIzuierda){
                var ataque = new Ataque(-22, 0, imagenes.jugador_ataque_izquierda,imagenes.flecha_izquierda ,this, lanzarFlecha);
                this.ataqueCallback(ataque);
                this.counterAtaque = 50;

            }
            else if(controles.atacarAbajo){
                var ataque = new Ataque(0 , 22, imagenes.jugador_ataque_abajo,imagenes.flecha_abajo, this, lanzarFlecha);
                this.ataqueCallback(ataque);
                this.counterAtaque = 50;
                (lanzarFlecha)?this.flechas--:this.flechas=0;
            }
            else if(controles.atacarArriba){
                var ataque = new Ataque(0 , -22, imagenes.jugador_ataque_arriba,imagenes.flecha_arriba, this, lanzarFlecha);
                this.ataqueCallback(ataque);
                this.counterAtaque = 50;
                (lanzarFlecha)?this.flechas--:this.flechas=0;

            }

        }
    }


}
