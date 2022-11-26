// Este array no se puede modificar,
var posibilidades = ["piedra", "papel", "tijera"];
//    //

// VARIABLES GLOBALES 

// Nombre del jugador
let playerName

// Número de partidas a jugar
let matchesToPlay

// Número de partidas restantes
let matchesPlayed = 0;

// Elección del jugador
let playerChoice

// Inputs de los que obtenemos los valores de la partida
const nameInput = document.getElementsByName('nombre')[0];
const matchesInput = document.getElementsByName('partidas')[0];

// Elementos que muestran número de partidas
const matchesPlayedSpan = document.getElementById('actual');
const matchesToPlaySpan = document.getElementById('total');

// Imagenes que están contenidas en #jugador 
const gamePlayerImages = document.querySelectorAll('#jugador img');

// Imagenes que están contenidas en máquina
const maquinaImages = document.querySelectorAll('#maquina img')[0];

// Lista de ganadores
const winnersList = document.getElementById('historial');

// LÓGICA Y EVENTOS IMAGENES DEL JUGADOR 

// Establecemos la lógica del evento selección en las imagenes del jugador;
// La imagen seleccionada se establece cómo la elección del jugador
const setImageIsSelected = (e) => {
  const imageSelected = e.target;
  playerChoice = imageSelected.alt;
  gamePlayerImages.forEach((image, index) => {
    if (image === imageSelected) {
      image.classList.remove('noSeleccionado');
      imageSelected.classList.add('seleccionado');
      playerChoice = index;
      return;
    }
    image.classList.remove('seleccionado');
    image.classList.add('noSeleccionado');
  })
  maquinaImages.src = './img/defecto.png';
}

// Añadimos las url de manera dinamica en relación al array inicial Posibilidades
// Añadimos el evento de selección
// Añadimos la elección defecto del jugador en base a la imagen seleccionada
gamePlayerImages.forEach((image, index) => {
  image.src = `./img/${posibilidades[index]}Jugador.png`;
  image.alt = index;
  image.addEventListener('click', setImageIsSelected);
  if (image.className === 'seleccionado') {
    playerChoice = index;
  }
})

// LÓGICA DEL JUEGO

// RECOGEMOS LAS VARIABLES BÁSICAS PARA COMENZAR EL JUEGO
const setGame = () => {

  // Definimos los valores de las expresiones regulares

  // El valor de NOMBRE DE USUARIO tiene que ser mayor de tres caracteres y no comenzar por dígitos
  const nameRegex = /^\D[a-zA-Z0-9 ]{3,}$/;

  // El valor de NÚMERO DE PARTIDAS tiene que ser mayor que cero
  const matchesRegex = /^[1-9][0-9]*$/;

  // Tomamos los valores de los inputs
  const nameValue = nameInput.value;
  const matchesValue = matchesInput.value;

  // Comprobamos que los valores emitidos sean los demandados
  const isNameValueRigth = nameRegex.test(nameValue)
  const isMatchesValueRight = matchesRegex.test(matchesValue);


  // Añadimos o borramos la clase Fondo Rojo si el valor no es correcto
  if (!isNameValueRigth) {
    nameInput.classList.add('fondoRojo');
  } else {
    nameInput.classList.remove('fondoRojo');
  }

  if (!isMatchesValueRight) {
    matchesInput.classList.add('fondoRojo');
  } else {
    matchesInput.classList.remove('fondoRojo');
  }

  // Comprobamos si ambos valores son correctos y seteamos los valores de la partida actual
  if (isNameValueRigth && isMatchesValueRight) {

    // Guardamos Nombre del jugador y número de partidas
    playerName = nameValue;
    matchesToPlay = matchesValue

    // Añadimos número de partidas al span del document
    matchesToPlaySpan.innerText = matchesValue;

    // Deshabilitamos los inputs
    nameInput.disabled = true;
    matchesInput.disabled = true;
  }
};

// Añadimos el evento al botón JUGAR
document.querySelectorAll('button')
  .forEach((element) => {
    if (element.innerText.toLowerCase().includes('jugar')) {
      element.addEventListener('click', setGame)
    }
  })

// LÓGICA DE LA PARTIDA

// Añade a la tabla de resultados el ganador o el empate y suma una partida jugada.
const setGameResults = (textToAdd) => {
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(textToAdd));
  winnersList.appendChild(li);
  matchesPlayed++
  matchesPlayedSpan.innerText = matchesPlayed;
}


// Lógica que establece quién gana y si se puede jugar
const playGame = () => {
  // Si los valores básicos no están establecidos o las partidas jugadas son menores a las elegidas jugamos
  if (playerName && matchesToPlay && matchesToPlay > matchesPlayed) {

    // Valor de la elección de la máquina en base a length de array posibilidades
    const machineChoice = Math.floor(Math.random() * posibilidades.length);

    // Seteamos la imagen en relación a la elección de la máquina
    maquinaImages.src = `./img/${posibilidades[machineChoice]}Ordenador.png`;

    // Si eligen los mismo es un empate
    if (playerChoice === machineChoice) {
      setGameResults('Empate');
      return;

      // Si la elección de la máquina es igual a la posición última del array posibilidaes y la del jugador es igual al inicio gana el jugador
    } else if (machineChoice === (posibilidades.length - 1) && playerChoice === 0) {
      setGameResults(`${playerName} gana`);
      return;

      // Si la elección del jugador es igual a la posición última del array posibilidaes y la de la máquina es igual al inicio gana la máquina
    } else if (playerChoice === (posibilidades.length - 1) && machineChoice === 0) {
      setGameResults('Gana la máquina');
      return;

      // Cualquier elección por parte del jugador que sea inferior a la máquina hace que la máquina gane.
    } else if (playerChoice < machineChoice) {
      setGameResults('Gana la máquina');
      return;

    // En el resto gana el jugador
    } else {
      setGameResults(`${playerName} gana`);
      return;
    }

    // Si el nombre del jugador está seteado y existen partidas que jugar siendo su valor distinto a 0 significa que no te quedan más partidas y no se ha reseteado el juego
  } else if (playerName && matchesToPlay && matchesToPlay !== 0) {
    alert('No te quedan más partidas que jugar.');

    // Cualquier otro valor indica que no se ha cumplimentado los valores básicos para jugar.
  } else {
    alert('Introduce tu nombre o número de partidas que deseas jugar.')
  }

}

// Añadimos el evento JUGAR al boton YA
document.querySelectorAll('button')
  .forEach((element) => {
    if (element.innerText.toLowerCase().includes('ya')) {
      element.addEventListener('click', playGame)
    }
  })

// RESETEAR PARTIDA estableciendo todos los valores por defecto

const resetGame = () => {
  // Habilitamos los input
  nameInput.disabled = false;
  matchesInput.disabled = false;

  // Reseteamos a 0 las partidas
  matchesInput.value = 0;

  // Reseteamos el contador
  matchesToPlay = 0;
  matchesPlayed = 0;

  // Resetemos los span que contienen el contador
  matchesPlayedSpan.innerText = 0;
  matchesToPlaySpan.innerText = 0;

  // Establecemos el valor por defecto de la imagen de la máquina
  maquinaImages.src = './img/defecto.png';
}

// Añadimos el envento al button RESET
document.querySelectorAll('button')
  .forEach((element) => {
    if (element.innerText.toLowerCase().includes('reset')) {
      element.addEventListener('click', resetGame)
    }
  })
