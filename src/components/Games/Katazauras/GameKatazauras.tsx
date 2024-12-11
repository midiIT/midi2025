import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  jumpsLeft: number;
}

interface ObstacleType {
  x: number;
  y: number;
  width: number;
  height: number;
  image: string;
}

const obstacleImages = [obstacle1, obstacle2, obstacle3];
const GROUND_LEVEL = 320;
const PATH_HEIGHT = 40;
const CAT_SIZE = 40;
const OBSTACLE_SIZE = 40;

const Game: React.FC = () => {
  const [cat, setCat] = useState<CatType>({
    x: 50,
    y: GROUND_LEVEL,
    dy: 0,
    jumping: false,
    jumpsLeft: 2,
  });

  const [obstacles, setObstacles] = useState<ObstacleType[]>([]);
  const [score, setScore] = useState<number>(0);
  const gameInterval = useRef<number | null>(null);

  const updateGame = useCallback(() => {
    setCat(prevCat => {
      let newY = prevCat.y + prevCat.dy;
      let newDy = prevCat.dy + (prevCat.jumping ? 0.6 : 0);

      if (newY >= GROUND_LEVEL) {
        newY = GROUND_LEVEL;
        newDy = 0;
        return { ...prevCat, y: newY, dy: newDy, jumping: false, jumpsLeft: 2 };
      }

      return { ...prevCat, y: newY, dy: newDy };
    });

    setObstacles(prevObstacles => {
      const updatedObstacles = prevObstacles
        .map(obstacle => ({ ...obstacle, x: obstacle.x - 5 })) // Move obstacles left
        .filter(obstacle => obstacle.x + OBSTACLE_SIZE > 0); // Remove off-screen obstacles

      updatedObstacles.forEach(obstacle => {
        if (detectCollision(cat, obstacle)) {
          alert('Womp womp. Skill issue. Final Score: ' + score);
          resetGame();
        }
      });

      if (Math.random() < 0.02) {
        const randomImage =
          obstacleImages[Math.floor(Math.random() * obstacleImages.length)];
        updatedObstacles.push({
          x: 1200,
          y: GROUND_LEVEL + 10,
          width: OBSTACLE_SIZE,
          height: OBSTACLE_SIZE,
          image: randomImage,
        });
      }

      setScore(prevScore => prevScore + 1);
      return updatedObstacles;
    });
  }, [cat, score]);

  useEffect(() => {
    gameInterval.current = window.setInterval(updateGame, 20);
    return () => {
      if (gameInterval.current !== null) {
        clearInterval(gameInterval.current);
      }
    };
  }, [updateGame]);

  const detectCollision = (cat: CatType, obstacle: ObstacleType): boolean => {
    const safeMargin = 10;
    return (
      cat.x + safeMargin < obstacle.x + obstacle.width - safeMargin &&
      cat.x + CAT_SIZE - safeMargin > obstacle.x + safeMargin &&
      cat.y + safeMargin < obstacle.y + obstacle.height - safeMargin &&
      cat.y + CAT_SIZE - safeMargin > obstacle.y + safeMargin
    );
  };

  const handleJump = () => {
    setCat(prevCat => {
      if (prevCat.jumpsLeft > 0) {
        return {
          ...prevCat,
          jumping: true,
          dy: -12,
          jumpsLeft: prevCat.jumpsLeft - 1,
        };
      }
      return prevCat;
    });
  };

  const resetGame = () => {
    setCat({ x: 50, y: GROUND_LEVEL, dy: 0, jumping: false, jumpsLeft: 2 });
    setObstacles([]);
    setScore(0);
  };

  return (
    <div
      tabIndex={0}
      onKeyDown={handleJump}
      style={{
        outline: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#27272a',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '1200px',
          height: '400px',
          border: '4px solid #333',
          background: '#60a5fa',
        }}
      >
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: `${PATH_HEIGHT}px`,
            backgroundColor: '#7dd3fc',
          }}
        />

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
