/**
 * Clase en la que se implemente el algoritmo de wavefront.
 */
class Mapa{

    constructor(anchoMapa, altoMapa) {
        this.anchoMapa = anchoMapa;
        this.altoMapa = altoMapa;
        this.mapaEsquema;
        this.player = [];
    }

    /**
     * Función utilizada en el debugeo durante el desarrollo del juego
     */
    printMapa(){
        var theMapa = ""
        for(var i = 0; i < this.mapaEsquema.length; i++)
        {
            var linea ="";
            for(var j=0; j< this.mapaEsquema[i].length; j++ )
            {
                if(this.mapaEsquema[i][j] == -1)
                    linea += " P"
                else
                    linea += " "+this.mapaEsquema[i][j]
            }
            theMapa += linea + "\n";
            linea = ""
        }
        console.log(theMapa);
        console.log("Player: [" + this.player.i +", " + this.player.j +"]")
    }


    /**
     * Función que actualiza el mapa dependiendo de los moviemientos del jugador y de los destruibles y cofres
     * @param jugador, el jugador
     * @param obstaculos, array con todos los obstaculos
     * @param destruibles, array con todos los destruibles
     * @param cofres, array con todos los cofres
     */
    updateMap(jugador, obstaculos, destruibles, cofres) {
        this.mapaEsquema = new Array(this.altoMapa + 1);
        obstaculos = obstaculos.concat(destruibles);
        obstaculos = obstaculos.concat(cofres);
        this.player = {};
        for (var i = 0; i < this.mapaEsquema.length; i++)
            this.mapaEsquema[i] = new Array(Math.floor(this.anchoMapa )).fill(0);
        obstaculos.forEach(obstaculo => {

                var tempi = Math.trunc(obstaculo.y /32);
                var tempj = Math.trunc(obstaculo.x /32);
                this.mapaEsquema[tempi][tempj] = obstaculo.mapType;


        });
        this.player.i = Math.trunc(jugador.y / 32);
        this.player.j = Math.trunc(jugador.x / 32);

        this.calcularWave();
        //this.printMapa();

    }

    /**
     * Función que calcula los indices de la matriz del wavefront
     */
    calcularWave(){

        // Colocamos el nodo inicial al mapa, 1 en P
        this.mapaEsquema[this.player.i][this.player.j] = 1;
        // Creamos el nodo inicial y lo insertamos en los nodos a explorar
        var nodoInicial = new Nodo(this.player.i, this.player.j, 1);
        var nodosExplorar= [nodoInicial];

        while( nodosExplorar.length > 0) {
            // Se exploran los vecinos
            var nodosDesclubiertos = this.descubrirNodos(nodosExplorar);
            // Se eliminan los duplicados
            nodosDesclubiertos = this.eliminarDuplicados(nodosDesclubiertos);
            // Se actualiza el mapa de pesos
            nodosDesclubiertos.forEach(nodoSeleccionado => this.mapaEsquema[nodoSeleccionado.i][nodoSeleccionado.j] = nodoSeleccionado.peso);
            nodosExplorar = nodosDesclubiertos;

        }

    }

    /**
     * Función que explora los nos ortogonales vecinos de un nodo concreto
     * @param nodosExplorar
     * @returns {[]}
     */
    descubrirNodos(nodosExplorar){
        var nodosDescubiertos = [];
        nodosExplorar.forEach( nodoActual => {
            //Abajo
            if (nodoActual.i + 1 <= this.altoMapa )
            {
                if( this.mapaEsquema[nodoActual.i + 1 ][ nodoActual.j] == 0 )
                {
                    nodosDescubiertos.push(new Nodo(nodoActual.i+1, nodoActual.j, nodoActual.peso +1));
                }
            }
            //Arriba
            if (nodoActual.i - 1 >= 0 )
            {
                if( this.mapaEsquema[nodoActual.i - 1 ][ nodoActual.j] == 0 )
                {
                    nodosDescubiertos.push(new Nodo(nodoActual.i-1, nodoActual.j, nodoActual.peso + 1));
                }
            }
            //Derecha
            if(nodoActual.j +1 <= this.anchoMapa)
            {
                if(this.mapaEsquema[nodoActual.i][nodoActual.j +1] == 0)
                {
                    nodosDescubiertos.push(new Nodo(nodoActual.i, nodoActual.j+1, nodoActual.peso + 1 ));
                }
            }
            //Izquierda
            if(nodoActual.j - 1 >= 0)
            {
                if(this.mapaEsquema[nodoActual.i][nodoActual.j - 1] == 0)
                {
                    nodosDescubiertos.push(new Nodo(nodoActual.i, nodoActual.j - 1, nodoActual.peso + 1 ));
                }
            }
        });
        return nodosDescubiertos;
    }

    /**
     * Funcion que elemina los nodos ya visitados, en otras palabras duplicados
     * @param nodosDescubiertos
     * @returns {Int32Array | Uint32Array | any[] | Int8Array | Float64Array | BigUint64Array | Uint8Array | Int16Array | BigInt64Array | Float32Array | Uint8ClampedArray | Uint16Array}
     */
    eliminarDuplicados(nodosDescubiertos){
        return nodosDescubiertos.filter( (nodoSeleccionado, index, self) => index === self.findIndex((t) =>( t.i === nodoSeleccionado.i && t.j == nodoSeleccionado.j)))
    }
}

/**
 * Clase que representa un nodo en la sala actual
 */
class Nodo{
    constructor(i,j,peso){
        this.i = i;
        this.j = j;
        this.peso = peso;
    }
}