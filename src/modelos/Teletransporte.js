class Teletransporte extends Modelo {

    constructor(x, y , imagen, posicion) {
        super(imagen, x, y);
        this.posicion = posicion;
    }

    teleport(){
        switch(this.posicion){
            case posicionSala.abajo:
                brujula.moverAbajo();
                break;
            case posicionSala.arriba:
                brujula.moverArriba();
                break;
            case posicionSala.derecha:
                brujula.moverDerecha();
                break;
            case posicionSala.izquierda:
                brujula.moverIzquierda();
                break;
            case posicionSala.bossBatle:
                brujula.irAlBoss();

        }

    }

}