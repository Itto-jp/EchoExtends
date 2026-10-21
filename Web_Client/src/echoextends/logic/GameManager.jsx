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
    if (this.isFirstTurn || this.winner) {
      this.selectableEnemies = [];
      return { pass: false };
    }

    this.selectableEnemies = getSelectableEnemies(this.board, this.player);

    const hasEmpty = this.board.flat().some((v) => v === null);
    if (this.selectableEnemies.length === 0 && hasEmpty) {
      return { pass: true };
    }

    return { pass: false };
  }

  handleClick(r, c) {
    if (this.winner) return { winner: this.winner };

    // First move: place one stone on any empty cell.
    if (this.isFirstTurn) {
      if (this.board[r][c] !== null) return null;

      const newBoard = this.board.map((row) => [...row]);
      newBoard[r][c] = this.player;
      this.board = newBoard;
      this.isFirstTurn = false;
      this.switchPlayer();
      this.updateSelectableEnemies();
      return this.checkGameEnd();
    }

    // Extend from a previously selected opponent cell.
    const candidate = this.candidates.find((ca) => ca.r === r && ca.c === c);
    if (candidate) {
      this.board = applyMove(this.board, candidate, this.player);
      this.candidates = [];
      this.switchPlayer();
      this.updateSelectableEnemies();
      return this.checkGameEnd();
    }

    if (!this.selectableEnemies.some((se) => se.r === r && se.c === c)) {
      return null;
    }

    this.candidates = getCandidates(this.board, r, c);
    return null;
  }

  handleAIMove(move) {
    if (!move || this.winner) {
      return { error: "invalid AI move" };
    }

    const { r, c, dir, dist, fromR, fromC } = move;

    // AI makes the first placement.
    if (this.isFirstTurn) {
      if (
        !Number.isInteger(r) ||
        !Number.isInteger(c) ||
        r < 0 ||
        r >= this.size ||
        c < 0 ||
        c >= this.size ||
        this.board[r][c] !== null
      ) {
        return { error: "invalid AI first move" };
      }

      const newBoard = this.board.map((row) => [...row]);
      newBoard[r][c] = this.player;
      this.board = newBoard;
      this.isFirstTurn = false;
      this.candidates = [];
      this.switchPlayer();
      this.updateSelectableEnemies();
      return this.checkGameEnd();
    }

    // dist === 0 is the server's pass representation.
    if (dist === 0 || r === -1) {
      this.candidates = [];
      this.switchPlayer();
      this.updateSelectableEnemies();
      return this.checkGameEnd();
    }

    this.board = applyMove(
      this.board,
      { r, c, dir, dist, fromR, fromC },
      this.player
    );

    this.candidates = [];
    this.switchPlayer();
    this.updateSelectableEnemies();
    return this.checkGameEnd();
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
