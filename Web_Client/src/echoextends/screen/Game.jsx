import { useState, useRef, useEffect } from "react";
import Board from "../components/Board";
import GameManager from "../logic/GameManager";

export default function Game({ mode }) {
  const [manager] = useState(() => new GameManager(7));

  const [isPassing, setIsPassing] = useState(false);

 


  const [board, setBoard] = useState(manager.board);
  const [player, setPlayer] = useState(manager.player);
  const [candidates, setCandidates] = useState(manager.candidates);
  const [selectableEnemies, setSelectableEnemies] = useState(manager.selectableEnemies);
  const [winner, setWinner] = useState(manager.winner);

  const countCells = () => {
  let p1 = 0;
  let p2 = 0;

  for (const row of board) {
    for (const cell of row) {
      if (cell === 1) p1++;
      if (cell === 2) p2++;
    }
  }

  return { p1, p2 };
};

 const { p1, p2 } = countCells();

 

 const handleCellClick = (r, c) => {

  if (isPassing || winner) return;

  // 1. 盤面更新
  const result = manager.handleClick(r, c);

  // 2. ★ UI同期（最初のターンでも必ず実行）
  setBoard([...manager.board]);
  setPlayer(manager.player);
  setCandidates([...manager.candidates]);
  setSelectableEnemies([...manager.selectableEnemies]);

  // 3. 勝利判定
  if (result?.winner) {
    setWinner(result.winner);
    return;
  }

  // 4. パス判定（盤面更新後）
  const passInfo = manager.updateSelectableEnemies();

  if (passInfo.pass) {
    setIsPassing(true);

    setTimeout(() => {
      manager.switchPlayer();
      manager.updateSelectableEnemies();

      setPlayer(manager.player);
      setSelectableEnemies([...manager.selectableEnemies]);
      setIsPassing(false);
    }, 1000);

    return;
  }
};








  return (
  <div style={{ textAlign: "center", marginTop: "40px" }}>
  {!winner && (
  <div
    style={{
      fontSize: "20px",
      fontWeight: "bold",
      marginBottom: "10px",
      color: player === 1 ? "#FFD700" : "#1E90FF",
    }}
  >
    Player {player} のターン
  </div>
)}


  <div style={{ fontSize: "18px", marginBottom: "10px" }}>
  <span style={{ color: "#FFD700", fontWeight: "bold" }}>P1：{p1}</span>
  <span> | </span>
  <span style={{ color: "#1E90FF", fontWeight: "bold" }}>P2：{p2}</span>
</div>


  {isPassing && (
    <div style={{
      fontSize: "26px",
      fontWeight: "bold",
      color: "orange",
      marginBottom: "10px"
    }}>
      パス！
    </div>
  )}

  {winner && (
    <div style={{ fontSize: "28px", fontWeight: "bold", color: "red", marginBottom: "10px" }}>
      {winner}
    </div>
  )}

  <Board
    board={board}
    candidates={candidates}
    selectableEnemies={selectableEnemies}
    onCellClick={(r, c) => {
      if (!isPassing) handleCellClick(r, c);
    }}
  />
</div>

);


}
