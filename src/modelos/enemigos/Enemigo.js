class Enemigo extends Modelo {

    constructor(x, y , imagen) {
        super(imagen, x, y);
        this.vxInteligencia = 1;
        this.vx = this.vxInteligencia;
        this.mapType = "E"
        this.estado = estados.moviendo;
        this.aMoverDerecha = new Animacion(imagenes.enemigo_movimiento,
           32, 32, 6, 6);
        this.aMoverIzquierda = new Animacion(imagenes.enemigo_movimiento_izquierda,
            32, 32, 6, 6);
        this.aMorirDerecha = new Animacion(imagenes.enemigo_morir_derecha,
            32, 32, 4, 6, this.finDeAnimacionMorir.bind(this));
        this.aMorirIzquierda = new Animacion(imagenes.enemigo_morir_izquierda,
            32, 32, 4, 6, this.finDeAnimacionMorir.bind(this));
        this.aMuerto = new Animacion(imagenes.vacio,32, 32, 1, 1);
        this.reproduciendo = false;

        // Ref a la animación actual
        this.animacion = this.aMoverDerecha;
        this.vida = 1;
        this.vy = 0;
        this.vx = 0;
        this.mapa;
        this.invencibilidad = 0;

    }

    finDeAnimacionMorir(){
        this.estado = estados.muerto;
        this.animacion = this.aMuerto;
    }
    actualizar (){
        this.animacion.actualizar();

        this.calcularDireccion();

        switch (this.estado){
            case estados.moviendo:
                if(this.vxInteligencia >0)
                    this.animacion = this.aMoverDerecha;
                else if (this.vxInteligencia < 0)
                    this.animacion  = this.aMoverIzquierda;
                break;
            case estados.muriendo:
                if(this.vxInteligencia > 0 && !this.reproduciendo) {
                    this.reproduciendo = true;
                    this.animacion = this.aMorirDerecha;
                }
                else if(this.vxInteligencia < 0 && !this.reproduciendo){
                    this.reproduciendo = true;
                    this.animacion = this.aMorirIzquierda;
                }

                break;
        }


        if ( this.estado == estados.muriendo) {
            this.vx = 0;
        } else {
            if ( this.vx == 0){
                this.vxInteligencia = this.vxInteligencia * -1;
                this.vx = this.vxInteligencia;
            }
        }
        this.invencibilidad--;
    }

    calcularDireccion(){
        var tempI = Math.floor(this.y / 32);
        var tempJ = Math.floor(this.x / 32 );
        (tempJ < 0)? tempJ = 0: tempJ = tempJ;
        var posicionActual = this.mapa[tempI][tempJ];

        if (this.mapa.length >= tempI + 1 && this.mapa[tempI + 1][tempJ] < posicionActual && this.mapa[tempI + 1][tempJ] != -1)
        {

            this.vy = 2;
            this.vxInteligencia = 1;

        }

        if (0 <= tempI - 1 && this.mapa[tempI - 1][tempJ] < posicionActual && this.mapa[tempI - 1][tempJ] != -1)
        {

            this.vy = -2;
            this.vxInteligencia = -1;

        }
         if (this.mapa[tempI].length >= tempJ + 1 && this.mapa[tempI][tempJ + 1] < posicionActual && this.mapa[tempI  ][tempJ +1] != -1)
        {

            this.vx = 2;
            this.vxInteligencia = 1;

        }
         if (0 <= tempJ - 1 && this.mapa[tempI][tempJ - 1] < posicionActual && this.mapa[tempI][tempJ -1] != -1) {

            this.vx = -2;
            this.vxInteligencia = -1;

        }
    }

    dibujar (scrollX){
        scrollX = scrollX || 0;
        this.animacion.dibujar(this.x - scrollX, this.y);
    }
}
