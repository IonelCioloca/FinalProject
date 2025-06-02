import React, { useEffect, useRef, useState } from "react";

const AnimatedProgressBar = ({ current, total }) => {
  const [width, setWidth] = useState(0);
  const barRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const percent = Math.min((current / total) * 100, 100);
          setTimeout(() => setWidth(percent), 300);
        }
      },
      { threshold: 0.4 }
    );
    if (barRef.current) observer.observe(barRef.current);

    return () => observer.disconnect();
  }, [current, total]);

  return (
    <div className="animated-bar-wrapper" ref={barRef}>
      <div className="animated-bar-track">
        <div
          className="animated-bar-fill"
          style={{ width: `${width}%` }}
          aria-valuenow={width}
        />
      </div>
      <div className="animated-bar-info">
        <span>€{current.toLocaleString()}</span>
        <span>of €{total.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default AnimatedProgressBar;
