interface FloatingImageProps {
  imageSrc: string;
  imageAlt: string;
  size?: "sm" | "md" | "lg";
  position?:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "center-top"
    | "center-bottom"
    | "top-center-left"
    | "bottom-center-right"
    | "top-far-left"
    | "bottom-far-right"
    | "top-center-right"
    | "bottom-center-left"
    | "center-left"
    | "center-right";
  animationDelay?: string;
}

export default function FloatingImage({
  imageSrc,
  imageAlt,
  size = "md",
  position = "center-bottom",
  animationDelay = "0s",
}: FloatingImageProps) {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-20 h-20",
    lg: "w-32 h-32",
  };

  const positionClasses = {
    "top-left": "absolute top-20 left-10",
    "top-right": "absolute top-32 right-16",
    "bottom-left": "absolute bottom-24 left-20",
    "bottom-right": "absolute bottom-32 right-8",
    "center-top": "absolute top-8 left-1/4 transform -translate-x-1/2",
    "center-bottom": "absolute bottom-8 right-1/4 transform translate-x-1/2",
    "top-center-left":
      "absolute top-1/3 left-1/4 transform -translate-y-1/2 -translate-x-1/2",
    "bottom-center-right":
      "absolute bottom-1/3 right-1/4 transform translate-y-1/2 translate-x-1/2",
    "top-far-left": "absolute top-1/4 left-48",
    "bottom-far-right": "absolute bottom-1/4 right-48",
    "top-center-right":
      "absolute top-1/3 right-1/4 transform -translate-y-1/2 translate-x-1/2",
    "bottom-center-left":
      "absolute bottom-1/3 left-1/4 transform translate-y-1/2 -translate-x-1/2",
    "center-left": "absolute top-1/2 left-10 transform -translate-y-1/2",
    "center-right": "absolute top-1/2 right-10 transform -translate-y-1/2",
  };

  return (
    <div
      className={`${positionClasses[position]} ${sizeClasses[size]} rounded-full overflow-hidden shadow-lg animate-float`}
      style={{ animationDelay }}
    >
      <img
        src={imageSrc}
        alt={imageAlt}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
