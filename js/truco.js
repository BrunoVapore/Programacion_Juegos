//Programa creado por Pablo Rodriguez para la materia Programacion I ** ISFD No 166 ** Año 2023 **
//declaracion de variables globales
const arraymano=[]  //array que contendra 6 cartas de la mano, 3 para el usuario y 3 para la maquina
    let cartaAjugar="";
    let repetida=true;  //usada para saber si una carta ya fue sacada del maso
    //creo un array de cartas
    const palo= ["Espada","Oro","Basto","Copa"]  //array de palos para usar los indices
    //              0       1       2       3
    let cartaalazar="";
    const puntosdeljuego=[0,0];     //puntos de toda la partida ([Humano,Maquina])
    //Array que indica que se canto para sumar los puntos
    //puntos[ENVIDO,envido,real envido, falta envido,TRUCO, retruco, vale 4], usarlo completo en la Update 2.0
    const puntos= [false,false,false,false,false,false,false] 
    const ComparadorTruco=[[1,1],[1,1]]   //En este array se guarda la carta de cada uno de cada mano indice 0=Humano 1=Lazarillo
    let seguirjuego=true;  //variable que indica si el juego sigue o se termino
    let Nombre_Jugador

//declaracion de funciones
function barajar()
{
    //FORMATO DE UNA CARTA: [FLAG 1: SI FUE DADA DEL MASO, FLAG2: SI FUE PUESTA EN LA MESA,VALOR EN EL TRUCO PARA COMPARARLAS(DE 14 A 1), NUMERO DE CARTA, PALO DE LA CARTA(VALOR (0-3) QUE PEGA AL ARRAY PALO)]
    const carta =[ [true,true,24,1,0],
                    [true,true,23,1,2],
                    [true,true,22,7,0],
                    [true,true,21,7,1],
                    [true,true,10,3,0],[true,true,10,3,1],[true,true,10,3,2],[true,true,10,3,3],
                    [true,true,9,2,0],[true,true,9,2,1],[true,true,9,2,2],[true,true,9,2,3],   //los 2 valen 9
                    [true,true,8,1,3],[true,true,8,1,1],    //los 1 valen 8
                    [true,true,7,12,0],[true,true,7,12,1],[true,true,7,12,2],[true,true,7,12,3],
                    [true,true,6,11,0],[true,true,6,11,1],[true,true,6,11,2],[true,true,6,11,3],
                    [true,true,5,10,0],[true,true,5,10,1],[true,true,5,10,2],[true,true,5,10,3],
                    [true,true,3,7,2],[true,true,3,7,3],
                    [true,true,2,6,0],[true,true,2,6,1],[true,true,2,6,2],[true,true,2,6,3],
                    [true,true,1,5,0],[true,true,1,5,1],[true,true,1,5,2],[true,true,1,5,3],
                    [true,true,0,4,0],[true,true,0,4,1],[true,true,0,4,2],[true,true,0,4,3] //40 cartas
    ]

    //selecciono una carta al azar
    cartaalazar=Math.floor(Math.random()*40);

    //Copio la carta generada al azar a un arraypartida (Es el que tendra esa mano)
    arraymano.push(carta[cartaalazar])
    carta[cartaalazar][0]=false;  //el elemento 0 del primer array es flag que fue usado

    //reparto 5 cartas mas verificando que no se repitan
    for (let i = 1; i < 6; i++)
        {
            repetida=true
            while(repetida!=false)
            {
                cartaalazar=Math.floor(Math.random()*40);
                if (carta[cartaalazar][0]==true)  //si no esta repetida (Comparo valor carta[ESTE,0,0,0,0]) la cargo
                {
                    arraymano.push(carta[cartaalazar])
                    carta[cartaalazar][0]=false;  //el elemento 0 del primer array es flag que fue usado
                    repetida=false;             //Despues de cargar una carta salgo al for para volver a entrar
                }

            }
        }

    mostrarresumen();       //muestro resumen de cartas por consola
           
    /* intento de cargar imagen por js en etiqueta div PREGUNTAR LUCAS
    --------------------------------------------------------------------------------------
    //document.getElementById("1").setAttribute("src", "img/3e.png")
    //document.getElementById("primera").setAttribute("src", "img/3e.png");

    // Select the image element using its ID
    //const image = document.getElementById('primera');

    // Update the image source
    //image.src = 'img/3e.png';
    --------------------------------------------------------------------------------------*/
}
function mostrarresumen()           //muestraresumen de cartas por consola
{
    //Resumen de la partida
    console.log("=====================================================")
    console.log("A "+Nombre_Jugador+" le tocó: "+'\n'                                  //nro de carta + palo + si fue jugada
    +arraymano[0][3]+" de "+palo[arraymano[0][4]]+" "+arraymano[0][1]+'\n'  
    +arraymano[1][3]+" de "+palo[arraymano[1][4]]+" "+arraymano[1][1]+'\n'
    +arraymano[2][3]+" de "+palo[arraymano[2][4]]+" "+arraymano[2][1]+'\n'+'\n'+'\n'
    +"A LAZARILLO le toco: "+'\n'
    +arraymano[3][3]+" de "+palo[arraymano[3][4]]+" "+arraymano[3][1]+'\n'
    +arraymano[4][3]+" de "+palo[arraymano[4][4]]+" "+arraymano[4][1]+'\n'
    +arraymano[5][3]+" de "+palo[arraymano[5][4]]+" "+arraymano[5][1]+'\n');
    console.log("=====================================================")
}

//------------------------------------------------------------------------------------------------------
//                      FUNCION ENVIDO DEL USUARIO Y DE LA MAQUINA
//------------------------------------------------------------------------------------------------------
function envido()
{
    let total=0; //Acumulador para los puntos del tanto de cada usuario
    let envidohumano=0;
    let envidolazarillo=0;
    //TURNO HUMANO
    //el humano tiene las cartas arraymano[0]//arraymano[3]  [FLAG 1, FLAG2, ESCALA , NUMERO DE CARTA, PALO DE LA CARTA(VALOR (0-3) QUE PEGA AL ARRAY PALO)]

    if((arraymano[0][4]==arraymano[1][4])&&(arraymano[1][4]==arraymano[2][4]))
    {
        alert(Nombre_Jugador+" CANTA: Cómo lágrimas de olvido como suspiros de amor, cantaba sus grandes penas un pájaro en una FLOR.");
        puntos[0]=true;
        puntosdeljuego[0]+=3 //suma tres punto el usuario por flor

    }
    else
    {
        if(arraymano[0][4]==arraymano[1][4])            //palo0=palo1
        {
            envidohumano=contarpuntos(arraymano[0][3],arraymano[1][3]);
        }
        if(arraymano[0][4]==arraymano[2][4])            //palo0=palo2
        {
            envidohumano=contarpuntos(arraymano[0][3],arraymano[2][3]);
        }
        if(arraymano[2][4]==arraymano[1][4])            //palo1=palo2
        {
            envidohumano=contarpuntos(arraymano[2][3],arraymano[1][3]);
        }
    
        //Si humano no tiene tantos informa la carta mas alta
        //el humano tiene las cartas arraymano[0]//arraymano[3]  [FLAG 1, FLAG2, ESCALA , NUMERO DE CARTA, PALO DE LA CARTA(VALOR (0-3) QUE PEGA AL ARRAY PALO)]
        if((arraymano[0][4]!=arraymano[1][4])&&(arraymano[1][4]!=arraymano[2][4])&&(arraymano[0][4]!=arraymano[2][4]))
        {
        // let puntos_unacarta=0;
            if(arraymano[0][3]<=7)          //si la carta1 <= 7 es el nuevo maximo
                {
                    envidohumano=arraymano[0][3]
                }  
            if((arraymano[1][3]<=7)&&(arraymano[1][3]>envidohumano))   //si la carta1 <= 7 y mayor a la almacenada => es el nuevo maximo
                {
                    envidohumano=arraymano[1][3]
                }
            if((arraymano[2][3]<=7)&&(arraymano[2][3]>envidohumano))   //si la carta1 <= 7 y mayor a la almacenada => es el nuevo maximo
                {
                    envidohumano=arraymano[2][3]
                }  
        }

        //lazarillo mira cuantos puntos de envido tiene
        if(arraymano[3][4]==arraymano[4][4])            //palo3=palo4
            {
                envidolazarillo=contarpuntos(arraymano[3][3],arraymano[4][3]);
            }
        if(arraymano[3][4]==arraymano[5][4])            //palo3=palo5
            {
                envidolazarillo=contarpuntos(arraymano[3][3],arraymano[5][3]);
            }
        if(arraymano[4][4]==arraymano[5][4])            //palo4=palo5
            {
                envidolazarillo=contarpuntos(arraymano[4][3],arraymano[5][3]);
            }

        //Si Lazarillo no tiene tantos halla la carta mas alta para saber los puntos
        //Lazarillo tiene las cartas arraymano[3] hasta arraymano[5]  [FLAG 1, FLAG2, ESCALA , NRO_CARTA, PALO_Carta (VALOR (0-3) que trae del arraypalo)]
        if((arraymano[3][4]!=arraymano[4][4])&&(arraymano[4][4]!=arraymano[5][4])&&(arraymano[3][4]!=arraymano[5][4]))
        {
            if(arraymano[3][3]<=7)          //si la carta1 <= 7 es el nuevo maximo
                {
                    envidolazarillo=arraymano[3][3]
                }  
            if((arraymano[4][3]<=7)&&(arraymano[4][3]>envidolazarillo))   //si la carta1 <= 7 y mayor a la almacenada => es el nuevo maximo
                {
                    envidolazarillo=arraymano[4][3]
                }
            if((arraymano[5][3]<=7)&&(arraymano[5][3]>envidolazarillo))   //si la carta1 <= 7 y mayor a la almacenada => es el nuevo maximo
                {
                    envidolazarillo=arraymano[5][3]
                }  
        }

        //despues que lazarillo y humano contaron los puntos el humano pregunta por envido
        if(confirm("Te tocaron "+envidohumano+" puntos"+'\n'+"Queres cantarle ENVIDO?"))
        { 
            puntos[0]=true;  //MARCO QUE SE CANTO ENVIDO

            //LAZARILLO MIRA SI TIENE FLOR
            if((arraymano[3][4]==arraymano[4][4])&&(arraymano[4][4]==arraymano[5][4]))
            {
                alert(Nombre_Jugador+" DICE: Envido!"+'\n'+
                    "LAZARILLO CANTA SOCARRON: Viniendo de chascomus en una lancha a vapor casi me caigo al agua por agarrar esta flor");
                puntos[0]=true;
                puntosdeljuego[1]+=3 //suma tres puntos lazarillo por flor
            }
            else
            {
                //LAZARILLO EVALUA SI ACEPTA EL ENVIDO
                if (envidolazarillo>20) 
                {
                    puntos[0]=true;
                    alert(Nombre_Jugador+" DICE: Envido !"+'\n'+
                    "LAZARILLO RESPONDE: Quiero a tu envido!")
                    evaluarenvido(envidohumano, envidolazarillo)
                }
                else
                {   
                    alert("JUGADOR DICE: Envido !"+'\n'+
                    "LAZARILLO RESPONDE: El que huye sirve para otra batalla, NO QUIERO");
                    puntosdeljuego[0]+=1 //suma un punto el usuario
                }
            }
        }

        //TURNO ENVIDO PC (Lazarillo)
        //Lazarillo tiene las cartas arraymano[3] hasta arraymano[5]  [FLAG 1, FLAG2, ESCALA , NUMERO DE CARTA, PALO DE LA CARTA(VALOR (0-3) QUE PEGA AL ARRAY PALO)]
        if(puntos[0]==false)
        { //si el usuario no canto envido, lazarillo revisa si tiene puntos
            if((arraymano[3][4]==arraymano[4][4])&&(arraymano[4][4]==arraymano[5][4]))
            {
                alert("LAZARILLO CANTA: Cómo lágrimas de olvido como suspiros de amor, cantaba sus grandes penas un pájaro en una FLOR.");
                puntos[0]=true;
                puntosdeljuego[1]+=3 //suma tres puntos lazarillo por flor
            }
            else
            {
                if (envidolazarillo>=20) 
                {
                    puntos[0]=true;  //marco que se canto envido
                    if(confirm("LAZARILLO DICE: Cuando vine de La Isla traia un lazo retorcido; con él enlacé dos cartas y con ellas digo ENVIDO."))
                    {
                        evaluarenvido(envidohumano, envidolazarillo)

                    }
                    else
                    {
                        puntosdeljuego[1]+=1 //suma 1 puntos Lazarillo por envido no querido
                    }
                }
                else
                {
                    //CAPACIDAD DE MENTIR Y SALIR A ROBAR PUNTOS DE LAZARILLO AL 50%
                    if((Math.floor(Math.random()*4))<3)
                    {
                        puntos[0]=true;  //marco que se canto envido
                        if(confirm("LAZARILLO DICE: Cuando vine de La Isla traia un lazo retorcido; con él enlacé dos cartas y con ellas digo ENVIDO."))
                        {
                            evaluarenvido(envidohumano, envidolazarillo)
                            if (puntosdeljuego[1]==2)                   //Lazarillo se burla del usuario despues de mentirle
                            {
                                alert("LAZARILLO SONRIE: Sos muy facil "+Nombre_Jugador+" te miento sin tantos")
                            }
                            if (puntosdeljuego[0]==2)                   //Lazarillo reconoce que miente y pierde
                            {
                                alert("Me agarraste!, la mentira tiene patas cortas")
                            }
                        }
                        else
                        {
                            puntosdeljuego[1]+=1 //suma 1 puntos Lazarillo por envido no querido
                            alert("Es muy facil mentirte sin puntos")
                        }
                    }
                }
            }
        }
    }
alert(Nombre_Jugador+": "+puntosdeljuego[0]+" // Lazarillo: "+puntosdeljuego[1])
}

function contarpuntos(valor1,valor2)    // contar puntos del envido
    {
            let rta=20;
            if(valor1<8)
            {
                rta+=valor1;
            }
            if(valor2<8)
            {
                rta+=valor2;
            }
            return rta
    }

function evaluarenvido(envidoH, envidoL)
{
    if(envidoH>=envidoL)
    {
        alert("Los "+envidoH+" puntos de "+Nombre_Jugador+" son mejores que los "+envidoL+" puntos de lazarillo")
        puntosdeljuego[0]+=2;
    }
    else
    {
        alert("Los "+envidoL+" puntos de Lazarillo le ganan a los "+envidoH+" puntos de "+Nombre_Jugador)
        puntosdeljuego[1]+=2;
    }
}

//--------------------------------------------------------------------------------------------------------------------------
//                                  PARTE 2 CODIFICACION DEL TRUCO
//--------------------------------------------------------------------------------------------------------------------------
// FUNCION MOSTRARCARTA() MUESTRA LAS CARTAS QUE EL USUARIO TIENE EN LA MANO, DESCONTANDO LAS QUE ESTAN EN LA MESA
// FUNCION EVALUAR: COMPARA EL RANGO DE LAS CARTAS PARA SABER QUIEN GANA => ESTA EN ARRAYMANO[CARTA][2]

function truco()
    {
        let totalmano = 0    //si la pc gana +1 //si pc llega a dos gano, sino gano el user
        let lazarillohizoprimera=true       //Almaceno quien hizo primera por si empatan en la tercer ronda
        let val=true;
        let banderamenu=false;
        for (let mano = 1; mano < 4; mano++) 
        {
            val=true        //reseteo variable de retorno de funcion
            restantes=mostrarmenu(arraymano[0],arraymano[1],arraymano[2]);  //devuelve el listado de cartas en la mano del jugador
            cartaAjugar=prompt(Nombre_Jugador+": ¿Qué vas a elegir?"+'\n'+restantes+'\n'+"7 = Cantar TRUCO"+'\n\n')

//---------------------------   VALIDO TECLAS -----
            //console.log(cartaAjugar-1);
            if((cartaAjugar=="7"))     
            {
                if(puntos[4]==false)     //si el user canta truco y no se canto aun, lo hace
                {
                    val=RtaIATruco();     //Lazarillo evalua si ACEPTA el truco
                    if(val==false)
                    {
                        puntosdeljuego[0]+=1; //Si Lazarillo rechaza el truco sumo un punto de truco no querido
                        return true
                    }
                    else
                    {
                        mano--
                    }
                }
                else                //si apreta 7 y el user canto truco cuando ya estaba jugado, lazarillo le advierte
                {
                alert("LAZARILLO DICE: Paisano, el nombre del juego ya esta cantado, presta mas atencion")
                mano--
                }
            }
            else
            {
                if ((cartaAjugar=="1")||(cartaAjugar=="2")||(cartaAjugar=="3")||(cartaAjugar=="7")) 
                {
                    if ((cartaAjugar=="1")&&(arraymano[0][1]==false)) 
                    {
                        alert("LAZARILLO DICE: Paisano, la carta ya la jugaste!") 
                        mano--;   
                    }
                    else
                    {
                        if ((cartaAjugar=="2")&&(arraymano[1][1]==false)) 
                        {
                            alert("LAZARILLO DICE: Esa carta ya la tiraste, no seas cabrón")
                            mano--;    
                        }
                        else
                        {
                        if ((cartaAjugar=="3")&&(arraymano[2][1]==false)) 
                            {
                                alert("LAZARILLO DICE: ¿ENSERIO?, Ya tiraste esa carta!! mirá bien lo que haces!!")
                                mano--;    
                          }
                           else
                            {
                                //cartas permitidas aca
                                alert("La carta que jugaste es...: "+arraymano[cartaAjugar-1][3]+" de "+palo[arraymano[cartaAjugar-1][4]])
                                ComparadorTruco[0]=arraymano[cartaAjugar-1]
                                arraymano[cartaAjugar-1][1]=false  //La carta se puso en la mesa
                                seguirjuego=jugarLazarillo();     //A Lazarillo le toca jugar una carta
                                
                                if(seguirjuego==false)      //si el usuario no quiere truco, termina el juego
                                    {
                                        return seguirjuego
                                    }
                                 
                                //Si mano=1 sumo quien gano o me fijo si es parda
                                if(mano==1)
                                {
                                    if(ComparadorTruco[0][2]>ComparadorTruco[1][2])   //si la carta del usuario le gana a Lazarillo
                                    { 
                                        alert("El "+ComparadorTruco[0][3]+" de "+palo[ComparadorTruco[0][4]]+" de "+ Nombre_Jugador+", le gano al"+'\n'+
                                        ComparadorTruco[1][3]+" de "+palo[ComparadorTruco[1][4]]+" de Lazarillo")
                                    }
                                    else
                                    {
                                        if(ComparadorTruco[1][2]>ComparadorTruco[0][2])   //si la carta de Lazarillo le gana al usuario
                                        { 
                                            alert("El "+ComparadorTruco[1][3]+" de "+palo[ComparadorTruco[1][4]]+" de Lazarillo, le ganó al"+'\n'+
                                            ComparadorTruco[0][3]+" de "+palo[ComparadorTruco[0][4]]+" de "+Nombre_Jugador)
                                            totalmano+=1          //gano lazarillo sumo 1 
                                        } 
                                        else
                                        { 
                                            if(ComparadorTruco[1][2]<ComparadorTruco[0][2])   //si la carta del usuario le gana a Lazarillo
                                            { 
                                                alert("El "+ComparadorTruco[0][3]+" de "+palo[ComparadorTruco[0][4]]+" de "+Nombre_Jugador+", le gano al"+'\n'+
                                                ComparadorTruco[1][3]+" de "+palo[ComparadorTruco[1][4]]+" de Lazarillo")
                                            } 
                                            else
                                            {
                                                alert("Parda en primera, la proxima mano gana la partida!")
                                                totalmano=555;
                                            }
                                        }
                                        console.log("Primera mano: "+totalmano);
                                    }
                                }
                                
                                if(mano==2)
                                {
                                    if(ComparadorTruco[0][2]>ComparadorTruco[1][2])   //si la carta del usuario le gana a Lazarillo
                                    { 
                                        alert("El "+ComparadorTruco[0][3]+" de "+palo[ComparadorTruco[0][4]]+" de "+Nombre_Jugador+", le ganó al"+'\n'+
                                        ComparadorTruco[1][3]+" de "+palo[ComparadorTruco[1][4]]+" de Lazarillo")
                    
                                        if (totalmano==555)   //verifico si vengo de parda desde la primer mano
                                        {
                                            alert("LAZARILLO DICE: Me ganaste la partida, solo te estoy midiendo...") 
                                            if(puntos[4]==true)
                                            {
                                                puntosdeljuego[0]+=2           //Si se canto truco en pardas USER gana 2 puntos
                                            }
                                            else
                                            {
                                                puntosdeljuego[0]+=1           //si no se canto truco, en pardas user suma un punto
                                            }
                                            return seguirjuego=false
                                        }//---------------

                                        //EVALUO SI EL USUARIO GANO EL JUEGO EN SEGUNDA
                                        if((totalmano==0)&&(puntos[4]==false))           //Si no se canto truco lazarillo gana 1 punto
                                        {
                                            puntosdeljuego[0]+=1           //si no se canto truco, eL USUARIO suma un punto
                                            alert("Lazarillo dice: Me ganaste porque estaba calculando un punto flotante en simultaneo...")
                                            return true
                                        }
                                        if((totalmano==0)&&(puntos[4]==true))           //Si no se canto truco lazarillo gana 1 punto
                                        {
                                            alert("Lazarillo dice: No perdí "+Nombre_Jugador+"... me dejé ganar que es distinto...")
                                            puntosdeljuego[0]+=2           //si se canto truco, el usuario suma un punto
                                            return true
                                        }
                                    }
                                    else
                                    {   //Lazarillo le gana en la segunda mano
                                        if(ComparadorTruco[0][2]<ComparadorTruco[1][2])   //si la carta de Lazarillo le gana al usuario
                                       { 
                                            alert("El "+ComparadorTruco[1][3]+" de "+palo[ComparadorTruco[1][4]]+" de Lazarillo, le ganó al"+'\n'+
                                            ComparadorTruco[0][3]+" de "+palo[ComparadorTruco[0][4]]+" de "+Nombre_Jugador)
                                            if (totalmano==555)     //si es parda de la mano anterior esta define todo
                                            {
                                                console.log("LAZARILLO DICE: La vida es justa "+Nombre_Jugador+"...te gané el truco sin esfuerzo!")
                                                if(puntos[4]==true)
                                                {
                                                    puntosdeljuego[1]+=2           //Si se canto truco en pardas Lazarillo gana 2 puntos
                                                }
                                                else
                                                {
                                                    puntosdeljuego[1]+=1           //si no se canto truco, en pardas Lazarillo suma un punto
                                                }
                                                return seguirjuego=false
                                            }

                                            totalmano++          //gano lazarillo sumo 1 

                                            //EVALUO SI LAZARILLO GANO EL JUEGO EN SEGUNDA
                                            if((totalmano==2)&&(puntos[4]==true))           //Evaluo si se termina en segunda ronda
                                            {
                                                alert("Lazarillo dice: Mirá que sos fácil...te gané en segunda nomás")
                                                puntosdeljuego[0]+=2           //Si se canto truco Lazarillo gana 2 puntos
                                                return true
                                            }
                                            if((totalmano==2)&&(puntos[4]==false))           //Si no se canto truco lazarillo gana 1 punto
                                            {
                                                alert("Lazarillo dice: Por lo menos trata de llegar a tercera...ya te gané sin esfuerzo")
                                                puntosdeljuego[0]+=1           //si no se canto truco, Lazarillo suma un punto
                                                return true
                                            }   
                                        } 
                                        else
                                        { 
                                            if(ComparadorTruco[1][2]==ComparadorTruco[0][2]) 
                                            {
                                                alert("El "+ComparadorTruco[1][3]+" de "+palo[ComparadorTruco[1][4]]+" de Lazarillo, pardó al"+'\n'+
                                                ComparadorTruco[0][3]+" de "+palo[ComparadorTruco[0][4]]+" de "+Nombre_Jugador)
                                                
                                                //si la primera gano Lazarillo...
                                                if((totalmano==1)&&(puntos[4]==true))           //Evaluo si se termina en segunda ronda
                                                {
                                                    alert("Lazarillo dice: Te gané el truco por primera...¿Me dijiste que sabias jugar?")
                                                    puntosdeljuego[1]+=2           //Si se canto truco Lazarillo gana 2 puntos
                                                    return true
                                                }
                                                if((totalmano==1)&&(puntos[4]==false))           //Si no se canto truco lazarillo gana 1 punto
                                                {
                                                    alert("Lazarillo dice: Te robé un punto sin hecer nada...")
                                                    puntosdeljuego[1]+=1           //si no se canto truco, Lazarillo suma un punto
                                                    return true
                                                }   

                                                //SI LA PRIMERA GANO EL USUARIO
                                                if((totalmano==0)&&(puntos[4]==true))           //Evaluo si se termina en segunda ronda
                                                {
                                                    alert("Lazarillo dice: "+Nombre_Jugador+", me ganaste por primera...no prestaba atención ")
                                                    puntosdeljuego[0]+=2           //Si se canto truco Usuario gana 2 puntos
                                                    return true
                                                }
                                                if((totalmano==0)&&(puntos[4]==false))           //Si no se canto truco Usuario gana 1 punto
                                                {
                                                    alert("Lazarillo dice: No me tocaron buenas cartas...")
                                                    puntosdeljuego[0]+=1           
                                                    return true
                                                }   

                                            }  
                                            alert("LAZARILLO DICE: Estoy de malas...me voy al mazo..no me gusta perder...")
                                            puntosdeljuego[0]+=1
                                            return true
                                        }
                                    }
                                }//fin mano 2
                
                                //mano 3
                                if(mano==3)
                                {   
                                    if((totalmano==0)&&(mano==3))
                                    {
                                        console.log("Mano error?: "+mano);
                                        console.log("EN mano tres totalmano vale: "+totalmano);
                                        alert("Lazarillo dice: Has ganado...recordá que el exito es efimero")
                                        if(puntos[4]==true)
                                        {
                                            puntosdeljuego[0]+=2           //Si se canto truco USER gana 2 puntos
                                        }
                                        else
                                        {
                                            puntosdeljuego[0]+=1           //si no se canto truco,user suma un punto
                                        }
                                        console.log("Puntos ganados por user:"+puntosdeljuego[0]);
                                        return true
                                    }
                                    if(ComparadorTruco[0][2]>ComparadorTruco[1][2])   //si la carta del usuario le gana a Lazarillo
                                    { 
                                        alert("El "+ComparadorTruco[0][3]+" de "+palo[ComparadorTruco[0][4]]+" de "+Nombre_Jugador+", le gano al"+'\n'+
                                        ComparadorTruco[1][3]+" de "+palo[ComparadorTruco[1][4]]+" de Lazarillo ☺")
                                        if(totalmano>=2)
                                        {
                                            alert("LAZARILLO DICE: Me ganaste de una manera muy lastimosa.")
                                            if(puntos[4]==true)
                                            {
                                                puntosdeljuego[0]+=2           //Si se canto truco Lazarillo gana 2 puntos
                                            }
                                            else
                                            {
                                                puntosdeljuego[0]+=1           //si no se canto truco, Lazarillo suma un punto
                                            }
                                            return true
                                        }
                                        else
                                        {
                                            alert("LAZARILLO DICE: Me ganaste el juego...QUERÍA PROBAR TU NIVEL, NO ESTABA JUGANDO EN SERIO.")
                                            if(puntos[4]==true)
                                            {
                                                puntosdeljuego[0]+=2           //Si se canto truco Lazarillo gana 2 puntos
                                            }
                                            else
                                            {
                                                puntosdeljuego[0]+=1           //si no se canto truco, Lazarillo suma un punto
                                            }
                                            return true 
                                        }
                                    }
                                    if(ComparadorTruco[0][2]==ComparadorTruco[1][2])   //si Lazarillo gana la tercera mano
                                    { 
                                        alert("El "+ComparadorTruco[0][3]+" de "+palo[ComparadorTruco[0][4]]+" de "+Nombre_Jugador+", emparda al"+'\n'+
                                        ComparadorTruco[1][3]+" de "+palo[ComparadorTruco[1][4]]+" de Lazarillo")
                                        if(lazarillohizoprimera==false)
                                        {
                                            alert("LAZARILLO DICE: Me ganaste por haber hecho primera")     
                                            if(puntos[4]==true)
                                            {
                                            puntosdeljuego[0]+=2           //Si se canto truco Lazarillo gana 2 puntos
                                            }
                                            else
                                            {
                                            puntosdeljuego[0]+=1           //si no se canto truco, Lazarillo suma un punto
                                            }
                                            return true
                                        }
                                        else
                                        {
                                            alert("LAZARILLO DICE: Te gane y te gozo por haber hecho primera")     
                                            if(puntos[4]==true)
                                            {
                                                puntosdeljuego[1]+=2           //Si se canto truco Lazarillo gana 2 puntos
                                            }
                                            else
                                            {
                                                puntosdeljuego[1]+=1           //si no se canto truco, Lazarillo suma un punto
                                            }
                                            return true
                                        }
                                    }
                                    if(ComparadorTruco[0][2]<ComparadorTruco[1][2])   //si la carta del usuario es igual
                                    { 
                                        alert("El "+ComparadorTruco[1][3]+" de "+palo[ComparadorTruco[1][4]]+" de Lazarillo, le gana al"+'\n'+
                                        ComparadorTruco[0][3]+" de "+palo[ComparadorTruco[0][4]]+" de "+Nombre_Jugador)
                                        if(totalmano>=1)
                                        {
                                            alert("LAZARILLO DICE: Te gane la partida...sos un rival muy facil...")
                                            if(puntos[4]==true)
                                            {
                                                puntosdeljuego[1]+=2           //Si se canto truco Lazarillo gana 2 puntos
                                            }
                                            else
                                            {
                                                puntosdeljuego[1]+=1           //si no se canto truco, Lazarillo suma un punto
                                            }
                                            return true
                                        }
                                    }
                                }
                                //fin mano 3
                                //EN CUALQUIER MANO SI LAZARILLO LLEGA A DOS YA GANO
                                if(totalmano==2)
                                {
                                    alert("Lazarillo dice: Perdiste, no te desanimes...Ganancia inocente, no la verás fácilmente.")
                                    if(puntos[4]==true)
                                    {
                                        puntosdeljuego[1]+=2           //Si se canto truco en pardas USER gana 2 puntos
                                    }
                                    else
                                    {
                                        puntosdeljuego[1]+=1           //si no se canto truco, en pardas user suma un punto
                                    }
                                    return true
                                }
                                else
                                {
                                       
                                }
                                console.log("Mano terminada: "+mano) // - Puntos de Lazarillo: "totalmano);        muestro los puntos de la pc
                                mostrarresumen()          //muestro resumen de la partida en consola para control
                            }
                        }  
                    }

                }   //fin si la tecla es ok juega
                else 
                {
                    alert("OPCION NO VALIDA")
                    mano--
                }
            }
        }
        return true
    }
    
    
    //-------------------  FUNCION JUGAR CARTA LAZARILLO ---------------------------------------------------------------
    function jugarLazarillo()
    {
      if (puntos[4]==false)      //Si todavia no se canto truco en el juego, Lazarillo verifica si conviene cantar
      {
        seguirjuego=LazarilloVerificaTruco()            //si el usuario niega el truco se acaba el juego
        if(seguirjuego==false)
        {
            puntosdeljuego[1]+=1
            return seguirjuego
        }
        Lazarillotiracarta()
      }
      else          //Si se canto truco lazarillo evalua la carta a tirar
      {
        Lazarillotiracarta()
      }
    }

    function Lazarillotiracarta()
        {
            let cartaparajugar
            let bandera=false;
            while(bandera!=true)                //Lazarillo elije una carta al azar de las que no estan en la mesa
            {
            cartaparajugar=(Math.floor(Math.random()*3))+3
            if (arraymano[cartaparajugar][1]==true) 
                {   
                    arraymano[cartaparajugar][1]=false //Marco la carta seleccionada como que se jugo en la mesa
                    bandera=true
                }
            }
            alert("LAZARILLO TIRA LA CARTA: "+arraymano[cartaparajugar][3]+" de "+palo[arraymano[cartaparajugar][4]])
            ComparadorTruco[1]=arraymano[cartaparajugar];
        }

    function LazarilloVerificaTruco()
    {
        //   1) LAZARILLO VERIFICA EN BASE A LAS CARTAS QUE LE QUEDAN Y SI NO SE CANTO TRUCO SI EL VA A  CANTAR
        cantidaddecartas=1;     //Acumulador que me indica cuantas cartas menos tiene la pc para jugar
        let evaluacion=0;       //Variable donde Lazarillo calcula las respuestas
            for (let t = 3; t < 6; t++) 
            {
                if(arraymano[t][1]==true)    //si lazarillo aun no jugo la carta t, la evalua
                {
                    evaluacion+=arraymano[t][2];
                }
                else
                {
                    cantidaddecartas++  //si la carta ya esta en mesa la sumo para calcular el riesgo
                }
            
            }
            if(cantidaddecartas==1)         //Si lazarillo todavia no jugo ninguna carta
            {
                if(evaluacion<20)
                {
                    let IAazar=Math.floor(Math.random()*10)
                    if(IAazar<3)        //30% de que diga que TRUCO sin tener buenas cartas
                    {
                        puntos[4]=true     //marco que se canto truco
                        return confirm("LAZARILLO DICE: Con las cartas que yo tengo tampoco me asusta el cuco y si es que no me detengo, YO LE DIGO TRUCO"); 
                    }
                }
                else
                {
                    puntos[4]=true     //marco que se canto truco  
                    return confirm("LAZARILLO DICE: Con las cartas que yo tengo tampoco me asusta el cuco y si es que no me detengo, YO LE DIGO TRUCO");    
                }
            }

            if(cantidaddecartas==2)         //Si lazarillo ya jugo una carta
            {
                if(evaluacion<10)
                {
                    let IAazar=Math.floor(Math.random()*10)
                    if(IAazar<3)        //30% de que diga que TRUCO sin tener buenas cartas
                    {
                        puntos[4]=true     //marco que se canto truco
                        return confirm("LAZARILLO DICE: Con las cartas que yo tengo tampoco me asusta el cuco y si es que no me detengo, YO LE DIGO TRUCO"); 
                    }
                }
                else
                {
                    puntos[4]=true     //marco que se canto truco  
                    return confirm("LAZARILLO DICE: Con las cartas que yo tengo tampoco me asusta el cuco y si es que no me detengo, YO LE DIGO TRUCO");    
                }
            }
        
            if(cantidaddecartas==3)         //Si lazarillo esta en la ultima mano
            {
                if(evaluacion<6)
                {
                    let IAazar=Math.floor(Math.random()*10)
                    if(IAazar<3)        //30% de que diga que TRUCO sin tener buenas cartas
                    {
                        puntos[4]=true     //marco que se canto truco
                        return confirm("LAZARILLO DICE: Con las cartas que yo tengo tampoco me asusta el cuco y si es que no me detengo, YO LE DIGO TRUCO"); 
                    }
                    
                }
                else
                {
                    puntos[4]=true     //marco que se canto truco  
                    return confirm("LAZARILLO DICE: Con las cartas que yo tengo tampoco me asusta el cuco y si es que no me detengo, YO LE DIGO TRUCO");    
                }
            }
    }

    function RtaIATruco()    //true=QUIERE    FALSE=NO QUIERE
    {
                //Lazarrillo evalua su mano para ver si acepta o no....
                cantidaddecartas=1;     //Acumulador que me indica cuantas cartas menos tiene la pc para jugar
                let evaluacion=0;       //Variable donde Lazarillo calcula las respuestas
                for (let t = 3; t < 6; t++) 
                    {
                        if(arraymano[t][1]==true)    //si lazarillo aun no jugo la carta t, la evalua
                        {
                            evaluacion+=arraymano[t][2];
                        }
                        else
                        {
                            cantidaddecartas++  //si la carta ya esta en mesa la sumo para calcular el riesgo
                        }
                    }

                //Lazarillo responde de acuerdo a lo evaluado
                if(cantidaddecartas==1)         //Si lazarillo todavia no jugo ninguna carta
                {
                    if(evaluacion<15)
                    {
                        let IAazar=Math.floor(Math.random()*10)
                        if(IAazar<7)        //30% de que diga que QUIERE sin tener buenas cartas
                        {
                         alert("LAZARILLO RESPONDE: No quiero :(");
                         return false         
                        }
                        else
                        {
                            alert("LAZARILLO RESPONDE: Quiero")
                            puntos[4]=true;
                            return true
                        }
                    }
                    else
                    {
                        alert("LAZARILLO RESPONDE: Quiero")
                        puntos[4]=true;
                        return true 
                    }
                }

                if(cantidaddecartas==2)         //Si a lazarillo le quedan 2 cartas:
                {
                    if(evaluacion<10)
                    {
                        let IAazar=Math.floor(Math.random()*10)
                        if(IAazar<8)        //20% de que diga que QUIERE sin tener buenas cartas
                        {
                         alert("LAZARILLO RESPONDE: No quiero ☺");
                         return false         
                        }
                        else
                        {
                            alert("LAZARILLO RESPONDE: Quiero")
                            puntos[4]=true;
                            return true
                        }
                    }
                    else
                    {
                        alert("LAZARILLO RESPONDE: Quiero")
                        puntos[4]=true;
                        return true 
                    }
                }

                if(cantidaddecartas==3)         //Si a lazarillo le queda 1 carta:
                {
                    if(evaluacion<10)
                    {
                        let IAazar=Math.floor(Math.random()*10)
                        if(IAazar<7)        //30% de que diga que QUIERE sin tener buenas cartas
                        {
                         alert("LAZARILLO RESPONDE: No quiero ☺");
                         return false         
                        }
                        else
                        {
                            alert("LAZARILLO RESPONDE: Quiero")
                            puntos[4]=true;
                            return true
                        }
                    }
                    else
                    {
                        alert("LAZARILLO RESPONDE: Quiero")
                        puntos[4]=true;
                        return true 
                    }
                }
    }
 
    function mostrarmenu(carta1,carta2,carta3)
    {
        let mensaje="";
        if(carta1[1]==true)
            {
                mensaje+="1 = Tirar "+carta1[3]+" de "+palo[carta1[4]]+'\n'
            }
        if(carta2[1]==true)
            {
                mensaje+="2 = Tirar "+carta2[3]+" de "+palo[carta2[4]]+'\n'
            }
            if(carta3[1]==true)
            {
                mensaje+="3 = Tirar "+carta3[3]+" de "+palo[carta3[4]]+'\n'
            }
            return mensaje
    }
    
//--------------------------------------------------------------------------
//-------------         main del truco    ----------------------------------
//--------------------------------------------------------------------------
Nombre_Jugador=prompt("Hola!, me llamo Lazarillo, por favor identificate:")
if(confirm("Hola "+Nombre_Jugador+" ...¿JUGAMOS UN JUEGO?"))
{
    alert("♥♦ BIENVENIDO AL JUEGO DE TRUCO ♣♠")
    barajar();
    envido();          //la funcion envido actualiza los puntos del juego
    seguirjuego=truco();
    alert("JUEGO TERMINADO"+'\n\n'+"Puntaje final: "+'\n'+
            Nombre_Jugador+": "+puntosdeljuego[0]+'\n'+
            "Lazarillo: "+puntosdeljuego[1])
}
else
{
    alert("Y yo que queria ganarte....")
}

        //fin truco V 1.0