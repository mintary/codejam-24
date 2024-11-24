import React from "react";
import Loading from "../components/Loading";

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="overlay">
        <Loading />
      </div>
    </div>
  );
};

export default LoadingScreen;
