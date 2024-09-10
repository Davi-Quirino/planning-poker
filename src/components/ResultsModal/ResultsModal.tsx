import React from "react";
import { ModalContainer, ResultCard, CloseButton } from "./ResultsModal.styles";

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
    <ModalContainer>
      <h2>Resultados</h2>
      <div>
        <ResultCard>
          <h3>Média Developers</h3>
          <p>{devAverage.toFixed(2)}</p>
        </ResultCard>
        <ResultCard>
          <h3>Média QA</h3>
          <p>{qaAverage.toFixed(2)}</p>
        </ResultCard>
        <ResultCard>
          <h3>Média Geral</h3>
          <p>{overallAverage.toFixed(2)}</p>
        </ResultCard>
      </div>
      <CloseButton onClick={onClose}>Fechar</CloseButton>
    </ModalContainer>
  );
};

export default ResultsModal;
