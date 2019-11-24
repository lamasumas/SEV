class Cofre extends Modelo{
    constructor(imagen_cerrado, imagen_abierto, vacio, x, y){
        super(vacio , x, y);
        this.aCerrado = new Animacion(imagen_cerrado,25, 25, 6, 8);
        this.aAbierto = new Animacion(imagen_abierto, 32, 32 , 4 ,4, this.generateObject.bind(this))
        this.aVacio = new Animacion(vacio,32,32,1,1);
        this.mapType = -1;
        this.animacion = this.aCerrado;
        this.estado = estados.normal
    }

    actualizar(){
     this.animacion.actualizar();
    }


    dibujar(){
        this.animacion.dibujar(this.x - scrollX, this.y)
    }
    generateObject(){
        this.animacion = this.aVacio;
        this.estado = estados.finAnimacion;


    }

    onTrigger(){
        this.animacion = this.aAbierto;
    }
}