var estados = {};
estados.moviendo= 2; // Incluye parado, derecha , izquierda
estados.saltando = 3;
estados.muriendo = 4;
estados.muerto = 5;
estados.disparando = 6;
estados.impactado = 7;
estados.finAnimacion = 8;
estados.normal = 9;
estados.empujando = 10;
estados.victoria = 11;

var orientaciones = {};
orientaciones.derecha = 2;
orientaciones.izquierda = 3;
var nivelActual = 0;
var nivelMinimo = 1;
var nivelMaximo = 1;
var pulsaciones = []; // actuales registradas

var tipoPulsacion = {}; // tipos
tipoPulsacion.inicio = 1;
tipoPulsacion.mantener = 2;

var entradas = {}; // tipos
entradas.pulsaciones = 1;
entradas.teclado = 2;
entradas.gamepad = 3;

var powerup = {}
powerup.arco = 0;
powerup.vida = 1;
powerup.trampa = 2;
powerup.dano = 3;

var posicionSala = {};
posicionSala.derecha = 0;
posicionSala.izquierda = 1;
posicionSala.arriba = 2;
posicionSala.abajo = 3;
posicionSala.bossBatle = 4;

var brujula = new Brujula();
var cofresAbiertos = [];

var entrada = entradas.pulsaciones;