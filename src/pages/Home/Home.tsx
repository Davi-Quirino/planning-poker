import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../../components/Modal/Modal";
import Player from "../../components/Player/Player";
import Cards from "../../components/Cards/Cards";
import {
  TableContainer,
  TableImage,
  PlayerPosition,
  RevealButton,
} from "./Home.styles";
import tableImage from "../../assets/images/table.png";
import ResultsModal from "../../components/ResultsModal";
import UserForm from "../../components/UseForm";

interface PlayerGame {
  id: number;
  name: string;
  role: string;
  selectedCard?: number | null; // Allow null as a valid type
  position: { top: string; left: string };
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
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [averages, setAverages] = useState({
    devAverage: 0,
    qaAverage: 0,
    overallAverage: 0,
  });

  useEffect(() => {
    const fetchPlayers = async () => {
      const { data } = await axios.get(
        "https://planning-poker-service.vercel.app/players"
      );
      setPlayers(data);
      setIsRevealed(data.some((player: PlayerGame) => player.isRevealed));
    };

    const intervalId = setInterval(fetchPlayers, 2000);
    return () => clearInterval(intervalId);
  }, []);

  const handleJoin = async (name: string, role: string) => {
    const { data: player } = await axios.post(
      "https://planning-poker-service.vercel.app/join",
      {
        name,
        role,
      }
    );
    setPlayers((prev) => [...prev, player]);
    setCurrentPlayerId(player.id);
    setIsModalOpen(false);
  };

  const handleCardSelect = async (value: number) => {
    if (currentPlayerId) {
      const { data } = await axios.post(
        "https://planning-poker-service.vercel.app/select-card",
        {
          id: currentPlayerId,
          selectedCard: value,
        }
      );
      setSelectedCard(value);
      setPlayers((prev) =>
        prev.map((player) =>
          player.id === currentPlayerId
            ? { ...player, selectedCard: value, hasVoted: true }
            : player
        )
      );
    }
  };

  const handleRevealCards = async () => {
    await axios.post("https://planning-poker-service.vercel.app/reveal-cards");
    setIsRevealed(true);
    setIsGameFinished(true);
    calculateAverages();
    setIsResultsModalOpen(true);
  };

  const handleNewGame = async () => {
    await axios.post("https://planning-poker-service.vercel.app/new-game");
    setPlayers((prev) =>
      prev.map((player) => ({
        ...player,
        selectedCard: null,
        hasVoted: false,
        isRevealed: false,
      }))
    );
    setIsRevealed(false);
    setIsGameFinished(false);
    setIsResultsModalOpen(false);
  };

  const handleLeave = async () => {
    if (currentPlayerId) {
      try {
        await axios.post("https://planning-poker-service.vercel.app/leave", {
          id: currentPlayerId,
        });
        setPlayers((prev) =>
          prev.filter((player) => player.id !== currentPlayerId)
        );
      } catch (err) {
        console.error("Erro ao sair do jogo:", err);
      }
    }
  };

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

    const devAverage =
      devPlayers.reduce((acc, curr) => acc + (curr.selectedCard || 0), 0) /
      (devPlayers.length || 1);
    const qaAverage =
      qaPlayers.reduce((acc, curr) => acc + (curr.selectedCard || 0), 0) /
      (qaPlayers.length || 1);
    const overallAverage = devAverage + qaAverage;

    setAverages({ devAverage, qaAverage, overallAverage });
  };

  useEffect(() => {
    const handleUnload = () => {
      console.log("unload disparado");
      if (currentPlayerId) {
        const xhr = new XMLHttpRequest();
        xhr.open(
          "POST",
          "https://planning-poker-service.vercel.app/leave",
          false
        );
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify({ id: currentPlayerId }));
      }
    };

    window.addEventListener("unload", handleUnload);
    return () => {
      window.removeEventListener("unload", handleUnload);
    };
  }, [currentPlayerId]);

  return (
    <div>
      <h1 style={{ display: "flex", justifyContent: "center" }}>
        Bem-vindos amigos e bem-vindo Fernando!
      </h1>
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
        {players.map((player) => (
          <PlayerPosition key={player.id} position={player.position}>
            <Player
              name={player.name}
              role={player.role}
              selectedCard={
                player.isRevealed
                  ? player.selectedCard
                  : player.selectedCard !== null &&
                    player.selectedCard !== undefined
                  ? "Votado"
                  : undefined
              }
            />
          </PlayerPosition>
        ))}
        {currentPlayerId && (
          <Cards
            onCardSelect={handleCardSelect}
            selectedCard={selectedCard}
            resetSelectedCard={() => setSelectedCard(null)}
          />
        )}
      </TableContainer>

      {isResultsModalOpen && (
        <ResultsModal
          onClose={() => setIsResultsModalOpen(false)}
          devAverage={averages.devAverage}
          qaAverage={averages.qaAverage}
          overallAverage={averages.overallAverage}
        />
      )}
    </div>
  );
};

export default Home;
