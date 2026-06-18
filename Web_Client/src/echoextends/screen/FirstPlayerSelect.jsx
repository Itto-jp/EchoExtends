export default function FirstPlayerSelect({ onSelect }) {
  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h2>先攻 / 後攻 を選んでください</h2>

      <button onClick={() => onSelect("player")}>あなたが先攻</button>
      <br /><br />

      <button onClick={() => onSelect("ai")}>AI が先攻</button>
      <br /><br />

      <button onClick={() => onSelect("random")}>ランダム</button>
    </div>
  );
}
