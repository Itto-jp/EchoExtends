import { useState } from "react";
import Title from "./echoextends/screen/Title";
import Game from "./echoextends/screen/Game";
import AISelect from "./echoextends/screen/AISelect"; // ← 追加

export default function App() {
  const [screen, setScreen] = useState("title");
  const [mode, setMode] = useState(null);
  const [aiType, setAIType] = useState(null); // ← 追加

  // ① タイトル画面
  if (screen === "title") {
    return (
      <Title
        onSelectMode={(selectedMode) => {
          setMode(selectedMode);

          // AIモードなら AISelect に進む
          if (selectedMode === "ai") {
            setScreen("aiSelect");
          } else {
            setScreen("game");
          }
        }}
      />
    );
  }

  // ② AI種類選択画面
  if (screen === "aiSelect") {
    return (
      <AISelect
        onSelectAIType={(type) => {
          setAIType(type);
          setScreen("game");
        }}
      />
    );
  }

  // ③ ゲーム画面
  if (screen === "game") {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "40px",
        }}
      >
        <Game mode={mode} aiType={aiType} />
      </div>
    );
  }

  return null;
}
