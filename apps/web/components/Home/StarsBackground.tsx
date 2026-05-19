"use client"

import { useState, useEffect } from "react";

export default function StarsBackground() {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generated = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 3,
      delay: Math.random() * 5,
    }));

    // setStars(generated);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {stars.map((star) => (
        <span
          // key={star.id}
          className="absolute rounded-full bg-[#c9a84c] opacity-70 animate-pulse"
          style={{
            // top: `${star.top}%`,
            // left: `${star.left}%`,
            // width: `${star.size}px`,
            // height: `${star.size}px`,
            // animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  );
}