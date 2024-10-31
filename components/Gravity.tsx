"use client";
import React, { useState, useEffect } from "react";

type SpanState = {
  pos: { x: number; y: number };
  vel: { x: number; y: number };
  speed: { x: number; y: number };
  dir: { x: number; y: number };
  color: string;
  string: string;
};

const colors = [
  "#f44336",
  "#e91e63",
  "#9c27b0",
  "#673ab7",
  "#3f51b5",
  "#2196f3",
  "#03a9f4",
  "#00bcd4",
  "#009688",
  "#4caf50",
  "#8bc34a",
  "#cddc39",
  "#ffeb3b",
  "#ffc107",
  "#ff9800",
  "#ff5722",
  "#795548",
  "#9e9e9e",
  "#607d8b",
];

const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

type GravityProps = {
  wordsArr: string[];
};

const Gravity: React.FC<GravityProps> = ({ wordsArr }) => {
  const [spanStates, setSpanStates] = useState<SpanState[]>([]);
  const buffer = 2; // Buffer size to prevent sidebar from showing
  const charW = 10;

  useEffect(() => {
    const arr = wordsArr;

    // Initialize span states with random positions within window bounds minus the buffer
    const initialStates = arr.map((item) => ({
      pos: {
        x: Math.random() * (window.innerWidth - item.length * charW - buffer), // Span approx width minus buffer
        y: Math.random() * (window.innerHeight - item.length * charW - buffer), // Span approx height minus buffer
      },
      vel: { x: -0.5 + Math.random(), y: -0.5 + Math.random() },
      speed: { x: 2, y: 2 },
      dir: { x: 1, y: 1 },
      color: getRandomColor(),
      string: item as string,
    }));

    setSpanStates(initialStates);
  }, [wordsArr]);

  // Animation update function with boundary detection and bouncing
  useEffect(() => {
    const animateSpans = () => {
      setSpanStates((prevStates) =>
        prevStates.map((span) => {
          const nextX = span.pos.x + span.vel.x * span.speed.x * span.dir.x;
          const nextY = span.pos.y + span.vel.y * span.speed.y * span.dir.y;

          // Boundary checking to ensure the spans bounce back within window constraints minus the buffer
          const isBeyondXBounds =
            nextX <= buffer ||
            nextX >= window.innerWidth - span.string.length * charW - buffer; // Approx width minus buffer
          const isBeyondYBounds =
            nextY <= buffer ||
            nextY >= window.innerHeight - span.string.length * charW - buffer; // Approx height minus buffer

          return {
            ...span,
            pos: {
              x: isBeyondXBounds
                ? Math.max(
                    buffer,
                    Math.min(
                      nextX,
                      window.innerWidth - span.string.length * charW - buffer
                    )
                  )
                : nextX,
              y: isBeyondYBounds
                ? Math.max(
                    buffer,
                    Math.min(
                      nextY,
                      window.innerHeight - span.string.length * charW - buffer
                    )
                  )
                : nextY,
            },
            dir: {
              x: isBeyondXBounds ? span.dir.x * -1 : span.dir.x,
              y: isBeyondYBounds ? span.dir.y * -1 : span.dir.y,
            },
          };
        })
      );

      requestAnimationFrame(animateSpans);
    };

    const animationId = requestAnimationFrame(animateSpans);
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Render the spans
  return (
    <div className="z-10">
      <p className="inline-block">
        {spanStates.map((span, index) => (
          <span
            key={index}
            style={{
              position: "absolute",
              color: span.color,
              left: `${span.pos.x}px`,
              top: `${span.pos.y}px`,
            }}
          >
            {span.string}
            {/* windowInnerWidth: {window.innerWidth}
            boundary: {window.innerWidth-(span.string.length*20)-buffer} */}
          </span>
        ))}
      </p>
    </div>
  );
};

export default Gravity;
