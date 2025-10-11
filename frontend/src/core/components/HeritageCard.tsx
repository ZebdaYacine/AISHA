interface HeritageCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  animationDelay?: string;
  animationType?: "slide-up" | "slide-rtl";
}

export default function HeritageCard({
  imageSrc,
  imageAlt,
  title,
  description,
  animationDelay = "0s",
  animationType = "slide-up",
}: HeritageCardProps) {
  const animationClass =
    animationType === "slide-rtl" ? "animate-slide-rtl" : "animate-slide-up";
  return (
    <div
      className={`cursor-pointer card bg-base-100  transition-all duration-500 transform hover:-translate-y-2 ${animationClass}`}
      style={{ animationDelay }}
    >
      <figure className="px-6 pt-6">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="rounded-xl h-64 w-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </figure>
      <div className="card-body text-center">
        <h3 className="card-title text-xl text-primary justify-center">
          {title}
        </h3>
        <p className="text-base-content/70">{description}</p>
      </div>
    </div>
  );
}
