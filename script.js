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
const tituloMesa = document.getElementById("titulo-mesa");
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
  tituloMesa.style.display = 'block';
  contCartasCentrales.style.display = 'flex';
  interfazJugador.style.display = 'block';
}

asientos.forEach((asiento)=>{
  const boton = asiento.querySelector('.boton-agregar-jugador');
  boton.addEventListener('click',function(){agregar(this,asiento)});
});

function agregar(boton, asiento){
  boton.style.display='none';
  const HTMLString = `
    <div id="interfaz-agregar-jugador">
      <button id="agregar-jugador">JUGADOR</button>
      <button id="agregar-ia">IA</button>
    </div>`;
    asiento.innerHTML += HTMLString;    
    asiento.querySelector('#agregar-ia').addEventListener('click', function(){agregarIA(asiento)});
}

function agregarIA(asiento){
  asiento.querySelector('#interfaz-agregar-jugador').style.display = 'none';
  const HTMLString = `
    <div id="interfazCartas">
            <div class="carta inclinada-izq"></div>
            <div class="carta inclinada-der"></div>
    </div>
    <div id="interfazNombre" class="grey"><svg id="microchip_i"  width='70' heigth='7 0' data-name="Layer 1" viewBox="0 0 24 24"><path d="m10,9.261l1.205,4.739h-2.411l1.205-4.739Zm12,1.739v2h1c.552,0,1,.447,1,1s-.448,1-1,1h-1v2h1c.552,0,1,.447,1,1s-.448,1-1,1h-1.418c-.505,1.151-1.431,2.077-2.582,2.582v1.418c0,.553-.448,1-1,1s-1-.447-1-1v-1h-2v1c0,.553-.448,1-1,1s-1-.447-1-1v-1h-2v1c0,.553-.448,1-1,1s-1-.447-1-1v-1h-2v1c0,.553-.448,1-1,1s-1-.447-1-1v-1.418c-1.151-.505-2.077-1.431-2.582-2.582h-1.418c-.552,0-1-.447-1-1s.448-1,1-1h1v-2h-1c-.552,0-1-.447-1-1s.448-1,1-1h1v-2h-1c-.552,0-1-.447-1-1s.448-1,1-1h1v-2h-1c-.552,0-1-.447-1-1s.448-1,1-1h1.418c.505-1.151,1.431-2.077,2.582-2.582v-1.418c0-.553.448-1,1-1s1,.447,1,1v1h2v-1c0-.553.448-1,1-1s1,.447,1,1v1h2v-1c0-.553.448-1,1-1s1,.447,1,1v1h2v-1c0-.553.448-1,1-1s1,.447,1,1v1.418c1.151.505,2.077,1.431,2.582,2.582h1.418c.552,0,1,.447,1,1s-.448,1-1,1h-1v2h1c.552,0,1,.447,1,1s-.448,1-1,1h-1Zm-8.031,5.754l-2.404-9.452c-.182-.777-.811-1.299-1.565-1.299s-1.383.521-1.561,1.28l-2.409,9.471c-.136.535.188,1.079.723,1.215.54.142,1.08-.187,1.216-.723l.317-1.246h3.428l.317,1.246c.115.453.522.754.969.754.082,0,.164-.01.247-.031.535-.136.859-.68.723-1.215Zm3.031-9.754c0-.553-.448-1-1-1s-1,.447-1,1v10c0,.553.448,1,1,1s1-.447,1-1V7Z"/></svg>
    BOT</div>
  `;
  asiento.innerHTML = HTMLString;
}

buttonPlay.addEventListener('click',entrar);
