class Tamagotchi{
    nombre='';
    tipo='';
    constructor(){
        this.energia=3;
        this.vida=3;
        this.hambre=3;
        this.Estado=new Feliz();
        this.Estadohigienico=new Limpio();
    }
    
    setEstado (estado){
        this.estado=estado;
    }
    cambiar(){
        this.estado.cambiar(this);
    }
    setEstadohigienco (estadohigienco){
        this.estadohigienco=estadohigienco;
    }
    cambiarhigiene(){
        this.estadohigienco.cambiar(this);
    }
    // Método para actualizar la interfaz visual
    
    
    class Tamagotchi{
    nombre='';
    tipo='';
    constructor(){
        this.energia=3;
        this.vida=3;
        this.hambre=3;
        this.Estado=new Feliz();
        this.Estadohigienico=new Limpio();
        this.actualizarInterfaz();
    }
    
    setEstado (estado){
        this.Estado=estado;
        this.actualizarInterfaz();
    }
    cambiar(){
        this.Estado.cambiar(this);
    }
    setEstadohigienco (estadohigienco){
        this.Estadohigienico=estadohigienco;
        this.actualizarInterfaz();
    }
    cambiarhigiene(){
        this.Estadohigienico.cambiar(this);
    }
    
    // Método para actualizar la interfaz visual
   
    
    actualizarReaccion(){
        const reaccionElement = document.getElementById('reaccionTamagotchi');
        if(reaccionElement){
            const estadoNombre = this.Estado.constructor.name;
            let gifPath = '';
            
            switch(estadoNombre){
                case 'Feliz':
                    gifPath = 'img/reaccion/Carafeliz.gif';
                    break;
                case 'Triste':
                    gifPath = 'img/reaccion/Caratriste.gif';
                    break;
                case 'Dormido':
                    gifPath = 'img/reaccion/Caradormida.gif';
                    break;
                case 'Cansado':
                    gifPath = 'img/reaccion/Caracansada.gif';
                    break;
                case 'Muerto':
                    gifPath = 'img/reaccion/Caramuerto.gif';
                    break;
                case 'Invernando':
                    gifPath = 'img/reaccion/Caradromida.gif';
                    break;
                default:
                    gifPath = 'img/reaccion/CaraFeliz.gif'; // GIF por defecto
                    console.warn(`Estado no reconocido: ${estadoNombre}`);
                    break;
            }
            
            reaccionElement.innerHTML = `<img src="${gifPath}" alt="Reacción ${estadoNombre}">`;
        }
    }
    
   actualizarParticulas(){
        const particulasElement = document.getElementById('particulasTamagotchi');
        if(particulasElement){
            const estadoHigienicoNombre = this.Estadohigienico.constructor.name;
            let gifPath = '';
            
            switch(estadoHigienicoNombre){
                case 'Limpio':
                    gifPath = 'img/particulas/Particulaslimpieza.gif';
                    break;
                case 'Sucio':
                    gifPath = 'img/particulas/Particulassuciedad.gif';
                    break;
                default:
                    gifPath = ''; // Sin partículas para estados no reconocidos
                    break;
            }
            
            if(gifPath){
                particulasElement.innerHTML = `<img src="${gifPath}" alt="Partículas ${estadoHigienicoNombre}">`;
            } else {
                particulasElement.innerHTML = '';
            }
        }
        }
    }
     // Métodos de acción que ahora actualizan la interfaz
    alimentar(){
        this.Estado.alimentar(this);
    }
    
    jugar(){
        this.Estado.jugar(this);

    }
    
    dormir(){
        this.Estado.dormir(this);
    }
    
    despertar(){
        this.Estado.despertar(this);
    }
    
    bañar(){
        this.Estadohigienico.bañar(this);
    }
    
    comoestas(){
        this.Estado.comoestas(this);
        this.Estadohigienico.comoestas(this);
    }
    
    consejo(){
        this.Estado.consejo(this);
    }
    
    invernar(){
        this.Estado.invernar(this);

    }
}

    
    
    
//Clase patro state para limpio o sucio
class Estadohigienico {
    bañar(tamagotchi){
        console.log("");
    }
}
class Limpio extends Estadohigienico{
    bañar(tamagotchi){
        console.log("Que lindo estar limpio :3");
    }
    comoestas(tamagotchi){
        console.log("MUY LIMPIO >W<");
    }
}
class Sucio extends Estadohigienico{
    bañar(tamagotchi){
        tamagotchi.setEstadohigienco(new Limpio());
    }
    comoestas(tamagotchi){
        console.log("Creo que necesito un baño :/");
    }
}

//clase patron state de estado
class Estado {
    alimentar(tamagotchi){
        console.log("");
    }
    jugar(tamagotchi){
        console.log("");
    }
    dormir(tamagotchi){
        console.log("");
    }
    comoestas(tamagotchi){
        console.log("");
    }
    consejo(tamagotchi){
        console.log("");
    }
    despertar(tamagotchi){
        console.log("");
    }
    invernar(tamagotchi){
        console.log("");
    }
}
class Feliz extends Estado{
    alimentar(tamagotchi){
        if(tamagotchi.hambre==3){
            console.log("Estoy lleno :D!");
        }else if(tamagotchi.hambre<3){
            tamagotchi.hambre+=1;
            console.log("Ñam ñam!");
        }
    }
    jugar(tamagotchi){
        if(tamagotchi.energia>=0){
            tamagotchi.energia-=1;
            console.log("Que divertido");
        } else if(energia==0){
            console.log("No quiero jugar estoy cansado :c");
            tamagotchi.setEstado(new Cansado());
        }
    }
    dormir(tamagotchi){
        if(tamagotchi.energia==0){
        console.log("Voy a mimir uwu");
        tamagotchi.setEstado(new Dormido());
        } else if (tamagotchi.energia>0){
        console.log("No quiero dormir ahora >:)");
        }
    }
    comoestas(tamagotchi){
        console.log("Estoy feliz :D, con");
        if(tamagotchi.energia>0){
            console.log(" el 100% de energia");
        } else if (tamagotchi.energia==0){
            console.log(" cansancio, debo dormir");
        }
        if (tamagotchi.hambre>0){
            console.log(" sin hambre");
        } else if (tamagotchi.hambre==0){
            console.log(" con hambre :c");
        }
    }
    consejo(tamagotchi){
        console.log("Cuando estes dentro de el agua, recuerda no puedes respirar");
    }
    despertar(tamagotchi){
        if(tamagotchi.energia>0){
            console.log("Estoy muy despierto :D");
        } else if (tamagotchi.energia==0){
            console.log("Creo que deberia dormir");
        }
    }
    invernar(tamagotchi){
        console.log("No quiero invernar");
    }
}
class Triste extends Estado{
    alimentar(tamagotchi){
        if(tamagotchi.hambre==3){
            console.log("Estoy lleno :c");
        }else if(tamagotchi.hambre<3){
            tamagotchi.hambre+=1;
            console.log(" Ñan ñam... :c ");
        }
    }
    jugar(tamagotchi){
        if(tamagotchi.energia>0){
            tamagotchi.energia-=1;
            console.log("Gracias me alegraste el dia!");
            tamagotchi.setEstado(new Feliz());
         } else if(energia==0){
            console.log("No quiero jugar estoy cansado y triste :c");
            tamagotchi.setEstado(new Cansado());
        
    }}
    dormir(tamagotchi){
        if(tamagotchi.energia==0){
        console.log("Voy a mimir uwu");
        tamagotchi.setEstado(new Dormido());
        } else if (tamagotchi.energia>0){
        console.log("Creo que dormir, me hara sentir mejor");
        tamagotchi.setEstado(new Dormido());
        }
    }
    comoestas(tamagotchi){
        console.log("Estoy tite :c, con");
        if(tamagotchi.energia>0){
            console.log(" el 100% de energia");
        } else if (tamagotchi.energia==0){
            console.log(" cansancio, debo dormir");
        }
        if (tamagotchi.hambre>0){
            console.log(" y sin hambre");
        } else if (tamagotchi.hambre==0){
            console.log(" y con hambre :c");
        }
    }
    consejo(tamagotchi){
        console.log("Estoy triste, creo que los necesito yo :C");
    }
    despertar(tamagotchi){
        if(tamagotchi.energia>0){
            console.log("Creo que deberia dormir");
        } else if (tamagotchi.energia==0){
            console.log("Creo que deberia dormir");
        }
    }
    invernar(tamagotchi){
        console.log("No quiero invernar");
    }
}
class Dormido extends Estado{
    alimentar(tamagotchi){
        console.log("( Shhh esta dormido...)");
    }
    jugar(tamagotchi){
        console.log("( Shhh esta dormido...)");    
    }
    dormir(tamagotchi){
        console.log("( Esta dormido )");
    }
    comoestas(tamagotchi){
        console.log("Z z z...");
    }
    consejo(tamagotchi){
        console.log("Ovejita uno, ovenjita dss... z z z..");
    }
    despertar(tamagotchi){
        if(tamagotchi.energia==0){
            tamagotchi.energia+=3;
            console.log("Despierto y listo para jugar :D!");
            tamagotchi.setEstado(new Feli3());
        }
    }
    invernar(tamagotchi){
        console.log("No quiero invernar");
    }
}
class Cansado extends Estado{
    alimentar(tamagotchi){
        if(tamagotchi.hambre==3){
            console.log("Estoy lleno :c");
        }else if(tamagotchi.hambre<3){
            tamagotchi.hambre+=1;
            console.log(" Ñan ñam... :c ");
        }
    }
    jugar(tamagotchi){
        if(tamagotchi.energia>0){
            tamagotchi.energia-=1;
            console.log("Gracias me alegraste el dia!");
            tamagotchi.setEstado(new Feliz());
         } else if(energia==0){
            console.log("No quiero jugar estoy cansado y triste :c");
            tamagotchi.setEstado(new Cansado());
        
    }}
    dormir(tamagotchi){
        if(tamagotchi.energia==0){
        console.log("Voy a mimir uwu");
        tamagotchi.setEstado(new Dormido());
        } else if (tamagotchi.energia>0){
        console.log("Creo que dormir, me hara sentir mejor");
        tamagotchi.setEstado(new Dormido());
        }
    }
    comoestas(tamagotchi){
        console.log("Estoy tite :c, con");
        if(tamagotchi.energia>0){
            console.log(" el 100% de energia");
        } else if (tamagotchi.energia==0){
            console.log(" cansancio, debo dormir o si quieres puedo invernar u.u");
        }
        if (tamagotchi.hambre>0){
            console.log(" y sin hambre");
        } else if (tamagotchi.hambre==0){
            console.log(" y con hambre :c");
        }
    }
    consejo(tamagotchi){
        console.log("Estoy triste, creo que los necesito yo :C");
    }
    despertar(tamagotchi){
        if(tamagotchi.energia>0){
            console.log("Creo que deberia dormir");
        } else if (tamagotchi.energia==0){
            console.log("Creo que deberia dormir");
        }
    }
    invernar(tamagotchi){
        if(tamagotchi.energia>0){
            console.log(" el 100% de energia");
        }else if(tamagotchi.energia==0){
        console.log("Me ire a invernar uwu");
        Tamagotchi.setEstado(new Invernando());
    }
}
}
class Muerto extends Estado {
    alimentar(tamagotchi){
        console.log("Vuela alto campeon...");
    }
    jugar(tamagotchi){
        console.log("En paz descanse");
    }
    dormir(tamagotchi){
        console.log("Esta durmiendo... para siempre...");
    }
    comoestas(tamagotchi){
        console.log("En paz descanse");
    }
    consejo(tamagotchi){
        console.log("Disfruta la vida, antes de que te mueras x-x");
    }
    despertar(tamagotchi){
        console.log("...");
        
    }
    invernar(tamagotchi){
        console.log("No podra invernar, ya esta duermiendo... para siempre :c");
    }
    
}
class Invernando extends Estado {
    alimentar(tamagotchi){
        console.log("(No puede comer mientras inverna)");
    }
    jugar(tamagotchi){
        console.log("(No puede jugar mientras inverna)");
    }
    dormir(tamagotchi){
        console.log("(Esta invernando...)");
    }
    comoestas(tamagotchi){
        console.log("(Shh esta invernando)");
    }
    consejo(tamagotchi){
        console.log("z z z...");
    }
        despertar(tamagotchi){
        if(tamagotchi.energia==0){
            tamagotchi.energia+=3;
            console.log("Despierto y listo para jugar :D!");
            tamagotchi.setEstado(new Feliz());
        }
    }
    invernar(tamagotchi){
        console.log("Shh que ya esta invernando...");
    }
}
    


const intervaloHambre = setInterval(() => {
  if (Tamagotchi.hambre > 0) {
    Tamagotchi.hambre -= 1;
    console.log("😬 Hambre disminuyó a:", Tamagotchi.hambre);
  } else {
    // Si hambre llega a 0, pierde vida
    if (Tamagotchi.vida > 0) {
      Tamagotchi.vida -= 1;
      console.log("💔 Hambre en 0. Vida disminuyó a:", Tamagotchi.vida);
    }
    // Si vida también llega a 0, Tamagotchi muere
    if (Tamagotchi.vida === 0) {
      console.log("☠️ El Tamagotchi ha muerto.");
      clearInterval(intervaloHambre);
    }
  }
}, 5000);