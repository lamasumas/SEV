class Trigger {
    constructor(x ,y, objetoTriggered)
    {
        this.x = x;
        this.y = y;
        this.ancho = 10;
        this.alto = 10;
        this.objetoTriggered = objetoTriggered;
    }

    triggered(){
        this.objetoTriggered.onTrigger();
    }


}