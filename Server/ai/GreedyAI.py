import random
from ai.logic import get_selectable_enemies, get_candidates

DIRECTION_MAP = {
    "up": (-1, 0),
    "down": (1, 0),
    "left": (0, -1),
    "right": (0, 1)
}

def greedy_ai(board, turn):
    enemies = get_selectable_enemies(board, turn)

    # 最初のターン
    if len(enemies) == 0:
        size = len(board)
        empties = [(r, c) for r in range(size) for c in range(size) if board[r][c] is None]
        r, c = random.choice(empties)
        return {
            "r": r,
            "c": c,
            "dir": [0, 1],  # 仮の方向
            "dist": 1
        }

    # 全合法手
    all_moves = []
    for (r, c) in enemies:
        candidates = get_candidates(board, r, c)
        all_moves.extend(candidates)

    if not all_moves:
        return {
            "r": -1,
            "c": -1,
            "dir": [0, 0],
            "dist": 0
        }

    move = random.choice(all_moves)

    dr, dc = DIRECTION_MAP[move["direction"]]

    return {
        "r": move["r"],
        "c": move["c"],
        "dir": [dr, dc],          
        "dist": move["distance"]  
    }
