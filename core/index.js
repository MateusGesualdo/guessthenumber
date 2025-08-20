export function createGame(saveScore, playerName) {
  let correctNumber, numberOfAttempts, gameIsOver;

  async function guess(number) {
    if (gameIsOver) return "Reinicie para jogar novamente";

    numberOfAttempts++;

    if (number === correctNumber) {
      gameIsOver = true;
      let message = `Parabéns, você acertou em ${numberOfAttempts} tentativas!`;
      let high_score;
      try {
        high_score = await saveScore(playerName, numberOfAttempts);
        message += ` (Seu recorde é de ${high_score}).`;
      } catch (error) {
        message += ` (Falha ao salvar sua pontuação).`;
      }
      return message;
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
