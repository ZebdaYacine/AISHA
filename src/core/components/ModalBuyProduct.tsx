import { useState, useMemo } from "react";
import { useAuth } from "../hooks/useAuth";
import { db } from "../firebase/config";
import { ref, push, set, update } from "firebase/database"; // Added update
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";

const MySwal = Swal;

interface ModalBuyProductProps {
  id: string;
  product: {
    id: string;
    title: string;
    price: number;
    stock: number;
  };
  onClose?: () => void;
}

const ModalBuyProduct: React.FC<ModalBuyProductProps> = ({
  id,
  product,
  onClose,
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [quantity, setQuantity] = useState(1);
  const [deliveryOption, setDeliveryOption] = useState("office"); // 'office' or 'home'
  const [isSubmitting, setIsSubmitting] = useState(false);

  const deliveryFee = deliveryOption === "home" ? 1000 : 0;
  const totalAmount = useMemo(() => {
    return product.price * quantity + deliveryFee;
  }, [product.price, quantity, deliveryFee]);

  const handlePurchase = async () => {
    if (!user) {
      await MySwal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please sign in to purchase a product.",
        confirmButtonText: "Go to Login",
      });
      if (onClose) {
        onClose();
      }
      (document.getElementById(id) as HTMLDialogElement)?.close();
      navigate("/login", { state: { from: location.pathname } });
      return;
    }
    if (quantity > product.stock) {
      MySwal.fire({
        icon: "error",
        title: "Out of Stock",
        text: "The requested quantity exceeds the available stock.",
      });
      return;
    }
    if (quantity <= 0) {
      MySwal.fire({
        icon: "error",
        title: "Invalid Quantity",
        text: "Please enter a valid quantity.",
      });
      return;
    }

    const purchaseRequest = {
      userId: user.uid,
      productId: product.id,
      productTitle: product.title,
      pricePerPiece: product.price,
      quantity: quantity,
      deliveryOption: deliveryOption,
      totalAmount: totalAmount,
      time: new Date().toISOString(),
      location: "worhouse aisha", 
      status: "pending", 
    };

    setIsSubmitting(true);
    try {
      const purchasesRef = ref(db, 'purchases');
      const newPurchaseRef = push(purchasesRef);
      await set(newPurchaseRef, purchaseRequest);

      // Update product stock
      const productRef = ref(db, `products/${product.id}`);
      await update(productRef, { stock: product.stock - quantity });

      console.log("Purchase request sent with key: ", newPurchaseRef.key);
      MySwal.fire({
        icon: "success",
        title: "Purchase Successful!",
        text: "Your purchase request has been sent successfully!",
      });
    } catch (error) {
      console.error("Error sending purchase request: ", error);
      MySwal.fire({
        icon: "error",
        title: "Purchase Failed",
        text: "Failed to send purchase request. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }

    if (onClose) {
      onClose();
    }
    (document.getElementById(id) as HTMLDialogElement)?.close();
  };

  return (
    <dialog id={id} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Confirm Purchase: {product.title}</h3>

        <div className="py-4 space-y-4">
          <p><strong>Price per piece:</strong> {product.price} DZD</p>
          <p><strong>Stock available:</strong> {product.stock} pieces</p>

          {/* Quantity Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Quantity</span>
            </label>
            <input
              type="number"
              className="input input-bordered w-full"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              min="1"
              max={product.stock}
            />
          </div>

          {/* Delivery Options */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Delivery Option</span>
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="delivery"
                  className="radio"
                  value="office"
                  checked={deliveryOption === "office"}
                  onChange={() => setDeliveryOption("office")}
                />
                <span>At Office (Free)</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="delivery"
                  className="radio"
                  value="home"
                  checked={deliveryOption === "home"}
                  onChange={() => setDeliveryOption("home")}
                />
                <span>At Home (+1000 DZD)</span>
              </label>
            </div>
          </div>

          {/* Total Amount */}
          <div className="text-xl font-bold mt-4">
            Total: {totalAmount} DZD
          </div>
        </div>

        <div className="modal-action">
          <button
            className="btn btn-primary"
            onClick={handlePurchase}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Confirm Purchase"}
          </button>
          <form method="dialog">
            <button className="btn" onClick={onClose}>
              Cancel
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default ModalBuyProduct;
