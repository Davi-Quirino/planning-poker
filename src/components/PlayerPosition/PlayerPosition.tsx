import React from "react";

interface PlayerPositionProps {
  children: React.ReactNode;
  position: { top: string; left: string }; // Espera um objeto com top e left como strings
}

const PlayerPosition: React.FC<PlayerPositionProps> = ({
  children,
  position,
}) => {
  const style = {
    position: "absolute" as "absolute",
    top: position.top,
    left: position.left,
  };

  return <div style={style}>{children}</div>;
};

export default PlayerPosition;
