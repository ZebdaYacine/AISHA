import { useState, memo } from "react";
import ModalBuyProduct from "./ModalBuyProduct";

interface ProductCardProps {
  id: string;
  image: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  onBuy?: () => void;
  onEdit?: () => void;
  onMore?: () => void;
  toggelMore?: boolean;
  isClient?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = memo(
  ({
    id,
    image,
    title,
    description,
    price,
    stock,
    onBuy,
    onEdit,
    onMore,
    toggelMore = false,
    isClient = true,
  }) => {
    const [isImageLoading, setIsImageLoading] = useState(true);
    const modalId = `modal_buy_${id}`;

    const handleBuyClick = () => {
      (document.getElementById(modalId) as HTMLDialogElement)?.showModal();
      if (onBuy) {
        onBuy();
      }
    };

    return (
      <>
        <div
          className="card bg-white shadow-md w-full flex flex-col border 
                   cursor-pointer hover:shadow-xl transition-all duration-300 
                   transform hover:scale-105 rounded-2xl overflow-hidden"
        >
          {/* Full image */}
          <div className="relative w-full h-96 bg-gray-100">
            {isImageLoading && (
              <div className="skeleton w-full h-full animate-pulse"></div>
            )}
            <img
              src={image}
              alt={title}
              loading="lazy"
              className={`w-full h-full object-cover transition-opacity duration-500 ${
                isImageLoading ? "opacity-0" : "opacity-100"
              }`}
              onLoad={() => setIsImageLoading(false)}
            />
          </div>

          {/* Content */}
          <div className="card-body p-4 space-y-3">
            <h2 className="card-title text-xl font-bold text-gray-800">
              {title}
            </h2>

            {/* Short description only */}
            {toggelMore ? (
              <p className="text-gray-600">{description}</p>
            ) : (
              <p className="text-gray-600 line-clamp-2">
                {description.slice(0, 100)} .....
              </p>
            )}

            {/* Get more button */}
            <button
              className="text-blue-600 text-sm hover:underline focus:outline-none"
              onClick={onMore}
            >
              {toggelMore ? "Show Less" : "Read More"}
            </button>

            {/* Price, stock & actions */}
            <div className="flex justify-between items-center pt-2 border-t border-gray-200">
              <div>
                <p className="text-lg font-semibold text-gray-800">
                  {price} DZD
                </p>
                <p className="text-xs text-gray-500">Stock: {stock} peices</p>
              </div>
              {isClient ? (
                <button
                  className="btn btn-primary px-4 py-2 rounded-lg"
                  onClick={handleBuyClick}
                >
                  Buy Now
                </button>
              ) : (
                <button
                  className="btn btn-secondary px-4 py-2 rounded-lg"
                  onClick={onEdit}
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
        <ModalBuyProduct
          id={modalId}
          product={{ id, title, price, stock }}
          onClose={() =>
            (document.getElementById(modalId) as HTMLDialogElement)?.close()
          }
        />
      </>
    );
  }
);

export default ProductCard;
