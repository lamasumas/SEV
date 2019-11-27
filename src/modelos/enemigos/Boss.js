class Boss extends Enemigo{

    constructor(x,y, imagen, derecha_izquierda)
    {
        super(x,y, imagen);
        this.aMoverDerecha = new Animacion(imagenes.boss_idle,60,60,1,4);
        this.aMoverIzquierda = new Animacion(imagenes.boss_idle_izquierda,60,60,1,4);
        this.aAtaqueEmpujon = new Animacion(imagenes.boss_basico, 60, 60, 10 ,5)
        this.aAtaqueEmpujon_izquierda = new Animacion(imagenes.boss_basico_izquierda, 60, 60, 7 ,5)
        this.animacion = this.aMoverDerecha;
        this.aMorirIzquierda =  new Animacion(imagenes.boss_muerte_izquierda,60,60,4,4, this.finDeAnimacionMorir.bind(this));
        this.aMorirDerecha =  new Animacion(imagenes.boss_muerte,60,60,4,4, this.finDeAnimacionMorir.bind(this));
        this.vida = 10;
        this.derecha_izquierda = derecha_izquierda;
        this.counterEmpujon= 30;
        this.empujonDistancia= 0;
        this.guardadaX = 0;
        this.copia;
    }
    actualizar(jugador){

        if(this.counterEmpujon <= 0 && this.estado == estados.moviendo)
        {
            this.estado = estados.empujando;
            this.empujonDistancia = 70;
            this.guardadaX = this.x - jugador.x;
            this.guardadaY = this.y - jugador.y;
           this.copia = this.mapa;


        }

        this.accion(jugador);

        if(this.estado != estados.muerto)
            this.animacion.actualizar();
        this.counterEmpujon--;

        this.invencibilidad--;

    }

    accion(jugador){
        this.vx = 0;
        this.vy = 0;
        switch (this.estado)
        {
            case estados.empujando:
                if(this.empujonDistancia > 0) {
                    this.animacion = this.aAtaqueEmpujon;
                    if (this.guardadaX > 0) {
                        this.vxInteligencia = -1;
                        this.animacion = this.aAtaqueEmpujon_izquierda;
                    } else {

                        this.vxInteligencia = 1;
                        this.animacion = this.aAtaqueEmpujon;
                    }
                    this.calcularDireccion();

                }else{
                    this.estado = estados.moviendo;
                    this.counterEmpujon = 50;
                    this.vy = 0;
                    this.vx = 0;
                }

                this.empujonDistancia-= 2;
                break;
            case estados.muriendo:
                if(this.vxInteligencia >0)
                    this.animacion = this.aMorirDerecha;
                else if (this.vxInteligencia < 0)
                    this.animacion  = this.aMorirIzquierda;
                break;

            case estados.moviendo:
                if(this.vxInteligencia >0)
                    this.animacion = this.aMoverDerecha;
                else if (this.vxInteligencia < 0)
                    this.animacion  = this.aMoverIzquierda;
                break;
        }
    }

    calcularDireccion() {
        var tempI = Math.floor(this.y / 32);
        var tempJ = Math.floor(this.x / 32 );
        (tempJ < 0)? tempJ = 0: tempJ = tempJ;
        var posicionActual = this.copia[tempI][tempJ];

        if (this.copia.length >= tempI + 1 && this.copia[tempI + 1][tempJ] < posicionActual && this.copia[tempI + 1][tempJ] != -1)
        {

                this.vy = 5;

                this.vxInteligencia = 1;

        }

        if (0 <= tempI - 1 && this.copia[tempI - 1][tempJ] < posicionActual && this.copia[tempI - 1][tempJ] != -1)
        {
            if(posicionActual == 1)
            {
                //golpear arriba
            }
            else {
                this.vy = -5;
                this.vxInteligencia = -1;
            }
        }
        if (this.copia[tempI].length >= tempJ + 1 && this.copia[tempI][tempJ + 1] < posicionActual && this.copia[tempI  ][tempJ +1] != -1)
        {
            if(posicionActual == 1)
            {
                //golpear derecha
            }
            else {
                this.vx = 5;
                this.vxInteligencia = 1;
            }
        }
        if (0 <= tempJ - 1 && this.copia[tempI][tempJ - 1] < posicionActual && this.copia[tempI][tempJ -1] != -1) {
            if(posicionActual == 1)
            {
                //golpear izquierda.
            }
            else {
                this.vx = -5;
                this.vxInteligencia = -1;
            }
        }
    }

    finDeAnimacionMorir() {
        this.estado = estados.victoria;
        this.animacion.frameActual = 3;

    }

}