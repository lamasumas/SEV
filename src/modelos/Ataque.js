/**
 * Clase que representa un ataque de enemigo o jugador
 */
class Ataque extends Modelo {
    constructor(x, y, spreadsheetBasico, spreadsheetFlecha, objetoASeguir, flecha) {
        super(imagenes.vacio, objetoASeguir.x + x,  objetoASeguir.y  + y)
        this.sumarX = x;
        this.sumarY = y
        this.dano = objetoASeguir.dano;
        this.estado = estados.moviendo;
        this.objetoASeguir = objetoASeguir;
        this.aAtaqueBasico = new Animacion(spreadsheetBasico,
            32, 32, 1, 3, this.finAnimacion.bind(this));
        this.aVacio = new Animacion(imagenes.vacio,
            32, 32, 1, 1);
        this.aAtaqueBasicoFlecha = new Animacion(spreadsheetFlecha,
            25,25,1, 4);

        this.x = this.objetoASeguir.x +  this.sumarX;
        this.y = this.objetoASeguir.y + this.sumarY;
        // Ref a la animación actual
        this.flecha = flecha;
        this.animacion = this.aAtaqueBasico;
    }

    /**
     * Función que se llama al final de la animación de ataque basico
     */
    finAnimacion(){
        this.estado = estados.finAnimacion;
        this.animacion = this.aVacio;
    }

    /**
     * Función que dibuja en pantalla el ataque
     * @param scrollX
     */
    dibujar(scrollX) {
        scrollX = scrollX || 0;
        if(this.flecha)
            this.animacion = this.aAtaqueBasicoFlecha;
        else
            this.animacion = this.aAtaqueBasico;
        this.animacion.dibujar(this.x - scrollX, this.y);
    }


    /**
     * Función que actualiza la posición del atauqe y si es uno basico
     * la mantiene a la misma distancia del jugador todo el rato
     */
    actualizar() {
        if (!this.flecha) {
            this.x = this.objetoASeguir.x + this.sumarX;
            this.y = this.objetoASeguir.y + this.sumarY;

        }
        else
        {
            if(this.sumarX ==0)
            {
                if( this.sumarY > 0) {
                    this.y +=  5;
                }
                else
                {
                    this.y -= 5;
                }
            }
            else {
                if( this.sumarX > 0) {
                    this.x += 5;
                }
                else
                {
                    this.x -= 5;
                }
            }

        }

        this.animacion.actualizar();
    }
}
