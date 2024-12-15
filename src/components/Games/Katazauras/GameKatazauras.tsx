import React, { useState, useEffect, useRef, useCallback } from 'react';
import Cat from './Cat';
import Obstacle from './Obstacle';
import obstacle1 from '@/images/katazaugasImages/obWall.png';
import obstacle2 from '@/images/katazaugasImages/obPoop.png';
import obstacle3 from '@/images/katazaugasImages/obVape.png';
import decoration1 from '@/images/katazaugasImages/cloud.png';
import decoration2 from '@/images/katazaugasImages/star.png';

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

interface DecorationType {
  x: number;
  y: number;
  width: number;
  height: number;
  image: string;
}

const obstacleImages = [obstacle1, obstacle2, obstacle3];
const decorationImages = [decoration1, decoration2];
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

  const [score, setScore] = useState<number>(0);
  const gameInterval = useRef<number | null>(null);
  const gameContainerRef = useRef<HTMLDivElement>(null); // after Start immediately focusses on game window
  const [obstacles, setObstacles] = useState<ObstacleType[]>([]);
  const [decorations, setDecorations] = useState<DecorationType[]>([]);
  const [gameOverMessage, setGameOverMessage] = useState<string | null>(null);
  const [isGameRunning, setIsGameRunning] = useState<boolean>(false);

  const updateGame = useCallback(() => {
    if (!isGameRunning) return;

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
        .map(obstacle => ({ ...obstacle, x: obstacle.x - 5 }))
        .filter(obstacle => obstacle.x + OBSTACLE_SIZE > 0);

      updatedObstacles.forEach(obstacle => {
        if (detectCollision(cat, obstacle)) {
          setIsGameRunning(false);
          setGameOverMessage(`Game Over! Final Score: ${score}`);
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

    setDecorations(prevDecorations => {
      const updatedDecorations = prevDecorations
        .map(decoration => ({ ...decoration, x: decoration.x - 2 }))
        .filter(decoration => decoration.x + decoration.width > 0);

      if (Math.random() < 0.01) {
        const randomImage =
          decorationImages[Math.floor(Math.random() * decorationImages.length)];
        updatedDecorations.push({
          x: 1200,
          y: Math.random() * 150,
          width: 50,
          height: 30,
          image: randomImage,
        });
      }

      return updatedDecorations;
    });
  }, [cat, score, isGameRunning]);

  useEffect(() => {
    if (isGameRunning) {
      gameInterval.current = window.setInterval(updateGame, 20);
    } else if (gameInterval.current) {
      clearInterval(gameInterval.current);
    }
    return () => {
      if (gameInterval.current !== null) {
        clearInterval(gameInterval.current);
      }
    };
  }, [updateGame, isGameRunning]);

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

  const startGame = () => {
    setGameOverMessage(null);
    setIsGameRunning(true);
    resetGame();

    if (gameContainerRef.current) {
      gameContainerRef.current.focus();
    }
  };

  const resetGame = () => {
    setCat({ x: 50, y: GROUND_LEVEL, dy: 0, jumping: false, jumpsLeft: 2 });
    setObstacles([]);
    setDecorations([]);
    setScore(0);
    setGameOverMessage(null);
  };

  return (
    <div
      ref={gameContainerRef}
      tabIndex={0}
      onKeyDown={handleJump}
      style={{
        outline: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#27272a',
      }}
    >
      {/* Game Window */}
      <div
        style={{
          position: 'relative',
          width: '1200px',
          height: '400px',
          border: '4px solid #333',
          background: '#172554',
          overflow: 'hidden',
        }}
      >
        {/* Decorations */}
        {decorations.map((decoration, index) => (
          <img
            key={index}
            src={decoration.image}
            alt="Decoration"
            style={{
              position: 'absolute',
              top: decoration.y,
              left: decoration.x,
              width: `${decoration.width}px`,
              height: `${decoration.height}px`,
            }}
          />
        ))}

        {/* Path */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: `${PATH_HEIGHT}px`,
            backgroundColor: '#60a5fa',
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

      {/* Buttons */}
      <div
        style={{
          marginTop: '20px',
          display: 'flex',
          gap: '10px',
        }}
      >
        <button
          onClick={startGame}
          style={{
            padding: '10px 20px',
            background: '#34d399',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '5px',
            fontWeight: 'bold',
          }}
        >
          Start Game
        </button>
        <button
          onClick={resetGame}
          style={{
            padding: '10px 20px',
            background: '#f472b6',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '5px',
            fontWeight: 'bold',
          }}
        >
          Restart Game
        </button>
      </div>

      {/* Game Over Message */}
      <div
        style={{
          marginTop: '20px',
          height: '30px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {gameOverMessage && (
          <div
            style={{
              padding: '10px 20px',
              background: '#93c5fd',
              color: 'white',
              borderRadius: '5px',
              fontWeight: 'bold',
            }}
          >
            {gameOverMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;
