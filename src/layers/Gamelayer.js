class GameLayer extends Layer {

    constructor() {
        super();

        this.iniciar();
    }

    iniciar() {
       // this.espacio = new Espacio(1);
        this.scrollX = 0;
        this.fondo = new Fondo(imagenes.fondo, 480 * 0.5, 320 * 0.5);
        this.jugador;
        this.espacios = new Espacio(0);
        this.mapaEsquema;
        this.enemigos = [];
        this.cargarMapa("res/"+nivelActual+".txt");
    }


    actualizar (){
        this.calcularScroll();
        this.updateMap()

        this.espacios.actualizar();

        this.fondo.vx = -1;
        this.jugador.actualizar()
        this.enemigos.forEach(theEnemigo => theEnemigo.actualizar());
    }


    dibujar() {

        //this.calcularScroll();
  //      this.fondo.dibujar();
        this.jugador.dibujar(this.scrollX);
        this.enemigos.forEach(theEnemigo => theEnemigo.dibujar(this.scrollX));



    }


    cargarMapa(ruta) {
        var fichero = new XMLHttpRequest();
        fichero.open("GET", ruta, false);

        fichero.onreadystatechange = function () {
            var texto = fichero.responseText;
            var lineas = texto.split('\n');
            this.altoMapa = lineas.length;
            this.anchoMapa = (lineas[0].length-1) * 40;
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
               // this.jugador.y = this.jugador.y - this.jugador.alto / 2;
                this.espacios.agregarCuerpoDinamico(this.jugador);
                break;
            case "E":
                var enemigo = new Enemigo(x,y);
                //enemigo.y = enemigo.y - enemigo.alto/2;
                // modificación para empezar a contar desde el suelo
                this.enemigos.push(enemigo);
                this.espacios.agregarCuerpoDinamico(enemigo);
                break;

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
    }

    updateMap(){
        this.mapaEsquema= new Array(this.altoMapa + 1);
        for (var i = 0; i< this.mapaEsquema.length; i++)
            this.mapaEsquema[i] = new Array(Math.floor((this.anchoMapa/32)+1)).fill(0);
        this.espacios.getDinamicos().forEach(dinamico => {
            var tempI = Math.floor(dinamico.y / 32);
            var tempJ = Math.floor(dinamico.x / 32)
            this.mapaEsquema[tempI][tempJ] = dinamico.mapType;
        });
        this.printMapa();






    }

}
