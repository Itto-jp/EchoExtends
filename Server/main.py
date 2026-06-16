from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from ai.RandomAI import random_ai
from ai.GreedyAI import greedy_ai

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class MoveRequest(BaseModel):
    board: list
    turn: int
    aiType: str

@app.post("/ai/move")
def ai_move(req: MoveRequest):
    if req.aiType == "random":
        return random_ai(req.board, req.turn)
    if req.aiType == "greedy":
        return greedy_ai(req.board, req.turn)

    return {"error": "unknown aiType"}

@app.get("/")
def root():
    return {"status": "running"}
