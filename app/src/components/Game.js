import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import plantleaves from "../assets/plantleaves.png";
import "./Gameboard.css";
import NewsModal from "../components/NewsModal";

const Modal = ({ isVisible, title, message, onNavigate }) => {
  const navigate = useNavigate();

  if (!isVisible) return null;

  const handleNavigateLeaderboard = () => {
    navigate("/leaderboard");
  };

  return (
    <div className="absolute inset-0 z-30 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-bold text-center mb-4">{title}</h2>
        <p className="text-center mb-6">{message}</p>
        <div className="flex justify-center">
          <button
            className="bg-green-blue hover:bg-dark-green-blue text-white font-semibold py-2 px-4 rounded"
            onClick={handleNavigateLeaderboard}
          >
            Go to Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
};

const Game = ({ claims }) => {
  const totalWeedCount = 2;
  const [gamePositions, setGamePositions] = useState([]);
  const [submitCount, setSubmitCount] = useState(0);
  const [selectedCircles, setSelectedCircles] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [oneAway, setOneAway] = useState(false);
  const [shakeCircles, setShakeCircles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("Game Over");
  const [modalMessage, setModalMessage] = useState(
    "You've reached the maximum number of attempts. Better luck next time!"
  );
  const [hoveredCircle, setHoveredCircle] = useState(null);
  const [hoverPosition, setHoverPosition] = useState(null);

  const shuffleAnswers = (claims) => {
    const shuffledClaims = [...claims];
    for (let i = shuffledClaims.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledClaims[i], shuffledClaims[j]] = [
        shuffledClaims[j],
        shuffledClaims[i],
      ];
    }
    return shuffledClaims;
  };

  const shuffledClaims = shuffleAnswers(claims);

  useEffect(() => {
    const positions = Array.from({ length: 7 }, (_, i) => ({
      id: i + 1,
      isWeed: shuffledClaims[i].rating === "false",
      selected: false,
      claim: shuffledClaims[i]?.claim,
    }));

    const weedIndices = new Set();
    shuffledClaims.forEach((claim, index) => {
      if (claim.rating === "false") {
        weedIndices.add(index);
      }
    });

    weedIndices.forEach((index) => {
      positions[index].isWeed = true;
    });

    setGamePositions(positions);
  }, [totalWeedCount]);

  const handlePositionClick = (id) => {
    if (gameOver) return;
    const newSelectedCircles = [...selectedCircles];

    if (newSelectedCircles.includes(id)) {
      setSelectedCircles(
        newSelectedCircles.filter((circleId) => circleId !== id)
      );
    } else {
      if (newSelectedCircles.length < 2) {
        newSelectedCircles.push(id);
        setSelectedCircles(newSelectedCircles);
      } else {
        newSelectedCircles.shift();
        newSelectedCircles.push(id);
        setSelectedCircles(newSelectedCircles);
      }
    }
  };

  const handleHoverEnter = (pos, e) => {
    const rect = e.target.getBoundingClientRect();
    console.log(rect);
    setHoverPosition({
      top: rect.top,
      left: rect.left,
    });
    setHoveredCircle(pos);
  };

  const handleHoverLeave = () => {
    setHoveredCircle(null);
    setHoverPosition(null);
  };

  const clickedWeedCount = gamePositions.filter(
    (pos) => pos.isWeed && selectedCircles.includes(pos.id)
  ).length;

  const handleSubmit = () => {
    if (gameOver) return;

    if (clickedWeedCount === totalWeedCount) {
      setModalTitle("You Won!");
      setModalMessage("Congratulations! You found all the weeds!");
      setGameOver(true);
      setShowModal(true);
    } else if (clickedWeedCount === 1) {
      setSubmitCount((prevCount) => prevCount + 1);
      setOneAway(true);
      setTimeout(() => setOneAway(false), 2000);
    } else {
      setSubmitCount((prevCount) => prevCount + 1);
      setShakeCircles(selectedCircles);
      setTimeout(() => setShakeCircles([]), 500);
    }

    if (submitCount === 3 && clickedWeedCount !== totalWeedCount) {
      setGameOver(true);
      setShowModal(true);
    }
  };

  return (
    <div className="w-full min-h-screen relative bg-gray-100">
      {/* Game Content */}
      <div className="w-full max-w-2xl mx-auto p-4 relative z-10">
        <div className="p-6 mt-40 mb-20 relative">
          <div className="font-lato font-bold text-center mb-5 text-2xl">
            Find the fake news!
          </div>
          {/* Game Board */}
          <div className="bg-green h-[400px] rounded-lg mb-4 p-10 flex flex-col justify-center items-center relative z-20 shadow-gameboard">
            <div className="flex justify-center gap-20 mb-10">
              {gamePositions.slice(0, 3).map((pos) => (
                <div
                  key={pos.id}
                  className={`relative h-16 w-16 rounded-full cursor-pointer bg-brown flex justify-center items-center ${
                    selectedCircles.includes(pos.id)
                      ? "border-4 border-warm-yellow"
                      : "border-4 border-transparent"
                  } ${shakeCircles.includes(pos.id) ? "shake" : ""}`}
                  onClick={() => handlePositionClick(pos.id)}
                  onMouseEnter={(e) => handleHoverEnter(pos, e)}
                  onMouseLeave={handleHoverLeave}
                >
                  <img
                    src={plantleaves}
                    alt="Plant Leaves"
                    className="h-12 w-12 object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-20 mt-5">
              {gamePositions.slice(3).map((pos) => (
                <div
                  key={pos.id}
                  className={`relative h-16 w-16 rounded-full cursor-pointer bg-brown flex justify-center items-center ${
                    selectedCircles.includes(pos.id)
                      ? "border-4 border-warm-yellow"
                      : "border-4 border-transparent"
                  } ${shakeCircles.includes(pos.id) ? "shake" : ""}`}
                  onClick={() => handlePositionClick(pos.id)}
                  onMouseEnter={(e) => handleHoverEnter(pos, e)}
                  onMouseLeave={handleHoverLeave}
                >
                  <img
                    src={plantleaves}
                    alt="Plant Leaves"
                    className="h-12 w-12 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Submit Counter */}
          <div className="flex justify-center flex-col items-center gap-4 mt-5">
            <div className="font-lato">Number of Tries Remaining:</div>
            <div className="flex gap-2">
              {Array.from({ length: 4 }).map((_, index) =>
                index >= submitCount ? (
                  <div
                    key={index}
                    className="h-6 w-6 rounded-full border-black border-2 bg-warm-yellow"
                  />
                ) : null
              )}
            </div>
            <button
              className={`bg-white hover:bg-gray-100 text-gray-800 font-lato font-semibold py-2 px-4 border-2 border-black rounded-full shadow ${
                selectedCircles.length !== 2
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={handleSubmit}
              disabled={selectedCircles.length !== 2 || gameOver}
            >
              Submit
            </button>
          </div>
          {oneAway && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 border-2 border-black bg-white text-black px-4 py-2 rounded-md shadow-lg">
              One Away!
            </div>
          )}
          <NewsModal
            isVisible={!!hoveredCircle}
            claim={hoveredCircle?.claim}
            position={hoverPosition}
          />
        </div>
      </div>
      <Modal isVisible={showModal} title={modalTitle} message={modalMessage} />
    </div>
  );
};

export default Game;
