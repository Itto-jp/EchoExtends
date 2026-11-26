import { useState } from "react";
import Button from "../components/Button";

export default function AIvsAISelect({ onStart }) {
  const [aiType1, setAIType1] = useState("random");
  const [aiType2, setAIType2] = useState("random");

  const AI_NAMES = {
    random: "Random AI",
    greedy: "Greedy AI",
    mcts: "MonteCarlo AI",
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "40px",
        width: "900px",
        margin: "40px auto",
      }}
    >
      <h2>AI vs AI</h2>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "40px",
        }}
      >
        {/* Player1 */}
        <div>
          <h3>Player 1</h3>

          <h2 style={{ color: "#FFD700" }}>
            {AI_NAMES[aiType1]}
          </h2>

          <details>
            <summary>おすすめ</summary>

            <button onClick={() => setAIType1("random")}>
              Random AI
            </button>

            <br />

            <button onClick={() => setAIType1("greedy")}>
              Greedy AI
            </button>

            <br />

            <button onClick={() => setAIType1("mcts")}>
              MonteCarlo AI
            </button>
          </details>

          <br />

          <details>
            <summary>初級</summary>

            <button onClick={() => setAIType1("random")}>
              Random AI
            </button>

            <br />

            <button onClick={() => setAIType1("greedy")}>
              Greedy AI
            </button>
          </details>

          <br />

          <details>
            <summary>中級</summary>

            <button onClick={() => setAIType1("mcts")}>
              MonteCarlo AI
            </button>
          </details>

          <br />

          <details>
            <summary>上級</summary>

            <p>未実装</p>
          </details>
        </div>

        {/* VS */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "40px",
            fontWeight: "bold",
          }}
        >
          VS
        </div>

        {/* Player2 */}
        <div>
          <h3>Player 2</h3>

          <h2 style={{ color: "#1E90FF" }}>
            {AI_NAMES[aiType2]}
          </h2>

          <details>
            <summary>おすすめ</summary>

            <button onClick={() => setAIType2("random")}>
              Random AI
            </button>

            <br />

            <button onClick={() => setAIType2("greedy")}>
              Greedy AI
            </button>

            <br />

            <button onClick={() => setAIType2("mcts")}>
              MonteCarlo AI
            </button>
          </details>

          <br />

          <details>
            <summary>初級</summary>

            <button onClick={() => setAIType2("random")}>
              Random AI
            </button>

            <br />

            <button onClick={() => setAIType2("greedy")}>
              Greedy AI
            </button>
          </details>

          <br />

          <details>
            <summary>中級</summary>

            <button onClick={() => setAIType2("mcts")}>
              MonteCarlo AI
            </button>
          </details>

          <br />

          <details>
            <summary>上級</summary>

            <p>未実装</p>
          </details>
        </div>
      </div>

      <div
        style={{
          marginTop: "50px",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        {AI_NAMES[aiType1]} VS {AI_NAMES[aiType2]}
      </div>

      <div style={{ marginTop: "40px" }}>
        <Button
          label="対戦開始"
          tag="normal"
          onClick={() =>
            onStart(aiType1, aiType2)
          }
        />
      </div>
    </div>
  );
}