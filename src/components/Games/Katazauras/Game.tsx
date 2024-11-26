import React, { useState, useEffect, useRef } from 'react';
import Cat from './Cat';
import Obstacle from './Obstacle';
import obstacle1 from '@/images/katazaugasImages/obWall.png';
import obstacle2 from '@/images/katazaugasImages/obPoop.png';
import obstacle3 from '@/images/katazaugasImages/obVape.png';

interface CatType {
  x: number;
  y: number;
  dy: number; // for jumping and gravity
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
const GROUND_LEVEL = 320; // where lands
const PATH_HEIGHT = 40;

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
  const gameInterval = useRef<number | null>(null); // starts as null and will hold a number later

  useEffect(() => {
    const updateGame = () => {
      setCat(prevCat => {
        let newY = prevCat.y + prevCat.dy;
        let newDy = prevCat.dy + (prevCat.jumping ? 0.6 : 0); // Gravity

        if (newY >= GROUND_LEVEL) {
          newY = GROUND_LEVEL;
          newDy = 0;
          return {
            ...prevCat,
            y: newY,
            dy: newDy,
            jumping: false,
            jumpsLeft: 2, // For double jum
          };
        }

        return { ...prevCat, y: newY, dy: newDy };
      });

      setObstacles(prevObstacles => {
        const updatedObstacles = prevObstacles
          .map(obstacle => ({ ...obstacle, x: obstacle.x - 5 })) // Move obstacles to the left
          .filter(obstacle => obstacle.x + obstacle.width > 0); // Remove obstacles that go off-screen

        updatedObstacles.forEach(obstacle => {
          if (detectCollision(cat, obstacle)) {
            alert('Womp Womp. Skill issue. Final Score: ' + score);
            resetGame();
          }
        });

        if (Math.random() < 0.02) {
          const randomImage =
            obstacleImages[Math.floor(Math.random() * obstacleImages.length)];
          updatedObstacles.push({
            x: 1200,
            y: GROUND_LEVEL + 10, // + 10 so that obstacles would be on the ground (no idea why they are not)
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
    const safeMargin = 10; // to reduse collision
    return (
      cat.x + safeMargin < obstacle.x + obstacle.width - safeMargin &&
      cat.x + 40 - safeMargin > obstacle.x + safeMargin &&
      cat.y + safeMargin < obstacle.y + obstacle.height - safeMargin &&
      cat.y + 40 - safeMargin > obstacle.y + safeMargin
    );
  };

  // const handleJump = () => { // only 1 jump
  //   if (!cat.jumping) {
  //     setCat((prevCat) => ({ ...prevCat, jumping: true, dy: -12 }));
  //   }
  // };

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
      return prevCat; // No change if no jumps are left
    });
  };

  const resetGame = () => {
    setCat({ x: 50, y: GROUND_LEVEL, dy: 0, jumping: false, jumpsLeft: 2 });
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
        backgroundColor: '#27272a',
        overflow: 'hidden',
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
          background: '#60a5fa', // real background - like sky
        }}
      >
        {/* Path/ground line */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: `${PATH_HEIGHT}px`,
            backgroundColor: '#7dd3fc', // path color - lighter blue like snow
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
