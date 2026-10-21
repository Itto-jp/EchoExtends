from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from ai.RandomAI import random_ai
from ai.GreedyAI import greedy_ai

origins = [
    "https://echoextends.netlify.app",
    "http://localhost:5173",
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class MoveRequest(BaseModel):
    board: list
    turn: int
    aiType: str
    isFirstTurn: bool


@app.post("/ai/move")
def ai_move(req: MoveRequest):
    if req.aiType == "random":
        return random_ai(req.board, req.turn, req.isFirstTurn)
    if req.aiType == "greedy":
        return greedy_ai(req.board, req.turn, req.isFirstTurn)

    raise HTTPException(status_code=400, detail="unknown aiType")


@app.get("/")
def root():
    return {"status": "running"}
