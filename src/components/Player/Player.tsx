import React from "react";
import { PlayerContainer, PlayerName, PlayerCard } from "./Player.styles";

interface PlayerProps {
  name: string;
  role: string;
  selectedCard?: number | string; // Agora também pode ser 'Votado' (string)
}

const Player: React.FC<PlayerProps> = ({ name, role, selectedCard }) => {
  return (
    <PlayerContainer>
      <PlayerName>
        {name} ({role})
      </PlayerName>
      {selectedCard !== undefined ? (
        <PlayerCard>{selectedCard}</PlayerCard> // Exibe a carta ou "Votado"
      ) : (
        <PlayerCard>Bora!!</PlayerCard> // Exibe "Waiting..." enquanto não votou
      )}
    </PlayerContainer>
  );
};

export default Player;
