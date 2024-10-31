"use client";
import React, { useState, useEffect } from 'react';

type SpanState = {
  pos: { x: number; y: number };
  vel: { x: number; y: number };
  speed: { x: number; y: number };
  dir: { x: number; y: number };
  color: string;
};

const colors = [
  '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3',
  '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39',
  '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548', '#9e9e9e', '#607d8b'
];

// Function to randomly pick a color
const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

const Gravity: React.FC = () => {
  const [spanStates, setSpanStates] = useState<SpanState[]>([]);
  const buffer = 5; // Buffer size to prevent sidebar from showing

  useEffect(() => {
    const text = "Lorem ipsum dolor sit amet, consectetur adipisicing elit.";
    const arr = text.split('');

    // Initialize span states with random positions within window bounds minus the buffer
    const initialStates = arr.map(() => ({
      pos: {
        x: Math.random() * (window.innerWidth - 20 - buffer), // Span approx width minus buffer
        y: Math.random() * (window.innerHeight - 20 - buffer) // Span approx height minus buffer
      },
      vel: { x: -0.5 + Math.random(), y: -0.5 + Math.random() },
      speed: { x: 1, y: 1 },
      dir: { x: 1, y: 1 },
      color: getRandomColor()
    }));

    setSpanStates(initialStates);
  }, []);

  // Animation update function with boundary detection and bouncing
  useEffect(() => {
    const animateSpans = () => {
      setSpanStates((prevStates) =>
        prevStates.map((span) => {
          const nextX = span.pos.x + span.vel.x * span.speed.x * span.dir.x;
          const nextY = span.pos.y + span.vel.y * span.speed.y * span.dir.y;

          // Boundary checking to ensure the spans bounce back within window constraints minus the buffer
          const isBeyondXBounds = nextX <= buffer || nextX >= window.innerWidth - 20 - buffer; // Approx width minus buffer
          const isBeyondYBounds = nextY <= buffer || nextY >= window.innerHeight - 20 - buffer; // Approx height minus buffer

          return {
            ...span,
            pos: {
              x: isBeyondXBounds ? Math.max(buffer, Math.min(nextX, window.innerWidth - 20 - buffer)) : nextX,
              y: isBeyondYBounds ? Math.max(buffer, Math.min(nextY, window.innerHeight - 20 - buffer)) : nextY,
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
    <div>
      <p style={{ display: 'inline-block' }}>
        {spanStates.map((span, index) => (
          <span
            key={index}
            style={{
              position: 'absolute',
              color: span.color,
              left: `${span.pos.x}px`,
              top: `${span.pos.y}px`,
            }}
          >
            
            {String.fromCharCode(97 + index % 26)} {/* Loops letters a-z */}
            {/* For example String.fromCharCode(97) returns a, String.fromCharCode(98) returns b etc */}
          </span>
        ))}
      </p>
    </div>
  );
};

export default Gravity;
