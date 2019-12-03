/**
 * Clase que genera al enemigo de tipo volador
 */
 class EnemigoVolador extends Enemigo {

     constructor(x,y, imagen, derecha_izquierda, jugador, generarAtaqueCallback) {
         super(x, y, imagen);
         this.vyInteligencia = 0;
         // Set de movimientos
         this.aMoverDerecha = new Animacion(imagenes.volador_movimiento,32,32,2,4);
         this.aMoverIzquierda = this.aMoverDerecha;
         this.aMorirDerecha =  new Animacion(imagenes.volador_muerte,32,32,3,4,this.finDeAnimacionMorir.bind(this));
         this.aMorirIzquierda = this.aMorirDerecha;
         // La vida
         this.vida = 1;
         this.derecha_izquierda = derecha_izquierda;
         //Animacion actual
         this.animacion  = this.aMoverDerecha;
         //Representacion del enemigo
         this.mapType= "V"
         //Copia del jugador
         this.jugador = jugador;
         this.generarAtaqueCallback = generarAtaqueCallback;
         this.counterAtaque = 0


     }

    /**
     * Función que calcula la proxima direccion en la que se mueve, que al ser no muy inteligente
     * es verticalmente
     */
    calcularDireccion() {
         this.vx = 0;
         this.vy = 0;


         if (this.vyInteligencia > 0) {
             this.vy = 2;
         }
         else{
             this.vy = -2;
         }

     }

    /**
     * Funcion que se actualiza en cada frame y que actualiza la orientacion del enemigo
     */
    actualizar() {
         super.actualizar();
         var tempI = Math.floor(this.y / 32);


         if ( tempI >= this.mapa.length-2)
             this.vyInteligencia = -1;
         else if (tempI <= 0)
             this.vyInteligencia = 1;


     }


 }