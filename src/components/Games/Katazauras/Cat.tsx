// src/components/Games/Katazauras/Cat.tsx

import React from 'react';

interface CatProps {
  x: number;
  y: number;
}

const Cat: React.FC<CatProps> = ({ x, y }) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 20,
        height: 20,
        backgroundColor: 'black',
      }}
    />
  );
};

export default Cat;
