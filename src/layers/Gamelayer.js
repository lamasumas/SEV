class GameLayer extends Layer {

    constructor() {
        super();

        this.iniciar();
    }

    iniciar() {
        this.scrollX = 0;
        this.fondo = new Fondo(imagenes.fondo, 480 * 0.5, 320 * 0.5);
        this.jugador ;
        this.espacios = new Espacio(0);
        this.enemigos = [];
        this.cargarMapa("res/"+nivelActual+".txt", 1);
        this.mapa;
    }


    actualizar (){
        //this.calcularScroll();
        this.mapa.updateMap(this.jugador);
        if (this.pausa){
            return;
        }

        this.espacios.actualizar();

      //  this.espacio.actualizar();
        this.fondo.vx = -1;
        this.jugador.actualizar()
        this.enemigos.forEach(theEnemigo => {
            theEnemigo.mapa= this.mapa.mapaEsquema;
            theEnemigo.actualizar();
        });

    }


    dibujar() {

        //this.calcularScroll();
        this.fondo.dibujar();
        this.jugador.dibujar(this.scrollX);
        this.enemigos.forEach(theEnemigo => theEnemigo.dibujar(this.scrollX));


    }


    cargarMapa(ruta , extraSize) {
        var fichero = new XMLHttpRequest();
        fichero.open("GET", ruta, false);

        fichero.onreadystatechange = function () {
            var texto = fichero.responseText;
            var lineas = texto.split('\n');
            this.anchoMapa = (lineas[0].length-1) * extraSize;
            this.altoMapa = lineas.length;
            this.mapa = new Mapa(this.anchoMapa, this.altoMapa)
            for (var i = 0; i < lineas.length; i++) {
                var linea = lineas[i];
                for (var j = 0; j < linea.length; j++) {
                    var simbolo = linea[j];
                    var x = 40 / 2 + j * 40; // x central
                    var y = 32 + i * 32; // y de abajo
                    this.cargarObjetoMapa(simbolo, x, y);
                }
            }
        }.bind(this);

        fichero.send(null);
    }

    cargarObjetoMapa(simbolo, x, y) {
        switch(simbolo) {

            case "1":
                this.jugador = new Jugador(x, y);
                // modificación para empezar a contar desde el suelo
                //this.jugador.y = this.jugador.y - this.jugador.alto / 2;

                this.espacios.agregarCuerpoDinamico(this.jugador);
                break;
            case "E":
                var enemigo = new Enemigo(x,y, this.jugador);
                this.enemigos.push(enemigo);
                this.espacios.agregarCuerpoDinamico(enemigo);
        }
    }

    calcularScroll() {
        // limite izquierda
        if (this.jugador.x > 480 * 0.3) {
            if (this.jugador.x - this.scrollX < 480 * 0.3) {
                this.scrollX = this.jugador.x - 480 * 0.3;
            }
        }

        // limite derecha
        if (this.jugador.x < this.anchoMapa - 480 * 0.3) {
            if (this.jugador.x - this.scrollX > 480 * 0.7) {
                this.scrollX = this.jugador.x - 480 * 0.7;
            }


        }


    }


}
