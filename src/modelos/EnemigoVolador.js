 class EnemigoVolador extends Enemigo {

     constructor(x,y, imagen, derecha_izquierda, jugador, generarAtaqueCallback) {
         super(x, y, imagen);
        this.vyInteligencia = 0;
         this.aMoverDerecha = new Animacion(imagenes.volador_movimiento,32,32,2,4);
         this.aMoverIzquierda = this.aMoverDerecha;
         this.aMorirDerecha =  new Animacion(imagenes.volador_muerte,32,32,3,4,this.finDeAnimacionMorir.bind(this));
         this.aMorirIzquierda = this.aMorirDerecha;
         this.vida = 1;
         this.derecha_izquierda = derecha_izquierda;
         this.animacion  = this.aMoverDerecha;
         this.mapType= "V"
         this.jugador = jugador;
         this.generarAtaqueCallback = generarAtaqueCallback;
         this.counterAtaque = 0


     }

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

     actualizar() {
         super.actualizar();
         var tempI = Math.floor(this.y / 32);


         if ( tempI >= this.mapa.length-2)
             this.vyInteligencia = -1;
         else if (tempI <= 0)
             this.vyInteligencia = 1;


     }


 }