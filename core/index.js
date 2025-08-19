function createGame(saveScore, playerName) {
  let correctNumber, numberOfAttempts, gameIsOver;

  function guess(number) {
    if (gameIsOver) return "Reinicie para jogar novamente";

    numberOfAttempts++;

    if (number === correctNumber) {
      gameIsOver = true;
      const high_score = saveScore(playerName, numberOfAttempts);
      return `Parabéns, você acertou em ${numberOfAttempts} tentativas! Seu recorde é de ${high_score}.`;
    } else if (number > correctNumber) {
      return "Muito alto, tente um número menor";
    } else if (number < correctNumber) {
      return "Muito baixo, tente um número maior";
    } else {
      numberOfAttempts--;
      return "Entrada inválida";
    }
  }

  function start(name) {
    playerName = name;
    correctNumber = Math.floor(101 * Math.random());
    numberOfAttempts = 0;
    gameIsOver = false;
    return "Jogo iniciado";
  }

  start(playerName);

  return { start, guess };
}
