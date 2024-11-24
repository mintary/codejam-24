import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import loading from "../assets/loading.lottie";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <DotLottieReact
          className="mb-0"
          src={loading}
          autoplay
          loop
          style={{ width: "200px", height: "200px" }}
        />
        <h1 className="animate-fadeIn text-xl text-grey-300">Loading...</h1>
      </div>
    </div>
  );
};

export default Loading;
