import { useState, useEffect } from "react";
import Board from "../components/Board";
import GameManager from "../logic/GameManager";
import Pannel from "../components/Pannel";
import { requestAIMove } from "../api/AI_Client";

export default function Game({ 
  mode, aiType, firstPlayer, aiType1, aiType2,
 }) {
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

  const isAIVsAI = mode === "aivsai"

  const [isPassing, setIsPassing] = useState(false); 
  const [passPlayer, setPassPlayer] = useState(null);
  const [board, setBoard] = useState(manager.board);
  const [player, setPlayer] = useState(manager.player);
  const [candidates, setCandidates] = useState(manager.candidates); //マス候補
  const [selectableEnemies, setSelectableEnemies] = useState(
    manager.selectableEnemies
  );
  const [winner, setWinner] = useState(manager.winner);
  const [aiError, setAIError] = useState("");

  const [logs, setLogs] = useState([
    {
      type: "start",
      player: 1,
      text: "Player1は好きなマスを1マス選んでください",
    },
  ]);

  const addLog = (log) => {
    setLogs((prev) => [...prev, log]);
  };

  const [lastMoveCells, setLastMoveCells] = useState([]);

  useEffect(() => {
//////////////////////
    {/*console.log(
      "[USE EFFECT]",
      "player=", player,
      "aiPlayer=", aiPlayer
    );*/}
/////////////////////////
    if (mode !== "ai" && mode !== "aivsai" ) return;
    if (mode === "ai" && player !== aiPlayer) return;
    if (winner || isPassing || aiError) return;
///////////////////////////
    {/*console.log(
      "[SEND]",
      {
        player,
        aiPlayer,
        managerPlayer: manager.player,
        firstTurn: manager.isFirstTurn
      }
    );*/}
////////////////////////////////////////////
    const currentAI = 
      mode === "aivsai" 
        ? (
          player === 1
          ? aiType1
          : aiType2
        )
        : aiType;

    requestAIMove(
      board, manager.player, currentAI, manager.isFirstTurn
    ).then((aiMove) => {

      ////////////////////////////////////////////////////////////////////////
      {/*console.log(
        "[RECEIVE]",
        {
          player,
          aiPlayer,
          managerPlayer: manager.player,
          firstTurn: manager.isFirstTurn
        }
      );*/}
      /////////////////////////////////////////////////////////
      {/*console.log(
        "[SEND]",
        "statePlayer=", player,
        "managerPlayer=", manager.player,
        "first=", manager.isFirstTurn
      );*/}
      ////////////////////////////////////////////////////////

      if (!aiMove || aiMove.error) {
        setAIError("AIサーバーから有効な手を取得できませんでした。");
        return;
      }

      setTimeout(() => {
        const beforeBoard = manager.board.map(row => [...row]);
        const result = manager.handleAIMove(aiMove);
        const afterBoard = manager.board;

        const changed = [];

        for (let r = 0; r < afterBoard.length; r++) {
          for (let c = 0; c < afterBoard[r].length; c++) {

            if (beforeBoard[r][c] !== afterBoard[r][c]) {
              changed.push({ r, c });
            }

          }
        }

        setLastMoveCells(changed);
        setTimeout(() => {
          setLastMoveCells([]);
        }, 1000);

        if(changed.length > 0){

          const cellsText = 
            changed
              .map(cell => `[${cell.r},${cell.c}]`)
              .join("と");

          const movedPlayer = 
            manager.player === 1
              ? 2 : 1;

          addLog({
            type: "move",
            player: movedPlayer,
            text: `Player${movedPlayer}が${cellsText}を塗りました`
          });
        }

        if (result?.error) {
          setAIError(result.error);
          return;
        }

        setBoard([...manager.board]);
        setPlayer(manager.player);
        setCandidates([...manager.candidates]);
        setSelectableEnemies([...manager.selectableEnemies]);

        if (result?.winner) {

          addLog({
            type: "winner",
            player: result.winner === "Player 1 の勝ち！" ? 1 : 2,

            text:
              
                `${result.winner} \n`+
                `-Player1 : ${p1}マス \n`+
                `-Player2 : ${p2}マス`
              
            });
          
          setWinner(result.winner);
          return;
        }

        // If the next player has no legal move, show pass and skip the turn.
        const passInfo = manager.updateSelectableEnemies();
        if (passInfo.pass) {
          setIsPassing(true);
          setPassPlayer(manager.player);

          const passPlayer = 
          manager.player;
          
          addLog({
            type: "pass",
            player: passPlayer,
            text: `Player${passPlayer}に有効手がないためパスしました`
          });

          setTimeout(() => {
            manager.switchPlayer();
            manager.updateSelectableEnemies();
            setPlayer(manager.player);
            setSelectableEnemies([...manager.selectableEnemies]);

            setPassPlayer(null);
            setIsPassing(false);
          }, 3000);///////////////////////////////////////
        }

      }, 3000);/////////////////////////////////////////////////////
      
    });
  }, [
    player,
    board,
    mode,
    aiType,
    aiType1,
    aiType2,
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

    const beforeBoard =
      manager.board.map(row => [...row]);


    const result = manager.handleClick(r, c);


    const afterBoard = manager.board;

    const changed = [];

    for (let r = 0; r < afterBoard.length; r++) {
      for (let c = 0; c < afterBoard[r].length; c++) {

        if (beforeBoard[r][c] !== afterBoard[r][c]) {
          changed.push({ r, c });
        }

      }
    }

    setLastMoveCells(changed);
    setTimeout(() => {
      setLastMoveCells([]);
    },1000);

    if(changed.length > 0){

      const cellsText = 
        changed
          .map(cell => `[${cell.r},${cell.c}]`)
          .join("と");

        const movedPlayer = 
          manager.player === 1
            ? 2 : 1;

        addLog({
          type: "move",
          player: movedPlayer,
          text: `Player${movedPlayer}が${cellsText}を塗りました`
        });

    }

    setBoard([...manager.board]);
    setPlayer(manager.player);
    setCandidates([...manager.candidates]);
    setSelectableEnemies([...manager.selectableEnemies]);


    if (result?.winner) {

      addLog({
            type: "winner",
            player: result.winner === "Player 1 の勝ち！" ? 1 : 2,

            text:            
                `${result.winner} \n`+
                `-Player1 : ${countCells().p1}マス\n`+
                `-Player2 : ${countCells().p2}マス`
          });

      setWinner(result.winner);
      return;
    }

    const passInfo = manager.updateSelectableEnemies();
    if (passInfo.pass) {
      setPassPlayer(manager.player);
      setIsPassing(true);

      const passPlayer = 
          manager.player;
          addLog({
            type: "pass",
            player: passPlayer,
            text: `Player${passPlayer}に有効手がないためパスしました`
          });

      setTimeout(() => {
        manager.switchPlayer();
        manager.updateSelectableEnemies();
        setPlayer(manager.player);
        setSelectableEnemies([...manager.selectableEnemies]);
        setPassPlayer(null);
        setIsPassing(false);
      }, 3000);
    }
  };

  return (

    <div>
      {mode === "ai" && (
        <div
          style={{
            textAlign: "center",
            fontSize: "28px",
            fontWeight: "bold",
            marginBottom: "20px",
            color:
              (resolvedFirstPlayer === "player")
               ? "#FFD700"
               : "#1E90FF",
            textShadow: `
              -1px -1px 0 #000,
               1px -1px 0 #000,
              -1px  1px 0 #000,
               1px  1px 0 #000
            `,
          }}
        >
          あなたは
          {resolvedFirstPlayer === "player"
            ? "Player 1"
            : "Player 2"}
            です
        </div>
      )}

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
        lastMoveCells={lastMoveCells}
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
          passPlayer={passPlayer}
          winner={winner}
          setWinner={setWinner}
          mode={mode}
          aiType={aiType}
          aiType1={aiType1}
          aiType2={aiType2}
          logs={logs}
        />

        

        {aiError && (
          <p style={{ color: "red", width: "220px" }}>{aiError}</p>
        )}
      </div>
    </div>
  </div>
  );
}
