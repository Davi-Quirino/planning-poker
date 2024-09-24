import React from "react";
import {
  ModalContainer,
  ModalOverlay,
  ResultCard,
  CloseButton,
  CardsContainer,
} from "./ResultsModal.styles";

interface ResultsModalProps {
  devAverage: number;
  qaAverage: number;
  overallAverage: number;
  onClose: () => void;
}

const ResultsModal: React.FC<ResultsModalProps> = ({
  devAverage,
  qaAverage,
  overallAverage,
  onClose,
}) => {
  return (
    <>
      <ModalOverlay />
      <ModalContainer>
        <h2>Resultados</h2>
        <CardsContainer>
          <ResultCard>
            <h3>Média Developers</h3>
            <p>{devAverage.toFixed(2)}</p>
          </ResultCard>

          <ResultCard>
            <h3>Média Geral</h3>
            <p>{overallAverage.toFixed(2)}</p>
          </ResultCard>
          <ResultCard>
            <h3>Média QA</h3>
            <p>{qaAverage.toFixed(2)}</p>
          </ResultCard>
        </CardsContainer>
        <CloseButton onClick={onClose}>Fechar</CloseButton>
      </ModalContainer>
    </>
  );
};

export default ResultsModal;
