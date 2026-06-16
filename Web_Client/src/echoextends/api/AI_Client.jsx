// const API_URL = "https://your-render-url.onrender.com/ai/move";
const API_URL = "http://localhost:8000/ai/move";
export async function requestAIMove(board, turn, aiType) {
  const res = await fetch(API_URL, {method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ board, turn, aiType }),
  });

  return await res.json();
}
