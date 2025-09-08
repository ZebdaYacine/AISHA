import { useState } from "react";

interface ProductCardProps {
  id: number | string;
  image: string;
  title: string;
  description: string;
  onBuy?: () => void;
  isClient?: boolean;
}

export default function ProductCard({
  image,
  title,
  description,
  onBuy,
  isClient = true,
}: ProductCardProps) {
  const [isImageLoading, setIsImageLoading] = useState(true);

  return (
    <div
      className="card bg-base-100 shadow-sm w-full flex flex-col border cursor-pointer 
                 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
    >
      <figure className="h-2/3 bg-light-text-secondary">
        {isImageLoading && (
          <div className="skeleton w-full h-full animate-pulse"></div>
        )}
        <img
          src={image}
          alt={title}
          className={`object-cover w-full h-full ${isImageLoading ? "hidden" : ""}`}
          onLoad={() => setIsImageLoading(false)}
        />
      </figure>
      <div className="card-body h-1/3">
        <h2 className="card-title">{title}</h2>
        <p className="line-clamp-2">{description}</p>
        {isClient && (
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={onBuy}>
              Buy Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
