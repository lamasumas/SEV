class Ataque extends Modelo {
    constructor(x, y, spreadsheetBasico, spreadsheetFlecha, objetoASeguir, flecha) {

        super(imagenes.vacio, objetoASeguir.x + x,  objetoASeguir.y  + y)
        this.sumarX = x;
        this.sumarY = y
        this.daño = 1;
        this.estado = estados.moviendo;
        this.objetoASeguir = objetoASeguir;
        this.aAtaqueBasico = new Animacion(spreadsheetBasico,
            32, 32, 0.5, 3, this.finAnimacion.bind(this));
        this.aVacio = new Animacion(imagenes.vacio,
            32, 32, 1, 1);
        this.aAtaqueBasicoFlecha = new Animacion(spreadsheetFlecha,
            16,16,1, 4);

        this.lanzadoX = this.objetoASeguir.x;
        this.lanzadoY = this.objetoASeguir.y;
        // Ref a la animación actual
        this.flecha = flecha;
        this.animacion = this.aAtaqueBasico;
    }

    finAnimacion(){
        this.estado = estados.finAnimacion;
        this.animacion = this.aVacio;
    }

    dibujar(scrollX) {
        scrollX = scrollX || 0;
        this.animacion.dibujar(this.x - scrollX, this.y);
    }


    actualizar() {
        if (!this.flecha) {
            this.animacion = this.aAtaqueBasico;
            this.x = this.objetoASeguir.x + this.sumarX;
            this.y = this.objetoASeguir.y + this.sumarY;

        }
        else
        {
            this.animacion = this.aAtaqueBasicoFlecha;
            if(this.sumarX ==0)
            {
                if( this.sumarY > 0) {
                    this.x = this.lanzadoX;
                    this.y = this.lanzadoY + this.sumarY + 3;
                }
                else
                {
                    this.x = this.lanzadoX;
                    this.y = this.lanzadoY + this.sumarY - 3;
                }
            }
            else {
                if( this.sumarX > 0) {
                    this.y = this.lanzadoY;
                    this.y = this.lanzadoX + this.sumarX + 3;
                }
                else
                {
                    this.y = this.lanzadoY;
                    this.X = this.lanzadoX + this.sumarX - 3;
                }
            }

        }

        this.animacion.actualizar();
    }
}
