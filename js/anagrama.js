const matriz =[["carpincho","bisonte","culebra"],["lechuza","hipopotamo","lombriz"],["gusano","escorpion","cangrejo"],["tortuga","nutria","gallina"],["jirafa","jabali","jaguar"],["colibri","cacatua","ciervo"],["ballena","huron","liebre"]];
let palabraSeleccionada="";
let aux="";
let indice1=0;
let indice2=0;
arrayauxiliar=[];
let aleatoria =matriz[Math.floor(Math.random()*matriz.length)][Math.floor(Math.random()*matriz[0].length)];
palabraSeleccionada=aleatoria;
//console.log(palabraSeleccionada);//para control.

for(let i=0;i<palabraSeleccionada.length;i++){
    arrayauxiliar[i]=palabraSeleccionada[i];
}

for(let i=0;i<10;i++){
    indice1=Math.floor(Math.random()*arrayauxiliar.length);
    indice2=Math.floor(Math.random()*arrayauxiliar.length);
    aux=arrayauxiliar[indice1];
    arrayauxiliar[indice1]=arrayauxiliar[indice2];
    arrayauxiliar[indice2]=aux;
}

let saludo=prompt("Hola, estas listo para armar este anangrama de animales?, debes resolverlo en 3 intentos");

if (saludo=="si"){
    console.log("la palabra que debes descubrir es:"+arrayauxiliar);
    let intentos=1;
    let ingresaturespuesta=prompt("Ingresa tu respuesta");
    while(ingresaturespuesta!==palabraSeleccionada && intentos<3){
        let resultado=prompt("Palabra incorrecta, vuelve a intentar");
        ingresaturespuesta=resultado;//para actualizar la respuesta
        intentos ++
    }
    if(ingresaturespuesta==palabraSeleccionada){
        console.log("¡felicitaciones acertaste!")
    }else{
        console.log("lo siento se terminaron los intentos, la palabra era:"+palabraSeleccionada);
    } 
} else {
    let finalizar="gracias por participar";
    alert (finalizar);
}
