/**
 * Nodo dentro del mapa general del nivel
 */
class Sala{
    constructor(jugador, anteriorSala, entradaAnterior, mapa, depth, id){
        this.jugador = jugador;
        this.anteriorSala = anteriorSala;
        this.entradaAnteriorSala = entradaAnterior;
        this.izquierda = null;
        this.derecha = null;
        this.arriba = null;
        this.abajo = null;
        this.depth = depth;
        this.mapa = mapa;
        this.id = id;

        this.setAnteriorSala()
    }

    /**
     * Guarda una referencia a la sala anterior, para saber por donde entra el jugador, y por donde volver
     */
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
            case  posicionSala.bossBatle:
                return this;



        }
    }
}

/**
 * Classe que crea un objeto, que organiza,' y crea el mapa. Tambien, lleva un control sobre donde esta el jugador, y los cambios
 * de sala
 */
class Brujula {
    constructor() {
        this.salaActual;
        this.listaSalas = [];
        this.inicio;
        this.generarMapa();
        this.counterId;
        this.maxDepth = 2;
    }

    /**
     * Genera una combinacion de salas alearorias con una determinada profundidad
     */
    generarMapa(){
        this.counterId = 1;
        this.salaActual = new Sala(true,NaN, NaN, "0.txt", 0 ,this.counterId);
        this.counterId++;
        var listaNodosAActualizar = [this.salaActual];
        this.inicio = this.salaActual;
        while (listaNodosAActualizar.length > 0)
        {
            var proximaProfundida = [];
            listaNodosAActualizar.forEach(sala => {

                var derecha = false, izquierda = false ,arriba = false ,abajo = false;
                //Genara la sala de la izuierda, que no necesariamente se va a utilizar
                if(sala.izquierda == null)
                {
                    sala.izquierda = this.generarSala(posicionSala.izquierda, sala);
                    izquierda = true;
                }

                //Genara la sala de la derecha
                if(sala.derecha == null) {
                    sala.derecha = this.generarSala(posicionSala.derecha, sala);
                    derecha = true;
                }
                //Genera la sala de arriba
                if(sala.arriba == null) {
                    sala.arriba = this.generarSala(posicionSala.arriba, sala);
                    arriba = true;
                }
                //genera la sala de abajo
                if(sala.abajo == null) {
                    sala.abajo = this.generarSala(posicionSala.abajo, sala);
                    abajo = true;
                }
                //Los mete en la proxima generacion
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

    /**
     * Genera la sala en si, teneiendo en cuenta porque lugar salio de la anterior sala.
     * Si es la profundidad maxima genera una sala pre-boss
     * @param posicion , si esta a la izquierda, derecha ,... de la sala anterior
     * @param laSala
     * @returns {Sala}
     */
    generarSala(posicion, laSala){

        var siguienteSala;
        var numerSala =(laSala.depth == 3)? "depth/1" : Math.floor((Math.random()*4)+1);
        var mapaAnteriorSala = (laSala.mapa.split("/").length > 1)? parseInt(laSala.mapa.split("/")[1]): 0;
        while(numerSala == mapaAnteriorSala)
        {
             numerSala =(laSala.depth == 3)? "depth/1" : Math.floor((Math.random()*4)+1);
        }
        switch (posicion){
            case posicionSala.izquierda:
                siguienteSala = new Sala(false, laSala, posicionSala.izquierda, "Derecha/" + numerSala +".txt",laSala.depth + 1,this.counterId);
                break;
            case posicionSala.derecha:
                siguienteSala = new Sala(false, laSala, posicionSala.derecha, "Izquierda/" + numerSala + ".txt",laSala.depth + 1,this.counterId);
                break;
            case posicionSala.arriba:
                siguienteSala = new Sala(false, laSala, posicionSala.arriba, "Abajo/" + numerSala + ".txt",laSala.depth + 1,this.counterId);
                break;
            case posicionSala.abajo:
                siguienteSala = new Sala(false, laSala, posicionSala.abajo, "Arriba/" + numerSala + ".txt",laSala.depth + 1,this.counterId);
                break;


        }
        this.counterId++;
        return siguienteSala;

    }

    getNombreMapaActual(){
        return this.salaActual.mapa;
    }

    /**
     * Mueve el jugador a la sala de abajo, actualizando todo lo necesario
     */
    moverAbajo(){
        this.salaActual.jugador = false;
        this.salaActual = this.salaActual.abajo;
        this.salaActual.entradaAnteriorSala = posicionSala.abajo;
        this.salaActual.jugador = true;

    }


    /**
     * Mueve el jugador a la sala de arriba, actualizando todo lo necesario
     */
    moverArriba(){
        this.salaActual.jugador = false;
        this.salaActual = this.salaActual.arriba;
        this.salaActual.entradaAnteriorSala = posicionSala.arriba;
        this.salaActual.jugador = true;
    }


    /**
     * Mueve el jugador a la sala de la izquierda, actualizando todo lo necesario
     */
    moverIzquierda(){
        this.salaActual.jugador = false;
        this.salaActual = this.salaActual.izquierda;
        this.salaActual.entradaAnteriorSala = posicionSala.izquierda;
        this.salaActual.jugador = true;
    }


    /**
     * Mueve el jugador a la sala de la derecha, actualizando todo lo necesario
     */
    moverDerecha(){
        this.salaActual.jugador = false;
        this.salaActual = this.salaActual.derecha;
        this.salaActual.entradaAnteriorSala = posicionSala.derecha;
        this.salaActual.jugador = true;
    }

    /**
     * Lleva el jugador a la sala de jefe final
     */
    irAlBoss(){
        this.salaActual =  new Sala(this.salaActual.jugador, this.salaActual, posicionSala.bossBatle, "Boss.txt",5, this.counterId++);
    }




}