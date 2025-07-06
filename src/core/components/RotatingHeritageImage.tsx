interface RotatingHeritageImageProps {
  imageSrc: string;
  imageAlt: string;
  animationDelay?: string;
  borderAnimationDelay?: string;
}

export default function RotatingHeritageImage({
  imageSrc,
  imageAlt,
  animationDelay = "0s",
  borderAnimationDelay = "0s",
}: RotatingHeritageImageProps) {
  return (
    <div className="relative group">
      <div
        className="w-48 h-48 rounded-full overflow-hidden shadow-2xl animate-float"
        style={{ animationDelay }}
      >
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
      </div>
      <div
        className="absolute inset-0 rounded-full border-4 border-base-content/30 animate-pulse"
        style={{ animationDelay: borderAnimationDelay }}
      ></div>
    </div>
  );
}
