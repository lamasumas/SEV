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
        this.ataques = [];
        this.cargarMapa("res/"+nivelActual+".txt", 1);
        this.mapa;
    }


    actualizar (){
        //this.calcularScroll();
        this.mapa.updateMap(this.jugador);
        if (this.pausa){
            return;
        }
        this.ataques.forEach(elAtaque =>  {
            if(elAtaque.estado == estados.finAnimacion)
                this.ataques.splice(this.ataques.indexOf(elAtaque), 1);
            else
                elAtaque.actualizar();
        })

        this.espacios.actualizar();

      //  this.espacio.actualizar();
        this.fondo.vx = -1;
        this.jugador.actualizar()
        this.enemigos.forEach(theEnemigo => {
            theEnemigo.mapa= this.mapa.mapaEsquema;
            if(theEnemigo.estado == estados.muerto)
            {
                this.enemigos.splice(this.enemigos.indexOf(theEnemigo), 1)
            }
            theEnemigo.actualizar();
        });

        //colisiones ataque
        var i,j;
        for( i = 0; i < this.ataques.length; i++){
            for( j = 0; j< this.enemigos.length; j++)
            {
                if(this.ataques[i].colisiona(this.enemigos[j]))
                {
                    this.enemigos[j].estado = estados.muriendo;
                    this.espacios.eliminarCuerpoDinamico(this.enemigos[j]);
                }
            }
        }

    }


    dibujar() {

        //this.calcularScroll();
        this.fondo.dibujar();
        this.jugador.dibujar(this.scrollX);
        this.enemigos.forEach(theEnemigo => theEnemigo.dibujar(this.scrollX));
        this.ataques.forEach(elAtaque => elAtaque.dibujar(this.scrollX))


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
                this.jugador = new Jugador(x, y, this.generarAtaque.bind(this));
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

    generarAtaque(ataque){

        this.ataques.push(ataque);
    }


}
