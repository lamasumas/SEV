class EnemigoSlime extends Enemigo {
    constructor(x,y, imagen, derecha_izquierda)
    {
        super(x,y, imagen);
        this.aMoverDerecha = new Animacion(imagenes.slime_derecha,32,32,2,6);
        this.aMoverIzquierda = new Animacion(imagenes.slime_izquierda,32,32,2,6);
        this.animacion = this.aMoverDerecha;
        this.aMorirIzquierda =  new Animacion(imagenes.slime_muerte_izquierda,32,32,1,6, this.finDeAnimacionMorir.bind(this));
        this.aMorirDerecha =  new Animacion(imagenes.slime_muerte_derecha,32,32,1,6, this.finDeAnimacionMorir.bind(this));
        this.vida = 2;
        this.derecha_izquierda = derecha_izquierda;
    }

    calcularDireccion() {
        this.vx = 0;
        this.vy = 0;

        if(this.derecha_izquierda) {
            if (this.vxInteligencia > 0) {
                this.vx = 2;
            }
           else{
                this.vx = -2;
            }
        }


    }

    actualizar() {
        super.actualizar();
        var tempI = Math.floor(this.y / 32);
        var tempJ = Math.floor(this.x / 32 );
        if(this.derecha_izquierda) {
            if (this.mapa[tempI][tempJ + 1] == -1 || tempJ >= 14)
                this.vxInteligencia = -1;
            else if (this.mapa[tempI][tempJ - 1] == -1 || tempJ <= 0)
                this.vxInteligencia = 1;
        }
        else{
            if (this.mapa[tempI + 1][tempJ ] == -1)
                this.vxInteligencia = -1;
            else if (this.mapa[tempI -1][tempJ] == -1 || tempJ <= 0)
                this.vxInteligencia = 1;
        }


    }





}