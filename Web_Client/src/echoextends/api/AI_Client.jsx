const API_URL = "https://echoextends.onrender.com";
//const API_URL = "http://localhost:8000";

export async function requestAIMove(board, turn, aiType) {
  const res = await fetch(`${API_URL}/ai/move`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ board, turn, aiType }),
  });

  return await res.json();
}

