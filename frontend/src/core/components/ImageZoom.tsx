import React, { useState, useRef } from "react";

interface ImageZoomProps {
  src: string;
  alt: string;
  className?: string;
}

const ImageZoom: React.FC<ImageZoomProps> = ({ src, alt, className }) => {
  const [zoom, setZoom] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const imageRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (imageRef.current) {
      const { left, top, width, height } =
        imageRef.current.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      setPosition({ x, y });
    }
  };

  return (
    <div
      ref={imageRef}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setZoom(true)}
      onMouseLeave={() => setZoom(false)}
      onMouseMove={handleMouseMove}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-300"
        style={{
          transform: zoom ? "scale(2)" : "scale(1)",
          transformOrigin: `${position.x}% ${position.y}%`,
          cursor: zoom ? "zoom-out" : "zoom-in",
        }}
      />
    </div>
  );
};

export default ImageZoom;
