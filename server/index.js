import http from 'http'
import SocketService from './services/socket.js';

async function startServer() {

	const httpServer = http.createServer();
	const port   = process.env.PORT || 5000;
	const socket = new SocketService();

	socket.io().attach(httpServer);


	httpServer.listen(port, () => {
		console.log("Server started at " + port)
	});

	socket.initListeners();
}

startServer();
