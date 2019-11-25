class Sala{
    constructor(jugador, anteriorSala, entradaAnterior, mapa, depth){
        this.jugador = jugador;
        this.anteriorSala = anteriorSala;
        this.entradaAnteriorSala = entradaAnterior;
        this.izquierda = NaN;
        this.derecha = NaN;
        this.arriba = NaN;
        this.abajo = NaN;
        this.depth = depth;
        this.mapa = mapa;

        this.setAnteriorSala()
    }

    setAnteriorSala(){
        switch (this.entradaAnteriorSala) {
            case posicionSala.izquierda:
                this.derecha =  this.anteriorSala;
                break;
            case posicionSala.derecha:
                this.izquierda = this.anteriorSala;
                break;
            case posicionSala.arriba:
                this.abajo = this.anteriorSala;
                break;
            case posicionSala.abajo:
                this.arriba = this.anteriorSala;
                break;

        }
    }
}

class Brujula {
    constructor() {
        this.salaActual;
        this.listaSalas = [];
        this.generarMapa();
    }

    generarMapa(){
        this.salaActual = new Sala(true,NaN, NaN, "0.txt", 0 );
        var listaNodosAActualizar = [this.salaActual];

        while (listaNodosAActualizar.length > 0)
        {
            var proximaProfundida = []
            listaNodosAActualizar.forEach(sala => {

                sala.izquierda = this.generarSala(posicionSala.izquierda, sala);
                sala.derecha = this.generarSala(posicionSala.derecha, sala);
                sala.arriba = this.generarSala(posicionSala.arriba, sala);
                sala.abajo = this.generarSala(posicionSala.abajo, sala);

            })
            proximaProfundida.filter(x=> x.depth <=1 );
            listaNodosAActualizar = proximaProfundida;

        }
    }

    generarSala(posicion, laSala){

        var siguienteSala;
        var numerSala = 1;
        switch (posicion){
            case posicionSala.izquierda:
                siguienteSala = new Sala(false, laSala, posicionSala.izquierda, "Derecha/" + numerSala +".txt",laSala.depth + 1);
                break;
            case posicionSala.derecha:
                siguienteSala = new Sala(false, laSala, posicionSala.derecha, "Izquierda/" + numerSala + ".txt",laSala.depth + 1);
                break;
            case posicionSala.arriba:
                siguienteSala = new Sala(false, laSala, posicionSala.arriba, "Abajo/" + numerSala + ".txt",laSala.depth + 1);
                break;
            case posicionSala.abajo:
                siguienteSala = new Sala(false, laSala, posicionSala.abajo, "Arriba/" + numerSala + ".txt",laSala.depth + 1);
                break;


        }
        return siguienteSala;

    }

    getNombreMapaActual(){
        return this.salaActual.mapa;
    }

    moverAbajo(){
        this.salaActual.jugador = false;
        this.salaActual = this.salaActual.abajo;
        this.salaActual.entradaAnteriorSala = posicionSala.abajo;
        this.salaActual.jugador = true;

    }

    moverArriba(){
        this.salaActual.jugador = false;
        this.salaActual = this.salaActual.arriba;
        this.salaActual.entradaAnteriorSala = posicionSala.arriba;
        this.salaActual.jugador = true;
    }

    moverIzquierda(){
        this.salaActual.jugador = false;
        this.salaActual = this.salaActual.izquierda;
        this.salaActual.entradaAnteriorSala = posicionSala.izquierda;
        this.salaActual.jugador = true;
    }

    moverDerecha(){
        this.salaActual.jugador = false;
        this.salaActual = this.salaActual.derecha;
        this.salaActual.entradaAnteriorSala = posicionSala.derecha;
        this.salaActual.jugador = true;
    }


}