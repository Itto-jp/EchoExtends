# server/ai/logic.py

def get_selectable_enemies(board, player):
    size = len(board)
    enemies = []

    for r in range(size):
        for c in range(size):
            if board[r][c] not in [1, 2]:
                continue
            if board[r][c] == player:
                continue

            dirs = [(-1,0),(1,0),(0,-1),(0,1)]
            for dr, dc in dirs:
                nr, nc = r + dr, c + dc
                if 0 <= nr < size and 0 <= nc < size:
                    if board[nr][nc] == player:
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
        "right": (0, 1)
    }

    for direction, (dr, dc) in dirs.items():
        for dist in range(1, 3):  # React と同じ 1〜2 マス
            nr = r + dr * dist
            nc = c + dc * dist

            if not (0 <= nr < size and 0 <= nc < size):
                break
            if board[nr][nc] is not None:
                break

            candidates.append({
                "r": nr,
                "c": nc,
                "fromR": r,
                "fromC": c,
                "direction": direction,
                "distance": dist
            })

    return candidates
