class Mapa{

    constructor(anchoMapa, altoMapa) {
        this.anchoMapa = anchoMapa;
        this.altoMapa = altoMapa;
        this.mapaEsquema;
        this.player = [];
    }
    printMapa(){
        var theMapa = ""
        for(var i = 0; i < this.mapaEsquema.length; i++)
        {
            var linea ="";
            for(var j=0; j< this.mapaEsquema[i].length; j++ )
            {
                linea += "\t"+this.mapaEsquema[i][j]
            }
            theMapa += linea + "\n";
            linea = ""
        }
        console.log(theMapa);
        console.log("Player: [" + this.player.i +", " + this.player.j +"]")
    }


    updateMap(jugador) {
        this.mapaEsquema = new Array(this.altoMapa + 1);
        this.player = {};
        for (var i = 0; i < this.mapaEsquema.length; i++)
            this.mapaEsquema[i] = new Array(Math.floor(this.anchoMapa )).fill(0);
        this.player.i = Math.floor(jugador.y / 32);;
        this.player.j = Math.floor(jugador.x / 32);
        this.calcularWave();
      //  this.printMapa();

    }

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

    eliminarDuplicados(nodosDescubiertos){
        return nodosDescubiertos.filter( (nodoSeleccionado, index, self) => index === self.findIndex((t) =>( t.i === nodoSeleccionado.i && t.j == nodoSeleccionado.j)))
    }



}

class Nodo{
    constructor(i,j,peso){
        this.i = i;
        this.j = j;
        this.peso = peso;
    }
}