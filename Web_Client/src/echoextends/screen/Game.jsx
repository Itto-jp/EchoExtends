import { useState, useEffect } from "react";
import Board from "../components/Board";
import GameManager from "../logic/GameManager";
import Pannel from "../components/Pannel";
import { requestAIMove } from "../api/AI_Client";

export default function Game({ mode, aiType, firstPlayer }) {
  const [manager] = useState(() => new GameManager(7));
  const [resolvedFirstPlayer] = useState(() => {
    if (firstPlayer === "random") {
      return Math.random() < 0.5 ? "player" : "ai";
    }
    return firstPlayer;
  });

  // Player 1 is always the side that moves first.
  const aiPlayer =
    mode === "ai" ? (resolvedFirstPlayer === "ai" ? 1 : 2) : null;

  const [isPassing, setIsPassing] = useState(false);
  const [board, setBoard] = useState(manager.board);
  const [player, setPlayer] = useState(manager.player);
  const [candidates, setCandidates] = useState(manager.candidates);
  const [selectableEnemies, setSelectableEnemies] = useState(
    manager.selectableEnemies
  );
  const [winner, setWinner] = useState(manager.winner);
  const [aiError, setAIError] = useState("");

  useEffect(() => {
    if (mode !== "ai") return;
    if (player !== aiPlayer) return;
    if (winner || isPassing || aiError) return;

    requestAIMove(board, player, aiType, manager.isFirstTurn).then((aiMove) => {
      if (!aiMove || aiMove.error) {
        setAIError("AIサーバーから有効な手を取得できませんでした。");
        return;
      }

      const result = manager.handleAIMove(aiMove);
      if (result?.error) {
        setAIError(result.error);
        return;
      }

      setBoard([...manager.board]);
      setPlayer(manager.player);
      setCandidates([...manager.candidates]);
      setSelectableEnemies([...manager.selectableEnemies]);

      if (result?.winner) {
        setWinner(result.winner);
        return;
      }

      // If the next player has no legal move, show pass and skip the turn.
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
      }
    });
  }, [
    player,
    board,
    mode,
    aiType,
    aiPlayer,
    isPassing,
    winner,
    aiError,
    manager,
  ]);

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
    if (isPassing || winner || aiError) return;

    // Disable human input during the AI's turn, regardless of who moved first.
    if (mode === "ai" && player === aiPlayer) return;

    const result = manager.handleClick(r, c);

    setBoard([...manager.board]);
    setPlayer(manager.player);
    setCandidates([...manager.candidates]);
    setSelectableEnemies([...manager.selectableEnemies]);

    if (result?.winner) {
      setWinner(result.winner);
      return;
    }

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
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        marginTop: "40px",
        gap: "40px",
      }}
    >
      <Board
        board={board}
        candidates={candidates}
        selectableEnemies={selectableEnemies}
        onCellClick={(r, c) => {
          if (!isPassing) handleCellClick(r, c);
        }}
      />

      <div>
        <Pannel
          player={player}
          p1={p1}
          p2={p2}
          isPassing={isPassing}
          winner={winner}
          mode={mode}
          aiType={aiType}
        />
        {aiError && (
          <p style={{ color: "red", width: "220px" }}>{aiError}</p>
        )}
      </div>
    </div>
  );
}
