import React, { useState } from "react";
import { CardsContainer, Card } from "./Cards.styles";

interface CardsProps {
  onCardSelect: (value: number) => void;
}

const fibonacciSequence = [0, 1, 2, 3, 5, 8, 13];

const Cards: React.FC<CardsProps> = ({ onCardSelect }) => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null); // Estado para armazenar a carta selecionada

  // Função para lidar com a seleção de uma carta
  const handleCardClick = (value: number) => {
    setSelectedCard(value); // Define a carta selecionada
    onCardSelect(value); // Notifica o componente pai sobre a seleção
  };

  return (
    <CardsContainer>
      {fibonacciSequence.map((value) => (
        <Card
          key={value}
          onClick={() => handleCardClick(value)}
          isSelected={selectedCard === value} // Define se a carta está selecionada
        >
          {value}
        </Card>
      ))}
    </CardsContainer>
  );
};

export default Cards;
