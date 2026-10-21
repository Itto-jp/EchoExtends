import random
from ai.logic import get_selectable_enemies, get_candidates

DIRECTION_MAP = {
    "up": (-1, 0),
    "down": (1, 0),
    "left": (0, -1),
    "right": (0, 1),
}


def _pass_move():
    return {
        "r": -1,
        "c": -1,
        "fromR": -1,
        "fromC": -1,
        "dir": [0, 0],
        "dist": 0,
    }


def greedy_ai(board, turn, isFirstTurn):
    size = len(board)

    # No immediate score exists on the first placement, so choose randomly.
    if isFirstTurn:
        empties = [
            (r, c)
            for r in range(size)
            for c in range(size)
            if board[r][c] is None
        ]
        if not empties:
            return _pass_move()
        r, c = random.choice(empties)
        return {
            "r": r,
            "c": c,
            "fromR": r,
            "fromC": c,
            "dir": [0, 0],
            "dist": 0,
        }

    all_moves = []
    for r, c in get_selectable_enemies(board, turn):
        all_moves.extend(get_candidates(board, r, c))

    if not all_moves:
        return _pass_move()

    # Greedy criterion: maximize the number of cells acquired this turn.
    max_distance = max(move["distance"] for move in all_moves)
    best_moves = [move for move in all_moves if move["distance"] == max_distance]
    move = random.choice(best_moves)

    dr, dc = DIRECTION_MAP[move["direction"]]
    return {
        "r": move["r"],
        "c": move["c"],
        "fromR": move["fromR"],
        "fromC": move["fromC"],
        "dir": [dr, dc],
        "dist": move["distance"],
    }
