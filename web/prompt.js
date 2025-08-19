let gameIsOn = true;
let message = "Digite um número de 0 a 100";

while (gameIsOn) {
  let playerGuess = prompt(message);
  message = guess(Number(playerGuess));

  if (message.includes("Parabéns")) {
    const gameIsOn = confirm(`${message} Reiniciar?`);

    if (gameIsOn) {
      start();
      message = "Digite um número de 0 a 100";
    } else {
      gameIsOn = false;
    }
  }
}
