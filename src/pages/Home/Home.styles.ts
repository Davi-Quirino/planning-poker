import styled from "styled-components";

export const TableContainer = styled.div`
  position: relative;
  width: 100%;
  height: 600px; // Ajuste a altura conforme necessário
`;

export const TableImage = styled.img`
  width: 100%;
  height: auto;
`;

export const PlayerPosition = styled.div<{
  position?: { top: string; left: string };
}>`
  position: absolute;
  top: ${(props) => props.position?.top || "0"};
  left: ${(props) => props.position?.left || "0"};
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
