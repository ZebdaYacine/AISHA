interface ProductCardProps {
  id: number;
  image: string;
  title: string;
  description: string;
  onBuy?: () => void;
}

export default function ProductCard({
  image,
  title,
  description,
  onBuy,
}: ProductCardProps) {
  return (
    <div className="card bg-base-100 shadow-sm w-full flex flex-col border">
      <figure className="h-2/3 bg-light-text-secondary">
        <img src={image} alt={title} />
      </figure>
      <div className="card-body h-1/3">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={onBuy}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
