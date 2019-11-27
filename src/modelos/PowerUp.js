class PowerUp extends Modelo{
    constructor(opcion,x,y, jugador) {

        var imagen;
        switch (opcion){
            case powerup.arco:
                imagen = imagenes.powerup_flechas;
                break;
            case powerup.vida:
                imagen = imagenes.corazon;
                break;
            case powerup.dano:
                imagen = imagenes.powerup_daño;

        }
        super(imagen,x ,y+10);
        this.jugador = jugador;
        this.opcion = opcion;
        this.borrar = false;
        this.counterStarted = false;
        this.counter = 7;

    }
    actualizar(){
        if(this.counterStarted)
        {
            this.counter--;
        }

        if(this.counter <= 0)
        {
            this.borrar=true;
        }
    }
    colisionado(){
        this.counterStarted = true;
    }

    effecto(jugador) {
        switch (this.opcion){
            case powerup.arco:
                this.jugador.flechas += 5;
                break;
            case powerup.vida:
                this.jugador.vidas++;
                break;
            case powerup.dano:
                jugador.dano++;
                break;
        }
        this.borrar = true;
    }
    dibujar (scrollX){
        scrollX = scrollX || 0;
        contexto.drawImage(this.imagen,
            this.x - this.imagen.width/2 - scrollX,
            this.y - this.imagen.height/2,20,20);

    }




}