import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import loading from "../assets/loading.lottie";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <DotLottieReact
          className="w-60 h-60 mb-0"
          src={loading}
          autoplay
          loop
        />
        <h1 className="animate-fadeIn text-color-grey">Loading...</h1>
      </div>
    </div>
  );
};

export default Loading;
