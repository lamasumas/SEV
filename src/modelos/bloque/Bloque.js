class Bloque  extends Modelo {
    constructor(imagen, x, y, size) {

        super(imagen, x, y)
        this.mapType = -1;
        this.size = size;

    }
    actualizar(){

    }
    dibujar(scrollX) {
        scrollX = scrollX || 0;
        contexto.drawImage(this.imagen,
            this.x - this.imagen.width/2 - scrollX,
            this.y - this.imagen.height/2, this.size,this.size);
    }
}