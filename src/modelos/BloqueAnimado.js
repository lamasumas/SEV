class BloqueAnimado extends Bloque{
        constructor(imagen, x, y, spreadsheet){
            super(imagen,x,y);
            this.animacion = new Animacion(spreadsheet,25,25, 2, 6)
        }

        dibujar(scrollX) {
            this.animacion.dibujar(this.x, this.y);
        }
        actualizar() {
            this.animacion.actualizar();
        }
}