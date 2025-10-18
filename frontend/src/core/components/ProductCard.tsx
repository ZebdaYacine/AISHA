import { useState, memo, useRef, MouseEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ModalBuyProduct from "./ModalBuyProduct";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";

interface ProductCardProps {
  id: string;
  image: string;
  title: string;
  description: string;
  dimension?: string;
  price: number;
  stock: number;
  isFavorite?: boolean;
  onBuy?: () => void;
  onEdit?: () => void;
  onMore?: () => void;
  dispalyFavorite?: boolean;
  toggelMore?: boolean;
  isClient?: boolean;
  onCardClick?: () => void;
  showActionButton?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = memo(
  ({
    id,
    image,
    title,
    description,
    dimension = "",
    price,
    stock,
    onBuy,
    onEdit,
    onMore,
    toggelMore = false,
    isClient = true,
    dispalyFavorite = true,
    isFavorite = false,
    onCardClick,
    showActionButton = true,
  }) => {
    const [isImageLoading, setIsImageLoading] = useState(true);
    const modalId = `modal_buy_${id}`;

    const [isFavoriteRef, setisFav] = useState(isFavorite);

    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleCardClick = () => {
      if (onCardClick) {
        onCardClick();
        return;
      }
      navigate(`/product/${id}`);
    };

    const handleBuyClick = () => {
      if (!isLoggedIn) {
        navigate("/login", { state: { from: location.pathname } });
        return;
      }
      (document.getElementById(modalId) as HTMLDialogElement)?.showModal();
      if (onBuy) {
        onBuy();
      }
    };

    const favoriteRef = useRef<HTMLSpanElement>(null);

    const handleFavorite = () => {
      favoriteRef.current?.classList.add("animate-ping");
      setTimeout(() => {
        favoriteRef.current?.classList.remove("animate-ping");
      }, 1000);
      setisFav(!isFavoriteRef);
    };

    return (
      <>
        <div
          className="card  shadow-md w-full flex flex-col border 
                   cursor-pointer hover:shadow-xl transition-all duration-300 
                   transform hover:scale-105 rounded-2xl overflow-hidden"
          onClick={handleCardClick}
        >
          {/* Full image */}
          <div className="relative w-full h-96 bg-gray-100">
            {isImageLoading && (
              <div className="skeleton w-full h-full animate-pulse"></div>
            )}
            <div className="absolute inset-0 bg-black">
              <img
                src={image}
                alt={title}
                loading="lazy"
                className={`w-full h-full object-cover transition-opacity duration-500 ${
                  isImageLoading ? "opacity-0" : "opacity-100"
                }`}
                onLoad={() => setIsImageLoading(false)}
              />
              {onBuy && dispalyFavorite && (
                <div className="fixed  top-1 right-6 p-2  rounded-full   ">
                  <span ref={favoriteRef}>
                    {isFavoriteRef ? (
                      <FaHeart
                        className="w-7 h-7 cursor-pointer text-red-500 transition-transform"
                        onClick={(event: MouseEvent) => {
                          event.stopPropagation();
                          handleFavorite();
                        }}
                        title="Remove from Favorites"
                      />
                    ) : (
                      <FaRegHeart
                        className="w-7 h-7 cursor-pointer text-white transition-transform"
                        onClick={(event: MouseEvent) => {
                          event.stopPropagation();
                          handleFavorite();
                        }}
                        title="Add to Favorites"
                      />
                    )}
                  </span>
                </div>
              )}
            </div>
          </div>
          {/* Content */}
          <div className="card-body p-4 space-y-3">
            <h2 className="card-title text-xl font-bold ">{title}</h2>

            {/* Short description only */}
            {toggelMore ? (
              <p className="text-gray-500">{description}</p>
            ) : (
              <p className="text-gray-500 line-clamp-2">
                {description.slice(0, 100)} .....
              </p>
            )}
            {dimension && (
              <p className="text-sm text-gray-400">Dimensions: {dimension}</p>
            )}

            {/* Get more button */}
            {onMore && (
              <button
                className="text-blue-600 text-sm hover:underline focus:outline-none"
                onClick={(event) => {
                  event.stopPropagation();
                  onMore();
                }}
              >
                {toggelMore ? "Show Less" : "Read More"}
              </button>
            )}

            {/* Price, stock & actions */}
            <div className="flex justify-between items-center pt-2 border-t border-gray-200">
              <div>
                <p className="text-xl font-semibold ">{price} €</p>
                <p className="text-lg ">Stock: {stock} pieces</p>
              </div>
              {showActionButton &&
                (isClient ? (
                  <button
                    className="btn btn-primary px-4 py-2 rounded-lg"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleBuyClick();
                    }}
                  >
                    Buy Now
                  </button>
                ) : (
                  onEdit && (
                    <button
                      className="btn btn-secondary px-4 py-2 rounded-lg"
                      onClick={(event) => {
                        event.stopPropagation();
                        onEdit();
                      }}
                    >
                      Edit
                    </button>
                  )
                ))}
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
