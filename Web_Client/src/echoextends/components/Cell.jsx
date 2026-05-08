export default function Cell({ value, onClick, isCandidate }) {
  const colors = {
    1: "#FFD700",
    2: "#1E90FF",
  };

  const bg =
    value ? colors[value] :
    "#fafafa";

  const border =
    isCandidate ? "3px solid #32CD32" : "1px solid #ccc";

  return (
    <div
      onClick={onClick}
      style={{
        width: 70,
        height: 70,
        backgroundColor: bg,
        border: border,
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
