let tamagotchi = {
    nombre: '',
    tipo: '',
    vida: 3,
    energia: 3,
    hambre: 3,
};
let tipoSeleccionado = null;
let sistemaInterval = null;
let instanciaTamagotchi = null; // Variable global para la instancia
let tiempoSinJugar = 0;
let intervaloDormido = null;
let intervaloInvernando = null;

// Función para seleccionar el cuerpo del Tamagotchi
function seleccionarCuerpo(elemento) {
    document.querySelectorAll('.containercuerpo li').forEach(li => {
        li.classList.remove('selected');
    });
    
    elemento.classList.add('selected');
    tipoSeleccionado = elemento.getAttribute('data-tipo');
}

function guardarinfor() {
    const nombre = document.getElementById('NombreTamagotchi').value.trim();
    
    if (!nombre) {
        alert('¡Por favor ingresa un nombre para tu Tamagotchi!');
        return;
    }
    
    if (!tipoSeleccionado) {
        alert('¡Por favor selecciona un tipo de Tamagotchi!');
        return;
    }
    
    tamagotchi.nombre = nombre;
    tamagotchi.tipo = tipoSeleccionado;
    
    document.getElementById('pantallaSeleccion').classList.remove('active');
    document.getElementById('pantallaJuego').classList.add('active');
    
    document.getElementById('nombreTamagotchi').textContent = tamagotchi.nombre;
    actualizarTamagotchi();
    
    iniciarSistema();
}

function volverSeleccion() {
    if (confirm('¿Estás seguro de que quieres volver? Se perderá el progreso actual.')) {
        document.getElementById('pantallaJuego').classList.remove('active');
        document.getElementById('pantallaSeleccion').classList.add('active');
        
        document.getElementById('NombreTamagotchi').value = '';
        document.querySelectorAll('.containercuerpo li').forEach(li => {
            li.classList.remove('selected');
        });
        tipoSeleccionado = null;
        
        //Limpiar todos los intervalos
        if (sistemaInterval) {
            clearInterval(sistemaInterval);
            sistemaInterval = null;
        }
        if (intervaloDormido) {
            clearInterval(intervaloDormido);
            intervaloDormido = null;
        }
        if (intervaloInvernando) {
            clearInterval(intervaloInvernando);
            intervaloInvernando = null;
        }
        
        instanciaTamagotchi = null;
        tiempoSinJugar = null;
        
        tamagotchi = {
            nombre: '',
            tipo: '',
            vida: 3,
            energia: 3,
            hambre: 3,
            estado: 'feliz'
        };
    }
}

function actualizarTamagotchi() {
    const tamagotchiElement = document.getElementById('imagenTamagotchi');
    let imagenSrc = '';
    
    switch(tamagotchi.tipo) {
        case 'papel':
            imagenSrc = './img/cuerpos/Cuerpopapel.gif';
            break;
        case 'plastilina':
            imagenSrc = './img/cuerpos/Cuerpoplastilina.gif';
            break;
        case 'tocino':
            imagenSrc = './img/cuerpos/Cuerpotocino.gif';
            break;
        default:
            imagenSrc = './img/cuerpos/Cuerpoplastilina.gif';
            break;
    }
    
    tamagotchiElement.innerHTML = `<img src="${imagenSrc}" alt="Tamagotchi" class="tamagotchi-imagen">`;
}

function actualizarVida() {
    const tamagotchiElement = document.getElementById('barraVida');
    if (!tamagotchiElement) return;
    
    let imagenSrc = '';
    
    switch(tamagotchi.vida) {
        case 3:
            imagenSrc = './img/barravida/vidafull.png';
            break;
        case 2:
            imagenSrc = './img/barravida/vidamedia.png';
            break;
        case 1:
            imagenSrc = './img/barravida/vidapoco.png';
            break;
        case 0:
            imagenSrc = './img/barravida/vidacero.png';
            break;
        default:
            imagenSrc = './img/barravida/vidacero.png';
            break;
    }
    
    tamagotchiElement.innerHTML = `<img src="${imagenSrc}" alt="Vida" class="barra-imagen">`;
}

function actualizarEnergia() {
    const tamagotchiElement = document.getElementById('barraEnergia');
    if (!tamagotchiElement) return;
    
    let imagenSrc = '';
    
    switch(tamagotchi.energia) {
        case 3:
            imagenSrc = './img/barraenergia/energiafull.png';
            break;
        case 2:
            imagenSrc = './img/barraenergia/energiamedia.png';
            break;
        case 1:
            imagenSrc = './img/barraenergia/energiapoco.png';
            break;
        case 0:
            imagenSrc = './img/barraenergia/energiacero.png';
            break;
        default:
            imagenSrc = './img/barraenergia/energiacero.png';
            break;
    }
    
    tamagotchiElement.innerHTML = `<img src="${imagenSrc}" alt="Energía" class="barra-imagen">`;
}

function actualizarHambre() {
    const tamagotchiElement = document.getElementById('barraHambre');
    if (!tamagotchiElement) return;
    
    let imagenSrc = '';
    
    switch(tamagotchi.hambre) {
        case 3:
            imagenSrc = './img/barrahambre/hambrefull.png';
            break;
        case 2:
            imagenSrc = './img/barrahambre/hambremedio.png';
            break;
        case 1:
            imagenSrc = './img/barrahambre/hambrepoco.png';
            break;
        case 0:
            imagenSrc = './img/barrahambre/hambrecero.png';
            break;
        default:
            imagenSrc = './img/barrahambre/hambrecero.png';
            break;
    }
    
    tamagotchiElement.innerHTML = `<img src="${imagenSrc}" alt="Hambre" class="barra-imagen">`;
}

function iniciarSistema() {
    if (sistemaInterval) {
        clearInterval(sistemaInterval);
    }
    
    // Crear nueva instancia de Tamagotchi
    instanciaTamagotchi = new Tamagotchi();
    instanciaTamagotchi.nombre = tamagotchi.nombre;
    instanciaTamagotchi.tipo = tamagotchi.tipo;
    
    // Iniciar degradación cada 30 segundos
    sistemaInterval = setInterval(() => {
        degradarEstadisticas(instanciaTamagotchi);
    }, 30000);
}

function degradarEstadisticas(tamagotchiInstance) {
    // Incrementar tiempo sin jugar si está despierto y no está muerto
    const estadoActual = tamagotchiInstance.Estado.constructor.name;

    // Si esta muerto no hacer nada mas
    if (tamagotchiInstance.Estado.constructor.name === 'Muerto'){
        return;
    }

    // Incrementar tiempo sin jugar si esta despierto y no esta muerto o invernando
    if (estadoActual !== 'Dormido' && estadoActual !== 'Invernando' && estadoActual !== 'Muerto') {
        tiempoSinJugar++;
        
        // Cambiar a aburrido si no ha jugado en mucho tiempo y está feliz
        if (tiempoSinJugar >= 3 && estadoActual === 'Feliz') {
            tamagotchiInstance.setEstado(new Aburrido());
        }
    }

    // No degradar hambre si esta invernando
    if(estadoActual !== 'Invernando'){
        // Reducir hambre gradualmente 
        if (tamagotchiInstance.hambre > 0){
            tamagotchiInstance.hambre--;
            if (tamagotchiInstance.hambre === 0){
                // Solo cambiar a triste si no esta en un estado mas critico
                if (estadoActual !== 'Cansado' && estadoActual !== 'Muerto') {
                    tamagotchiInstance.setEstado(new Triste());
                }
            }
        }
    }
    // Reducir vida si el hambre llega a 0 por mucho tiempo
    if (tamagotchiInstance.hambre === 0 && Math.random() < 0.3) {
        if (tamagotchiInstance.vida > 0) {
            tamagotchiInstance.vida--;
            if (tamagotchiInstance.vida === 0) {
                tamagotchiInstance.setEstado(new Muerto());
                // Llamar al metodo especial de procesamiento para el esta Muerto
                tamagotchiInstance.Estado.procesar(tamagotchiInstance);
            }
        }
    }

    // Cambiar a cansado si la energia llega a 0 y no esta dormido o invernando
    if(tamagotchiInstance.energia === 0 && estadoActual !== 'Dormido' && estadoActual !== 'Invernando' && estadoActual !== 'Cansado' && estadoActual !== 'Muerto'){
        tamagotchiInstance.setEstado(new Cansado());
    }
    
    // Cambiar estado higiénico ocasionalmente 
    if (Math.random() < 0.3) {
        tamagotchiInstance.setEstadohigienco(new Sucio());
    }

    //Procesar estado especial si existe el metodo
    if(typeof tamagotchiInstance.Estado.procesar === 'function'){
        tamagotchiInstance.Estado.procesar(tamagotchiInstance);
    }
    
    tamagotchiInstance.actualizarInterfaz();
}

// Funcion para iniciar recuperacion gradual de energia al dormir
function iniciarRecuperacionEnergia(tamagotchiInstance) {
    if (intervaloDormido) {
        clearInterval(intervaloDormido);
    }
    
    intervaloDormido = setInterval(() => {
        if (tamagotchiInstance.energia < 3) {
            tamagotchiInstance.energia++;
            tamagotchiInstance.actualizarInterfaz();
            
            // Si se recupera completamente, limpiar el intervalo
            if (tamagotchiInstance.energia >= 3) {
                clearInterval(intervaloDormido);
                intervaloDormido = null;
            }
        }
    }, 15000); // Recupera 1 punto de energía cada 15 segundos
}

// Función para iniciar recuperación gradual durante hibernación
function iniciarRecuperacionInvernando(tamagotchiInstance) {
    if (intervaloInvernando) {
        clearInterval(intervaloInvernando);
    }
    
    intervaloInvernando = setInterval(() => {
        if (tamagotchiInstance.energia < 3) {
            tamagotchiInstance.energia++;
            tamagotchiInstance.actualizarInterfaz();
            
            // Si se recupera completamente, limpiar el intervalo
            if (tamagotchiInstance.energia >= 3) {
                clearInterval(intervaloInvernando);
                intervaloInvernando = null;
            }
        }
    }, 10000); // Recupera 1 punto de energía cada 10 segundos (más rápido que dormir normal)
}

// FUNCIONES GLOBALES QUE CONECTAN CON LA INSTANCIA
function alimentar() {
    if (instanciaTamagotchi) {
        instanciaTamagotchi.alimentar();
    } else {
        console.log("No hay Tamagotchi activo");
    }
}

function bañar() {
    if (instanciaTamagotchi) {
        instanciaTamagotchi.bañar();
    } else {
        console.log("No hay Tamagotchi activo");
    }
}

function jugar() {
    if (instanciaTamagotchi) {
        instanciaTamagotchi.jugar();
    } else {
        console.log("No hay Tamagotchi activo");
    }
}

function dormir() {
    if (instanciaTamagotchi) {
        instanciaTamagotchi.dormir();
    } else {
        console.log("No hay Tamagotchi activo");
    }
}

function preguntarEstado() {
    if (instanciaTamagotchi) {
        instanciaTamagotchi.comoestas();
    } else {
        console.log("No hay Tamagotchi activo");
    }
}

function darConsejo() {
    if (instanciaTamagotchi) {
        instanciaTamagotchi.consejo();
    } else {
        console.log("No hay Tamagotchi activo");
    }
}

function invernar() {
    if (instanciaTamagotchi) {
        instanciaTamagotchi.invernar();
    } else {
        console.log("No hay Tamagotchi activo");
    }
}

function despertar() {
    if (instanciaTamagotchi) {
        instanciaTamagotchi.despertar();
    } else {
        console.log("No hay Tamagotchi activo");
    }
}

// CLASES DEL PATRÓN STATE Y POO
class Tamagotchi {
    constructor() {
        this.nombre = '';
        this.tipo = '';
        this.energia = 3;
        this.vida = 3;
        this.hambre = 3;
        this.Estado = new Feliz();
        this.Estadohigienico = new Limpio();
        this.actualizarInterfaz();
    }

    // Método para cambiar el estado emocional
    setEstado(estado) {
        this.Estado = estado;
        this.actualizarInterfaz();
    }
    
    cambiar() {
        this.Estado.cambiar(this);
    }
    
    // Método para cambiar el estado higiénico
    setEstadohigienco(estadohigienco) {
        this.Estadohigienico = estadohigienco;
        this.actualizarInterfaz();
    }
    
    cambiarhigiene() {
        this.Estadohigienico.cambiar(this);
    }
    
    // Método para actualizar toda la interfaz visual
    actualizarInterfaz() {
        this.actualizarReaccion();
        this.actualizarParticulas();
        this.actualizarBarrasInstancia();
    }
    
    // Actualizar la reacción facial según el estado
    actualizarReaccion() {
        const reaccionElement = document.getElementById('reaccionTamagotchi');
        if (reaccionElement) {
            const estadoNombre = this.Estado.constructor.name;
            let gifPath = '';
            
            switch (estadoNombre) {
                case 'Feliz':
                    gifPath = './img/reaccion/Carafeliz.gif';
                    break;
                case 'Triste':
                    gifPath = './img/reaccion/Caratriste.gif';
                    break;
                case 'Aburrido':
                    gifPath = './img/reaccion/Caraaburrida.gif';
                    break;
                case 'Dormido':
                    gifPath = './img/reaccion/Caradormida.gif';
                    break;
                case 'Cansado':
                    gifPath = './img/reaccion/Caracansada.gif';
                    break;
                case 'Muerto':
                    gifPath = './img/reaccion/Caramuerto.png';
                    break;
                case 'Invernando':
                    gifPath = './img/reaccion/Caradormida.gif';
                    break;
                default:
                    gifPath = './img/reaccion/Carafeliz.gif';
                    break;
            }
            
            reaccionElement.innerHTML = `<img src="${gifPath}" alt="Reacción ${estadoNombre}">`;
        }
    }
    
    // Actualizar partículas según el estado higiénico
    actualizarParticulas() {
        const particulasElement = document.getElementById('particulasTamagotchi');
        if (particulasElement) {
            const estadoHigienicoNombre = this.Estadohigienico.constructor.name;
            let gifPath = '';
            
            switch (estadoHigienicoNombre) {
                case 'Limpio':
                    gifPath = './img/particulas/Particulaslimpieza.gif';
                    break;
                case 'Sucio':
                    gifPath = './img/particulas/Particulassuciedad.gif';
                    break;
                default:
                    gifPath = '';
                    break;
            }
            
            if (gifPath) {
                particulasElement.innerHTML = `<img src="${gifPath}" alt="Partículas ${estadoHigienicoNombre}">`;
            } else {
                particulasElement.innerHTML = '';
            }
        }
    }
    
    // Actualizar barras de estado
    actualizarBarrasInstancia() {
        tamagotchi.vida = this.vida;
        tamagotchi.energia = this.energia;
        tamagotchi.hambre = this.hambre;
        
        actualizarVida();
        actualizarEnergia();
        actualizarHambre();
    }
    
    // MÉTODOS DE ACCIÓN QUE DELEGAN AL PATRÓN STATE
    alimentar() {
        this.Estado.alimentar(this);
        this.actualizarInterfaz();
    }
    
    jugar() {
        this.Estado.jugar(this);
        this.actualizarInterfaz();
    }
    
    dormir() {
        this.Estado.dormir(this);
        this.actualizarInterfaz();
    }
    
    despertar() {
        this.Estado.despertar(this);
        this.actualizarInterfaz();
    }
    
    bañar() {
        this.Estadohigienico.bañar(this);
        this.actualizarInterfaz();
    }
    
    comoestas() {
    // Genera un número aleatorio entre 0 y 1
    const random = Math.random();
    
    // Si el número es menor que 0.5, llama al primer método, sino al segundo
        if (random < 0.5) {
            this.Estado.comoestas(this);
        } else {
            this.Estadohigienico.comoestas(this);
        }
    }

    
    consejo() {
        this.Estado.consejo(this);
    }
    
    invernar() {
        this.Estado.invernar(this);
        this.actualizarInterfaz();
    }

    consultarEstado() {
        const esEstadoEmocional = Math.random() < 0.5; // 50% de probabilidad para cada opción
        
        if (esEstadoEmocional) {
            this.Estado.comoestas(); // Muestra el estado emocional (Feliz/Triste/etc.)
        } else {
            this.Estadohigienico.comoestas(); // Muestra el estado higiénico (Limpio/Sucio)
        }
    }
}

// PATRÓN STATE PARA ESTADOS HIGIÉNICOS
class Estadohigienico {
    bañar(tamagotchi) {
        console.log("");
    }
    
    cambiar(tamagotchi) {
        // Método base para cambiar estado
    }
    
    comoestas(tamagotchi) {
        console.log("");
    }
}

class Limpio extends Estadohigienico {
    bañar(tamagotchi) {
        this.showMessage("Que lindo estar limpio :3");
    }
    
    comoestas(tamagotchi) {
        const messageArea = document.getElementById('messageArea');
        messageArea.textContent = "¡Estoy reluciente!";
    }
    
    cambiar(tamagotchi) {
        // El estado higiénico se degradará desde degradarEstadisticas
    }

    showMessage(message){
        const messageArea = document.getElementById('messageArea');
        if (messageArea) messageArea.textContent = message;
    }
}

class Sucio extends Estadohigienico {
    bañar(tamagotchi) {
        tamagotchi.setEstadohigienco(new Limpio());
        this.showMessage("¡Ahora estoy limpio!");

        // Iniciar temporizador para cambiar a Feliz después de 5 segundos
        setTimeout(() => {
            // Solo cambiar a Feliz si el Tamagotchi no está en un estado más crítico
            const estadoActual = tamagotchi.Estado.constructor.name;
            if (estadoActual !== 'Dormido' && estadoActual !== 'Cansado' && estadoActual !== 'Triste' && estadoActual !== 'Muerto' && estadoActual !== 'Invernando') {
                tamagotchi.setEstado(new Feliz());
                this.showMessage("¡Me siento fresco y feliz!");
            }
        }, 5000);
    }
    
    comoestas(tamagotchi) {
        const messageArea = document.getElementById('messageArea');
        messageArea.textContent = "¡Necesito un baño! >_<";
    }
    
    cambiar(tamagotchi) {
        // Permanecer sucio hasta que lo bañen
    }

    showMessage(message) {
        const messageArea = document.getElementById('messageArea');
        messageArea.textContent = message;
    }
}

// PATRÓN STATE PARA ESTADOS EMOCIONALES
class Estado {
    alimentar(tamagotchi) {
        console.log("");
    }
    
    jugar(tamagotchi) {
        console.log("");
    }
    
    dormir(tamagotchi) {
        console.log("");
    }
    
    comoestas(tamagotchi) {
        console.log("");
    }
    
    consejo(tamagotchi) {
        console.log("");
    }
    
    despertar(tamagotchi) {
        console.log("");
    }
    
    invernar(tamagotchi) {
        console.log("");
    }
    
    cambiar(tamagotchi) {
        // Método base para cambiar estado
    }

    showMessage(message) {
    const messageArea = document.getElementById('messageArea');
    messageArea.textContent = message;
    }
}

class Feliz extends Estado {
    alimentar(tamagotchi) {
        if (tamagotchi.hambre >= 3) {
            this.showMessage("Estoy lleno :D!");
        } else {
            tamagotchi.hambre = Math.min(tamagotchi.hambre + 1, 3);
            this.showMessage("Ñam ñam!");
        }
    }
    
    jugar(tamagotchi) {
        if (tamagotchi.energia > 0) {
            tamagotchi.energia -= 1;
            this.showMessage("Que divertido");
            if (tamagotchi.energia === 0) {
                tamagotchi.setEstado(new Cansado());
            }
        } else {
            this.showMessage("No quiero jugar estoy cansado :c");
            tamagotchi.setEstado(new Cansado());
        }
    }
    
    dormir(tamagotchi) {
        tiempoSinJugar = 0;
        if (tamagotchi.energia === 0) {
            this.showMessage("Voy a mimir uwu");
            tamagotchi.setEstado(new Dormido());
            iniciarRecuperacionEnergia(tamagotchi);
        } else {
            this.showMessage("No quiero dormir ahora >:)");
        }
    }
    
    comoestas(tamagotchi) {
        let mensaje = "Estoy feliz :D";
        if (tamagotchi.energia > 0) {
            mensaje += " con energía suficiente";
        } else {
            mensaje += " pero cansado, debo dormir";
        }
        if (tamagotchi.hambre > 0) {
            mensaje += " y sin hambre";
        } else {
            mensaje += " y con hambre :c";
        }
        this.showMessage(mensaje);
    }
    
    consejo(tamagotchi) {
        this.showMessage("Cuando estés dentro del agua, recuerda no puedes respirar");
    }
    
    despertar(tamagotchi) {
        if (tamagotchi.energia > 0) {
            this.showMessage("Estoy muy despierto :D");
        } else {
            this.showMessage("Creo que debería dormir");
        }
    }
    
    invernar(tamagotchi) {
        tiempoSinJugar = 0;
        this.showMessage("No quiero invernar");
    }
}

class Aburrido extends Estado {
    alimentar(tamagotchi) {
        if (tamagotchi.hambre >= 3) {
            this.showMessage("Estoy lleno pero aburrido :/");
        } else {
            tamagotchi.hambre = Math.min(tamagotchi.hambre + 1, 3);
            this.showMessage("Ñam ñam... pero sigo aburrido :/");
        }
    }
    
    jugar(tamagotchi) {
        if (tamagotchi.energia > 0) {
            tamagotchi.energia -= 1;
            this.showMessage("¡Por fin algo divertido que hacer! :D");
            tamagotchi.setEstado(new Feliz());
            if (tamagotchi.energia === 0) {
                tamagotchi.setEstado(new Cansado());
            }
        } else {
            this.showMessage("Estoy aburrido y cansado :c");
            tamagotchi.setEstado(new Cansado());
        }
    }
    
    dormir(tamagotchi) {
        if (tamagotchi.energia === 0) {
            this.showMessage("Bueno, al menos durmiendo no estaré aburrido...");
            tamagotchi.setEstado(new Dormido());
            iniciarRecuperacionEnergia(tamagotchi);
        } else {
            this.showMessage("No tengo sueño, solo estoy aburrido :/");
        }
    }
    
    comoestas(tamagotchi) {
        let mensaje = "Estoy muy aburrido :/";
        if (tamagotchi.energia > 0) {
            mensaje += " con energía pero sin nada que hacer";
        } else {
            mensaje += " y cansado, tal vez debería dormir";
        }
        if (tamagotchi.hambre > 0) {
            mensaje += " y sin hambre";
        } else {
            mensaje += " y con hambre";
        }
        mensaje += ". ¿Podrías jugar conmigo?";
        this.showMessage(mensaje);
    }
    
    consejo(tamagotchi) {
        this.showMessage("Estoy aburrido... ¿podrías darme tú un consejo de qué hacer? :/");
    }
    
    despertar(tamagotchi) {
        this.showMessage("Ya estoy despierto, solo aburrido :/");
    }
    
    invernar(tamagotchi) {
        if (tamagotchi.energia === 0) {
            this.showMessage("Bueno, al menos invernando el tiempo pasará más rápido...");
            tamagotchi.setEstado(new Invernando());
            iniciarRecuperacionInvernando(tamagotchi);
        } else {
            this.showMessage("No quiero invernar, prefiero que juegues conmigo");
        }
    }
}

class Triste extends Estado {
    alimentar(tamagotchi) {
        if (tamagotchi.hambre >= 3) {
            this.showMessage("Estoy lleno :c");
        } else {
            tamagotchi.hambre = Math.min(tamagotchi.hambre + 1, 3);
            this.showMessage("Ñam ñam... :c");
            // Posibilidad de ponerse feliz al comer
            if (tamagotchi.hambre >= 2 && Math.random() < 0.3) {
                tamagotchi.setEstado(new Feliz());
                this.showMessage("¡Me siento mejor después de comer!");
            }
        }
    }
    
    jugar(tamagotchi) {
        if (tamagotchi.energia > 0) {
            tamagotchi.energia -= 1;
            this.showMessage("Gracias me alegraste el día!");
            tamagotchi.setEstado(new Feliz());
        } else {
            this.showMessage("No quiero jugar estoy cansado y triste :c");
            tamagotchi.setEstado(new Cansado());
        }
    }
    
    dormir(tamagotchi) {
        this.showMessage("Creo que dormir me hará sentir mejor");
        tamagotchi.setEstado(new Dormido());
        iniciarRecuperacionEnergia(tamagotchi);
    }
    
    comoestas(tamagotchi) {
        let mensaje = "Estoy triste :c";
        if (tamagotchi.energia > 0) {
            mensaje += " con energía suficiente";
        } else {
            mensaje += " y cansado, debo dormir";
        }
        if (tamagotchi.hambre > 0) {
            mensaje += " y sin hambre";
        } else {
            mensaje += " y con hambre :c";
        }
        this.showMessage(mensaje);
    }
    
    consejo(tamagotchi) {
        this.showMessage("Estoy triste, creo que yo necesito los consejos :C");
    }
    
    despertar(tamagotchi) {
        this.showMessage("Creo que debería dormir");
    }
    
    invernar(tamagotchi) {
        this.showMessage("No quiero invernar estando triste");
    }
}

class Dormido extends Estado {
    alimentar(tamagotchi) {
        this.showMessage("(Shhh está dormido...)");
    }
    
    jugar(tamagotchi) {
        this.showMessage("(Shhh está dormido...)");
    }
    
    dormir(tamagotchi) {
        this.showMessage("(Está dormido)");
    }
    
    comoestas(tamagotchi) {
        this.showMessage("Z z z...");
    }
    
    consejo(tamagotchi) {
        this.showMessage("Ovejita uno, ovejita dos... z z z..");
    }
    
    despertar(tamagotchi) {
        // Detener la recuperación gradual si está activa
        if (intervaloDormido) {
            clearInterval(intervaloDormido);
            intervaloDormido = null;
        }
        
        this.showMessage("¡Despierto y listo para jugar :D!");
        tamagotchi.setEstado(new Feliz());
    }
    
    invernar(tamagotchi) {
        this.showMessage("No puede invernar mientras duerme");
    }
}

class Cansado extends Estado {
    alimentar(tamagotchi) {
        if (tamagotchi.hambre >= 3) {
            this.showMessage("Estoy lleno pero muy cansado :c necesito dormir");
        } else {
            tamagotchi.hambre = Math.min(tamagotchi.hambre + 1, 3);
            this.showMessage("Ñam ñam... pero sigo muy cansado :c");
            // Pequeña posibilidad de recuperar algo de energia al comer
            if(Math.random() < 0.2){
                tamagotchi.energia = Math.min(tamagotchi.energia + 1, 3);
                this.showMessage('La comida me dio un poco de energia, pero aún estoy cansado ')
            }
        }
    }
    
    jugar(tamagotchi) {
        this.showMessage("No puedo jugar, estoy demasiado cansado :c necesito dormir primero");
    }
    
    dormir(tamagotchi) {
        this.showMessage("Por fin puedo descansar... Zzz");
        tamagotchi.setEstado(new Dormido());
        iniciarRecuperacionEnergia(tamagotchi);
    }
    
    comoestas(tamagotchi) {
        let mensaje = "Estoy muy cansado :c";
        if (tamagotchi.energia === 0) {
            mensaje += " sin nada de energia, necesito dormir YAAAAAA!!";
        } else{
            mensaje += ' con poca energia, deberia descansar';
        }

        if (tamagotchi.hambre > 0) {
            mensaje += " y sin hambre";
        } else {
            mensaje += " y con hambre :c";
        }

        mensaje += '. Por favor déjame dormir o invernar para recuperarme';
        this.showMessage(mensaje);
    }
    
    consejo(tamagotchi) {
        this.showMessage("Estoy muy cansado para dar consejos :C solo quiero dormir");
    }
    
    despertar(tamagotchi) {
        this.showMessage("Ya esoty despierto pero muy cansado; necesito dormir");
    }
    
    invernar(tamagotchi) {
        if (tamagotchi.energia === 0) {
            this.showMessage("Perfecto, me iré a invernar para recuperarme completamente uwu");
            tamagotchi.setEstado(new Invernando());
        } else {
            this.showMessage("Necesito estar completamente sin energía para invernar, mejor duermo normal");
            tamagotchi.setEstado(new Invernando());
        }
    }
}

class Muerto extends Estado {
    alimentar(tamagotchi) {
        this.showMessage("Ya no puede comer... descansa en paz");
    }
    
    jugar(tamagotchi) {
        this.showMessage("Los juegos han terminado... vuela alto campeón");
    }
    
    dormir(tamagotchi) {
        this.showMessage("Está duerminedo el sueño eterno...");
    }
    
    comoestas(tamagotchi) {
        this.showMessage("En paz descanse... fue un buen compañero");
    }
    
    consejo(tamagotchi) {
        this.showMessage("'Disfruta cada momento de la vida, antes de que sea demasiado tarde' - Tu Tamagotchi");
    }
    
    despertar(tamagotchi) {
        this.showMessage("No puede despertar... solo nos quedan los recuerdos");
    }
    
    invernar(tamagotchi) {
        this.showMessage("Ya no puede invernar... está durmiendo para siempre");
    }

    // Método especial para cuando el Tamagotchi muere
    procesar(tamagotchi) {
        // Detener todos los intervalos cuando muere
        if (sistemaInterval) {
            clearInterval(sistemaInterval);
            sistemaInterval = null;
        }
        if (intervaloDormido) {
            clearInterval(intervaloDormido);
            intervaloDormido = null;
        }
        if (intervaloInvernando) {
            clearInterval(intervaloInvernando);
            intervaloInvernando = null;
        }
        
        this.showMessage(tamagotchi.nombre + " ha fallecido... Reinicia para crear un nuevo Tamagotchi");
    }
}

class Invernando extends Estado {
    alimentar(tamagotchi) {
        this.showMessage("(No puede comer mientras inverna, está en sueño profundo)");
    }
    
    jugar(tamagotchi) {
        this.showMessage("(No puede jugar mientras inverna, déjalo invernar)");
    }
    
    dormir(tamagotchi) {
        this.showMessage("( Ya está en invernacion profunda...)");
    }
    
    comoestas(tamagotchi) {
        this.showMessage("(Shh... está invernando, recuperándose lentamente)");
    }
    
    consejo(tamagotchi) {
        this.showMessage("'El descanso es la mejor medicina' zzz...");
    }
    
    despertar(tamagotchi) {
        // Detener la recuperacion de hibernacion 
        if (intervaloInvernando){
            clearInterval(intervaloInvernando);
            intervaloInvernando = null;
        }

        // Restaurar energia completa y algo de hambre
        tamagotchi.energia = 3; 
        tamagotchi.hambre = Math.min(tamagotchi.hambre + 2, 3);

        //Resetear tiempo sin jugar
        tiempoSinJugar = 0;

        this.showMessage("¡Despierto y listo para jugar después de invernar :D! Me siento increíble");
        tamagotchi.setEstado(new Feliz());
    }
    
    invernar(tamagotchi) {
        this.showMessage("Ya está invernando... paciencia, se está recuperando");
    }

    //Metodo especial para procesar la hibernacion 
    procesar(tamagotchi){
        // Durante la hibernacion no se degrada el ahmbre ni se imcrementa tiempo sin jugar
        // La energia se recupera gradualmente gracias a ininiarRecuparionInvernando()

        // Posibilidad muy baja de despertar automaticamente si esta completamente recuperado
        if(tamagotchi.energia >= 3 && Math.random() < 0.1){
            this.despertar(tamagotchi);
        }
    }
}