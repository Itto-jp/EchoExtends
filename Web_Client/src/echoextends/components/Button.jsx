export default function Button({
  label,
  onClick,
  tag = "normal", // ← タグ追加
  bgColor,
}) {
  // タグごとのデザインプリセット
  const styles = {
    normal: {
      bg: "#eee",
      hoverBg: "#ddd",
      color: "#333",
      padding: "12px 24px",
      fontSize: "18px",
      border: "2px solid #333",
    },

    local_mode: {
      bg: "#00ff0060",
      hoverBg: "#f5f5f5",
      color: "#333",
      padding: "16px 32px",
      fontSize: "22px",
      border: "3px solid #333",
    },

    

    online_mode: {
      bg: "#0000ff60",
      hoverBg: "#f5f5f5",
      color: "#333",
      padding: "16px 32px",
      fontSize: "22px",
      border: "3px solid #333",
    },

    ai_mode: {
      bg: "#ff000060",
      hoverBg: "#f5f5f5",
      color: "#333",
      padding: "16px 32px",
      fontSize: "22px",
      border: "3px solid #333",
    },

    first_player: {
      bg: "#dddddd",
      hoverBg: "#f5f5f5",
      color: "#333",
      padding: "16px 32px",
      fontSize: "24px",
      border: "3px solid #333",
      width: "280px",
      
    },


    aivsai_mode: {
      bg: "#ffff0060",
      hoverBg: "#fff7aa",
      color: "#333",
      padding: "16px 32px",
      fontSize: "22px",
      border: "3px solid #333",
    },

    exit: {
      bg: "#cc0000",
      hoverBg: "#f0f0f0",
      color: "#333",
      padding: "12px 24px",
      fontSize: "18px",
      border: "2px solid #000",
    },
    surrender: {
      bg: "#cc0000",
      hoverBg: "#ffcccc",
      color: "#333",
      padding: "12px 24px",
      fontSize: "18px",
      border: "2px solid #000",
    },
  };

  const s = styles[tag] || styles.normal;

  return (
    <button
      onClick={onClick}
      style={{
        width: s.width,
        padding: s.padding,
        fontSize: s.fontSize,
        borderRadius: "8px",
        border: s.border,
        backgroundColor: bgColor || s.bg,
        color: s.color,
        cursor: "pointer",
        transition: "0.2s",
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = s.hoverBg;
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = 
        bgColor || s.bg;
      }}
    >
      {label}
    </button>
  );
}
