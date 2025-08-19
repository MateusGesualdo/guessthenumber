let correctNumber, numberOfAttempts, gameIsOver;

function guess(number) {
  if (gameIsOver) return "Reinicie para jogar novamente";

  numberOfAttempts++;

  if (number === correctNumber) {
    gameIsOver = true;
    return `Parabéns, você acertou em ${numberOfAttempts} tentativas!`;
  } else if (number > correctNumber) {
    return "Muito alto, tente um número menor";
  } else if (number < correctNumber) {
    return "Muito baixo, tente um número maior";
  } else {
    numberOfAttempts--;
    return "Entrada inválida";
  }
}

function start() {
  correctNumber = Math.floor(101 * Math.random());
  numberOfAttempts = 0;
  gameIsOver = false;
}

start()