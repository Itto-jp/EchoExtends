export default function Cell({ 
  value, onClick, isCandidate, isSelectableEnemy, isLastMove 
}) {
  //プレイヤーマス
  const colors = {
    1: "#FFD700",
    2: "#1E90FF",
  };

  //空マスと配置可能マス
  const bg =
  value ? colors[value] :
  isCandidate ? "#66DD66" :   // 濃いめの緑
  "#fafafa";

//配置可能マスと選択可能マス、空マス
  const border =
  isLastMove
    ? "3px solid #00ff00" //緑枠

  : isCandidate
    ? "3px solid #000000" // 黒枠
  : isSelectableEnemy
    ? "3px solid #CC0000"      // 濃い赤
    : "1px solid #ccc";


  return (
    <div
      onClick={onClick}
      style={{
        width: 70,
        height: 70,
        backgroundColor: bg,
        border,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        userSelect: "none",
        transition: "all 0.15s",
      }}
    />
  );
}
