class Enemigo extends Modelo {

    constructor(x, y) {
        super(imagenes.enemigo, x, y)
        this.vxInteligencia = 0;
        this.vx = this.vxInteligencia;
        this.mapType = "E"
        this.estado = estados.moviendo;
        this.aMover = new Animacion(imagenes.enemigo_movimiento,
            this.ancho, this.alto, 6, 3);

        // Ref a la animación actual
        this.animacion = this.aMover;
        this.vy = 0;
        this.vx = 0;
        this.mapa;
    }


    actualizar (){
        this.animacion.actualizar();

        this.calcularDireccion();

        switch (this.estado){
            case estados.moviendo:
                this.animacion = this.aMover;
                break;
            case estados.muriendo:
                this.animacion = this.aMorir;
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
    }

    calcularDireccion(){
        var tempI = Math.floor(this.y / 32 );
        var tempJ = Math.floor(this.x / 32 );

        this.vx = 0;
        this.vy = 0;
        var posicionActual = this.mapa[tempI][tempJ];

        if (this.mapa.length >= tempI + 1 && this.mapa[tempI + 1][tempJ] < posicionActual)
        {
            this.vy = 3;
            this.vxInteligencia = 1;
        }
        else if (0 <= tempI - 1 && this.mapa[tempI - 1][tempJ] < posicionActual)
        {
            this.vy = -3;
            this.vxInteligencia = 1;
        }
        else if (this.mapa[tempI].length >= tempJ + 1 && this.mapa[tempI][tempJ + 1] < posicionActual)
        {
            this.vx = 3;
            this.vxInteligencia = 1;
        }
        else if (0 <= tempJ - 1 && this.mapa[tempI][tempJ - 1] < posicionActual) {
                this.vx = -3;
            this.vxInteligencia = -1;
        }

    }

    dibujar (scrollX){
        scrollX = scrollX || 0;
        this.animacion.dibujar(this.x - scrollX, this.y);


    }


}
