function loadScores() {
  const scores = localStorage.getItem("guessTheNumber");
  try {
    return JSON.parse(scores) || {};
  } catch (error) {
    console.log(error);
    return {};
  }
}

function saveScore(player, score) {
  const scores = loadScores();

  if (scores[player] === undefined || score < scores[player]) {
    scores[player] = score;
  }

  localStorage.setItem("guessTheNumber", JSON.stringify(scores));

  return scores[player];
}
