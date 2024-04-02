const baraja = [
    { palo: 'corazon', texto: 'A' },
    { palo: 'corazon', texto: '2' },
    { palo: 'corazon', texto: '3' },
    { palo: 'corazon', texto: '4' },
    { palo: 'corazon', texto: '5' },
    { palo: 'corazon', texto: '6' },
    { palo: 'corazon', texto: '7' },
    { palo: 'corazon', texto: '8' },
    { palo: 'corazon', texto: '9' },
    { palo: 'corazon', texto: '10' },
    { palo: 'corazon', texto: 'J' },
    { palo: 'corazon', texto: 'Q' },
    { palo: 'corazon', texto: 'K' },
    { palo: 'picas', texto: 'A' },
    { palo: 'picas', texto: '2' },
    { palo: 'picas', texto: '3' },
    { palo: 'picas', texto: '4' },
    { palo: 'picas', texto: '5' },
    { palo: 'picas', texto: '6' },
    { palo: 'picas', texto: '7' },
    { palo: 'picas', texto: '8' },
    { palo: 'picas', texto: '9' },
    { palo: 'picas', texto: '10' },
    { palo: 'picas', texto: 'J' },
    { palo: 'picas', texto: 'Q' },
    { palo: 'picas', texto: 'K' },
    { palo: 'diamante', texto: 'A' },
    { palo: 'diamante', texto: '2' },
    { palo: 'diamante', texto: '3' },
    { palo: 'diamante', texto: '4' },
    { palo: 'diamante', texto: '5' },
    { palo: 'diamante', texto: '6' },
    { palo: 'diamante', texto: '7' },
    { palo: 'diamante', texto: '8' },
    { palo: 'diamante', texto: '9' },
    { palo: 'diamante', texto: '10' },
    { palo: 'diamante', texto: 'J' },
    { palo: 'diamante', texto: 'Q' },
    { palo: 'diamante', texto: 'K' },
    { palo: 'trebol', texto: 'A' },
    { palo: 'trebol', texto: '2' },
    { palo: 'trebol', texto: '3' },
    { palo: 'trebol', texto: '4' },
    { palo: 'trebol', texto: '5' },
    { palo: 'trebol', texto: '6' },
    { palo: 'trebol', texto: '7' },
    { palo: 'trebol', texto: '8' },
    { palo: 'trebol', texto: '9' },
    { palo: 'trebol', texto: '10' },
    { palo: 'trebol', texto: 'J' },
    { palo: 'trebol', texto: 'Q' },
    { palo: 'trebol', texto: 'K' }
  ];
  

/* Contenedores de la interfaz inicial */
const body = document.querySelector('body')
const interfazInicio = document.getElementById("interfazInicio");
const inputNombre = document.getElementById('nombre')
const buttonPlay = document.getElementById("play");

/* Contenedores de la mesa*/
const elementoMesa = document.getElementById('mesa');
const tituloMesa = document.getElementById("titulo-mesa");
const contCartasCentrales = document.getElementById("contCartasCentrales");
const asientos = document.querySelectorAll(".asiento");
const buttonStar = document.getElementById('star');

/* Contenedores de la interfaz del jugador*/
const interfazJugador = document.getElementById("interfazJugador");
const interfazNombre = document.getElementById("interfazNombre")
const interfazDinero = document.getElementById("dinero")
const interfazTiempo = document.getElementById("tiempo")

class Mesa{
  // Asientos, turnos, delear, entrada(Min y Max) y Pozo
  constructor(){
    this.smallBlind = 25;
    this.bigBlind = 50;
    this.asientos=[];   
    this.listaPartidas=[] 
    this.partidaActual;
  }

  agregarJugador(jugador){
    this.asientos.push(jugador);
  };

  eliminarJugador(){
      this.naada = 0;
  };
  
  crearPartida(){
    this.partidaActual = new Partida(this.asientos, this.bigBlind, this.smallBlind);
  }
};

class Partida{  
  // Deler, Fase(preflop,flop,turn y river) Turno, cartas centrales , pozo y ganador(es)
  constructor (lista,bigBlind, smallBlind){
    this.listaJugadores = [...lista];
    this.bigBlind = bigBlind;
    this.smallBlind = smallBlind;
    this.baraja = [...baraja];
  }

  definirTurnos(){
    let turnos = ['delear', 'smallBlind', 'bigBlind','1','2','3','4'];
    this.listaJugadores.forEach((jugador)=>{
      if (jugador.estado === 'activo') {
          jugador.turno = turnos[0];
          turnos.shift();
      }else{
        jugador.turno = null;
      }
    });
  }

  barajear() {
    for (let i = this.baraja.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.baraja[i], this.baraja[j]] = [this.baraja[j], this.baraja[i]];
    }    
  }

  obtenerCarta(){
    return this.baraja.splice(0, 1)[0];
  }

  repartirCartas(){
    /*Back End*/
    for(let i = 0 ; i < 2 ; i++){
      this.listaJugadores.forEach((jugador)=>{                
        jugador.cartas.push(new Carta(this.obtenerCarta()));                                   
      });        
    };    

    /* Front End */
    this.listaJugadores.forEach((jugador)=>{
      jugador.renderizarCartas();
    });          
  }

  iniciar(){
    this.barajear();
    this.definirTurnos()    
    this.repartirCartas();

  }
}

class Jugador{
  constructor (nombre, asiento){
    this.nombre = nombre;
    this.asiento = asiento;
    this.dinero = 10000;
  };

  turno = null;
  estado = 'activo';
  cartas=[];

  check(){
    
  };

  bet(apuesta){

  };

  call(apuesta){

  };

  raise(){

  };

  fold(){

  };

  /* Front End */
  renderizarCartas(){
    const interfazCartas = this.asiento.querySelector('#interfazCartas');
    let cartaIzq = this.cartas[0].generarCarta('izq');
    let cartaDer = this.cartas[1].generarCarta('der');
    interfazCartas.innerHTML = cartaIzq + cartaDer;     
  }
};

class Carta{
  constructor(carta){ // Formato { 'palo' , 'texto' } 
    this.palo = carta.palo;
    this.texto = carta.texto;
  }

  cartaDiamantes(HTMLString){
     HTMLString += `        
            <div id="esquina_superior_izquierda">
                <div class="textoCarta red">${this.texto}</div>
                <div class="diamante diamante_pequeño"></div>
            </div>
            <div class="diamante"></div>
            <div id="esquina_inferior_derecha">
                <div class="textoCarta red">${this.texto}</div>
                <div class="diamante diamante_pequeño"></div>
            </div>
    </div>`;
    return HTMLString;
  }

  cartaTreboles(HTMLString){
    HTMLString += `    
      <div id="esquina_superior_izquierda">
          <div class="textoCarta">${this.texto}</div>
          <div class="trebol_pequeño">
              <div class="circulo circulo_pequeño"></div>
              <div class="circulo2 circulo2_pequeño"></div>
          </div> 
      </div>
      <div class="trebol">
          <div class="circulo"></div>
          <div class="circulo2"></div>
      </div>
      <div id="esquina_inferior_derecha">                        
          <div class="textoCarta">${this.texto}</div>
          <div class="trebol_pequeño">
              <div class="circulo circulo_pequeño"></div>
              <div class="circulo2 circulo2_pequeño"></div>
          </div>
      </div>
    </div>`;
    return HTMLString;
  }

  cartaPicas(HTMLString){
    HTMLString += `             
      <div id="esquina_superior_izquierda">
         <div class="textoCarta">${this.texto}</div>
         <div class="picas picas_pequeño"></div>
      </div>
      <div class="picas"></div>       
      <div id="esquina_inferior_derecha">
          <div class="textoCarta">${this.texto}</div>
          <div class="picas picas_pequeño"></div>
      </div>
    </div>`;
    return HTMLString;
  }

  cartaCorazones(HTMLString){
    HTMLString += `                   
      <div id="esquina_superior_izquierda">
        <div class="textoCarta red">${this.texto}</div>
        <div class="corazon corazon_pequeño"></div>
      </div>
      <div class="corazon"></div>        
      <div id="esquina_inferior_derecha">
        <div class="textoCarta red">${this.texto}</div>
        <div class="corazon corazon_pequeño"></div>
      </div>
    </div>  `;
    return HTMLString;
  }
  generarCarta(orientacion = null){
    let HTMLString = null;
    if( orientacion === 'izq'){
      HTMLString = `<div class="carta inclinada-izq">`;
    }else if( orientacion === 'der'){
      HTMLString = `<div class="carta inclinada-der">`;
    }else{
      HTMLString = `<div class="carta">`;
    }

    if (this.palo === 'diamante'){
      return this.cartaDiamantes(HTMLString);
    }else if(this.palo === 'trebol'){
      return this.cartaTreboles(HTMLString);
    }else if(this.palo === 'picas'){
      return this.cartaPicas(HTMLString);
    }else if(this.palo === 'corazon'){
      return this.cartaCorazones(HTMLString);
    }
  }
}

class Temporizador {
  constructor(tiempo) {
    this.tiempo = tiempo;
    this.intervalo = null;
  }

  iniciar() {
    this.intervalo = setInterval(() => {
      if (this.tiempo > 0) {
        this.tiempo--;
        this.actualizarTiempo(); 
      } else {
        this.detenerTemporizador();
      }
    }, 1000);
  };

  detenerTemporizador() {
    clearInterval(this.intervalo);
  }

  reiniciarTemporizador(tiempo) {
    this.tiempo = tiempo;
    this.actualizarTiempo();
    this.detenerTemporizador(); 
    this.iniciar(); 
  }

  actualizarTiempo() {
    let segundos = this.tiempo % 60;
    let temporizador = `00:${this.pad(segundos)}`;
    document.getElementById("tiempo").innerHTML = `<svg id="tiempo_i" height="50" width="50" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><path d="m13.5 2.115v-.615a1.5 1.5 0 0 0 -3 0v.615a10.968 10.968 0 0 0 -7.214 17.572 3.526 3.526 0 0 0 -1.286 2.813 1.5 1.5 0 0 0 3 0 .641.641 0 0 1 .455-.68 10.917 10.917 0 0 0 13.087 0 .641.641 0 0 1 .458.68 1.5 1.5 0 0 0 3 0 3.526 3.526 0 0 0 -1.286-2.813 10.968 10.968 0 0 0 -7.214-17.572zm-9.5 10.885a8 8 0 1 1 8 8 8.009 8.009 0 0 1 -8-8z"/><path d="m19.5 0a1.5 1.5 0 0 0 0 3 1.361 1.361 0 0 1 1.459 1.5 1.5 1.5 0 0 0 3 0 4.333 4.333 0 0 0 -4.459-4.5z"/><path d="m3.041 4.5a1.361 1.361 0 0 1 1.459-1.5 1.5 1.5 0 0 0 0-3 4.333 4.333 0 0 0 -4.459 4.5 1.5 1.5 0 0 0 3 0z"/><path d="m13.53 12.379v-3.879a1.5 1.5 0 0 0 -1.5-1.5 1.5 1.5 0 0 0 -1.5 1.5v4.293a2 2 0 0 0 .586 1.414l1.793 1.793a1.5 1.5 0 0 0 2.121-2.121z"/></svg>
    ${temporizador}
    `;
  }

  pad(valor) {
    return valor < 10 ? "0" + valor : valor;
  }
};


/*Objeto Mesa*/
const mesa = new Mesa();

function entrar(){
  /*Front End*/
  const nombre = inputNombre.value;
  interfazNombre.innerText = nombre;
  
  interfazInicio.style.display = 'none';
  elementoMesa.style.display = 'block';
  interfazJugador.style.display = 'block';

  /*Back End*/
  mesa.agregarJugador(new Jugador(nombre, interfazJugador));  
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
  /* Front End */
  asiento.querySelector('#interfaz-agregar-jugador').style.display = 'none';
  const HTMLString = `
    <div id="interfazCartas">
            <div class="carta inclinada-izq"></div>
            <div class="carta inclinada-der"></div>
    </div>
    <div id="interfazNombre" class="grey">
      <svg id="microchip_i"  width='70' heigth='7 0' data-name="Layer 1" viewBox="0 0 24 24"><path d="m10,9.261l1.205,4.739h-2.411l1.205-4.739Zm12,1.739v2h1c.552,0,1,.447,1,1s-.448,1-1,1h-1v2h1c.552,0,1,.447,1,1s-.448,1-1,1h-1.418c-.505,1.151-1.431,2.077-2.582,2.582v1.418c0,.553-.448,1-1,1s-1-.447-1-1v-1h-2v1c0,.553-.448,1-1,1s-1-.447-1-1v-1h-2v1c0,.553-.448,1-1,1s-1-.447-1-1v-1h-2v1c0,.553-.448,1-1,1s-1-.447-1-1v-1.418c-1.151-.505-2.077-1.431-2.582-2.582h-1.418c-.552,0-1-.447-1-1s.448-1,1-1h1v-2h-1c-.552,0-1-.447-1-1s.448-1,1-1h1v-2h-1c-.552,0-1-.447-1-1s.448-1,1-1h1v-2h-1c-.552,0-1-.447-1-1s.448-1,1-1h1.418c.505-1.151,1.431-2.077,2.582-2.582v-1.418c0-.553.448-1,1-1s1,.447,1,1v1h2v-1c0-.553.448-1,1-1s1,.447,1,1v1h2v-1c0-.553.448-1,1-1s1,.447,1,1v1h2v-1c0-.553.448-1,1-1s1,.447,1,1v1.418c1.151.505,2.077,1.431,2.582,2.582h1.418c.552,0,1,.447,1,1s-.448,1-1,1h-1v2h1c.552,0,1,.447,1,1s-.448,1-1,1h-1Zm-8.031,5.754l-2.404-9.452c-.182-.777-.811-1.299-1.565-1.299s-1.383.521-1.561,1.28l-2.409,9.471c-.136.535.188,1.079.723,1.215.54.142,1.08-.187,1.216-.723l.317-1.246h3.428l.317,1.246c.115.453.522.754.969.754.082,0,.164-.01.247-.031.535-.136.859-.68.723-1.215Zm3.031-9.754c0-.553-.448-1-1-1s-1,.447-1,1v10c0,.553.448,1,1,1s1-.447,1-1V7Z"/></svg>
      BOT ${mesa.asientos.length}
    </div>
  `;
  asiento.innerHTML = HTMLString;

  /* Back End */
  mesa.agregarJugador(new Jugador(`Bot ${mesa.asientos.length}`, asiento))
}

function star(){
  if (mesa.asientos.length > 1 ){
    mesa.crearPartida();    
    mesa.partidaActual.iniciar();      
  }else{
    alert("¡Se necesitan minimo dos jugadores para empezar!")
  }
}

buttonPlay.addEventListener('click',entrar); 
buttonStar.addEventListener('click',star);