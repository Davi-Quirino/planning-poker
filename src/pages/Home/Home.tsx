import React, { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import Modal from "../../components/Modal/Modal";
import UserForm from "../../components/UseForm";
import Player from "../../components/Player/Player";
import Cards from "../../components/Cards/Cards";
import {
  TableContainer,
  TableImage,
  PlayerPosition,
  RevealButton,
} from "./Home.styles";
import tableImage from "../../assets/images/table.png";
import ResultsModal from "../../components/ResultsModal"; // Importando o novo modal

// Definindo a interface do jogador
interface PlayerGame {
  id: number;
  name: string;
  role: string;
  selectedCard?: number;
  position?: { top: string; left: string };
  socketId?: string;
  hasVoted: boolean;
  isRevealed: boolean;
}

const Home: React.FC = () => {
  const [players, setPlayers] = useState<PlayerGame[]>([]);
  const [currentPlayerId, setCurrentPlayerId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [isGameFinished, setIsGameFinished] = useState<boolean>(false);
  const [isResultsModalOpen, setIsResultsModalOpen] = useState<boolean>(false);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Inicializando a conexão WebSocket
    socketRef.current = io("https://planning-poker-service.vercel.app/", {
      //transports: ["websocket"], // Certifique-se de que websocket está habilitado
      // reconnection: true, // Permite reconexão automática
      // reconnectionAttempts: 5, // Número de tentativas de reconexão
      // reconnectionDelay: 1000, // Atraso entre as tentativas de reconexão
    });

    // Recebendo a lista de jogadores ao conectar
    socketRef.current.on("currentPlayers", (players: PlayerGame[]) => {
      setPlayers(players);
    });

    // Recebendo o estado de revelação das cartas
    socketRef.current.on("revealState", (revealed: boolean) => {
      setIsRevealed(revealed);
    });

    // Quando as cartas forem reveladas, abrir o modal de resultados
    socketRef.current.on("revealCards", () => {
      setIsRevealed(true);
      setIsGameFinished(true);
      setIsResultsModalOpen(true); // Abre o modal de resultados
    });

    // Reseta o jogo quando o servidor envia o evento
    socketRef.current.on("newGame", () => {
      resetGame();
    });

    // Quando um novo jogador entrar
    socketRef.current.on("playerJoined", (player: PlayerGame) => {
      setPlayers((prevPlayers) => [...prevPlayers, player]);
    });

    // Atualiza o estado de um jogador que selecionou uma carta
    socketRef.current.on("cardSelected", (updatedPlayer: PlayerGame) => {
      setPlayers((prevPlayers) =>
        prevPlayers.map((player) =>
          player.id === updatedPlayer.id ? updatedPlayer : player
        )
      );
    });

    // Quando um jogador desconectar
    socketRef.current.on("playerDisconnected", (socketId: string) => {
      setPlayers((prevPlayers) =>
        prevPlayers.filter((player) => player.socketId !== socketId)
      );
    });

    // Desconectar ao fechar a aba
    const handleBeforeUnload = () => {
      socketRef.current?.disconnect();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      socketRef.current?.disconnect();
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const FIXED_POSITIONS = [
    { top: "70%", left: "28%" },
    { top: "70%", left: "61%" },
    { top: "84%", left: "10%" },
    { top: "84%", left: "79%" },
    { top: "115%", left: "1%" },
    { top: "115%", left: "88%" },
    { top: "140%", left: "90%" },
    { top: "140%", left: "1%" },
    { top: "170%", left: "5%" },
    { top: "170%", left: "87%" },
  ];

  // Função para adicionar um jogador ao jogo
  const handleJoin = (name: string, role: string) => {
    const newPlayerIndex = players.length;

    if (newPlayerIndex >= FIXED_POSITIONS.length) {
      console.log("Limite máximo de jogadores atingido!");
      return;
    }

    const newPlayer: PlayerGame = {
      id: Date.now(),
      name,
      role,
      position: FIXED_POSITIONS[newPlayerIndex],
      hasVoted: false,
      isRevealed: false,
    };

    socketRef.current?.emit("joinGame", newPlayer);

    setPlayers((prevPlayers) => [...prevPlayers, newPlayer]);
    setCurrentPlayerId(newPlayer.id);
    setIsModalOpen(false); // Fecha o modal de entrada
  };

  // Função para lidar com a seleção de uma carta
  const handleCardSelect = (value: number) => {
    const updatedPlayer = players.find(
      (player) => player.id === currentPlayerId
    );
    if (updatedPlayer) {
      updatedPlayer.selectedCard = value;
      updatedPlayer.hasVoted = true; // Marca que o jogador votou
      setPlayers(
        players.map((player) =>
          player.id === currentPlayerId
            ? { ...player, selectedCard: value, hasVoted: true }
            : player
        )
      );
      socketRef.current?.emit("selectCard", updatedPlayer);
    }
  };

  // Função para revelar as cartas
  const handleRevealCards = () => {
    socketRef.current?.emit("revealCards"); // Envia para o servidor que as cartas devem ser reveladas
  };

  // Função para iniciar um novo jogo
  const handleNewGame = () => {
    socketRef.current?.emit("newGame"); // Envia o evento para o servidor
  };

  // Função para resetar o jogo localmente
  const resetGame = () => {
    //setPlayers([]); // Reseta a lista de jogadores
    setIsRevealed(false);
    setIsGameFinished(true);
    setIsResultsModalOpen(false); // Fecha o modal de resultados
    //setIsModalOpen(true); // Reabre o modal de entrada
  };

  // Função para calcular as médias dos jogadores
  const calculateAverages = () => {
    const devPlayers = players.filter(
      (player) =>
        player.role.toLowerCase() === "developer" &&
        player.selectedCard !== undefined
    );
    const qaPlayers = players.filter(
      (player) =>
        player.role.toLowerCase() === "qa" && player.selectedCard !== undefined
    );

    // Cálculo da média de Developers
    const devAverage =
      devPlayers.length > 0
        ? devPlayers.reduce(
            (acc, player) => acc + (player.selectedCard || 0),
            0
          ) / devPlayers.length
        : 0;

    // Cálculo da média de QAs
    const qaAverage =
      qaPlayers.length > 0
        ? qaPlayers.reduce(
            (acc, player) => acc + (player.selectedCard || 0),
            0
          ) / qaPlayers.length
        : 0;

    // Cálculo da "média geral" como o somatório das médias de QA e Developer
    const overallAverage = devAverage + qaAverage;

    return { devAverage, qaAverage, overallAverage };
  };

  const { devAverage, qaAverage, overallAverage } = calculateAverages();

  return (
    <div>
      <h1>Bem vindo to Planning Poker</h1>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <UserForm onSubmit={handleJoin} />
      </Modal>

      <TableContainer>
        <TableImage src={tableImage} alt="Planning Poker Table" />

        {!isGameFinished ? (
          <RevealButton onClick={handleRevealCards}>
            Revelar Cartas
          </RevealButton>
        ) : (
          <RevealButton onClick={handleNewGame}>Novo Jogo</RevealButton>
        )}

        {players.length > 0 &&
          players.map((player) => (
            <PlayerPosition key={player.id} position={player.position}>
              <Player
                name={player.name}
                role={player.role}
                selectedCard={
                  isRevealed || player.id === currentPlayerId
                    ? player.selectedCard
                    : player.hasVoted
                    ? "Votado"
                    : undefined
                }
              />
            </PlayerPosition>
          ))}
        {currentPlayerId !== null && <Cards onCardSelect={handleCardSelect} />}
      </TableContainer>

      {/* Modal de Resultados */}
      {isResultsModalOpen && (
        <ResultsModal
          devAverage={devAverage}
          qaAverage={qaAverage}
          overallAverage={overallAverage}
          onClose={() => setIsResultsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Home;
