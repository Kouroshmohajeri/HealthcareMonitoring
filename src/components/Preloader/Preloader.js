import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import "./Preloader.css";

const Preloader = ({ onComplete }) => {
  const [fadeOutLogo, setFadeOutLogo] = useState(false);
  const [expandCircle, setExpandCircle] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setFadeOutLogo(true); // Fading out logo
    }, 1300); // Logo displayed

    const timer2 = setTimeout(() => {
      setExpandCircle(true); // Circle expansion
    }, 2100); // Logo faded out

    const timer3 = setTimeout(() => {
      onComplete(); // Remove Preloader
    }, 3100); // Circle expanded

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <Box
      className={`preloader-container ${expandCircle ? "circle-expand" : ""}`}
    >
      <img
        src="/logo.svg"
        alt="Logo"
        className={`preloader-logo ${fadeOutLogo ? "fade-out" : ""}`}
      />
    </Box>
  );
};

export default Preloader;
