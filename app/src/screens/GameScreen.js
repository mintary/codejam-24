import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // To handle navigation
import Game from "../components/Game";
import LoadingScreen from "./LoadingScreen";
import GameWelcome from "../components/GameWelcome";

const GameScreen = () => {
  const [claims, setClaims] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isCategorySelected, setIsCategorySelected] = useState(false);
  const navigate = useNavigate();

  const handleCategorySelect = async (category) => {
    setLoading(true);
    setIsCategorySelected(true);
    try {
      const response = await fetch(`/get-question?category=${category}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await response.json();
      const combinedClaims = [
        ...res.right_claims.map((claim) => ({ claim, rating: "true" })),
        ...res.wrong_claims.map((claim) => ({ claim, rating: "false" })),
      ];
      setClaims(combinedClaims);
    } catch (err) {
      console.error("Error fetching claims:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isCategorySelected) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mt-40 mb-20">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Weed Out
          </h1>

          <h3 className="text-xl font-semibold text-center text-gray-700 mb-6">
            Choose a category
          </h3>

          <div className="flex justify-center gap-6">
            <button
              onClick={() => handleCategorySelect("Politics")}
              className="bg-green-blue hover:bg-dark-green-blue text-white py-3 px-6 rounded-md font-semibold focus:outline-none"
            >
              Politics
            </button>

            <button
              onClick={() => handleCategorySelect("Science")}
              className="bg-green-blue hover:bg-dark-green-blue text-white py-3 px-6 rounded-md font-semibold focus:outline-none"
            >
              Science
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return <LoadingScreen />;
  }

  return claims ? <Game claims={claims} /> : <LoadingScreen />;
};

export default GameScreen;
