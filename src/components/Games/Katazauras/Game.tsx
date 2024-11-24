import React, { useState, useEffect, useRef } from 'react';
import Cat from './Cat';
import Obstacle from './Obstacle';
import obstacle1 from '@/images/katazaugasImages/obWall.png';
import obstacle2 from '@/images/katazaugasImages/obPoop.png';
import obstacle3 from '@/images/katazaugasImages/obVape.png';

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
  image: string;
}

const obstacleImages = [obstacle1, obstacle2, obstacle3];

const Game: React.FC = () => {
  const [cat, setCat] = useState<CatType>({
    x: 50,
    y: 360,
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
        let newDy = prevCat.dy + (prevCat.jumping ? 0.6 : 0); // Adjusted gravity

        if (newY >= 360) {
          newY = 360;
          newDy = 0;
          prevCat.jumping = false;
        }

        return { ...prevCat, y: newY, dy: newDy };
      });

      setObstacles(prevObstacles => {
        const updatedObstacles = prevObstacles
          .map(obstacle => ({ ...obstacle, x: obstacle.x - 5 }))
          .filter(obstacle => obstacle.x + obstacle.width > 0);

        updatedObstacles.forEach(obstacle => {
          if (detectCollision(cat, obstacle)) {
            alert('Game Over! Final Score: ' + score);
            resetGame();
          }
        });

        if (Math.random() < 0.02) {
          const randomImage =
            obstacleImages[Math.floor(Math.random() * obstacleImages.length)];
          updatedObstacles.push({
            x: 1200,
            y: 360,
            width: 40,
            height: 40,
            image: randomImage,
          });
        }

        setScore(prevScore => prevScore + 1);
        return updatedObstacles;
      });
    };

    gameInterval.current = window.setInterval(updateGame, 20);
    return () => {
      if (gameInterval.current !== null) clearInterval(gameInterval.current);
    };
  }, [cat, obstacles, score]);

  const detectCollision = (cat: CatType, obstacle: ObstacleType) => {
    return (
      cat.x < obstacle.x + obstacle.width &&
      cat.x + 40 > obstacle.x &&
      cat.y < obstacle.y + obstacle.height &&
      cat.y + 40 > obstacle.y
    );
  };

  const handleJump = () => {
    if (!cat.jumping) {
      setCat(prevCat => ({ ...prevCat, jumping: true, dy: -12 })); // Adjusted jump
    }
  };

  const resetGame = () => {
    setCat({ x: 50, y: 360, dy: 0, jumping: false });
    setObstacles([]);
    setScore(0);
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-gray-100"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f3f4f6',
      }}
    >
      <div
        tabIndex={0}
        onKeyDown={handleJump}
        style={{
          outline: 'none',
          width: '1200px',
          height: '400px',
          border: '4px solid #333',
          position: 'relative',
          background: '#000',
        }}
      >
        <Cat x={cat.x} y={cat.y} />
        {obstacles.map((obstacle, index) => (
          <Obstacle
            key={index}
            x={obstacle.x}
            y={obstacle.y}
            image={obstacle.image}
          />
        ))}
        <div
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            fontWeight: 'bold',
            color: '#fff',
          }}
        >
          Score: {score}
        </div>
      </div>
    </div>
  );
};

export default Game;
