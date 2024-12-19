import React from "react";
import { PlayerContainer, PlayerName, PlayerCard } from "./Player.styles";

interface PlayerProps {
  name: string;
  role: string;
  selectedCard?: number | string | null;
}

const Player: React.FC<PlayerProps> = ({ name, role, selectedCard }) => {
  let displayValue;

  if (selectedCard === undefined) {
    // Caso não tenha selecionado carta ainda
    displayValue = "Bora!!";
  } else if (typeof selectedCard === "string") {
    // Caso seja a string 'Votado'
    displayValue = selectedCard;
  } else {
    // Caso seja um número (carta revelada)
    displayValue = selectedCard;
  }

  return (
    <PlayerContainer>
      <PlayerName>
        {name} ({role})
      </PlayerName>
      <PlayerCard>{displayValue}</PlayerCard>
    </PlayerContainer>
  );
};

export default Player;
