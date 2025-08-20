import {saveScore} from "../data/fetch.js"
import {createGame} from "../core/index.js"

let gameIsOn = true;
let message = "Digite um número de 0 a 100";
let playerName = prompt("Qual o seu nome?");

alert(`Olá, ${playerName}! Boas vindas ao Adivinhe o Número!`);

const game = createGame(saveScore, playerName);

while (gameIsOn) {
  let playerGuess = prompt(message);
  message = await game.guess(Number(playerGuess));

  if (message.includes("Parabéns")) {
    gameIsOn = confirm(`${message} Reiniciar?`);

    if (gameIsOn) {
      playerName = prompt("Qual o seu nome?");
      game.start(playerName);
      message = "Digite um número de 0 a 100";
    } else {
      gameIsOn = false;
    }
  }
}
