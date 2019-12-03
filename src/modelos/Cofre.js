/**
 * Clase que representa un cofre
 */
class Cofre extends Modelo{
    constructor(imagen_cerrado, imagen_abierto, vacio, x, y, genrarEnemigo, generarpowerUp, cofreId){
        super(vacio , x, y);
        this.aCerrado = new Animacion(imagen_cerrado,25, 25, 6, 8);
        this.aAbierto = new Animacion(imagen_abierto, 32, 32 , 4 ,4, this.generateObject.bind(this))
        this.aVacio = new Animacion(vacio,32,32,1,1);
        this.mapType = -1;
        this.animacion = this.aCerrado;
        this.estado = estados.normal
        this.generarEnemigo = genrarEnemigo;
        this.generarPowerup = generarpowerUp
        this.cofreId = cofreId;
        //Si esta en la lista global de cofres abiertos no se pinte y en el siguiente actualizar del
        //gamelayer se borrara.
        if( cofresAbiertos.filter(x => x == brujula.salaActual.id +"-"+ this.cofreId).length != 0) {
            this.animacion= this.aVacio;
            this.estado = estados.finAnimacion;
        }
    }

    /**
     * Simplemente actualiza la animación
     */
    actualizar(){

            this.animacion.actualizar();


    }


    /**
     * Simplemetne dibuja en cada frame el cofre
     */
    dibujar(){
        this.animacion.dibujar(this.x - scrollX, this.y)
    }

    /**
     * Función que escoge que le va a tocar al jugador aleatoriamente
     */
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

    /**
     * Función que llama el trigger asociado a este cofre, añade el cofre a una variable global que contiene una lista
     * de cofres abiertos, para que no se pueda abusar de abrir el mismo cofre
     */
    onTrigger(){

        if( cofresAbiertos.filter(x => x == (brujula.salaActual.id +"-"+ this.cofreId)).length == 0)
        {
            this.animacion = this.aAbierto;
            cofresAbiertos.push(brujula.salaActual.id+ "-"+this.cofreId);
        }

    }
}