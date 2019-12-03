/**
 * Clasee que sirve como trigger para determinadas acciones
 */
class Trigger {
    constructor(x ,y, objetoTriggered)
    {
        this.x = x;
        this.y = y;
        this.ancho = 10;
        this.alto = 10;
        this.objetoTriggered = objetoTriggered;
    }

    /**
     * Funcion que se lanza cuando es accionado el trigger, que llama a la funcion onTrigger del objeto
     * complementario
     */
    triggered(){
        this.objetoTriggered.onTrigger();
    }


}