import Button from "../components/Button";

export default function Pannel({
  player,
  p1,
  p2,
  isPassing,
  winner,
  mode,
  aiType,
}) {
  return (
    <div
      style={{
        width: "220px",
        padding: "20px",
        border: "2px solid #ccc",
        borderRadius: "10px",
        backgroundColor: "#fff",
        textAlign: "center",
      }}
    >
      

      {/* ターン表示 */}
      {!winner && (
        <div
          style={{
            fontSize: "30px",
            fontWeight: "bold",
            marginBottom: "10px",
            color: player === 1 ? "#FFD700" : "#1E90FF",
            textShadow: `
            -1px -1px 0 #000,
            1px -1px 0 #000,
            -1px  1px 0 #000,
            1px  1px 0 #000
            `
          }}
        >
          Player {player} のターン
        </div>
      )}

      {/* マス数 */}
      <div style={{ 
        fontSize: "18px", marginBottom: "10px" ,
        textShadow: `
            -1px -1px 0 #000,
            1px -1px 0 #000,
            -1px  1px 0 #000,
            1px  1px 0 #000
            `
        }}>
        <span style={{ 
            color: "#FFD700", fontWeight: "bold"}}>P1：{p1}</span>
        <span> | </span>
        <span style={{ color: "#1E90FF", fontWeight: "bold" }}>P2：{p2}</span>
      </div>

      {/* パス */}
      {isPassing && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0,0,0,0.6)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 2000,
      color: "white",
      fontSize: "96px",
      fontWeight: "bold",
      textShadow: `
        -3px -3px 0 #000,
         3px -3px 0 #000,
        -3px  3px 0 #000,
         3px  3px 0 #000
      `
    }}
  >
    パス！
  </div>
)}


      {/* 勝者 */}
      {winner && (
        <div
          style={{
            fontSize: "28px",
            fontWeight: "bold",
            color: "red",
            marginBottom: "10px",
            textShadow: `
            -1px -1px 0 #000,
            1px -1px 0 #000,
            -1px  1px 0 #000,
            1px  1px 0 #000
            `
          }}
        >
          {winner}
        </div>
      )}

      {/* モード表示 */}
      <div style={{
         marginTop: "20px", fontSize: "20px" ,
         color: "pink",
         textShadow: `
            -1px -1px 0 #000,
            1px -1px 0 #000,
            -1px  1px 0 #000,
            1px  1px 0 #000
            `
         }}>
        <p>モード：{mode}</p>
        {mode === "ai" && <p>AI：{aiType}</p>}
      </div>

      {/* 退出 or 降参 */}
      <div style={{ marginTop: "20px" }}>
        {mode === "local" || winner ? (
          <Button
            label="退出"
            tag="exit"
            onClick={() => (window.location.href = "/")}
          />
        ) : (
          <Button
            label="降参"
            tag="surrender"
            onClick={() => (window.location.href = "/")}
          />
        )}
      </div>
    </div>
  );
}
