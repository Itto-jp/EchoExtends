import Button from "../components/Button";

export default function FirstPlayerSelect({ onSelect }) {
  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h2>先攻 / 後攻 を選んでください</h2>

      <Button 
        label="あなたが先攻"
        tag = "first_player"
        bgColor="#FFD70080"
        onClick={()=> onSelect("player")}
      />

      <br /><br />

      <Button
        label="AI が先攻"
        tag="first_player"
        bgColor="#1E90FF80"
        onClick={() => onSelect("ai")}
      />
      <br /><br />

      <Button 
      label="ランダム"
      tag="first_player"
      bgColor="#E8B8F080"
      onClick={() => onSelect("random")}
      />
    </div>
  );
}
