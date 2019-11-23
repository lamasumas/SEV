class GameLayer extends Layer {

    constructor() {
        super();

        this.iniciar();
    }

    iniciar() {
        this.scrollX = 0;
        this.scrollY = 0;
        this.fondo = new Fondo(imagenes.fondo, 480 * 0.5, 320 * 0.5);
        this.jugador ;
        this.espacios = new Espacio(0);
        this.enemigos = [];
        this.ataques = [];
        this.obstaculos = [];
        this.destruibles = [];
        this.cargarMapa("res/"+nivelActual+".txt", 1);
        this.mapa;
    }


    actualizar (){
        //this.calcularScroll();
        this.mapa.updateMap(this.jugador, this.obstaculos);
        if (this.pausa){
            return;
        }

        this.espacios.getEstaticos().forEach( x => x.actualizar());

        this.ataques.forEach(elAtaque =>  {
            if(elAtaque.estado == estados.finAnimacion)
                this.ataques.splice(this.ataques.indexOf(elAtaque), 1);
            else
                elAtaque.actualizar();
        })

        this.destruibles.forEach( destruible =>
            (destruible.estado == estados.finAnimacion ? this.destruibles.splice(this.destruibles.indexOf(destruible),1):destruible.actualizar()))
        this.espacios.actualizar();


      //  this.espacio.actualizar();
        this.fondo.vx = -1;
        this.jugador.mapa = this.mapa.mapaEsquema;
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

        //colisiones destruible
        for( i = 0; i < this.ataques.length; i++){
            for( j = 0; j< this.destruibles.length; j++)
            {
                if(this.ataques[i].colisiona(this.destruibles[j]))
                {
                    this.destruibles[j].loHanGolpeado()
                    this.espacios.eliminarCuerpoEstatico(this.destruibles[j]);
                }
            }
        }
    }


    dibujar() {

        //this.calcularScroll();
        this.fondo.dibujar();
        this.espacios.getEstaticos().forEach( x => x.dibujar())

        this.jugador.dibujar(this.scrollX);

        this.ataques.forEach(elAtaque => elAtaque.dibujar(this.scrollX))
        this.enemigos.forEach(theEnemigo => theEnemigo.dibujar(this.scrollX));
        this.destruibles.forEach(destruible => destruible.dibujar(this.scrollX));

    }


    cargarMapa(ruta , extraSize) {
        var fichero = new XMLHttpRequest();
        fichero.open("GET", ruta, false);

        fichero.onreadystatechange = function () {
            var texto = fichero.responseText;
            var lineas = texto.split('\n');
            this.anchoMapa = (lineas[0].length-1) ;
            this.altoMapa = lineas.length;
            this.mapa = new Mapa(this.anchoMapa+1, this.altoMapa)
            for (var i = 0; i < lineas.length; i++) {
                var linea = lineas[i];
                for (var j = 0; j < linea.length; j++) {
                    var simbolo = linea[j];
                   // var x = 40 / 2 + j * 40; // x central
                    //var y = 32 + i * 32; // y de abajo
                    this.cargarObjetoMapa(simbolo, j*32, i*32);
                }
            }
        }.bind(this);

        fichero.send(null);
    }

    cargarObjetoMapa(simbolo, x, y) {
        switch(simbolo) {

            case "1":
                this.jugador = new Jugador(x, y +12, this.generarAtaque.bind(this));
                // modificación para empezar a contar desde el suelo
                //this.jugador.y = this.jugador.y - this.jugador.alto / 2;

                this.espacios.agregarCuerpoDinamico(this.jugador);
                break;
            case "E":
                var enemigo = new Enemigo(x,y+12, this.jugador);
                this.enemigos.push(enemigo);
                this.espacios.agregarCuerpoDinamico(enemigo);
                break;
            case "B":
                var barril = new Bloque( imagenes.barril, x+12,y +12);
                this.obstaculos.push(barril)
                this.espacios.agregarCuerpoEstatico(barril);
                break;
            case "D":
                var destruible = new Bloque_Destruible(imagenes.mesa, imagenes.mesa_rota,x,y +12,32,32, 4, 2);
                this.destruibles.push(destruible);
                this.espacios.agregarCuerpoEstatico(destruible);
                break;
            case "C":
                var cofre = new Cofre(imagenes.cofre_cerrado, imagenes.cofre_abierto, imagenes.vacio, x + 12, y +12);
                this.espacios.agregarCuerpoEstatico(cofre);
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

    generarAtaque(ataque){

        this.ataques.push(ataque);
    }


}
