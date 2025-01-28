const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Servir archivos estáticos
app.use(express.static("public"));

let players = []; // Lista de jugadores
let board = ["", "", "", "", "", "", "", "", ""]; // Tablero inicial
let currentPlayer = 0; // Turno actual (0: jugador X, 1: jugador O)

// Conexión de sockets
io.on("connection", (socket) => {
  console.log(`Nuevo jugador conectado: ${socket.id}`);

  // Agregar jugador si hay lugar
  if (players.length < 2) {
    players.push(socket.id);
    const playerSymbol = players.length === 1 ? "X" : "O";
    console.log(`Jugador asignado: ${socket.id} es ${playerSymbol}`);
    socket.emit("playerInfo", { symbol: playerSymbol });
    io.emit("playersUpdate", { players });
	console.log("Los players son");
console.log(players.length);
    if (players.length === 2) {
      console.log("Juego listo para comenzar");
      io.emit("gameStart", { message: "El juego ha comenzado" });
        io.emit("turnUpdate", { currentPlayer });    
}
  } else {
    console.log(`Jugador rechazado: ${socket.id} (sala llena)`);
    socket.emit("playerInfo", { symbol: null, message: "Sala llena" });
  }

  // Manejar jugadas
  socket.on("makeMove", ({ index }) => {
    console.log(`Jugador ${socket.id} intentó jugar en ${index}`);
    if (socket.id === players[currentPlayer] && board[index] === "") {
      const symbol = currentPlayer === 0 ? "X" : "O";
      board[index] = symbol;

      console.log(`Movimiento válido: ${symbol} en ${index}`);
      io.emit("updateBoard", { board });

      // Verificar ganador
      if (checkWinner(symbol)) {
        console.log(`${symbol} ha ganado!`);
        io.emit("gameOver", { winner: symbol });
        resetGame();
      } else if (board.every((cell) => cell !== "")) {
        console.log("Empate!");
        io.emit("gameOver", { winner: "Empate" });
        resetGame();
      } else {
        currentPlayer = 1 - currentPlayer; // Cambiar turno
        io.emit("turnUpdate", { currentPlayer });
      }
    } else {
      console.log("Movimiento inválido o no es el turno del jugador");
    }
  });

  // Manejar desconexión
  socket.on("disconnect", () => {
    console.log(`Jugador desconectado: ${socket.id}`);
    players = players.filter((player) => player !== socket.id);
    resetGame();
    io.emit("playersUpdate", { players });
  });
});

// Verificar ganador
function checkWinner(symbol) {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
    [0, 4, 8], [2, 4, 6]             // Diagonales
  ];

  return winPatterns.some((pattern) =>
    pattern.every((index) => board[index] === symbol)
  );
}

// Reiniciar el juego
function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = 0;
  console.log("El juego se ha reiniciado");
  io.emit("resetBoard");
}

// Escuchar en IP y puerto configurados
const HOST = "localhost";
const PORT = 8089;

server.listen(PORT, HOST, () => {
  console.log(`Servidor corriendo en http://${HOST}:${PORT}`);
});
