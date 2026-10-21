# EchoExtends (React + Python)

React + FastAPI で作成した 6x6 のターン制ボードゲームです。

## ルール
- 6x6マスのボードゲーム 
- 先攻と後攻を決定する。 
- 先攻の最初のターンでは、好きなマスを１マス塗る 
- 後攻からは通常ルールに従いお互いマスを塗っていく。 
- 通常ルールでは相手のマスを1つ選び、縦横4方向のいずれかへ、1マス、または2マス伸ばす。 
- 塗れるのは空きマスのみであり、相手のマスを塗り替えたり、すでに塗られたマスを飛び越えて塗ることはできない。 
- 合法手がない場合はパスとなる。 
- 盤面がすべて埋まったとき、塗ったマスの多いプレーヤーが勝利。 

## 開発環境
- Node.js 20.19+（Vite 8 の要件）
- React / Vite
- Python 3.10+
- FastAPI

## ローカル実行

### 1. FastAPI サーバー

```bash
cd Server
python -m venv .venv
# Windows: .venv\Scripts\activate
# macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

通常は `http://localhost:8000` で起動します。

### 2. React クライアント

別のターミナルで:

```bash
cd Web_Client
npm install
npm run dev
```

開発時は自動的に `http://localhost:8000` のAIサーバーへ接続します。デプロイ時に別URLを使う場合は `VITE_API_URL` を設定できます。

## 現在利用できるAI
- Random AI
- Greedy AI（その手で獲得できるマス数を最大化）

Minimax AI は未実装です。
