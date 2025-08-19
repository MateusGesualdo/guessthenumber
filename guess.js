let correctNumber = Math.floor(101 * Math.random());
let numberOfAttempts = 0;

function guess(number) {
  numberOfAttempts++;
  if (number === correctNumber) {
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
