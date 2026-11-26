import { useState } from "react";
import Title from "./echoextends/screen/Title"; //タイトル画面
import Game from "./echoextends/screen/Game"; //ゲーム画面
import AISelect from "./echoextends/screen/AISelect"; //AI選択画面
import FirstPlayerSelect from "./echoextends/screen/FirstPlayerSelect"; //先攻後攻決定画面
import AIvsAISelect from "./echoextends/screen/AIvsAISelect";

export default function App() {
  const [screen, setScreen] = useState("title"); //screen=スクリーン状態、setScreen=画面切り替えのための関数
  const [mode, setMode] = useState(null); //mode=ゲームモードの保持
  const [aiType, setAIType] = useState(null); //aiType=AIの種類を保持
  const [firstPlayer, setFirstPlayer] = useState(null); //最初のプレイヤーかどうか
  const [aiType1, setAIType1] = useState("random");//aivsaiplayer1
  const [aiType2, setAIType2] = useState("random");//aivsaiplayer2

  // ① タイトル画面
  if (screen === "title") {
  return (
    <Title
      onSelectMode={(selectedMode) => {
        setMode(selectedMode);

        if (selectedMode === "ai") {
          setScreen("aiSelect");
        }
        else if (selectedMode === "aivsai") {
          setScreen("aivsaiSelect");
        }
        else {
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
          setScreen("firstPlayerSelect");
        }}
      />
    );
  }

  // ③ 先攻後攻選択画面 
  if (screen === "firstPlayerSelect") {
    return (
      <FirstPlayerSelect
        onSelect={(fp) => {
          setFirstPlayer(fp);
          setScreen("game");
        }}
      />
    );
  }

  // ④ ゲーム画面
  if (screen === "game") {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
        <Game
          mode={mode}
          aiType={aiType}
          aiType1={aiType1}
          aiType2={aiType2}
          firstPlayer={firstPlayer}
        />
      </div>
    );
  }

  if (screen === "aivsaiSelect") {
  return (
    <AIvsAISelect
      onStart={(p1AI, p2AI) => {
        setAIType1(p1AI);
        setAIType2(p2AI);

        setScreen("game");
      }}
    />
  );
}

  return null;
}
