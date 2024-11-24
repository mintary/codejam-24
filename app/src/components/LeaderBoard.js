import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthProvider";

const Leaderboard = () => {
  const [players, setPlayers] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [highestScore, setHighestScore] = useState(0);
  const [lastPlayed, setLastPlayer] = useState(null);
  const [sortOrder, setSortOrder] = useState("desc");
  const [friendName, setFriendName] = useState("");
  const auth = useAuth();
  const username = auth ? auth.username : "";
  console.log(username);
  console.log(players);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeaderboard = async (username) => {
      try {
        const response = await fetch(`/friend?username=${username}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();

        if (response.ok) {
          setPlayers(data.friends);
        } else {
          console.error("Failed to fetch leaderboard:");
        }
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
      }
    };

    const fetchUser = async (username) => {
      try {
        const response = await fetch(`/get_score?username=${username}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();

        if (response.ok) {
          const user = {
            username: username,
            total_score: data.total_score,
            highest_score: data.highest_score,
            last_played: data.last_played || "N/A",
          };
          setPlayers((prevPlayers) => [user, ...prevPlayers]);
          setTotalScore(user.total_score);
          setHighestScore(user.highest_score);
          setLastPlayer(user.last_played);
        } else {
          console.error("Failed to fetch user score:", data.message);
        }
      } catch (err) {
        console.error("Error fetching user score:", err);
      }
    };

    if (username && username != "") {
      fetchLeaderboard(username);
      fetchUser(username);
    }
  }, [username]);

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

  const handleAddFriend = async () => {
    try {
      const response = await fetch("/add-friend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, friend: friendName }),
      });
      const data = await response.json();

      if (response.ok) {
        console.log(data.friends);
        setPlayers(data.friends);
      } else {
        console.error("Failed to fetch leaderboard:", data.message);
      }
    } catch (err) {
      console.error("Error fetching leaderboard:", err);
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
        <table className="table-auto w-full text-left">
          <thead>
            <tr>
              <th className="border px-4 py-2">Rank</th>
              <th className="border px-4 py-2">Username</th>
              <th className="border px-4 py-2">Total Score</th>
              <th className="border px-4 py-2">Highest Score</th>
              <th className="border px-4 py-2">Last Played</th>
            </tr>
          </thead>
          <tbody>
            {players &&
              players.map((player, index) => (
                <tr key={player.username}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{player.username}</td>
                  <td className="border px-4 py-2">{player.total_score}</td>
                  <td className="border px-4 py-2">{player.highest_score}</td>
                  <td className="border px-4 py-2">
                    {player.last_played || "N/A"}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="text-center mt-4">
          <button
            onClick={sortLeaderboard}
            className="text-grey px-4 py-2 rounded-md hover:text-gray"
          >
            Sort by Total Score (
            {sortOrder === "asc" ? "Ascending" : "Descending"})
          </button>
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
              onClick={handleAddFriend}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
            >
              Add Friend
            </button>
          </div>
        </div>
      </div>
      <div className="mt-10 text-center">
        <button
          onClick={() => navigate("/")}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
        >
          Go Back to Home
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;
