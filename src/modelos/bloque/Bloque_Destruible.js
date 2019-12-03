/**
 * Clase que representa un bloque destruible
 */
class Bloque_Destruible extends Bloque {
    constructor(imagen, tiles, x ,y, anchoT, altoT, frames, velocidad) {
        super(imagen,x,y,30);
        this.aRoto = new Animacion(tiles, anchoT, altoT, velocidad,frames,this.roto.bind(this))
        this.aVacio = new Animacion(imagenes.vacio,32, 32, 1, 1);
        this.golpeado = false;
        this.mapType = -1
        this.estado = estados.normal;
        this.animacion;
    }

    /**
     * Función que actualiza la animacion si ha sido golpeado
     */
    actualizar() {
        super.actualizar();
        if(this.golpeado)
        {
            this.animacion.actualizar()
        }
    }

    /**
     * Dibuja el objeto en cada frame, y tiene en ecuenta si hay que animarlo o no
     * @param scrollX
     */
    dibujar(scrollX) {
        if(!this.golpeado)
            super.dibujar(scrollX);
        else
            this.animacion.dibujar(this.x - scrollX, this.y)

    }

    /**
     * Función que es llamada cuando un ataque golpea el objeto, haciendolo cambiar de estado a golpeado, y comenzar asi
     * su destrucción
     */
    loHanGolpeado(){
        if(this.estado == estados.normal) {
            this.golpeado = true;
            this.animacion = this.aRoto
            this.estado = estados.muriendo
        }
    }

    /**
     *Función que se llama cuando acaba la animacion de romperse y lo marca para borrarlo
     */
    roto(){
        this.estado = estados.finAnimacion;
        this.animacion = this.aVacio
    }

}