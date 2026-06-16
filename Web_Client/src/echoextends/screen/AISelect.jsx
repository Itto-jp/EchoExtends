import Button from "../components/Button";

export default function AISelect({ onSelectAIType }) {
  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h2>AI の種類を選択</h2>
      <h3>対戦する AI を選んでください</h3>

      <div style={{ marginTop: "40px", display: "flex", flexDirection: "column", gap: "20px" }}>
        
        <Button 
          label="Random AI" 
          tag="ai_random" 
          onClick={() => onSelectAIType("random")} 
        />

        <Button 
          label="Greedy AI" 
          tag="ai_greedy" 
          onClick={() => onSelectAIType("greedy")} 
        />

        <Button 
          label="Minimax AI" 
          tag="ai_minimax" 
          onClick={() => onSelectAIType("minimax")} 
        />

      </div>
    </div>
  );
}
