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
const body = document.querySelector('body');
const interfazInicio = document.getElementById("interfazInicio");
const inputNombre = document.getElementById('nombre')
const buttonPlay = document.getElementById("play");

/* Contenedores de la mesa*/
const elementoMesa = document.getElementById('mesa');
const tituloMesa = document.getElementById("titulo-mesa");
const contCartasCentrales = document.getElementById("contCartasCentrales");
const asientos = document.querySelectorAll(".asiento");
const buttonStar = document.getElementById('star');
const contPozo = document.getElementById('pozo');

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
    this.listaPartidas=[] 
    this.partidaActual;
    this.asientos= ['principal','inferior-der','lateral-der', 'superior-der', 'superior-izq', 'lateral-izq' ,'inferior-izq']; 
  }

  agregarJugador(jugador, zona){
    this.asientos.find((asiento)=>{
      if(asiento === zona){
        this.asientos[this.asientos.indexOf(asiento)] = jugador;        
      }
    });
  };

  crearPartida(){
    this.partidaActual = new Partida(this.asientos.filter((asiento) => {if(typeof asiento !== 'string'){return asiento}}), this.bigBlind, this.smallBlind);
  }
};

class Partida{  
  // Deler, Fase(preflop,flop,turn y river) Turno, cartas centrales , pozo y ganador(es)
  constructor (lista,bigBlind, smallBlind){
    this.listaJugadores = [...lista];
    this.listaJugadoresAllin = [];
    this.bigBlind = bigBlind;
    this.smallBlind = smallBlind;
    this.baraja = [...baraja];
    this.cartasCentrales = [];
    this.apuestaActual = 0;
    this.pozo = 0;
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
    
    /* Ponemos al Delear en el ultimo turno */
    let delear = this.listaJugadores.splice(0,1)[0];
    this.listaJugadores.push(delear);
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

  rondaApuesta(){    
    if(this.listaJugadores.length >= 2){
      this.listaJugadores[0].jugarTurno();
      return true;
    }else{
      return false; // La funcion retorna false, ya que no hay jugadores activos
    }
  }

  rondaApuestaPreFlop(){       
      this.listaJugadores[0].smallBlind = this.smallBlind;
      this.listaJugadores[0].apuesta = this.smallBlind;
      this.listaJugadores[0].dinero -= this.smallBlind;
      this.pozo += this.listaJugadores[0].apuesta;
      this.listaJugadores[0].asiento.querySelector('#contApuesta').innerText = `$${this.listaJugadores[0].apuesta}`;
      this.listaJugadores[0].asiento.querySelector('#dinero').innerHTML = `<svg id="dinero_i"  height="50" width="50" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M16.5,0c-4.206,0-7.5,1.977-7.5,4.5v2.587c-.484-.057-.985-.087-1.5-.087C3.294,7,0,8.977,0,11.5v8c0,2.523,3.294,4.5,7.5,4.5,3.416,0,6.231-1.304,7.167-3.146,.597,.087,1.207,.146,1.833,.146,4.206,0,7.5-1.977,7.5-4.5V4.5c0-2.523-3.294-4.5-7.5-4.5Zm0,2c3.148,0,5.5,1.32,5.5,2.5s-2.352,2.5-5.5,2.5-5.5-1.32-5.5-2.5,2.352-2.5,5.5-2.5ZM7.5,9c3.148,0,5.5,1.32,5.5,2.5s-2.352,2.5-5.5,2.5-5.5-1.32-5.5-2.5,2.352-2.5,5.5-2.5ZM2,14.582c1.36,.875,3.303,1.418,5.5,1.418s4.14-.543,5.5-1.418v.918c0,1.18-2.352,2.5-5.5,2.5s-5.5-1.32-5.5-2.5v-.918Zm5.5,7.418c-3.148,0-5.5-1.32-5.5-2.5v-.918c1.36,.875,3.303,1.418,5.5,1.418s4.14-.543,5.5-1.418v.918c0,1.18-2.352,2.5-5.5,2.5Zm9-3c-.514,0-1.012-.047-1.5-.116v-1.98c.492,.058,.99,.096,1.5,.096,2.197,0,4.14-.543,5.5-1.418v.918c0,1.18-2.352,2.5-5.5,2.5Zm0-4c-.514,0-1.012-.047-1.5-.116v-1.98c.492,.058,.99,.096,1.5,.096,2.197,0,4.14-.543,5.5-1.418v.918c0,1.18-2.352,2.5-5.5,2.5Zm0-4c-.542,0-1.066-.051-1.578-.127-.198-.887-.809-1.684-1.721-2.321,.992,.285,2.106,.449,3.299,.449,2.197,0,4.14-.543,5.5-1.418v.918c0,1.18-2.352,2.5-5.5,2.5Z"/></svg></svg>$${this.listaJugadores[0].dinero}`;    

      this.listaJugadores[1].bigBlind = this.bigBlind; 
      this.listaJugadores[1].apuesta = this.bigBlind;
      this.listaJugadores[1].dinero -= this.bigBlind;
      this.pozo += this.bigBlind;
      this.listaJugadores[1].asiento.querySelector('#contApuesta').innerText = `$${this.listaJugadores[1].apuesta}`;
      this.listaJugadores[1].asiento.querySelector('#dinero').innerHTML = `<svg id="dinero_i"  height="50" width="50" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M16.5,0c-4.206,0-7.5,1.977-7.5,4.5v2.587c-.484-.057-.985-.087-1.5-.087C3.294,7,0,8.977,0,11.5v8c0,2.523,3.294,4.5,7.5,4.5,3.416,0,6.231-1.304,7.167-3.146,.597,.087,1.207,.146,1.833,.146,4.206,0,7.5-1.977,7.5-4.5V4.5c0-2.523-3.294-4.5-7.5-4.5Zm0,2c3.148,0,5.5,1.32,5.5,2.5s-2.352,2.5-5.5,2.5-5.5-1.32-5.5-2.5,2.352-2.5,5.5-2.5ZM7.5,9c3.148,0,5.5,1.32,5.5,2.5s-2.352,2.5-5.5,2.5-5.5-1.32-5.5-2.5,2.352-2.5,5.5-2.5ZM2,14.582c1.36,.875,3.303,1.418,5.5,1.418s4.14-.543,5.5-1.418v.918c0,1.18-2.352,2.5-5.5,2.5s-5.5-1.32-5.5-2.5v-.918Zm5.5,7.418c-3.148,0-5.5-1.32-5.5-2.5v-.918c1.36,.875,3.303,1.418,5.5,1.418s4.14-.543,5.5-1.418v.918c0,1.18-2.352,2.5-5.5,2.5Zm9-3c-.514,0-1.012-.047-1.5-.116v-1.98c.492,.058,.99,.096,1.5,.096,2.197,0,4.14-.543,5.5-1.418v.918c0,1.18-2.352,2.5-5.5,2.5Zm0-4c-.514,0-1.012-.047-1.5-.116v-1.98c.492,.058,.99,.096,1.5,.096,2.197,0,4.14-.543,5.5-1.418v.918c0,1.18-2.352,2.5-5.5,2.5Zm0-4c-.542,0-1.066-.051-1.578-.127-.198-.887-.809-1.684-1.721-2.321,.992,.285,2.106,.449,3.299,.449,2.197,0,4.14-.543,5.5-1.418v.918c0,1.18-2.352,2.5-5.5,2.5Z"/></svg></svg>$${this.listaJugadores[1].dinero}`;    

      mesa.partidaActual.apuestaActual = this.bigBlind;
      this.actualizarPozo();

      this.listaJugadores[0].jugarTurno();
  }

  actualizarPozo(){
    contPozo.innerHTML = `<svg id="dinero_i" data-name="Layer 1" viewBox="0 0 24 24" width="160" height="160"><path d="M16.5,0c-4.206,0-7.5,1.977-7.5,4.5v2.587c-.484-.057-.985-.087-1.5-.087C3.294,7,0,8.977,0,11.5v8c0,2.523,3.294,4.5,7.5,4.5,3.416,0,6.231-1.304,7.167-3.146,.597,.087,1.207,.146,1.833,.146,4.206,0,7.5-1.977,7.5-4.5V4.5c0-2.523-3.294-4.5-7.5-4.5Zm0,2c3.148,0,5.5,1.32,5.5,2.5s-2.352,2.5-5.5,2.5-5.5-1.32-5.5-2.5,2.352-2.5,5.5-2.5ZM7.5,9c3.148,0,5.5,1.32,5.5,2.5s-2.352,2.5-5.5,2.5-5.5-1.32-5.5-2.5,2.352-2.5,5.5-2.5ZM2,14.582c1.36,.875,3.303,1.418,5.5,1.418s4.14-.543,5.5-1.418v.918c0,1.18-2.352,2.5-5.5,2.5s-5.5-1.32-5.5-2.5v-.918Zm5.5,7.418c-3.148,0-5.5-1.32-5.5-2.5v-.918c1.36,.875,3.303,1.418,5.5,1.418s4.14-.543,5.5-1.418v.918c0,1.18-2.352,2.5-5.5,2.5Zm9-3c-.514,0-1.012-.047-1.5-.116v-1.98c.492,.058,.99,.096,1.5,.096,2.197,0,4.14-.543,5.5-1.418v.918c0,1.18-2.352,2.5-5.5,2.5Zm0-4c-.514,0-1.012-.047-1.5-.116v-1.98c.492,.058,.99,.096,1.5,.096,2.197,0,4.14-.543,5.5-1.418v.918c0,1.18-2.352,2.5-5.5,2.5Zm0-4c-.542,0-1.066-.051-1.578-.127-.198-.887-.809-1.684-1.721-2.321,.992,.285,2.106,.449,3.299,.449,2.197,0,4.14-.543,5.5-1.418v.918c0,1.18-2.352,2.5-5.5,2.5Z"/></svg>
                          $${mesa.partidaActual.pozo}`;
  }

  preflop(){
    this.ronda = 'preflop';
    console.log("PREFLOP");
    this.definirTurnos()
    this.barajear();    
    this.repartirCartas();            
    this.rondaApuestaPreFlop();             
}
  
  flop(rondaApuestas = true){
    this.ronda = 'flop';
    console.log("FLOP");
    this.reiniciarApuestas();
    this.actualizarPozo();
    this.obtenerCarta(); //Se descarta una carta entre ronda
    const contCartasFlop = document.querySelectorAll('#contCartasFlop #espacio');
    for(let index = 0 ; index < 3 ; index++){
        this.cartasCentrales.push(new Carta(this.obtenerCarta()));
        this.cartasCentrales[this.cartasCentrales.length - 1].generarCarta();
        contCartasFlop[index].innerHTML = this.cartasCentrales[this.cartasCentrales.length - 1].HTMLString;
    }  
    if(rondaApuestas){
      if(!this.rondaApuesta()){
        this.turn(false);
        this.river(false);
      }
    }
    
  }

  turn(rondaApuestas = true){
    this.ronda = 'turn';
    console.log("TURN");
    this.reiniciarApuestas();
    this.actualizarPozo();
    this.obtenerCarta(); //Se descarta una carta entre ronda
    const contCartasTurn = document.querySelector('#contCartasTurn #espacio');
    const carta = new Carta(this.obtenerCarta());
    carta.generarCarta();
    this.cartasCentrales.push(carta);
    contCartasTurn.innerHTML = carta.HTMLString;
    
    if(rondaApuestas){
      if(!this.rondaApuesta()){      
        this.river(false);
      }
    }
    
  }

  river(rondaApuestas = true, finalizar = true){
    this.ronda = 'river';
    console.log("RIVER");
    this.reiniciarApuestas();
    this.actualizarPozo();
    this.obtenerCarta(); //Se descarta una carta entre ronda 
    const contCartasRiver = document.querySelector('#contCartasRiver #espacio');
    const carta = new Carta(this.obtenerCarta());
    carta.generarCarta();
    this.cartasCentrales.push(carta);
    contCartasRiver.innerHTML = carta.HTMLString;
    
    if(rondaApuestas){
      this.rondaApuesta();      
    }else if(finalizar){
      mesa.partidaActual.finalizar();
    }
  }

  reiniciarApuestas(){
    this.apuestaActual = 0;
    this.listaJugadores.forEach((jugador)=>{
      if(jugador.estado === 'activo'){
        jugador.smallBlind = 0;
        jugador.bigBlind = 0;
        jugador.apuesta = 0;
        jugador.asiento.querySelector('#contApuesta').innerText = '';
      }
    });
  }
  iniciar(){        
    this.preflop();
    // this.flop();  
    // this.turn();
    // this.river()
  }

   
  // Función de comparación personalizada
  customComparator(a, b) {
    const mapearCarta = valor => isNaN(valor) ? ({'J':11,'Q':12,'K':13,'A':14}[valor] || null) : parseInt(valor);    

    if(mapearCarta(a.texto) > mapearCarta(b.texto)){ 
      return 1
    }

    if(mapearCarta(a.texto) < mapearCarta(b.texto)){ 
      return -1
    }

    return 0  
  }
  
  escaleraReal(listaCartas){
    if(this.escaleraColor(listaCartas)){
      if(listaCartas[listaCartas.length - 1].texto == 'A'){
        return true
      }
    }
    return false;
  }

  escaleraColor(listaCartas){  
    let palo = listaCartas[0].palo;        
    return listaCartas.filter(carta => carta.palo !== palo).length == 0;
  }

  escalera(listaCartas, jugadorP){
    const mapearCarta = valor => isNaN(valor) ? ({'J':11,'Q':12,'K':13,'A':14}[valor] || null) : parseInt(valor);    
    let jugador = this.listaJugadores[this.listaJugadores.indexOf(jugadorP)];
    jugador.mano = [];
    for(let index = listaCartas.length-1 ; index > 3 ; index --){
      let cartaBase = listaCartas[index];            
      if(mapearCarta(listaCartas[index - 1].texto) == mapearCarta(cartaBase.texto) - 1){
        if(mapearCarta(listaCartas[index - 2].texto) == mapearCarta(cartaBase.texto) - 2){
          if(mapearCarta(listaCartas[index - 3].texto) == mapearCarta(cartaBase.texto) - 3){
            if(mapearCarta(listaCartas[index - 4].texto) == mapearCarta(cartaBase.texto) - 4){
              let mano = [...listaCartas.slice(index-4, index)];                
              jugador.mano = [...mano];
              
              if(this.escaleraReal(jugador.mano)){
                jugador.manoTexto = 'escalera real';
              }else if(this.escaleraColor(jugador.mano)){
                jugador.manoTexto = 'escalera de color';
              }else{
                jugador.manoTexto = 'escalera';
              }

              return true;
            }
          }
        }
      }         
    } 
    return false;
  }

  color(listaCartas, jugadorP){
    let jugador = this.listaJugadores[this.listaJugadores.indexOf(jugadorP)];
    jugador.mano = [];
    listaCartas.sort(this.customComparator);

    let cartas = listaCartas.filter(carta=> carta.palo == 'diamante');
    if(cartas.length < 5){
      cartas = listaCartas.filter(carta=> carta.palo == 'trebol');
      if(cartas.length < 5){
        cartas = listaCartas.filter(carta=> carta.palo == 'corazon');
        if(cartas.length < 5){
          cartas = listaCartas.filter(carta=> carta.palo == 'picas');
          if(cartas.length < 5){
            return false;
          }
        }
      }
    }

    let diferencia = cartas.length - 5;
    if(diferencia > 0){
      for(let index = 0; index < diferencia ; index++){
        cartas.shift();
      }
    }

    jugador.mano = [...cartas]
    return true
  }

  cartaAlta(listaCartas, jugadorP){

    let jugador = this.listaJugadores[this.listaJugadores.indexOf(jugadorP)];
    jugador.mano = [];
    jugador.mano = [...listaCartas.slice(2)].reverse();
    jugador.manoTexto = 'carta alta';
  }

  seRepiteXTimes(arr, elemento, cantidad){
    // Filtrar el arreglo para obtener solo los elementos iguales al elemento dado
    const elementosIguales = arr.filter(item => item.texto == elemento.texto);
    // Si la longitud de los elementos iguales es igual a la cantidad especificada, retorna true, de lo contrario, false
    return elementosIguales.length === cantidad;
  }

  par(listaCartas, jugadorP){
    let jugador = this.listaJugadores[this.listaJugadores.indexOf(jugadorP)];
    jugador.mano = [];
    
    let par = false;
    for(let index = listaCartas.length-1 ; index > 0 ; index --){
      if(this.seRepiteXTimes(listaCartas, listaCartas[index], 2)){  
        for(let i = 0 ; i < 2 ; i++){
         jugador.mano.push(listaCartas[index - i]);
         listaCartas.splice(index - i, 1);
        };
        par = true;      
        break;
      }
    }

    if(par){
      jugador.mano.push(listaCartas[listaCartas.length - 1]);
      jugador.mano.push(listaCartas[listaCartas.length - 2]);
      jugador.mano.push(listaCartas[listaCartas.length - 3]);        
      jugador.manoTexto = 'par';
      return true;
    }

    return false;
  }

  doblePar(listaCartas, jugadorP){
    let jugador = this.listaJugadores[this.listaJugadores.indexOf(jugadorP)];
    jugador.mano = [];
    
    let doblepar = false;
    for(let index =  listaCartas.length-1; index > 0 ; index --){
      if(this.seRepiteXTimes(listaCartas, listaCartas[index], 2)){
        for(let i = 0 ; i < 2 ; i++){
          jugador.mano.push(listaCartas[index - i]);
          listaCartas.splice(index - i, 1);
         }
        doblepar = true;
        break;
      }
    }
    
    if(doblepar){     
      doblepar = false;
      for(let index2 = listaCartas.length-1 ; index2 > 0 ; index2 --){
        if(this.seRepiteXTimes(listaCartas, listaCartas[index2], 2)){
          for(let i = 0 ; i < 2 ; i++){
            jugador.mano.push(listaCartas[index2 - i]);
            listaCartas.splice(index2 - i, 1);
           }
          doblepar = true;
          break;  
        }
      }
    }

    if(doblepar){
      jugador.mano.push(listaCartas[listaCartas.length - 1]);
      jugador.manoTexto = 'doble par';
      return true; 
    }

    return false;
  }

  tercia(listaCartas, jugadorP){
    let jugador = this.listaJugadores[this.listaJugadores.indexOf(jugadorP)];
    jugador.mano = [];
    
    for(let index = listaCartas.length-1 ; index > 1 ; index --){
      if(this.seRepiteXTimes(listaCartas, listaCartas[index], 3)){
        for(let i = 0 ; i < 3 ; i++){
          jugador.mano.push(listaCartas[index - i]);
          listaCartas.splice(index - i, 1);
         }
        break
      }
    }

    if(jugador.mano.length === 3){
      jugador.mano.push(listaCartas[listaCartas.length - 1]);
      jugador.mano.push(listaCartas[listaCartas.length - 2]);
      jugador.manoTexto = 'tercia';
      return true
    }

    return false;
  }

  poker(listaCartas, jugadorP){
    let jugador = this.listaJugadores[this.listaJugadores.indexOf(jugadorP)];
    jugador.mano = [];
  
    for(let index = listaCartas.length-1 ; index > 2 ; index --){
      if(this.seRepiteXTimes(listaCartas, listaCartas[index], 4)){
        for(let i = 0 ; i < 4 ; i++){
          jugador.mano.push(listaCartas[index - i]);
          listaCartas.splice(index - i, 1);
         }
        break
      }
    }

    if(jugador.mano.length == 4){
      jugador.mano.push(listaCartas[ listaCartas.length - 1]);
      jugador.manoTexto = 'poker';
      return true
    }

    return false;
  }

  fullhouse(listaCartas, jugadorP){
    let jugador = this.listaJugadores[this.listaJugadores.indexOf(jugadorP)];
    jugador.mano = [];

    for(let index = listaCartas.length-1 ; index > 1 ; index --){
      if(this.seRepiteXTimes(listaCartas, listaCartas[index], 3)){
        for(let i = 0 ; i < 3 ; i++){
          jugador.mano.push(listaCartas[index - i]);
          listaCartas.splice(index - i, 1);
         }
        break
      }
    }

    if(jugador.mano.length == 3 ){        
      // console.log(listaCartas.length)
      for(let index = listaCartas.length-1 ; index > 0 ; index --){
          // console.log(listaCartas[index]);
          if(this.seRepiteXTimes(listaCartas, listaCartas[index], 2)){
            for(let i = 0 ; i < 2 ; i++){
              jugador.mano.push(listaCartas[index - i]);
              listaCartas.splice(index - i, 1);
             }
            jugador.manoTexto = 'full house' 
            return true
          }
      }
    }
    return false;
  }

  desempatarManos(mano1, mano2){
    const mapearCarta = valor => isNaN(valor) ? ({'J':11,'Q':12,'K':13,'A':14}[valor] || null) : parseInt(valor);    
    for(let index = 0 ; index < mano1.length ; index++){
      if(mapearCarta(mano1.texto) > mapearCarta(mano2.texto)){
        return 1; //Retorna 1 si la mano1 es mayor que la mano2
      }else if(mapearCarta(mano1.texto) < mapearCarta(mano2.texto)){
        return -1; // Retorna -1 si la mano2 es mayot que la mano1
      }
    }

    return 0; // Retorna 0 si ambas manos son iguales
  }

  definirGanadores(){
    if(this.listaJugadoresAllin.length > 0 ){
      this.listaJugadores = [...this.listaJugadoresAllin];
    }

    if(this.listaJugadores.length > 0){
      // Se obtiene la mejor mano de cada jugador

      if(this.cartasCentrales.length < 5){        
          if(mesa.partidaActual.ronda === 'preflop'){
            mesa.partidaActual.flop(false);
            mesa.partidaActual.turn(false);
            mesa.partidaActual.river(false);
          }else if(mesa.partidaActual.ronda === 'flop'){
            mesa.partidaActual.turn(false);
            mesa.partidaActual.river(false);
          }else if(mesa.partidaActual.ronda === 'turn'){          
            mesa.partidaActual.river(false);
          }else if(mesa.partidaActual.ronda === 'river'){
            mesa.partidaActual.finalizar();
          }        
      }
      this.listaJugadores.forEach((jugador)=>{ 
        let listaCartas = [];
        listaCartas = [...jugador.cartas.slice(), ...this.cartasCentrales.slice()];
        listaCartas.sort(this.customComparator); 
         
        let texto2 = `${jugador.nombre}: ${jugador.cartas[0].texto}${jugador.cartas[0].palo} ${jugador.cartas[1].texto}${jugador.cartas[1].palo}\n`;
        listaCartas.forEach((carta)=>{texto2 += `${carta.texto}${carta.palo}, `});
        console.log(texto2);

        if(!this.escalera(listaCartas.slice(), jugador)){
          if(!this.color(listaCartas.slice(), jugador)){
            if(!this.poker(listaCartas.slice(), jugador)){
              if(!this.fullhouse(listaCartas.slice(), jugador)){
                if(!this.tercia(listaCartas.slice(), jugador)){
                  if(!this.doblePar(listaCartas.slice(), jugador)){
                    if(!this.par(listaCartas.slice(), jugador)){
                      this.cartaAlta(listaCartas.slice(), jugador);
                    }
                  }
                } 
              }
            }
          }         
        }

        let texto = `${jugador.manoTexto}: `;
        jugador.mano.forEach((carta)=>{texto += `${carta.texto}${carta.palo}, `});
        console.log(texto);
      });

      const evaluarMano = valor => isNaN(valor) ? ({'escalera real':10, 'escalera color':9, 'poker':8, 'full house':7, 'color': 6, 'escalera': 5, 'tercia':4, 'doble par': 3, 'par': 2, 'carta alta':1}[valor] || null) : parseInt(valor);    
        let ganadores = [this.listaJugadores[0]];        
        for(let index = 1 ; index < this.listaJugadores.length - 1 ; index ++){
            if(evaluarMano(ganadores[0].manoTexto) < evaluarMano(this.listaJugadores[index].manoTexto)){
                ganadores = [this.listaJugadores[index]];
            }else if(evaluarMano(ganadores[0].manoTexto) == evaluarMano(this.listaJugadores[index].manoTexto)){

                if(this.desempatarManos(ganadores[0].mano, this.listaJugadores.mano) == -1){
                  ganadores = [this.listaJugadores[index]];
                }else if(this.desempatarManos(ganadores[0].mano, this.listaJugadores.mano) == 0){
                  ganadores.push(this.listaJugadores[index]);
                }
            }
        }
      
      this.listaJugadores = ganadores;
      console.log(ganadores);
    }
  }

  recompensarGanadores(){
    this.gananciaIndividual = Math.floor(this.pozo / this.listaJugadores.length);
    this.listaJugadores.forEach((jugador)=>{jugador.dinero += this.gananciaIndividual});
  }

  mostrarGanadores(){
    let texto = `Pozo: $${this.pozo}\nGanadores:\n `;
    this.listaJugadores.forEach((jugador)=>{
      texto += `${jugador.nombre}: + $${this.gananciaIndividual} ${jugador.manoTexto}\n`;
    });
    alert(texto);
  }

  actualizarContenedoresGanadores(){
    this.listaJugadores.forEach((jugador)=>{
      jugador.asiento.querySelector('#dinero').innerHTML = `<svg id="dinero_i"  height="50" width="50" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M16.5,0c-4.206,0-7.5,1.977-7.5,4.5v2.587c-.484-.057-.985-.087-1.5-.087C3.294,7,0,8.977,0,11.5v8c0,2.523,3.294,4.5,7.5,4.5,3.416,0,6.231-1.304,7.167-3.146,.597,.087,1.207,.146,1.833,.146,4.206,0,7.5-1.977,7.5-4.5V4.5c0-2.523-3.294-4.5-7.5-4.5Zm0,2c3.148,0,5.5,1.32,5.5,2.5s-2.352,2.5-5.5,2.5-5.5-1.32-5.5-2.5,2.352-2.5,5.5-2.5ZM7.5,9c3.148,0,5.5,1.32,5.5,2.5s-2.352,2.5-5.5,2.5-5.5-1.32-5.5-2.5,2.352-2.5,5.5-2.5ZM2,14.582c1.36,.875,3.303,1.418,5.5,1.418s4.14-.543,5.5-1.418v.918c0,1.18-2.352,2.5-5.5,2.5s-5.5-1.32-5.5-2.5v-.918Zm5.5,7.418c-3.148,0-5.5-1.32-5.5-2.5v-.918c1.36,.875,3.303,1.418,5.5,1.418s4.14-.543,5.5-1.418v.918c0,1.18-2.352,2.5-5.5,2.5Zm9-3c-.514,0-1.012-.047-1.5-.116v-1.98c.492,.058,.99,.096,1.5,.096,2.197,0,4.14-.543,5.5-1.418v.918c0,1.18-2.352,2.5-5.5,2.5Zm0-4c-.514,0-1.012-.047-1.5-.116v-1.98c.492,.058,.99,.096,1.5,.096,2.197,0,4.14-.543,5.5-1.418v.918c0,1.18-2.352,2.5-5.5,2.5Zm0-4c-.542,0-1.066-.051-1.578-.127-.198-.887-.809-1.684-1.721-2.321,.992,.285,2.106,.449,3.299,.449,2.197,0,4.14-.543,5.5-1.418v.918c0,1.18-2.352,2.5-5.5,2.5Z"/></svg></svg>$${jugador.dinero}`;    
    });
  }
  reiniciarAtributosJugadores(){
    mesa.asientos.forEach((jugador)=>{
      if(typeof jugador !== 'string'){
        jugador.apuesta = 0;
        jugador.smallBlind = 0;
        jugador.bigBlind = 0;
        jugador.estado = 'activo';
        jugador.cartas = [];
      }
    });
  }

  detenerTemporizadores(){
    this.listaJugadores.forEach((jugador)=>{clearInterval(jugador.temporizador.intervalo)});
  }

  mostrarCartas(){
    let jugadoresActivos = [...this.listaJugadores, ...this.listaJugadoresAllin];
    console.log(`LJ: ${this.listaJugadores}`);
    console.log(`LJA: ${this.listaJugadoresAllin}`);
    jugadoresActivos.forEach((jugador)=>{
      // console.log(`${jugador.nombre}`)
      jugador.renderizarCartas(false)});
  }

  finalizar(){
    this.detenerTemporizadores();
    this.mostrarCartas();    
    this.definirGanadores();    
    this.recompensarGanadores();
    setTimeout(()=>{this.mostrarGanadores()},2000);
    this.actualizarContenedoresGanadores();
    this.reiniciarAtributosJugadores();
  }

  comprobarApuestaActual(){
    let boleano = true; 
    this.listaJugadores.forEach((jugador)=>{
      if(jugador.apuesta != this.apuestaActual){  
        boleano = false; 
      }
    });
    return boleano;
  }
}

class Jugador{
  constructor (nombre, asiento, tipo){
    this.nombre = nombre;
    this.tipo = tipo;
    this.asiento = asiento;
    this.dinero = 10000;
    this.apuesta = 0;    
    this.smallBlind = 0;
    this.bigBlind = 0;
    this.turno = null;
    this.estado = 'activo';
    this.cartas=[];
    this.temporizador = new Temporizador(30, this.asiento, this);
    this.mano = []; // Arreglo donde se guardara la mano de cinco cartas del jugador
  }

  deshabilitarBotones(){
    if(this.tipo === 'jugador'){
      let botones = document.querySelectorAll('.boton-ij');
      botones.forEach((boton)=>{
      boton.setAttribute('disabled', 'true')      
    });}
  }

  habilitarBotones(){
    //Se habilitan las acciones de los botones        
    if(mesa.partidaActual.apuestaActual === 0){
     // sin apuesta -> check, raise, allin o fold             
     document.getElementById('check').removeAttribute('disabled');     
   }else if (mesa.partidaActual.apuestaActual > 0){
    // con apuesta -> call, raise , allin o fold
     document.getElementById('call').removeAttribute('disabled');} 
     document.getElementById('allin').removeAttribute('disabled');
     document.getElementById('fold').removeAttribute('disabled');
     if(this.dinero - 25 >= mesa.partidaActual.apuestaActual){
      document.getElementById('raise').removeAttribute('disabled');
     }
 }

  actulizarContenedoresDineroApuesta(){
    this.asiento.querySelector('#contApuesta').innerText = `$${this.apuesta}`;
    this.asiento.querySelector('#dinero').innerHTML = `<svg id="dinero_i"  height="50" width="50" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M16.5,0c-4.206,0-7.5,1.977-7.5,4.5v2.587c-.484-.057-.985-.087-1.5-.087C3.294,7,0,8.977,0,11.5v8c0,2.523,3.294,4.5,7.5,4.5,3.416,0,6.231-1.304,7.167-3.146,.597,.087,1.207,.146,1.833,.146,4.206,0,7.5-1.977,7.5-4.5V4.5c0-2.523-3.294-4.5-7.5-4.5Zm0,2c3.148,0,5.5,1.32,5.5,2.5s-2.352,2.5-5.5,2.5-5.5-1.32-5.5-2.5,2.352-2.5,5.5-2.5ZM7.5,9c3.148,0,5.5,1.32,5.5,2.5s-2.352,2.5-5.5,2.5-5.5-1.32-5.5-2.5,2.352-2.5,5.5-2.5ZM2,14.582c1.36,.875,3.303,1.418,5.5,1.418s4.14-.543,5.5-1.418v.918c0,1.18-2.352,2.5-5.5,2.5s-5.5-1.32-5.5-2.5v-.918Zm5.5,7.418c-3.148,0-5.5-1.32-5.5-2.5v-.918c1.36,.875,3.303,1.418,5.5,1.418s4.14-.543,5.5-1.418v.918c0,1.18-2.352,2.5-5.5,2.5Zm9-3c-.514,0-1.012-.047-1.5-.116v-1.98c.492,.058,.99,.096,1.5,.096,2.197,0,4.14-.543,5.5-1.418v.918c0,1.18-2.352,2.5-5.5,2.5Zm0-4c-.514,0-1.012-.047-1.5-.116v-1.98c.492,.058,.99,.096,1.5,.096,2.197,0,4.14-.543,5.5-1.418v.918c0,1.18-2.352,2.5-5.5,2.5Zm0-4c-.542,0-1.066-.051-1.578-.127-.198-.887-.809-1.684-1.721-2.321,.992,.285,2.106,.449,3.299,.449,2.197,0,4.14-.543,5.5-1.418v.918c0,1.18-2.352,2.5-5.5,2.5Z"/></svg></svg>$${this.dinero}`;    
  }

  check(){
    this.asiento.querySelector('#contApuesta').innerText = 'CHECK';
    this.temporizador.detenerTemporizador(); 
    console.log(`${this.nombre} CHECK`); 
  }

  call(){    
    let diferencia = Math.abs(this.apuesta - mesa.partidaActual.apuestaActual);
    this.apuesta += diferencia;
    this.dinero -= diferencia;
    mesa.partidaActual.pozo += diferencia; 

    if(this.dinero == 0){
      this.estado = 'allin';
    }

    this.actulizarContenedoresDineroApuesta();
    this.asiento.querySelector('#contApuesta').innerText = `CALL: $${this.apuesta}`;        

    this.temporizador.detenerTemporizador();
    console.log(`${this.nombre} CALL: ${this.apuesta}`); 
  }

  allin(){    
    this.estado = 'allin';
    let diferencia = Math.abs(this.apuesta - this.dinero);
    this.apuesta += this.dinero;
    this.dinero -= this.dinero;
    mesa.partidaActual.pozo += diferencia;

    this.actulizarContenedoresDineroApuesta()
    this.asiento.querySelector('#contApuesta').innerText = `ALLIN: $${this.apuesta}`;

    if(this.apuesta > mesa.partidaActual.apuestaActual){
      mesa.partidaActual.apuestaActual = this.apuesta;
    }

    this.temporizador.detenerTemporizador();
    console.log(`${this.nombre} ALLIN: ${this.apuesta}`); 
  }

  raise(){
  let diferencia = Math.abs(this.apuesta - (mesa.partidaActual.apuestaActual + 25));
  this.apuesta += diferencia;
  this.dinero -= diferencia;
  mesa.partidaActual.apuestaActual = this.apuesta;
  mesa.partidaActual.pozo += diferencia; 

  this.actulizarContenedoresDineroApuesta();
  this.asiento.querySelector('#contApuesta').innerText = `RAISE: $${this.apuesta}`;        

  this.temporizador.detenerTemporizador();
  console.log(`${this.nombre} RAISE: ${this.apuesta}`); 
  };

  fold(){
    this.estado = 'inactivo';  
    this.deshabilitarBotones();    
    this.asiento.querySelector('#interfazCartas').style.display = 'none';
    this.actulizarContenedoresDineroApuesta();
    this.asiento.querySelector('#contApuesta').innerText = `FOLD: ${this.apuesta}`;
    
    if(mesa.partidaActual.listaJugadores.length - 1 <= 1 && mesa.partidaActual.listaJugadoresAllin == 0 ){
      // Definir ganador
      // Se detiene el temporizador del jugador actual
      clearInterval(this.temporizador.intervalo);
      mesa.partidaActual.listaJugadores.splice(mesa.partidaActual.listaJugadores.indexOf(this), 1);
      mesa.partidaActual.actualizarPozo(); 
      mesa.partidaActual.finalizar();
    }else{

      this.temporizador.detenerTemporizador(); 
      mesa.partidaActual.listaJugadores.splice(mesa.partidaActual.listaJugadores.indexOf(this), 1);
      
    } 
    console.log(`${this.nombre} FOLD: ${this.apuesta}`); 
  };

  accionAleatoria(){
    // Se escoje una accion aleatoria y se hace en tiempo random
    let index = Math.floor(Math.random() * 3);
    if(mesa.partidaActual.apuestaActual === 0){
       // sin apuesta -> check, raise, allin o fold
       let acciones = ['check', 'allin', 'fold'];
       if(this.dinero - 25 > this.apuesta){
          acciones.push('raise');
          index = Math.floor(Math.random() * 4);
       }
       if(acciones[index] === 'check'){
        this.check()
      }else if(acciones[index] === 'allin'){
        this.allin()
      }else if(acciones[index] === 'fold'){
        this.fold()
      }else if(acciones[index] === 'raise'){
        this.raise()
      }       
    }else if (mesa.partidaActual.apuestaActual > 0){
      // con apuesta -> call, raise , allin o fold
      let acciones = ['call', 'allin', 'fold'];
      if(this.dinero - 25 >= mesa.partidaActual.apuestaActual){
        acciones.push('raise');
         index = Math.floor(Math.random() * 4);
      }      
      if(acciones[index] === 'call'){
        this.call()
      }else if(acciones[index] === 'allin'){
        this.allin()        
      }else if(acciones[index] === 'fold'){
        this.fold()
      }else if(acciones[index] === 'raise'){
        this.raise()
      }      
    }    
  }

  jugarTurno(){
    this.temporizador.tiempo = 30;
    this.temporizador.iniciar();
    if(this.estado === 'activo'){  
      if (this.tipo === 'bot'){        
        setTimeout(()=>{this.accionAleatoria()}, Math.floor(Math.random() * 30) * 1000);
      }else if (this.tipo === 'jugador'){
        this.habilitarBotones();      
      }
    }else{
      // Pasar al siguiente turno         
      this.temporizador.detenerTemporizador();
    }
  }

  /* Front End */
  renderizarCartas(ocultar = true){ 
    let interfazCartas = this.asiento.querySelector('#interfazCartas'); 
    let cartaIzq = this.cartas[0]; //console.log(`${this.cartas[0].texto} ${this.cartas[0].palo}`)
    let cartaDer = this.cartas[1]; //console.log(`${this.cartas[1].texto} ${this.cartas[1].palo}`)
    cartaIzq.orientacion = 'izq';
    cartaDer.orientacion = 'der';
        
    if(this.tipo === 'bot' && ocultar){
      cartaIzq.ocultar = true;
      cartaDer.ocultar = true;
    }else{
      cartaIzq.ocultar = false;
      cartaDer.ocultar = false;
    }

    cartaIzq.generarCarta(); //console.log(`${cartaIzq.HTMLString}`);
    cartaDer.generarCarta(); //console.log(`${cartaDer.HTMLString}`);
    interfazCartas.innerHTML = cartaIzq.HTMLString + cartaDer.HTMLString;     
  }
};

class Carta{
  constructor(carta){ // Formato { 'palo' , 'texto' } 
    this.palo = carta.palo;
    this.texto = carta.texto;
    this.orientacion = null;
    this.ocultar = false;    
  }

  cartaDiamantes(){
     this.HTMLString += `        
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
  }

  cartaTreboles(){
    this.HTMLString += `    
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
  }

  cartaPicas(){
    this.HTMLString += `             
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
  }

  cartaCorazones(){
    this.HTMLString += `                   
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
  }
  generarCarta(){   
    this.HTMLString = '' ;
    if( this.orientacion === 'izq'){
      this.HTMLString += '<div class="carta inclinada-izq ';
    }else if( this.orientacion === 'der'){
      this.HTMLString += '<div class="carta inclinada-der ';
    }else{
      this.HTMLString += '<div class="carta ';}

    if(this.ocultar){
      this.HTMLString += 'volteada"></div>';
    }else{
      this.HTMLString += '">';  
      if (this.palo === 'diamante'){
        this.cartaDiamantes();
      }else if(this.palo === 'trebol'){        
       this.cartaTreboles();
      }else if(this.palo === 'picas'){
        this.cartaPicas();
      }else if(this.palo === 'corazon'){
        this.cartaCorazones();
      }     
    }
  }
}

class Temporizador {
  constructor(tiempo, asiento, dueño) {
    this.tiempoInicial = tiempo;
    this.tiempo = this.tiempoInicial;
    this.intervalo = null;    
    this.dueño = dueño;
    this.contenedor = asiento;   
  }

  iniciar(){
    this.intervalo = setInterval(() => {
      if (this.tiempo > 0) {
        this.tiempo--;
        this.actualizarTiempo(); 
      } else {
        this.detenerTemporizador();
      }
    }, 1000);
  };

  detenerTemporizador(){
    clearInterval(this.intervalo);  

    this.dueño.deshabilitarBotones();
    let index = mesa.partidaActual.listaJugadores.indexOf(this.dueño);
    if (index < mesa.partidaActual.listaJugadores.length - 1){
      mesa.partidaActual.listaJugadores[index + 1].jugarTurno();
    }else if(mesa.partidaActual.comprobarApuestaActual() || mesa.partidaActual.listaJugadores.length <= 1 ){
      setTimeout(()=>{
        if(mesa.partidaActual.ronda === 'preflop'){      
          mesa.partidaActual.flop();      
        }else if(mesa.partidaActual.ronda === 'flop'){
          mesa.partidaActual.turn();
        }else if(mesa.partidaActual.ronda === 'turn'){
          mesa.partidaActual.river();
        }else if(mesa.partidaActual.ronda === 'river'){
          mesa.partidaActual.finalizar();
        }  
      },3000);
    }else{
      mesa.partidaActual.rondaApuesta();
    }

    if(this.tiempo === 0){ // Se elimina al jugador si se le termina el tiempo
      this.dueño.estado = 'inactivo';
      this.dueño.asiento.querySelector('#apuesta').innerText = 'Eliminado';
      mesa.partidaActual.listaJugadores.splice(index,1);
    }

    if(this.dueño.estado === 'allin'){
      mesa.partidaActual.listaJugadoresAllin.push(mesa.partidaActual.listaJugadores.splice(index,1)[0]);

      // if(mesa.partidaActual.listaJugadores.length === 0){
      //   if(mesa.partidaActual.ronda === 'preflop'){
      //     mesa.partidaActual.flop(false);
      //     mesa.partidaActual.turn(false);
      //     mesa.partidaActual.river(false);
      //   }else if(mesa.partidaActual.ronda === 'flop'){
      //     mesa.partidaActual.turn(false);
      //     mesa.partidaActual.river(false);
      //   }else if(mesa.partidaActual.ronda === 'turn'){          
      //     mesa.partidaActual.river(false);
      //   }else if(mesa.partidaActual.ronda === 'river'){
      //     mesa.partidaActual.finalizar();
      //   }
      // }
  }
}

  reiniciarTemporizador(tiempo) {
    this.tiempo = tiempo;
    this.actualizarTiempo();
    this.detenerTemporizador(); 
    this.iniciar(); 
  }

  actualizarTiempo() {    
    let minutos = Math.floor((this.tiempo % 3600) / 60);
    let segundos = this.tiempo % 60;
    let temporizador = `${this.pad(minutos)}:${this.pad(segundos)}`; 
    this.contenedor.querySelector("#tiempo").innerHTML = `<svg id="tiempo_i" height="50" width="50" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><path d="m13.5 2.115v-.615a1.5 1.5 0 0 0 -3 0v.615a10.968 10.968 0 0 0 -7.214 17.572 3.526 3.526 0 0 0 -1.286 2.813 1.5 1.5 0 0 0 3 0 .641.641 0 0 1 .455-.68 10.917 10.917 0 0 0 13.087 0 .641.641 0 0 1 .458.68 1.5 1.5 0 0 0 3 0 3.526 3.526 0 0 0 -1.286-2.813 10.968 10.968 0 0 0 -7.214-17.572zm-9.5 10.885a8 8 0 1 1 8 8 8.009 8.009 0 0 1 -8-8z"/><path d="m19.5 0a1.5 1.5 0 0 0 0 3 1.361 1.361 0 0 1 1.459 1.5 1.5 1.5 0 0 0 3 0 4.333 4.333 0 0 0 -4.459-4.5z"/><path d="m3.041 4.5a1.361 1.361 0 0 1 1.459-1.5 1.5 1.5 0 0 0 0-3 4.333 4.333 0 0 0 -4.459 4.5 1.5 1.5 0 0 0 3 0z"/><path d="m13.53 12.379v-3.879a1.5 1.5 0 0 0 -1.5-1.5 1.5 1.5 0 0 0 -1.5 1.5v4.293a2 2 0 0 0 .586 1.414l1.793 1.793a1.5 1.5 0 0 0 2.121-2.121z"/></svg>
    ${temporizador}`;    
  }

  pad(valor) {    
    return valor < 10 ? "0" + valor : valor;
  }
};

const mesa = new Mesa();
const jugadorPrincipal = new Jugador(/*inputNombre.value*/ 'Player', interfazJugador, 'jugador');

function entrar(){
  /*Front End*/
  const nombre = inputNombre.value;
  interfazNombre.innerText = nombre;
  
  interfazInicio.style.display = 'none';
  elementoMesa.style.display = 'block';
  interfazJugador.style.display = 'block';

  /*Back End*/
  mesa.agregarJugador(jugadorPrincipal, 'principal');  
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
    <div id="interfazCartas"></div>
    <div id="interfazNombre" class="grey">
      <svg id="microchip_i"  width='70' heigth='7 0' data-name="Layer 1" viewBox="0 0 24 24"><path d="m10,9.261l1.205,4.739h-2.411l1.205-4.739Zm12,1.739v2h1c.552,0,1,.447,1,1s-.448,1-1,1h-1v2h1c.552,0,1,.447,1,1s-.448,1-1,1h-1.418c-.505,1.151-1.431,2.077-2.582,2.582v1.418c0,.553-.448,1-1,1s-1-.447-1-1v-1h-2v1c0,.553-.448,1-1,1s-1-.447-1-1v-1h-2v1c0,.553-.448,1-1,1s-1-.447-1-1v-1h-2v1c0,.553-.448,1-1,1s-1-.447-1-1v-1.418c-1.151-.505-2.077-1.431-2.582-2.582h-1.418c-.552,0-1-.447-1-1s.448-1,1-1h1v-2h-1c-.552,0-1-.447-1-1s.448-1,1-1h1v-2h-1c-.552,0-1-.447-1-1s.448-1,1-1h1v-2h-1c-.552,0-1-.447-1-1s.448-1,1-1h1.418c.505-1.151,1.431-2.077,2.582-2.582v-1.418c0-.553.448-1,1-1s1,.447,1,1v1h2v-1c0-.553.448-1,1-1s1,.447,1,1v1h2v-1c0-.553.448-1,1-1s1,.447,1,1v1h2v-1c0-.553.448-1,1-1s1,.447,1,1v1.418c1.151.505,2.077,1.431,2.582,2.582h1.418c.552,0,1,.447,1,1s-.448,1-1,1h-1v2h1c.552,0,1,.447,1,1s-.448,1-1,1h-1Zm-8.031,5.754l-2.404-9.452c-.182-.777-.811-1.299-1.565-1.299s-1.383.521-1.561,1.28l-2.409,9.471c-.136.535.188,1.079.723,1.215.54.142,1.08-.187,1.216-.723l.317-1.246h3.428l.317,1.246c.115.453.522.754.969.754.082,0,.164-.01.247-.031.535-.136.859-.68.723-1.215Zm3.031-9.754c0-.553-.448-1-1-1s-1,.447-1,1v10c0,.553.448,1,1,1s1-.447,1-1V7Z"/></svg>
      BOT ${mesa.asientos.filter(asiento => typeof asiento !== 'string').length}
    </div>
    <div id="interfazDatos" class="pequeño">
        <div id="dinero" class="pequeño">
            <svg xmlns="http://www.w3.org/2000/svg" id="dinero_i"  height="50"  width="50" data-name="Layer 1" viewBox="0 0 24 24"><path d="m5,6C5,2.691,7.691,0,11,0s6,2.691,6,6-2.691,6-6,6-6-2.691-6-6Zm16.685,10.267l-3.041-.507c-.373-.062-.644-.382-.644-.76,0-.551.448-1,1-1h2c.552,0,1,.449,1,1h2c0-1.654-1.346-3-3-3v-2h-2v2c-1.654,0-3,1.346-3,3,0,1.36.974,2.51,2.315,2.733l3.041.507c.373.062.644.382.644.76,0,.551-.448,1-1,1h-2c-.552,0-1-.449-1-1h-2c0,1.654,1.346,3,3,3v2h2v-2c1.654,0,3-1.346,3-3,0-1.36-.974-2.51-2.315-2.733Zm-7.685,2.733v-4c0-.286.038-.561.084-.834l-.084-.166h-7.5c-2.481,0-4.5,2.019-4.5,4.5v5.5h15v-.424c-1.763-.774-3-2.531-3-4.576Z"/>
          </svg>10000</div>        
        <div id="tiempo" class="pequeño">
            <svg id="tiempo_i" height="50"  width="50" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><path d="m13.5 2.115v-.615a1.5 1.5 0 0 0 -3 0v.615a10.968 10.968 0 0 0 -7.214 17.572 3.526 3.526 0 0 0 -1.286 2.813 1.5 1.5 0 0 0 3 0 .641.641 0 0 1 .455-.68 10.917 10.917 0 0 0 13.087 0 .641.641 0 0 1 .458.68 1.5 1.5 0 0 0 3 0 3.526 3.526 0 0 0 -1.286-2.813 10.968 10.968 0 0 0 -7.214-17.572zm-9.5 10.885a8 8 0 1 1 8 8 8.009 8.009 0 0 1 -8-8z"/><path d="m19.5 0a1.5 1.5 0 0 0 0 3 1.361 1.361 0 0 1 1.459 1.5 1.5 1.5 0 0 0 3 0 4.333 4.333 0 0 0 -4.459-4.5z"/><path d="m3.041 4.5a1.361 1.361 0 0 1 1.459-1.5 1.5 1.5 0 0 0 0-3 4.333 4.333 0 0 0 -4.459 4.5 1.5 1.5 0 0 0 3 0z"/><path d="m13.53 12.379v-3.879a1.5 1.5 0 0 0 -1.5-1.5 1.5 1.5 0 0 0 -1.5 1.5v4.293a2 2 0 0 0 .586 1.414l1.793 1.793a1.5 1.5 0 0 0 2.121-2.121z"/></svg>
                00:00</div>                                      
    </div>
    <div id="contApuesta" class="${asiento.classList.item(1)}"></div>
  `;
  asiento.innerHTML = HTMLString;

  /* Back End */
  mesa.agregarJugador(new Jugador(`Bot ${mesa.asientos.filter(asiento => typeof asiento !== 'string').length}`, asiento, 'bot'), asiento.classList.item(1));
}

function star(){  
  if (mesa.asientos.filter(asiento => typeof asiento !== 'string').length > 1 ){
    buttonStar.style.display = 'none';
    contPozo.style.display = 'flex';
    mesa.crearPartida();    
    mesa.partidaActual.iniciar();      
  }else{
    alert("¡Se necesitan minimo dos jugadores para empezar!")
  }
}

buttonPlay.addEventListener('click',entrar); 