import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Leaderboard = () => {
  const [players, setPlayers] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc"); 
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching the leaderboard data from an API or local storage
    const fetchedPlayers = [
      { name: "Alice", score: 500 },
      { name: "Bob", score: 300 },
      { name: "Charlie", score: 450 },
      { name: "David", score: 200 },
    ];
    setPlayers(fetchedPlayers);
  }, []);

  const sortLeaderboard = () => {
    const sortedPlayers = [...players].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.score - b.score;
      } else {
        return b.score - a.score;
      }
    });
    setPlayers(sortedPlayers);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc"); 
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6 mt-40">
        <h1 className="text-3xl font-bold text-center mb-1">Leaderboard</h1>
        <div className="space-y-4">
          {players.map((player, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b border-gray-300 py-2"
            >
              <div className="flex items-center">
                <span className="font-semibold">{player.name}</span>
              </div>
              <div className="text-lg font-bold">{player.score}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10 text-center">
        <button
          onClick={() => navigate("/")}
          className="w-40 bg-green-blue hover:bg-dark-green-blue text-white py-3 rounded-md font-semibold focus:outline-none"
        >
          Go Back to Home
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;
