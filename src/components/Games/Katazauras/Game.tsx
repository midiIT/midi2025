import React, { useState, useEffect, useRef } from 'react';
import Cat from './Cat';
import Obstacle from './Obstacle';

interface CatType {
  x: number;
  y: number;
  dy: number;
  jumping: boolean;
}

interface ObstacleType {
  x: number;
  y: number;
  width: number;
  height: number;
}

const Game: React.FC = () => {
  const [cat, setCat] = useState<CatType>({
    x: 50,
    y: 150,
    dy: 0,
    jumping: false,
  });
  const [obstacles, setObstacles] = useState<ObstacleType[]>([]);
  const [score, setScore] = useState<number>(0);
  const gameInterval = useRef<number | null>(null);

  useEffect(() => {
    const updateGame = () => {
      setCat(prevCat => {
        let newY = prevCat.y + prevCat.dy;
        let newDy = prevCat.dy + (prevCat.jumping ? 0.5 : 0);

        if (newY >= 150) {
          newY = 150;
          newDy = 0;
          prevCat.jumping = false;
        }

        return { ...prevCat, y: newY, dy: newDy };
      });

      setObstacles(prevObstacles => {
        const updatedObstacles = prevObstacles
          .map(obstacle => ({ ...obstacle, x: obstacle.x - 3 }))
          .filter(obstacle => obstacle.x + obstacle.width > 0);

        updatedObstacles.forEach(obstacle => {
          if (detectCollision(cat, obstacle)) {
            alert('Game Over! Final Score: ' + score);
            resetGame();
          }
        });

        if (Math.random() < 0.02) {
          updatedObstacles.push({ x: 800, y: 150, width: 20, height: 20 });
        }

        setScore(prevScore => prevScore + 1);
        return updatedObstacles;
      });
    };

    gameInterval.current = window.setInterval(updateGame, 20);
    return () => {
      if (gameInterval.current !== null) {
        clearInterval(gameInterval.current);
      }
    };
  }, [cat, obstacles, score]);

  const detectCollision = (cat: CatType, obstacle: ObstacleType) => {
    return (
      cat.x < obstacle.x + obstacle.width &&
      cat.x + 20 > obstacle.x &&
      cat.y < obstacle.y + obstacle.height &&
      cat.y + 20 > obstacle.y
    );
  };

  const handleJump = () => {
    if (!cat.jumping) {
      setCat(prevCat => ({ ...prevCat, jumping: true, dy: -8 }));
    }
  };

  const resetGame = () => {
    setCat({ x: 50, y: 150, dy: 0, jumping: false });
    setObstacles([]);
    setScore(0);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {/* Add the border to the container */}
      <div
        tabIndex={0}
        onKeyDown={handleJump}
        style={{
          outline: 'none',
          width: '800px',
          height: '200px',
          border: '4px solid #333',
          position: 'relative',
          background: '#fff',
        }}
      >
        <Cat x={cat.x} y={cat.y} />
        {obstacles.map((obstacle, index) => (
          <Obstacle key={index} x={obstacle.x} y={obstacle.y} />
        ))}
        <div
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            fontWeight: 'bold',
          }}
        >
          Score: {score}
        </div>
      </div>
    </div>
  );
};

export default Game;
