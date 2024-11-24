// src/components/Games/Katazauras/Obstacle.tsx

import React from 'react';

interface ObstacleProps {
  x: number;
  y: number;
}

const Obstacle: React.FC<ObstacleProps> = ({ x, y }) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 20,
        height: 20,
        backgroundColor: 'red',
      }}
    />
  );
};

export default Obstacle;
