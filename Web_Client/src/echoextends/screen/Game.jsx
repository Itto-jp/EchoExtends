import { useState, useEffect } from "react";
import Board from "../components/Board";
import GameManager from "../logic/GameManager";
import Pannel from "../components/Pannel";
import { requestAIMove } from "../api/AI_Client";

export default function Game({ mode, aiType }) {

  const [manager] = useState(() => new GameManager(7)); // ボードサイズ

  const [isPassing, setIsPassing] = useState(false);

  const [board, setBoard] = useState(manager.board);
  const [player, setPlayer] = useState(manager.player);
  const [candidates, setCandidates] = useState(manager.candidates);
  const [selectableEnemies, setSelectableEnemies] = useState(manager.selectableEnemies);
  const [winner, setWinner] = useState(manager.winner);

  // --- AI のターン監視（AI モードのみ動作） ---
  useEffect(() => {
    if (mode !== "ai") return;        // AI モード以外は動かない
    if (player !== 2) return;         // AI が後手の場合
    if (winner) return;               // 勝敗決定後は動かない
    if (isPassing) return;            // パス中は動かない

    // AI の手をサーバに問い合わせる
    requestAIMove(board, player, aiType)
      .then(aiMove => {
        const result = manager.handleAIMove(aiMove);

        setBoard([...manager.board]);
        setPlayer(manager.player);
        setCandidates([...manager.candidates]);
        setSelectableEnemies([...manager.selectableEnemies]);

        if (result?.winner) {
          setWinner(result.winner);
          return;
        }

        // パス処理（AI も同じ）
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

  }, [player, board, mode, aiType, isPassing, winner, manager]);

  ///////// プレイヤーのマス数カウント /////////
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
  /////////////////////////////////////////////////

  /// --- プレイヤーのクリック処理 --- ///
  const handleCellClick = (r, c) => {

    if (isPassing || winner) return;

    // AI モードで AI のターンならクリック禁止
    if (mode === "ai" && player === 2) return;

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

      return;
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

      <Pannel
        player={player}
        p1={p1}
        p2={p2}
        isPassing={isPassing}
        winner={winner}
        mode={mode}
        aiType={aiType}
      />
    </div>
  );
}
