# Ta-Te-Ti Multiplayer con Node.js y Socket.IO

Este es un proyecto básico de **Ta-Te-Ti** (tres en línea) multiplayer desarrollado con **Node.js** y **Socket.IO**, diseñado para que dos jugadores puedan conectarse y jugar en tiempo real.

## 🚀 Tecnologías utilizadas

- [Node.js](https://nodejs.org): Servidor backend.
- [Socket.IO](https://socket.io): Comunicación en tiempo real entre cliente y servidor.
- [Express.js](https://expressjs.com/): Framework para servir los archivos estáticos.
- HTML/CSS/JavaScript: Interfaz del cliente.

---

## 📂 Estructura del proyecto
```bash
tateti-nodejs/
├── public/               # Archivos del cliente (HTML, CSS, JS)
│   ├── index.html        # Página principal
│   ├── script.js         # Lógica del cliente
│   └── style.css         # (Opcional) Archivo de estilos
├── server.js             # Lógica del servidor con Node.js y Socket.IO
├── package.json          # Configuración del proyecto y dependencias
├── .gitignore            # Archivos y carpetas ignorados por Git
└── README.md             # Documentación del proyecto
```

## 🌟 Funcionalidades principales

- **Conexión en tiempo real:** Los dos primeros jugadores que ingresan pueden jugar.
- **Cambio de turno:** Control automático de turnos entre el jugador "X" y el jugador "O".
- **Detección de ganador:** El juego identifica si un jugador ha ganado o si termina en empate.
- **Reinicio automático:** Una vez terminado el juego, el tablero se reinicia.

---

## 🛠️ Instalación y configuración

### 1. Clonar el repositorio
```bash
git clone https://github.com/adrianbarabino/tateti-nodejs.git
cd tateti-nodejs
```

### 2. Instalar dependencias
Asegurate de tener Node.js instalado. Luego ejecutá:

```bash
npm install
```

### 3. Ejecutar el servidor
```bash
node server.js
```
Por defecto, el servidor estará disponible en `http://localhost:8089`.

---

## 🌐 Uso

1. Abrí el navegador y accedé a `http://localhost:8089`.
2. Conectate desde dos navegadores (o pestañas) distintos.
3. ¡Jugá al Ta-Te-Ti en tiempo real!

---

## 📜 Licencia

Este proyecto está licenciado bajo la **MIT License**. Podés usarlo y modificarlo libremente.

---

## ✨ Créditos

Proyecto desarrollado por **Adrian Barabino | BROTE Servicios**.

Si tenés preguntas o sugerencias, ¡no dudes en abrir un [issue](https://github.com/adrianbarabino/tateti-nodejs/issues)!
