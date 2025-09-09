import { useState, useMemo } from "react";
import { useAuth } from "../hooks/useAuth";
import { db } from "../firebase/config";
import { ref, push, set } from "firebase/database";

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
  const [quantity, setQuantity] = useState(1);
  const [deliveryOption, setDeliveryOption] = useState("office"); // 'office' or 'home'
  const [isSubmitting, setIsSubmitting] = useState(false);

  const deliveryFee = deliveryOption === "home" ? 1000 : 0;
  const totalAmount = useMemo(() => {
    return product.price * quantity + deliveryFee;
  }, [product.price, quantity, deliveryFee]);

  const handlePurchase = async () => {
    if (!user) {
      alert("You must be logged in to purchase a product.");
      return;
    }
    if (quantity > product.stock) {
      alert("The requested quantity exceeds the available stock.");
      return;
    }
    if (quantity <= 0) {
      alert("Please enter a valid quantity.");
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
      location: "worhouse aisha", // Initial location
      status: "pending", // Add a default status
    };

    setIsSubmitting(true);
    try {
      const purchasesRef = ref(db, 'purchases');
      const newPurchaseRef = push(purchasesRef);
      await set(newPurchaseRef, purchaseRequest);
      console.log("Purchase request sent with key: ", newPurchaseRef.key);
      alert("Purchase request sent successfully!");
    } catch (error) {
      console.error("Error sending purchase request: ", error);
      alert("Failed to send purchase request. Please try again.");
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
