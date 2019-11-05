class Ataque extends Modelo {
    constructor(x, y, spreadsheet) {
        super(imagenes.vacio, x, y)
        this.estado = estados.moviendo;
        this.aAtaque = new Animacion(spreadsheet,
            32, 32, 0.5, 3, this.finAnimacion.bind(this));
        this.aVacio = new Animacion(imagenes.vacio,
            32, 32, 1, 1);

        // Ref a la animación actual
        this.animacion = this.aAtaque;
    }

    finAnimacion(){
        this.estado = estados.finAnimacion;
        this.animacion = this.aVacio;
    }

    dibujar(scrollX) {
        scrollX = scrollX || 0;
        this.animacion.dibujar(this.x - scrollX, this.y);
    }


    actualizar(){
        this.animacion.actualizar();
    }

}
