import React, { useEffect, useRef } from 'react';

const InteractiveTitle = ({ text }) => {
  const titleRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = titleRef.current.getBoundingClientRect();
      const xPercentage = (clientX - left) / width;
      const yPercentage = (clientY - top) / height;
      const xOffset = (xPercentage - 0.5) * 40;
      const yOffset = (yPercentage - 0.5) * 40;
      const shadow = `${xOffset}px ${yOffset}px 20px rgba(0, 0, 0, 0.5)`;
      titleRef.current.style.textShadow = shadow; // Apply text shadow
    };
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <h1
      ref={titleRef}
      className="text-8xl font-bold mb-4 text-neutral-content"
      style={{ transition: 'text-shadow 0.1s' }}
    >
      {text}
    </h1>
  );
};

export default InteractiveTitle;
