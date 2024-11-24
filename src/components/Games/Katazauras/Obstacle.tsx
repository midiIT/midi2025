import React from 'react';

interface ObstacleProps {
  x: number;
  y: number;
  image: string;
}

const Obstacle: React.FC<ObstacleProps> = ({ x, y, image }) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 30,
        height: 40,
        backgroundImage: `url(${image})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    />
  );
};

export default Obstacle;
