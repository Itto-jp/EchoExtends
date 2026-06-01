import Button from "../components/Button";

export default function Title({ onSelectMode }) {
  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h1>EchoExtends</h1>
      <h2>〜 オリジナル抽象戦略ゲーム 〜</h2>

      <div style={{ marginTop: "40px", display: "flex", flexDirection: "column", gap: "20px" }}>
        <Button label="ローカル対戦" onClick={() => onSelectMode("local")} />
        <Button label="AI 対戦" onClick={() => onSelectMode("ai")} />
        <Button label="通信対戦" onClick={() => onSelectMode("online")} />
      </div>
    </div>
  );
}
