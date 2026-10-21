# Debug notes

今回、主に次の不具合を修正しました。

1. FastAPI から `random_ai` を呼ぶ際に `isFirstTurn` を渡しておらず、Random AI 選択時に `TypeError` で500エラーになっていた。
2. Python側の `get_selectable_enemies` がReact側と異なる条件を使っており、正しい合法手を見つけられなかった。
3. Greedy AI の返す手に `fromR/fromC` がない場合があり、React側の `applyMove` が壊れていた。
4. AIの初手を通常の「伸ばす手」と同じ方法で適用しようとしていた。初手は単独の石の配置として処理するように分離した。
5. 「AIが先攻 / プレイヤーが先攻 / ランダム」の選択値を `App` では保持していたが、`Game` が使っていなかった。
6. クライアントがAIを常にPlayer 2と仮定していたため、AI先攻が実現できなかった。
7. 未実装のMinimax AIを選択でき、サーバーから不正な応答を受けた後にクライアントが例外を起こす可能性があった。UIでは未実装と明示した。
8. ローカル開発中もクライアントが本番Renderサーバーに固定接続していた。開発時はlocalhost、本番時はRenderを使い分けるようにした。
9. READMEのNode.js要件が18+だったが、使用中のVite 8.0.10はNode 20.19+または22.12+を要求するため修正した。

確認済み:
- Pythonソースのコンパイル
- FastAPI `/ai/move` の Random / Greedy / 初手 API テスト
- React側 ESLint
- GameManager の「人先攻」「AI先攻」「候補生成」の簡易ロジックテスト

注: アップロードされた `node_modules` はWindows向けnative moduleを含んでいたため、Linux環境ではVite buildをそのまま実行できませんでした。配布版では `node_modules` とPython仮想環境を除外しているので、各環境で `npm install` / `pip install -r requirements.txt` を実行してください。
