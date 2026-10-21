import Button from "../components/Button"; //ボタンのデザインをインポート

export default function Title({ onSelectMode }) { //選択したモードを返す。
  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>  {/*中央に配置*/}
      <h1>EchoExtends</h1> {/*タイトル*/}
      <h2>〜 オリジナル抽象戦略ゲーム 〜</h2> {/*サブタイトル*/}

      <div style={{ marginTop: "40px", display: "flex", flexDirection: "column", gap: "20px" }}> {/*ボタンの配置*/}

        {/*選択したモードの値を渡す*/}
        <Button label="ローカル対戦" tag="local_mode" onClick={() => onSelectMode("local")} /> 
        <Button label="AI 対戦" tag="ai_mode" onClick={() => onSelectMode("ai")} />
        <Button label="通信対戦" tag="online_mode" onClick={() => onSelectMode("online")} />
          
      </div>

    </div>
  );
}
