import { useState } from "react";
import Title from "./echoextends/screen/Title";
import Game from "./echoextends/screen/Game";

export default function App() {
  const [screen, setScreen] = useState("title");
  const [mode, setMode] = useState(null);

  if (screen === "title") {
    return (
      <Title
        onSelectMode={(selectedMode) => {
          setMode(selectedMode);
          setScreen("game");
        }}
      />
    );
  }

  if (screen === "game") {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "40px",
      }}
    >
      <Game mode={mode} />
    </div>
  );
}


  return null;
}
