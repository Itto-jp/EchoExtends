export default function Button({ label, onClick, color = "#333", bg = "#eee" }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "12px 24px",
        fontSize: "18px",
        borderRadius: "8px",
        border: "2px solid #333",
        backgroundColor: bg,
        color: color,
        cursor: "pointer",
        transition: "0.2s",
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = "#ddd";
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = bg;
      }}
    >
      {label}
    </button>
  );
}
