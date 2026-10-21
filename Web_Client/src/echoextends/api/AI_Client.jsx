const API_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV
    ? "http://localhost:8000"
    : "https://echoextends.onrender.com");

export async function requestAIMove(board, turn, aiType, isFirstTurn) {
  try {
    const res = await fetch(`${API_URL}/ai/move`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ board, turn, aiType, isFirstTurn }),
    });

    if (!res.ok) {
      console.warn("AI server returned an error:", res.status);
      return null;
    }

    return await res.json();
  } catch (err) {
    console.warn("AI サーバーに接続できません", err);
    return null;
  }
}
