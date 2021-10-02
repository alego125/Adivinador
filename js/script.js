const d = document,
    //Cuadro de cuadricula
    $elementos = d.querySelectorAll(".porcion"),
    //Boton para iniciar juego
    $btnInicio = d.querySelector(".btn-comenzar"),
    //h2 donde se coloca el mensaje del juego
    $mensaje = d.querySelector(".mensaje"),
    //h2 donde se colocan los puntos
    $puntos = d.querySelector(".puntos"),
    //h2 de las chances restantes
    $chance = d.querySelector(".chances"),
    //Boton de continuar jugando
    $continue = d.querySelector(".btn-seguir"),
    //Guardamos en variable el boton que reinicia el juego
    $restart = d.querySelector(".btn-salir");

//Cantidad de eleemntos de la cuadricula
let cantidad = $elementos.length,
    intervalo,
    //Seleccion random de nuemero de id por parte de la computadora
    selectedRandom,
    //Elemento que selecciona la persona
    elemntSelected,
    //Puntos del juego
    puntos,
    //Numeros de intentos de adivinar
    intentos,
    //Inicializamos bandera
    bandera = false;

//Deteccion del click sobre el boton para dar comienzo al juego
$btnInicio.addEventListener('click', () => {
    //Colocamos la bandera en true
    bandera = true;
    //Creamos un numero random para usar como id le colocamos como ranggo desde el 0 hasta el numero de elementos que hay en la cuadrivula almacenados la variable cantidad
    selectedRandom = Math.floor(Math.random() * cantidad);
    //Convertimos a string el numero random para usarlo en el id
    selectedRandom = selectedRandom.toString();
    //Metemos texto dentro de la etiqueta h2 mensaje
    $mensaje.innerText = 'Ya he elegido un casillero intenta adivinar cual es';
    //Iniciamos el contador de intentos
    intentos = 20;
    //Iniciamos el contador de puntaje
    puntos = 0;
    console.log(selectedRandom);
});


//Detectamos un evento en el documento
d.addEventListener('click', (e) => {
    //Obtenemos mediante target el id del elemento clickeado
    elemntSelected = e.target.id;
    //Guardamos el elemento que coincide con el id random generado en una variable
    const $selected = d.getElementById(selectedRandom),
    //Guardamos el elemento que coincide con el elemento seleccionado por la persona
        $selectedByPerson = d.getElementById(elemntSelected);
        //Si el evento coincide con uno de los cuadros de la cuadricula ejecuta el codigo del interior
        if(bandera === true){
            if (e.target.matches(".porcion")) {
            //Iniciamos el mensaje vacio
            $mensaje.innerText = '';
            //Iniciamos el contador de intentos
            $chance.innerText = `Chances restantes: ${intentos}`;
            //Si la cantidad de intentos es mayor a 0 entonces quedan chances y se ejecuta el codio del juego
            if (intentos > 0) {
                //Si coincide el elemento que clickeamos con el elemento elegido por la computadora random entonces se ejecuta el codigo
                if (selectedRandom == elemntSelected) {
                    //Agregamos la clase de color verfde al elemento seleccionado ya que es el correcto
                    $selected.classList.add("seleccion2");
                    //Agregamos puntos a la variable puntos en un rango al azar de 0 a 55
                    puntos = puntos + (Math.floor(Math.random() * 55));
                    //Metemos texto en la etiqueta h2 de puntos donde diga la cantidad de puntos acumulada
                    $puntos.innerText = `Puntos: ${puntos}`;
                    //Seteamos el mensaje de felicitacion por encontrar el correcto
                    $mensaje.innerText = '🎊Perfecto has adivinado🎊';
                    //Removemos del boton continuar la clase hidden que lo mantiene oculto para mostrarlo y permitirle al jugador continuar jugando
                    $continue.classList.remove("btn-hidden");
                    //Detectamos el evento click sobre le boton continuar antes mostrado
                    $continue.addEventListener('click', e =>{
                        //Si se hace click en continuar entonces primero se vuelve a generar el numero random
                        selectedRandom = Math.floor(Math.random() * cantidad);
                        //Convertimos nuevamente a string el numero random para usarlo en el id
                        selectedRandom = selectedRandom.toString();
                        //Removemos el casillero del elemento correcto
                        $selected.classList.remove("seleccion2");
                        //Removemos los casilleros incorrectos
                        //Guardamos todos los casilleros rojos con la clase seleccion1 en la variable redBox
                        const $redBox = d.querySelectorAll(".seleccion1");
                        //Recorremos cada uno de los casilleros de la lista de elementos rojos y a cada uno le eliminamos la clase que los vuelve rojos
                        $redBox.forEach((e)=>{
                            e.classList.remove("seleccion1");
                        });
                        //Volvemos a 20 el contador de intentos
                        intentos = 20;
                    });
                } else {
                    //$selected = d.getElementById(selectedRandom);
                    //En caso contrario si no coinciden el seleccionado con el que se genero random se ejecuta el sigueinte codigo
                    //Se setea el mensaje de Gave Over
                    $mensaje.innerText = 'No es el seleccionado vuelve a intentarlo';
                    //Se resta un intento a la variable intentos
                    intentos--;
                    //Agregamos la clase con el color rojo al que no es el correcto
                    $selectedByPerson.classList.add("seleccion1");
                }
            } else {
                //En caso contrario si se gastan las chances entonces se ejecutan las siguientes lineas
                //Se setea el mensaje de game over
                $mensaje.innerText = 'GAME OVER Has agotado todas tus chances presiona reiniciar para volver a intentarlo 😔';
                //Agregamos la clase que oculta el boton continuar
                $continue.classList.add("btn-hidden");    
                //Agregamos la clase de color verfde al elemento seleccionado ya que es el correcto
                $selected.classList.add("seleccion2");
    
            }
        }
    }else{
        $mensaje.innerText = 'Debe presionar iniciar primero';
    }
});

//Detectamos el evento click sobre el boton reinicio
$restart.addEventListener('click',()=>{
    //Ejecutamos el metodo recargar del navegador para que la pagina se recargue y el juego se reinicie
    window.location.reload();
});