const socket = io("http://146.190.116.89:8089");

let playerSymbol = null;
let isMyTurn = false;

const boardElement = document.getElementById("board");
const statusElement = document.getElementById("status");

// Crear tablero
for (let i = 0; i < 9; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.setAttribute("data-index", i);
  boardElement.appendChild(cell);

  cell.addEventListener("click", () => {
	console.log("Estoy haciendo clic");
	console.log("Es mi turno?", isMyTurn);
	console.log("El text content es", cell.textContent);
    if (isMyTurn && cell.textContent === "") {
      console.log(`Jugador local intenta jugar en ${i}`);
      socket.emit("makeMove", { index: i });
    }
  });
}

// Recibir información del jugador
socket.on("playerInfo", ({ symbol, message }) => {
  playerSymbol = symbol;
  if (symbol) {
    statusElement.textContent = `Sos el jugador ${symbol}`;
    console.log(`Asignado como jugador ${symbol}`);
  } else {
    statusElement.textContent = message;
    console.log(message);
  }
});

// Actualizar tablero
socket.on("updateBoard", ({ board }) => {
  console.log("Tablero actualizado:", board);
  const cells = document.querySelectorAll(".cell");
  board.forEach((value, index) => {
    cells[index].textContent = value;
    if (value !== "") {
      cells[index].classList.add("taken");
    } else {
      cells[index].classList.remove("taken");
    }
  });
});

// Actualizar turno
socket.on("turnUpdate", ({ currentPlayer }) => {
  isMyTurn = (socket.id === socket.id && playerSymbol === (currentPlayer === 0 ? "X" : "O"));
  statusElement.textContent = isMyTurn
    ? "Es tu turno"
    : "Es el turno del oponente";
  console.log(`Turno actualizado: ${isMyTurn ? "Tu turno" : "Turno del oponente"}`);
});

// Reiniciar tablero
socket.on("resetBoard", () => {
  console.log("El tablero se ha reiniciado");
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("taken");
  });
  statusElement.textContent = "Esperando jugadores...";
});

// Mensaje de ganador
socket.on("gameOver", ({ winner }) => {
  statusElement.textContent = winner === "Empate"
    ? "¡Es un empate!"
    : `¡Ganó ${winner}!`;
  console.log(`Fin del juego: ${winner === "Empate" ? "Empate" : `Ganó ${winner}`}`);
});
