import Board from './components/Board';
import UpcomingBlocks from './components/UpcomingBlocks';
import { useTetris } from './hooks/useTetris';
import { useState, useEffect } from 'react';

function App() {
  const { board, startGame, isPlaying, score, upcomingBlocks, resetGame } = useTetris();
  const [showGameOver, setShowGameOver] = useState(false);

  useEffect(() => {
    if (!isPlaying && board.some(row => row.some(cell => cell !== 'Empty'))) {
      setShowGameOver(true);
    }
  }, [isPlaying, board]);

  const handleRestart = () => {
    setShowGameOver(false);
    resetGame();
    startGame();
  };

  return (
    <div className="app">
      <h1 className="text-center [grid-area:title]">Tetris</h1>
      <Board currentBoard={board} />
      <div className="controls">
        <h2>Score: {score}</h2>
        {isPlaying ? (
          <UpcomingBlocks upcomingBlocks={upcomingBlocks} />
        ) : (
          <button 
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            onClick={startGame}
          >
            New Game
          </button>
        )}
      </div>

      {showGameOver && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-11/12 text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Game Over!</h2>
            <p className="text-xl mb-6 text-gray-700">Final Score: {score}</p>
            <button 
              className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors font-semibold"
              onClick={handleRestart}
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;