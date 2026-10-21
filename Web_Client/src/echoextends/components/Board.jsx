import Cell from "./Cell";

export default function Board({ board, candidates, selectableEnemies, onCellClick }) {
  const size = board.length;

  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${size}, 70px)`, gap: "6px" }}>
      {board.map((row, r) =>
        row.map((cell, c) => (
          <Cell
            key={`${r}-${c}`}
            value={cell}
            isCandidate={candidates.some(ca => ca.r === r && ca.c === c)}
            isSelectableEnemy={selectableEnemies.some(se => se.r === r && se.c === c)}
            onClick={() => 
                 onCellClick(r, c)
            }
          />
        ))
      )}
    </div>
  );
}
