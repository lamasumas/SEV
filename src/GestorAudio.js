var musicaAmbiente = new Audio("res/sounds/2nd Sonata - Malign Chords.ogg");
musicaAmbiente.loop = true;

var efectos = {
    espada : "res/sounds/27856__erdie__sword02.ogg",
    flecha: "res/sounds/205938__twisted-euphoria__arrow-impact.wav",
    muerte_jugador: "res/sounds/416838__alineaudio__grunt2-death-pain.wav",
    vicotria: "res/sounds/162482__kastenfrosch__achievement.mp3"
};

function reproducirMusica() {
    musicaAmbiente.play();
}

function pararMusica() {
    musicaAmbiente.pause();
    musicaAmbiente.currentTime = 0;
}

function reproducirEfecto( srcEfecto ) {
    var efecto = new Audio( srcEfecto );
    efecto.play();
}