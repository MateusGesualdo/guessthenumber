export async function saveScore(player_name, score) {
  const response = await fetch(
    "https://gnrovlgphoteniryojsw.supabase.co/functions/v1/update-player-score",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imducm92bGdwaG90ZW5pcnlvanN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2MzY0NDIsImV4cCI6MjA3MTIxMjQ0Mn0.O193gpGKpghGVRhaXJHN4wmTaHfVN8ADS7LlKRGFiAk",
      },
      body: JSON.stringify({
        player_name,
        score,
      }),
    }
  );

  return (await response.json()).score;
}
