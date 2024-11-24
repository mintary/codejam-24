import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthProvider";

const Leaderboard = () => {
  const [players, setPlayers] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");
  const [friendName, setFriendName] = useState("");
  const [friendScore, setFriendScore] = useState("");
  const auth = useAuth();
  const username = auth ? auth.username : "";

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

  const handleAddFriend = () => {
    if (friendName) {
      const newFriend = { name: friendName, score: parseInt(friendScore) };
      setPlayers([...players, newFriend]);
      setFriendName("");
      setFriendScore("");
    } else {
      alert("Please enter both a name and a score.");
    }
  };

  if (!username || username === "") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold">
            You must be signed in to view this.
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6 mt-40">
        <h1 className="text-3xl font-bold text-center mb-4">Leaderboard</h1>
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
      <div className="mt-6 max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Add a Friend</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Friend's Name
            </label>
            <input
              type="text"
              value={friendName}
              onChange={(e) => setFriendName(e.target.value)}
              placeholder="Enter friend's name"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="align-items-right">
            <button
              type="submit"
              className="w-20 bg-green-blue hover:bg-dark-green-blue text-white py-3 rounded-md font-semibold focus:outline-none"
            >
              Add
            </button>
          </div>
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
