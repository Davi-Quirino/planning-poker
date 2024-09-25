import React from "react";
import { CardsContainer, Card } from "./Cards.styles";

interface CardsProps {
  onCardSelect: (value: number) => void;
  selectedCard: number | null; // Adiciona o estado da carta selecionada como prop
  resetSelectedCard: () => void; // Adiciona uma função para resetar a carta selecionada
}

const fibonacciSequence = [0, 1, 2, 3, 5, 8, 13];

const Cards: React.FC<CardsProps> = ({
  onCardSelect,
  selectedCard,
  resetSelectedCard,
}) => {
  // Função para lidar com a seleção de uma carta
  const handleCardClick = (value: number) => {
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
