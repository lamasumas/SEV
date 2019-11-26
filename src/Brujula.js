class Sala{
    constructor(jugador, anteriorSala, entradaAnterior, mapa, depth){
        this.jugador = jugador;
        this.anteriorSala = anteriorSala;
        this.entradaAnteriorSala = entradaAnterior;
        this.izquierda = null;
        this.derecha = null;
        this.arriba = null;
        this.abajo = null;
        this.depth = depth;
        this.mapa = mapa;

        this.setAnteriorSala()
    }

    setAnteriorSala(){
        switch (this.entradaAnteriorSala) {
            case posicionSala.derecha:
                this.izquierda =  this.anteriorSala;
                break;
            case posicionSala.izquierda:
                this.derecha = this.anteriorSala;
                break;
            case posicionSala.abajo:
                this.arriba = this.anteriorSala;
                break;
            case posicionSala.arriba:
                this.abajo = this.anteriorSala;
                break;

        }
    }

    getSala(posicion) {
        switch (posicion) {
            case posicionSala.izquierda:
                return this.izquierda;
                break;
            case posicionSala.derecha:
                return this.derecha;
                break;
            case posicionSala.arriba:
                return this.arriba;
                break;
            case posicionSala.abajo:
                return this.abajo;
                break;


        }
    }
}

class Brujula {
    constructor() {
        this.salaActual;
        this.listaSalas = [];
        this.inicio;
        this.generarMapa();
        this.maxDepth = 2;
    }

    generarMapa(){
        this.salaActual = new Sala(true,NaN, NaN, "0.txt", 0 );
        var listaNodosAActualizar = [this.salaActual];
        this.inicio = this.salaActual;
        while (listaNodosAActualizar.length > 0)
        {
            var proximaProfundida = [];
            listaNodosAActualizar.forEach(sala => {

                var derecha = false, izquierda = false ,arriba = false ,abajo = false;
                if(sala.izquierda == null)
                {
                    sala.izquierda = this.generarSala(posicionSala.izquierda, sala);
                    izquierda = true;
                }

                if(sala.derecha == null) {
                    sala.derecha = this.generarSala(posicionSala.derecha, sala);
                    derecha = true;
                }
                if(sala.arriba == null) {
                    sala.arriba = this.generarSala(posicionSala.arriba, sala);
                    arriba = true;
                }
                if(sala.abajo == null) {
                    sala.abajo = this.generarSala(posicionSala.abajo, sala);
                    abajo = true;
                }
                if(izquierda) proximaProfundida.push(sala.izquierda);
                if(derecha) proximaProfundida.push(sala.derecha);
                if(arriba) proximaProfundida.push(sala.arriba);
                if(abajo) proximaProfundida.push(sala.abajo);




            });
            proximaProfundida = proximaProfundida.filter(x=> x.depth <= 3 );
            proximaProfundida = proximaProfundida.filter(x => x != this.inicio);
            listaNodosAActualizar = proximaProfundida;

        }
    }

    generarSala(posicion, laSala){

        var siguienteSala;
        var numerSala =(laSala.depth == 3)? "depth/1" : Math.floor((Math.random()*4)+1);
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