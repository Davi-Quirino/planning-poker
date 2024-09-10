const io = require("socket.io")(process.env.PORT || 3001, {
  cors: {
    origin:
      "https://planning-poker-c3spwj78m-davi-quirinos-projects.vercel.app/",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

let players = [];
let isRevealed = false; // Estado global que controla se as cartas estão reveladas

io.on("connection", (socket) => {
  console.log("A user connected");

  // Envia a lista completa de jogadores ao novo cliente
  socket.emit("currentPlayers", players);

  // Recebe a informação quando um jogador entra
  socket.on("joinGame", (player) => {
    player.socketId = socket.id; // Salva o socketId do jogador
    players.push(player);
    io.emit("playerJoined", player);
  });

  // Recebe a seleção de uma carta por um jogador
  socket.on("selectCard", (updatedPlayer) => {
    players = players.map((player) =>
      player.id === updatedPlayer.id ? updatedPlayer : player
    );
    io.emit("cardSelected", updatedPlayer);
  });

  // Recebe o comando para revelar as cartas
  socket.on("revealCards", () => {
    isRevealed = true; // Altera o estado global de revelação
    io.emit("revealCards", true); // Notifica todos os clientes para revelar as cartas
  });

  // Evento de reset dos jogadores (resetPlayers)
  socket.on("resetPlayers", (resetPlayers) => {
    players = resetPlayers; // Atualiza a lista de jogadores no servidor
    io.emit("currentPlayers", players); // Envia a lista atualizada para todos os clientes
  });

  // Lida com a desconexão do jogador e o remove da lista
  socket.on("disconnect", () => {
    console.log("A user disconnected");
    players = players.filter((player) => player.socketId !== socket.id); // Remove o jogador da lista
    io.emit("playerDisconnected", socket.id); // Notifica todos os clientes sobre a desconexão
  });

  // Evento de novo jogo - reinicia o jogo para todos os jogadores
  socket.on("newGame", () => {
    players = []; // Reseta os jogadores no servidor
    isRevealed = false; // Reseta o estado de revelação
    io.emit("newGame"); // Notifica todos os clientes para reiniciar o jogo
  });
});
