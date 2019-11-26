class Cofre extends Modelo{
    constructor(imagen_cerrado, imagen_abierto, vacio, x, y, genrarEnemigo, generarpowerUp){
        super(vacio , x, y);
        this.aCerrado = new Animacion(imagen_cerrado,25, 25, 6, 8);
        this.aAbierto = new Animacion(imagen_abierto, 32, 32 , 4 ,4, this.generateObject.bind(this))
        this.aVacio = new Animacion(vacio,32,32,1,1);
        this.mapType = -1;
        this.animacion = this.aCerrado;
        this.estado = estados.normal
        this.generarEnemigo = genrarEnemigo;
        this.generarPowerup = generarpowerUp
        if( cofresAbiertos.filter(x => x == brujula.salaActual.id).length != 0) {
            this.animacion= this.aVacio;
            this.estado = estados.finAnimacion;
        }

    }

    actualizar(){

            this.animacion.actualizar();


    }


    dibujar(){
        this.animacion.dibujar(this.x - scrollX, this.y)
    }
    generateObject(){
            this.animacion = this.aVacio;
            this.estado = estados.finAnimacion;
            var posibiliadad = Math.floor(Math.random() * 3);
            switch (posibiliadad) {
                case (powerup.trampa):
                    this.generarEnemigo(this.x, this.y);
                    break;
                case (powerup.arco):
                    this.generarPowerup(posibiliadad, this.x, this.y);
                    break;
                case (powerup.vida):
                    this.generarPowerup(posibiliadad, this.x, this.y);
                    break;

        }
    }

    onTrigger(){

        if( cofresAbiertos.filter(x => x != brujula.salaActual.id).length == 0)
        {
            this.animacion = this.aAbierto;
            cofresAbiertos.push(brujula.salaActual.id);
        }

    }
}