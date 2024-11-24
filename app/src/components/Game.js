import React, { useState } from "react";

const Game = () => {
  const [currentMineCount, setCurrentMineCount] = useState(1);
  const totalMineCount = 2;

  const [gamePositions, setGamePositions] = useState([
    { id: 1, selected: false },
    { id: 2, selected: false },
    { id: 3, selected: false },
    { id: 4, selected: false },
    { id: 5, selected: false },
  ]);

  const handlePositionClick = (id) => {
    setGamePositions((positions) =>
      positions.map((pos) => ({
        ...pos,
        selected: pos.id === id ? !pos.selected : pos.selected,
      }))
    );
  };

  return (
    <div className="w-full min-h-screen bg-chrome-blue">
      <div className="w-full max-w-2xl mx-auto p-4">
        <div className="bg-light-blue p-6 rounded-xl shadow-lg">
          {/* Game Board */}
          <div className="bg-green h-64 rounded-lg mb-4 p-10 flex justify-center items-center">
            <div className="grid grid-cols-3 gap-40 h-full">
              {/* Top row */}
              <div
                className="h-12 w-12 rounded-full bg-dark-green border-4 border-dark-green cursor-pointer"
                onClick={() => handlePositionClick(1)}
              />
              <div
                className="h-12 w-12 rounded-full bg-dark-green border-4 border-dark-green cursor-pointer"
                onClick={() => handlePositionClick(2)}
              />
              <div
                className="h-12 w-12 rounded-full bg-dark-green border-4 border-dark-green cursor-pointer"
                onClick={() => handlePositionClick(3)}
              />
            </div>

            {/* Bottom row */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-40">
              <div
                className="h-12 w-12 rounded-full bg-dark-green border-4 border-dark-green cursor-pointer"
                onClick={() => handlePositionClick(4)}
              />
              <div
                className="h-12 w-12 rounded-full bg-dark-green border-4 border-dark-green cursor-pointer"
                onClick={() => handlePositionClick(5)}
              />
            </div>
          </div>

          {/* Submit */}
          <div class="flex justify-center items-center">
            <button class="bg-white hover:bg-gray-100 text-gray-800 font-lato font-semibold py-2 px-4 border-2 border-outline rounded-full shadow">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
