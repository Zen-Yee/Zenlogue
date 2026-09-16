import React, { useState, useEffect, useRef, useCallback } from "react";
import IconButton from "../../ui/Button/IconButton/IconButton";
import "./Carousel.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AUTO_PLAY_INTERVAL = 8000;

function Carousel({ children, className = "" }) {
  const items = React.Children.toArray(children);
  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);

  const goPrev = useCallback(() => {
    setIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  }, [items.length]);

  const goNext = useCallback(() => {
    setIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  }, [items.length]);

  // Starts (or restarts) the auto-play timer
  const resetInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(goNext, AUTO_PLAY_INTERVAL);
  }, [goNext]);

  useEffect(() => {
    resetInterval();
    return () => clearInterval(intervalRef.current);
  }, [resetInterval]);

  // Wrap manual navigation so it resets the timer too
  const handlePrev = () => {
    goPrev();
    resetInterval();
  };

  const handleNext = () => {
    goNext();
    resetInterval();
  };

  const handleDotClick = (i) => {
    setIndex(i);
    resetInterval();
  };

  return (
    <div className={`carousel-container ${className}`}>
      <IconButton
        icon={ChevronLeft}
        size="30"
        color="#FFFFFF"
        onClick={handlePrev}
      />

      <div className="carousel-indicator-container">
        <div className="carousel-indicator-track">
          {items.map((_, i) => (
            <div
              key={i}
              className={`carousel-dot ${i === index ? "active" : ""}`}
              onClick={() => handleDotClick(i)}
            ></div>
          ))}
        </div>
      </div>

      <div className="carousel-cards-container">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {items.map((item, i) => (
            <div className="carousel-slide" key={i}>
              {item}
            </div>
          ))}
        </div>
      </div>

      <IconButton
        icon={ChevronRight}
        size="30"
        color="#FFFFFF"
        onClick={handleNext}
      />

      <div className="carousel-text-container"></div>
    </div>
  );
}

export default Carousel;
