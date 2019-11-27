class MenuLayer extends Layer {

    constructor() {
        super();
        this.iniciar();
        this.lastAlfa = 1;
        this.counterAlfa = 0;
    }

    iniciar() {
        this.fondo =
            new Fondo(imagenes.fondo_menu, 480 * 0.5, 320 * 0.5);
        this.infoMenu = new Fondo(imagenes.menu_info, 480 * 0.5, 320 * 0.5)
    }

    dibujar() {
        this.fondo.dibujar();

        if(this.lastAlfa == 1)
             contexto.globalAlpha= 0.75;
        else if(this.lastAlfa == 0.75)
            contexto.globalAlpha = 0.5;
        else
            contexto.globalAlpha = 1
        this.infoMenu.dibujar();
        if(this.counterAlfa <= 0) {
            this.lastAlfa = contexto.globalAlpha;
            this.counterAlfa = 4;
        }
        this.counterAlfa--;
        contexto.globalAlpha = 1;
    }


    procesarControles() {

        // siguiente pantalla
        if (controles.continuar) {
            gameLayer = new GameLayer();
            layer = gameLayer;
            controles.continuar = false;
        }


    }
}
