//import { StrictMode } from 'react'
//import { createRoot } from 'react-dom/client'
import ReactDOM from "react-dom/client";
import './index.css'
import App from './App.jsx'
//createRoot
ReactDOM.createRoot(document.getElementById('root')).render(
  //<StrictMode>
    <App />
  //</StrictMode>,
);


/*
サーバ起動 python -m uvicorn main:app --reload
クライアント起動 npm run dev

github更新(回数限られてるから普段はしない)
git add .
git commit -m " "
git push

先攻後攻のうち、先攻の1ターン目ではすべてのマスから1マスを選んで塗れる特殊ルールで、
フラグ管理や受け渡しが大変だった
*/