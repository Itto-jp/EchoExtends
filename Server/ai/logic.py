# server/ai/logic.py


def get_selectable_enemies(board, player):
    """Return opponent cells from which the current player can extend.

    A selectable opponent cell must have at least one orthogonally adjacent
    empty cell.  This matches the rule implemented by the React client.
    """
    size = len(board)
    enemy = 2 if player == 1 else 1
    enemies = []
    dirs = [(-1, 0), (1, 0), (0, -1), (0, 1)]

    for r in range(size):
        for c in range(size):
            if board[r][c] != enemy:
                continue

            for dr, dc in dirs:
                nr, nc = r + dr, c + dc
                if 0 <= nr < size and 0 <= nc < size and board[nr][nc] is None:
                    enemies.append((r, c))
                    break

    return enemies


def get_candidates(board, r, c):
    size = len(board)
    candidates = []

    dirs = {
        "up": (-1, 0),
        "down": (1, 0),
        "left": (0, -1),
        "right": (0, 1),
    }

    for direction, (dr, dc) in dirs.items():
        for dist in range(1, 3):
            nr = r + dr * dist
            nc = c + dc * dist

            if not (0 <= nr < size and 0 <= nc < size):
                break
            if board[nr][nc] is not None:
                break

            candidates.append(
                {
                    "r": nr,
                    "c": nc,
                    "fromR": r,
                    "fromC": c,
                    "direction": direction,
                    "distance": dist,
                }
            )

    return candidates
