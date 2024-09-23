import styled from "styled-components";

export const TableContainer = styled.div`
  position: relative;
  width: 100vw; // A largura será 100% da largura da viewport
  height: 50vh; // A altura será 50% da altura da viewport
  overflow: hidden; // Evita que o conteúdo exceda o tamanho da mesa
`;

export const TableImage = styled.img`
  width: 100%; // Mantém a imagem ajustada ao container responsivamente
  height: auto; // Mantém a proporção original da imagem
  max-height: 100%;
  object-fit: cover; // Garante que a imagem sempre cubra o container
`;

export const PlayerPosition = styled.div<{
  position?: { top: string; left: string };
}>`
  position: absolute;
  top: ${(props) => props.position?.top || "0"};
  left: ${(props) => props.position?.left || "0"};
  transform: translate(-50%, -50%); // Centraliza os jogadores no ponto definido
  width: 5vw; // Controla o tamanho do jogador de forma relativa à viewport
  height: 5vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 5;
`;

export const RevealButton = styled.button`
  position: absolute;
  top: 50%; /* Posiciona o botão no meio verticalmente */
  left: 50%; /* Posiciona o botão no meio horizontalmente */
  transform: translate(-50%, -50%); /* Centraliza o botão no meio exato */
  padding: 12px 24px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  z-index: 10; /* Garante que o botão fique acima da imagem da mesa */

  &:hover {
    background-color: #218838;
  }
`;
