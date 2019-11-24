class FondoAnimado extends Fondo{
    constructor(fondoEstatico, spreadsheet, x,y , modeloAlto, modeloAncho, velocidad, frames){
        super(fondoEstatico,x ,y)
        this.estado = estados.normal;
        this.aApareciendo = new Animacion(spreadsheet, modeloAncho, modeloAlto,velocidad, frames, this.finTheAnimacion.bind(this));
        this.frames = frames
        this.animacion = this.aApareciendo;
    }

    finTheAnimacion(){
        this.estado = estados.finAnimacion;
        this.animacion.frameActual= this.frames-1;
    }

    actualizar(){
        if(this.estado == estados.normal)
        {
            this.animacion.actualizar();
        }

    }

    dibujar(scrollX) {
            this.animacion.dibujar(this.x - scrollX , this.y);
    }


}