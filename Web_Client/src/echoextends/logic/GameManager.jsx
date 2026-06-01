import {
  createBoard,
  getSelectableEnemies,
  getCandidates,
  applyMove,
  checkWinner,
} from "./GameLogic";

export default class GameManager {
  constructor(size = 7) {
    this.size = size;

    this.board = createBoard(size);
    this.player = 1;
    this.isFirstTurn = true;

    this.candidates = [];
    this.selectableEnemies = [];
    this.winner = "";
  }

  switchPlayer() {
    this.player = this.player === 1 ? 2 : 1;
  }

  updateSelectableEnemies() {

    

    this.selectableEnemies = getSelectableEnemies(this.board, this.player);

    if (this.isFirstTurn || this.winner) return { pass: false };

    const flat = this.board.flat();
    const hasEmpty = flat.some(v => v === null);

    if (this.selectableEnemies.length === 0 && hasEmpty) {
      return { pass: true };
    }

    return { pass: false };
  }

  handleClick(r, c) {
    if (this.winner) return { winner: this.winner };

    // --- 最初のターン ---
    if (this.isFirstTurn) {
      if (this.board[r][c] === null) {
        this.board[r][c] = this.player;
        this.isFirstTurn = false;
        this.switchPlayer();
        this.updateSelectableEnemies();
      }
      return;
    }

    // --- 候補マスをクリック（伸ばす） ---
    const candidate = this.candidates.find(ca => ca.r === r && ca.c === c);
    if (candidate) {
      this.board = applyMove(this.board, candidate, this.player);
      this.candidates = [];
      this.switchPlayer();
      this.updateSelectableEnemies();
      return this.checkGameEnd();
    }

    // --- 選べる相手マスでなければ無視 ---
    if (!this.selectableEnemies.some(se => se.r === r && se.c === c)) return;

    // --- 候補計算（盤面は変わらない） ---
    this.candidates = getCandidates(this.board, r, c);
  }

  checkGameEnd() {
    const result = checkWinner(this.board);
    if (result) {
      this.winner = result;
      return { winner: result };
    }
    return null;
  }
}
