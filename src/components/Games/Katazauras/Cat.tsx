import React from 'react';
import catImage from '@/images/cat.png';

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
        width: 60,
        height: 40,
        backgroundImage: `url(${catImage})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    />
  );
};

export default Cat;
