import { useState, useEffect } from "react";
import Cell from "./Cell";

export default function Board() {
  const size = 6;

  const [isFirstTurn, setIsFirstTurn] = useState(true);
  const [board, setBoard] = useState(
    Array(size).fill(null).map(() => Array(size).fill(null))
  );
  const [player, setPlayer] = useState(1);
  const [candidates, setCandidates] = useState([]);
  const [selectableEnemies, setSelectableEnemies] = useState([]);
  const [winnerMessage, setWinnerMessage] = useState("");

  // --- 石の数を数える ---
  const countStones = () => {
    const flat = board.flat();
    return {
      p1: flat.filter(v => v === 1).length,
      p2: flat.filter(v => v === 2).length,
    };
  };

  // --- 選べる相手マスを更新 ---
  const updateSelectableEnemies = () => {
    const enemy = player === 1 ? 2 : 1;
    const list = [];

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (board[r][c] !== enemy) continue;

        const dirs = [
          [0, 1],
          [0, -1],
          [1, 0],
          [-1, 0],
        ];

        for (const [dr, dc] of dirs) {
          const nr = r + dr;
          const nc = c + dc;

          if (nr < 0 || nr >= size || nc < 0 || nc >= size) continue;

          if (board[nr][nc] === null) {
            list.push({ r, c });
            break;
          }
        }
      }
    }

    setSelectableEnemies(list);
  };

  // --- board が変わった時だけ更新（player の非同期ズレを防ぐ） ---
  useEffect(() => {
    updateSelectableEnemies();
  }, [board]);

  // --- 勝利判定（盤面が埋まったら終了） ---
  useEffect(() => {
    const flat = board.flat();

    if (flat.every(v => v !== null)) {
      const { p1, p2 } = countStones();

      if (p1 > p2) setWinnerMessage("Player 1 の勝ち！");
      else if (p2 > p1) setWinnerMessage("Player 2 の勝ち！");
      else setWinnerMessage("引き分け！");
    }
  }, [board]);

  // --- クリック処理 ---
  const handleClick = (r, c) => {
    // --- ゲーム終了後は操作不可 ---
    if (winnerMessage) return;

    // --- 最初のターン ---
    if (isFirstTurn) {
      if (board[r][c] === null) {
        const newBoard = board.map(row => [...row]);
        newBoard[r][c] = player;
        setBoard(newBoard);

        setIsFirstTurn(false);
        setPlayer(player === 1 ? 2 : 1);
      }
      return;
    }

    // --- 候補マスをクリックした場合（伸ばす） ---
    const candidate = candidates.find(ca => ca.r === r && ca.c === c);
    if (candidate) {
      const newBoard = board.map(row => [...row]);

      const { fromR, fromC, dir, dist } = candidate;
      const [dr, dc] = dir;

      for (let i = 1; i <= dist; i++) {
        const nr = fromR + dr * i;
        const nc = fromC + dc * i;
        newBoard[nr][nc] = player;
      }

      setBoard(newBoard);
      setCandidates([]);
      setPlayer(player === 1 ? 2 : 1);
      return;
    }

    // --- 選べる相手マスでなければ候補表示しない ---
    if (!selectableEnemies.some(se => se.r === r && se.c === c)) return;

    // --- 候補計算 ---
    const dirs = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ];

    const newCandidates = [];

    for (const [dr, dc] of dirs) {
      for (let dist = 1; dist <= 2; dist++) {
        const nr = r + dr * dist;
        const nc = c + dc * dist;

        if (nr < 0 || nr >= size || nc < 0 || nc >= size) break;

        // 途中に石があったら終了
        if (board[nr][nc] !== null) break;

        newCandidates.push({
          r: nr,
          c: nc,
          fromR: r,
          fromC: c,
          dist,
          dir: [dr, dc],
        });
      }
    }

    setCandidates(newCandidates);
  };

  const { p1, p2 } = countStones();

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", marginTop: "40px" }}>
      <h2 style={{ margin: 0 }}>Player {player} の番</h2>

      <div style={{ fontSize: "20px" }}>
        P1: {p1}　P2: {p2}
      </div>

      {winnerMessage && (
        <div style={{ fontSize: "28px", fontWeight: "bold", color: "red", marginTop: "10px" }}>
          {winnerMessage}
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: `repeat(${size}, 70px)`, gap: "6px" }}>
        {board.map((row, r) =>
          row.map((cell, c) => (
            <Cell
              key={`${r}-${c}`}
              value={cell}
              onClick={() => handleClick(r, c)}
              isSelectableEnemy={selectableEnemies.some(se => se.r === r && se.c === c)}
              isCandidate={candidates.some(ca => ca.r === r && ca.c === c)}
            />
          ))
        )}
      </div>
    </div>
  );
}
