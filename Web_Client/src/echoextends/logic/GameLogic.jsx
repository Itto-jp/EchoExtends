// --- 盤面生成 ---
export function createBoard(size) {
  return Array(size).fill(null).map(() => Array(size).fill(null));
}

// --- 石の数を数える ---
export function countStones(board) {
  const flat = board.flat();
  return {
    p1: flat.filter(v => v === 1).length,
    p2: flat.filter(v => v === 2).length,
  };
}

// --- 選べる相手マスを取得 ---
export function getSelectableEnemies(board, player) {
  const size = board.length;
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

  return list;
}

// --- 候補マスを取得 ---
export function getCandidates(board, r, c) {
  const size = board.length;
  const dirs = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  const list = [];

  for (const [dr, dc] of dirs) {
    for (let dist = 1; dist <= 2; dist++) {
      const nr = r + dr * dist;
      const nc = c + dc * dist;

      if (nr < 0 || nr >= size || nc < 0 || nc >= size) break;
      if (board[nr][nc] !== null) break;

      list.push({
        r: nr,
        c: nc,
        fromR: r,
        fromC: c,
        dist,
        dir: [dr, dc],
      });
    }
  }

  return list;
}

// --- 伸ばす処理 ---
export function applyMove(board, move, player) {
  // ★ 盤面をコピー（破壊しない）
  const newBoard = board.map(row => [...row]);

  const { fromR, fromC, dir, dist } = move;
  const [dr, dc] = dir;

  for (let i = 1; i <= dist; i++) {
    const nr = fromR + dr * i;
    const nc = fromC + dc * i;
    newBoard[nr][nc] = player;
  }

  return newBoard;
}


// --- 勝利判定 ---
export function checkWinner(board) {
  const flat = board.flat();
  if (!flat.every(v => v !== null)) return null;

  const { p1, p2 } = countStones(board);

  if (p1 > p2) return "Player 1 の勝ち！";
  if (p2 > p1) return "Player 2 の勝ち！";
  return "引き分け！";
}
