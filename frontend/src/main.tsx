import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import { io } from "socket.io-client";
import { SWRConfig } from "swr";
import App from "./App.tsx";
import { fetchInstance } from "./utils/fetchInstance.ts";

// Socket.IO サーバーへ接続（現在のオリジンを使って接続）
const socket = io(`${window.location.origin}`);

// 接続が成功したときのログ出力
socket.on("connect", () => {
	console.log("Connected to Socket.IO server");
});

// index.html 内の <div id="root"> を取得
const rootElement = document.getElementById("root");

// root要素が存在する場合、React アプリケーションをマウント
if (rootElement) {
	createRoot(rootElement).render(
		<SWRConfig
			value={{
				fetcher: (resource, init) =>
					fetchInstance()
						.get(resource, init)
						.then((res) => res.data),
			}}
		>
			<BrowserRouter>
				<App socket={socket} />
			</BrowserRouter>
		</SWRConfig>,
	);
}
