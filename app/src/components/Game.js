import React, { useState, useEffect } from 'react';

const Game = () => {
  const totalMineCount = 2;
  const [gamePositions, setGamePositions] = useState([]);
  const [submitCount, setSubmitCount] = useState(0);
  const [selectedCircles, setSelectedCircles] = useState([]);
  const [gameOver, setGameOver] = useState(false); // New state for tracking if the game is over

  useEffect(() => {
    const positions = Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      isMine: false,
      selected: false,
    }));

    // Randomly pick 2 positions to be mines
    const mineIndices = new Set();
    while (mineIndices.size < totalMineCount) {
      mineIndices.add(Math.floor(Math.random() * positions.length));
    }

    mineIndices.forEach((index) => {
      positions[index].isMine = true;
    });

    setGamePositions(positions);
  }, [totalMineCount]);

  const handlePositionClick = (id) => {
    if (gameOver) return; // Prevent selecting circles if the game is over

    const newSelectedCircles = [...selectedCircles];
    
    if (newSelectedCircles.includes(id)) {
      setSelectedCircles(newSelectedCircles.filter((circleId) => circleId !== id));
    } 
    else {
      if (newSelectedCircles.length < 2) {
        newSelectedCircles.push(id);
        setSelectedCircles(newSelectedCircles);
      } 
      else {
        newSelectedCircles.shift();
        newSelectedCircles.push(id); 
        setSelectedCircles(newSelectedCircles);
      }
    }
  };

  const clickedMinesCount = gamePositions.filter(
    (pos) => pos.isMine && selectedCircles.includes(pos.id)
  ).length;

  const handleSubmit = () => {
    if (gameOver) return; // Prevent submitting if the game is over

    if (clickedMinesCount === totalMineCount) {
      alert("You found all the mines!");
    } 
    else if (clickedMinesCount === 1) {
        setSubmitCount((prevCount) => prevCount + 1); 
        alert("You're 1 away!")
    }
    else {
      setSubmitCount((prevCount) => prevCount + 1); 
      alert("You did not find any of the fake articles. Try again!");
    }

    if (submitCount === 3) {
      setGameOver(true); 
      alert("Game Over! You've reached the maximum number of attempts.");
    }
  };

  return (
    <div className="w-full min-h-screen">
      <div className="w-full max-w-2xl mx-auto p-4">
        <div className="bg-light-blue p-6 rounded-xl shadow-lg mt-5">
          <div className="font-lato font-bold text-center mb-5 text-2xl">
            Find the fake news articles!
          </div>
          {/* Game Board */}
          <div className="bg-green h-64 rounded-lg mb-4 p-10 flex flex-col justify-center items-center">
            {/* Top row */}
            <div className="flex justify-center gap-40 mb-10">
              {gamePositions.slice(0, 3).map((pos) => (
                <div
                  key={pos.id}
                  className={`h-12 w-12 rounded-full cursor-pointer bg-dark-green
                    ${selectedCircles.includes(pos.id) ? 'border-4 border-warm-yellow' : 'border-4 border-transparent'}
                  `}
                  onClick={() => handlePositionClick(pos.id)}
                />
              ))}
            </div>
            {/* Bottom row */}
            <div className="flex justify-center gap-40 mt-5">
              {gamePositions.slice(3).map((pos) => (
                <div
                  key={pos.id}
                  className={`h-12 w-12 rounded-full cursor-pointer bg-dark-green
                    ${selectedCircles.includes(pos.id) ? 'border-4 border-warm-yellow' : 'border-4 border-transparent'}
                  `}
                  onClick={() => handlePositionClick(pos.id)}
                />
              ))}
            </div>
          </div>
          {/* Submit Counter and Circles */}
          <div className="flex justify-center flex-col items-center gap-4 mt-5">
            <div className="font-lato">
                Number of Tries Remaining:
            </div>
            <div className="flex gap-2">
              {/* Submit count */}
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className={`h-8 w-8 rounded-full border-2 
                    ${submitCount > index ? 'bg-red-500' : 'bg-transparent'}`}
                />
              ))}
            </div>
            <button
              className="bg-white hover:bg-gray-100 text-gray-800 font-lato font-semibold py-2 px-4 border-2 border-outline rounded-full shadow"
              onClick={handleSubmit}
              disabled={gameOver} 
            >
              Submit
            </button>
          </div>
          {gameOver && (
            <div className="text-center mt-4 text-xl font-bold text-red-600">
              Game Over! You've reached the maximum number of attempts.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Game;


