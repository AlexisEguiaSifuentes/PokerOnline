const baraja = [
    { name: 'A-c', palo: 'corazon', texto: 'A' },
    { name: '2-c', palo: 'corazon', texto: '2' },
    { name: '3-c', palo: 'corazon', texto: '3' },
    { name: '4-c', palo: 'corazon', texto: '4' },
    { name: '5-c', palo: 'corazon', texto: '5' },
    { name: '6-c', palo: 'corazon', texto: '6' },
    { name: '7-c', palo: 'corazon', texto: '7' },
    { name: '8-c', palo: 'corazon', texto: '8' },
    { name: '9-c', palo: 'corazon', texto: '9' },
    { name: '10-c', palo: 'corazon', texto: '10' },
    { name: 'J-c', palo: 'corazon', texto: 'J' },
    { name: 'Q-c', palo: 'corazon', texto: 'Q' },
    { name: 'K-c', palo: 'corazon', texto: 'K' },
    { name: 'A-p', palo: 'picas', texto: 'A' },
    { name: '2-p', palo: 'picas', texto: '2' },
    { name: '3-p', palo: 'picas', texto: '3' },
    { name: '4-p', palo: 'picas', texto: '4' },
    { name: '5-p', palo: 'picas', texto: '5' },
    { name: '6-p', palo: 'picas', texto: '6' },
    { name: '7-p', palo: 'picas', texto: '7' },
    { name: '8-p', palo: 'picas', texto: '8' },
    { name: '9-p', palo: 'picas', texto: '9' },
    { name: '10-p', palo: 'picas', texto: '10' },
    { name: 'J-p', palo: 'picas', texto: 'J' },
    { name: 'Q-p', palo: 'picas', texto: 'Q' },
    { name: 'K-p', palo: 'picas', texto: 'K' },
    { name: 'A-d', palo: 'diamante', texto: 'A' },
    { name: '2-d', palo: 'diamante', texto: '2' },
    { name: '3-d', palo: 'diamante', texto: '3' },
    { name: '4-d', palo: 'diamante', texto: '4' },
    { name: '5-d', palo: 'diamante', texto: '5' },
    { name: '6-d', palo: 'diamante', texto: '6' },
    { name: '7-d', palo: 'diamante', texto: '7' },
    { name: '8-d', palo: 'diamante', texto: '8' },
    { name: '9-d', palo: 'diamante', texto: '9' },
    { name: '10-d', palo: 'diamante', texto: '10' },
    { name: 'J-d', palo: 'diamante', texto: 'J' },
    { name: 'Q-d', palo: 'diamante', texto: 'Q' },
    { name: 'K-d', palo: 'diamante', texto: 'K' },
    { name: 'A-p', palo: 'picas', texto: 'A' },
    { name: '2-p', palo: 'picas', texto: '2' },
    { name: '3-p', palo: 'picas', texto: '3' },
    { name: '4-p', palo: 'picas', texto: '4' },
    { name: '5-p', palo: 'picas', texto: '5' },
    { name: '6-p', palo: 'picas', texto: '6' },
    { name: '7-p', palo: 'picas', texto: '7' },
    { name: '8-p', palo: 'picas', texto: '8' },
    { name: '9-p', palo: 'picas', texto: '9' },
    { name: '10-p', palo: 'picas', texto: '10' },
    { name: 'J-p', palo: 'picas', texto: 'J' },
    { name: 'Q-p', palo: 'picas', texto: 'Q' },
    { name: 'K-p', palo: 'picas', texto: 'K' }
  ];
  

/* Contenedores de la interfaz inicial */
const body = document.querySelector('body')
const interfazInicio = document.getElementById("interfazInicio");
const inputNombre = document.getElementById('nombre')
const buttonPlay = document.getElementById("play");

/* Contenedores de la mesa*/
const contCartasCentrales = document.getElementById("contCartasCentrales");
const asientos = document.querySelectorAll(".asiento");

/* Contenedores de la interfaz del jugador*/
const interfazJugador = document.getElementById("interfazJugador");
const interfazNombre = document.getElementById("interfazNombre")
const interfazDinero = document.getElementById("dinero")
const interfazTiempo = document.getElementById("tiempo")

function entrar(){
  const nombre = inputNombre.value;
  interfazNombre.innerText = nombre;
  
  interfazInicio.style.display = 'none';
  asientos.forEach(function(asiento){asiento.style.display='block'});
  contCartasCentrales.style.display = 'flex';
  interfazJugador.style.display = 'block';
  
}

buttonPlay.addEventListener('click',entrar);


