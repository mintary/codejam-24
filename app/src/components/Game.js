import React, { useState, useEffect } from 'react';

const Game = () => {
  const totalMineCount = 2;
  const [gamePositions, setGamePositions] = useState([]);

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
    setGamePositions((positions) =>
      positions.map((pos) =>
        pos.id === id ? { ...pos, selected: !pos.selected } : pos
      )
    );
  };

  const clickedMinesCount = gamePositions.filter(
    (pos) => pos.isMine && pos.selected
  ).length;

  return (
    <div className="w-full min-h-screen bg-chrome-blue">
      <div className="w-full max-w-2xl mx-auto p-4">
        <div className="bg-light-blue p-6 rounded-xl shadow-lg">
          {/* Game Board */}
          <div className="bg-green h-64 rounded-lg mb-4 p-10 flex justify-center items-center">
            <div className="grid grid-cols-3 gap-40 h-full">
              {/* Top row */}
              {gamePositions.slice(0, 3).map((pos) => (
                <div
                  key={pos.id}
                  className={`h-12 w-12 rounded-full border-4 cursor-pointer ${pos.selected ? 'bg-yellow-500' : 'bg-dark-green'} ${
                    pos.selected ? 'border-yellow-500' : 'border-dark-green'
                  }`}
                  onClick={() => handlePositionClick(pos.id)}
                />
              ))}
            </div>

            {/* Bottom row */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-40">
              {gamePositions.slice(3).map((pos) => (
                <div
                  key={pos.id}
                  className={`h-12 w-12 rounded-full border-4 cursor-pointer ${pos.selected ? 'bg-yellow-500' : 'bg-dark-green'} ${
                    pos.selected ? 'border-yellow-500' : 'border-dark-green'
                  }`}
                  onClick={() => handlePositionClick(pos.id)}
                />
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-center items-center">
            <button className="bg-white hover:bg-gray-100 text-gray-800 font-lato font-semibold py-2 px-4 border-2 border-outline rounded-full shadow">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;

