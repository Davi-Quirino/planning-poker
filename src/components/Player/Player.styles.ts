import styled from "@emotion/styled";

export const PlayerContainer = styled.div`
  text-align: center;
  margin: 1rem;
`;

export const PlayerName = styled.p`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: white;
`;

export const PlayerCard = styled.div`
  background-color: ${(props) =>
    props.children === "Bora!!" ? "#ccc" : "#007bff"};
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1.5rem;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
`;
