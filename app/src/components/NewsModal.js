import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import plantleaves from "../assets/plantleaves.png";
import "./Gameboard.css";

const NewsModal = ({ isVisible, claim, position }) => {
  if (!isVisible) return null;

  return (
    <div
      className="absolute z-40 bg-white p-4 rounded shadow-md"
      style={{
        top: position?.top,
        left: position?.left,
      }}
    >
      <p className="text-sm font-medium">{claim}</p>
    </div>
  );
};

export default NewsModal;
