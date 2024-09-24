import styled from "@emotion/styled";

// Animação de fade-in
const fadeIn = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

// Container principal do modal com animação de entrada
export const ModalContainer = styled.div`
  ${fadeIn}
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #1a1a1a; /* Cinza escuro */
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
  z-index: 1000;
  width: 90%;
  max-width: 600px;
  text-align: center;
  animation: fadeIn 0.5s ease-out;
`;

// Overlay com animação de fade
export const ModalOverlay = styled.div`
  ${fadeIn}
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 999;
  animation: fadeIn 0.3s ease-out;
`;

// Container que segura os cards de resultados
export const CardsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

// Estilo para cada card de resultado
export const ResultCard = styled.div`
  background-color: #333; /* Fundo cinza escuro */
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  flex: 1;
  min-width: 150px;
  max-width: 180px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px) rotate(2deg); /* Animação de hover */
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.5); /* Sombra mais intensa */
  }

  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    color: #fff;
  }

  p {
    font-size: 1.5rem;
    font-weight: bold;
    color: #f1c40f; /* Cor amarela para destacar os números */
  }
`;

// Estilo para o botão de fechar o modal com animação de hover
export const CloseButton = styled.button`
  background-color: #e74c3c; /* Vermelho */
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #c0392b; /* Vermelho mais escuro */
    transform: scale(1.05); /* Leve efeito de zoom */
  }
`;
