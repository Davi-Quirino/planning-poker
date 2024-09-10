import styled from "@emotion/styled";

interface CardProps {
  isSelected: boolean; // Propriedade para verificar se a carta está selecionada
}

export const CardsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding: 1rem;
`;

export const Card = styled.div<CardProps>`
  background: linear-gradient(135deg, #000000, #ffd700);
  color: white;
  padding: 2rem 3rem;
  border-radius: 20px;
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  box-shadow: ${({ isSelected }) =>
    isSelected
      ? "0 12px 25px rgba(255, 215, 0, 0.7)"
      : "0 8px 15px rgba(0, 0, 0, 0.3)"};
  border: ${({ isSelected }) =>
    isSelected
      ? "4px solid #ffd700"
      : "none"}; /* Borda dourada se selecionado */
  transform: ${({ isSelected }) =>
    isSelected ? "scale(1.05)" : "scale(1)"}; /* Leve aumento no tamanho */
  transition: transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.4);
    background: linear-gradient(135deg, #222222, #ffcc00);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  /* Tornando as cartas responsivas */
  @media (max-width: 1200px) {
    padding: 1.5rem 2.5rem;
    font-size: 2.5rem;
  }

  @media (max-width: 768px) {
    padding: 1rem 2rem;
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    padding: 0.8rem 1.5rem;
    font-size: 1.5rem;
  }
`;
