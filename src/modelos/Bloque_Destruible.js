class Bloque_Destruible extends Bloque {
    constructor(imagen, tiles, x ,y, anchoT, altoT, frames, velocidad) {
        super(imagen,x,y,30);
        this.aRoto = new Animacion(tiles, anchoT, altoT, velocidad,frames,this.roto.bind(this))
        this.aVacio = new Animacion(imagenes.vacio,32, 32, 1, 1);
        this.golpeado = false;
        this.estado = estados.normal;
        this.animacion;
    }

    actualizar() {
        super.actualizar();
        if(this.golpeado)
        {
            this.animacion.actualizar()
        }
    }

    dibujar(scrollX) {
        if(!this.golpeado)
            super.dibujar(scrollX);
        else
            this.animacion.dibujar(this.x - scrollX, this.y)

    }

    loHanGolpeado(){
        if(this.estado == estados.normal)
        this.golpeado = true;
        this.animacion = this.aRoto
        this.estado = estados.muriendo
    }
    roto(){
        this.estado = estados.finAnimacion;
        this.animacion = this.aVacio
    }

}