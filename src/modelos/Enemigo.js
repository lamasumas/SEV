class Enemigo extends Modelo {

    constructor(x, y) {
        super(imagenes.enemigo, x, y)
        this.vxInteligencia = 1;
        this.vx = this.vxInteligencia;
        this.mapType = "E"
        this.estado = estados.moviendo;
        this.aMoverDerecha = new Animacion(imagenes.enemigo_movimiento,
           32, 32, 6, 6);
        this.aMoverIzquierda = new Animacion(imagenes.enemigo_movimiento_izquierda,
            32, 32, 6, 6);

        // Ref a la animación actual
        this.animacion = this.aMoverDerecha;
        this.vy = 0;
        this.vx = 0;
        this.mapa;
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
            if(posicionActual == 1)
            {
                //golpear abajo
            }
            else {
                this.vy = 2;
                this.vxInteligencia = 1;
            }
        }
        else if (0 <= tempI - 1 && this.mapa[tempI - 1][tempJ] < posicionActual)
        {
            if(posicionActual == 1)
            {
                //golpear arriba
            }
            else {
                this.vy = -2;
                this.vxInteligencia = -1;
            }
        }
        else if (this.mapa[tempI].length >= tempJ + 1 && this.mapa[tempI][tempJ + 1] < posicionActual)
        {
            if(posicionActual == 1)
            {
                //golpear derecha
            }
            else {
                this.vx = 2;
                this.vxInteligencia = 1;
            }
        }
        else if (0 <= tempJ - 1 && this.mapa[tempI][tempJ - 1] < posicionActual) {
            if(posicionActual == 1)
            {
                //golpear izquierda.
            }
            else {
                this.vx = -2;
                this.vxInteligencia = -1;
            }
        }


    }

    dibujar (scrollX){
        scrollX = scrollX || 0;
        this.animacion.dibujar(this.x - scrollX, this.y);
    }
}
