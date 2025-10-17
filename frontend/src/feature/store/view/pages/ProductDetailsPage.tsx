import React, { useState, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import useSWR from "swr";
import StoreViewModel from "../../viewmodel/StoreViewModel";
import ImageZoom from "../../../../core/components/ImageZoom";
import { AuthContext } from "../../../../core/state/AuthContext";
import { db } from "../../../../core/firebase/config";
import { ref, set, push, serverTimestamp } from "firebase/database";
import Swal from "sweetalert2";

const MySwal = Swal;

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: product,
    error,
    isLoading,
  } = useSWR(id ? `product/${id}` : null, () =>
    id ? StoreViewModel.fetchProductById(id) : null
  );
  const { user, isLoggedIn } = useContext(AuthContext)!;
  const navigate = useNavigate();
  const location = useLocation();
  const [quantity, setQuantity] = useState(1);
  const [deliveryOption, setDeliveryOption] = useState("office"); // 'office' or 'home'
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isBuyingNow, setIsBuyingNow] = useState(false);

  const deliveryCost = deliveryOption === "home" ? 1000 : 0;
  const totalAmount = product ? product.price * quantity + deliveryCost : 0;

  const redirectToLogin = async (message: string) => {
    await MySwal.fire({
      icon: "warning",
      title: "Login Required",
      text: message,
      confirmButtonText: "Go to Login",
    });
    navigate("/login", { state: { from: location.pathname } });
  };

  const handleAddToCart = async () => {
    if (!isLoggedIn || !user) {
      await redirectToLogin(
        "You need to be logged in to add products to your cart."
      );
      return;
    }

    setIsAddingToCart(true);
    try {
      const cartRef = ref(db, `carts/${user.uid}`);
      const newCartItemRef = push(cartRef);
      await set(newCartItemRef, {
        productId: product?.id,
        title: product?.title,
        price: product?.price,
        image: product?.image,
        quantity,
        deliveryOption,
        deliveryCost,
        totalItemAmount: totalAmount,
        timestamp: serverTimestamp(),
      });
      MySwal.fire({
        icon: "success",
        title: "Added to Cart!",
        text: `${quantity} x ${product?.title} added to your cart.`,
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add product to cart. Please try again.",
      });
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleBuyNow = async () => {
    if (!isLoggedIn || !user) {
      await redirectToLogin("You need to be logged in to buy products.");
      return;
    }

    setIsBuyingNow(true);
    try {
      let deliveryLocation = "Aicha Office";

      if (deliveryOption === "home") {
        const { value: enteredLocation, isDismissed } = await MySwal.fire({
          title: "Delivery Location",
          input: "text",
          inputLabel: "Where should we deliver your order?",
          inputPlaceholder: "Enter delivery address",
          inputAttributes: {
            autocapitalize: "on",
            autocorrect: "on",
          },
          confirmButtonText: "Confirm",
          showCancelButton: true,
          cancelButtonText: "Cancel",
        });

        if (isDismissed) {
          return;
        }

        const trimmedLocation = enteredLocation?.trim();

        if (!trimmedLocation) {
          MySwal.fire({
            icon: "warning",
            title: "Location Required",
            text: "Please provide a delivery location to continue.",
          });
          return;
        }

        deliveryLocation = trimmedLocation;
      }

      const ordersRef = ref(db, "orders");
      const newOrderRef = push(ordersRef);
      await set(newOrderRef, {
        orderId: newOrderRef.key,
        trackingNumber: newOrderRef.key,
        userId: user.uid,
        productId: product?.id,
        productTitle: product?.title,
        productPrice: product?.price,
        productImage: product?.image,
        quantity,
        stock: quantity,
        amount: totalAmount,
        deliveryOption,
        deliveryOn: deliveryOption,
        deliveryCost,
        isPaid: false,
        status: "to_pay",
        location: deliveryLocation,
        createdAt: serverTimestamp(),
      });

      MySwal.fire({
        icon: "success",
        title: "Order Created!",
        html: `<p>Your order for ${quantity} × ${
          product?.title
        } is confirmed.</p>
               <p>Total amount: ${totalAmount.toFixed(2)} €</p>
               <p>Delivery cost: ${deliveryCost.toFixed(2)} €</p>
               <p>Delivery: ${
                 deliveryOption === "home" ? "Home Delivery" : "Office Pickup"
               }</p>
               <p>Location: ${deliveryLocation}</p>`,
      });
    } catch (error) {
      console.error("Error during purchase:", error);
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to complete purchase. Please try again.",
      });
    } finally {
      setIsBuyingNow(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-32">
        Failed to load product details.
      </div>
    );
  }

  if (!product) {
    return <div className="text-center mt-32">Product not found.</div>;
  }

  return (
    <div className="container mx-auto mt-32 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Info */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-xl text-gray-600">{product.description}</p>
          {product.dimension && (
            <p className="text-sm text-gray-500">
              Dimensions: {product.dimension}
            </p>
          )}
          <p className="text-2xl font-semibold text-primary">
            {product.price} €
          </p>
          <p className="text-sm text-gray-500">Stock: {product.stock} pieces</p>

          {/* Delivery Options */}
          <div className="space-y-2">
            <label className="font-medium">Delivery Option:</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="delivery"
                  className="radio radio-primary"
                  value="office"
                  checked={deliveryOption === "office"}
                  onChange={() => setDeliveryOption("office")}
                />
                <span>Office (Free)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="delivery"
                  className="radio radio-primary"
                  value="home"
                  checked={deliveryOption === "home"}
                  onChange={() => setDeliveryOption("home")}
                />
                <span>Home (10 €)</span>
              </label>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center space-x-4">
            <label className="font-medium">Quantity:</label>
            <button
              className="btn btn-sm"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              className="btn btn-sm"
              onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
            >
              +
            </button>
          </div>

          {/* Total Amount */}
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total:</span>
              <span>{totalAmount.toFixed(2)} €</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button
              className="btn btn-primary flex-grow"
              onClick={handleBuyNow}
              disabled={isBuyingNow || isAddingToCart}
            >
              {isBuyingNow ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Buy Now"
              )}
            </button>
            <button
              className="btn btn-outline flex-grow"
              onClick={handleAddToCart}
              disabled={isAddingToCart || isBuyingNow}
            >
              {isAddingToCart ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Add to Cart"
              )}
            </button>
          </div>
        </div>
        {/* Product Image */}
        <ImageZoom
          src={`${product.image}`}
          alt={product.title}
          className="w-full h-auto object-cover rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
