import React, { useContext, useState, useMemo } from "react";
import useSWR from "swr";
import { AuthContext } from "../../../../core/state/AuthContext";
import { db } from "../../../../core/firebase/config";
import { ref, onValue, remove, update, push, set, serverTimestamp } from "firebase/database";
import Swal from "sweetalert2";

const MySwal = Swal;

interface CartItem {
  id: string;
  productId: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
  deliveryOption: string;
  deliveryCost: number;
  totalItemAmount: number;
  timestamp: number;
}

const fetchCartItems = (userId: string | undefined) => async () => {
  if (!userId) return [];

  const cartRef = ref(db, `carts/${userId}`);
  return new Promise<CartItem[]>((resolve, reject) => {
    onValue(
      cartRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const items: CartItem[] = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          resolve(items);
        } else {
          resolve([]);
        }
      },
      (error) => {
        console.error("Error fetching cart items:", error);
        reject(error);
      }
    );
  });
};

const CartPage: React.FC = () => {
  const { user, isLoggedIn } = useContext(AuthContext)!;
  const {
    data: cartItems,
    error,
    isLoading,
    mutate,
  } = useSWR(
    isLoggedIn ? `carts/${user?.uid}` : null,
    fetchCartItems(user?.uid)
  );

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const paginatedCartItems = useMemo(() => {
    if (!cartItems) return [];
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return cartItems.slice(startIndex, endIndex);
  }, [cartItems, currentPage, itemsPerPage]);

  const totalPages = useMemo(() => {
    if (!cartItems) return 0;
    return Math.ceil(cartItems.length / itemsPerPage);
  }, [cartItems, itemsPerPage]);

  const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);

  const handleRemoveItem = async (itemId: string, title: string) => {
    MySwal.fire({
      title: "Are you sure?",
      text: `Do you want to remove "${title}" from your cart?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await remove(ref(db, `carts/${user?.uid}/${itemId}`));
          mutate(); // Revalidate SWR cache
          MySwal.fire("Removed!", "Your item has been removed.", "success");
        } catch (error) {
          console.error("Error removing item:", error);
          MySwal.fire("Error", "Failed to remove item.", "error");
        }
      }
    });
  };

  const handleUpdateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return; // Prevent quantity from going below 1

    try {
      const itemRef = ref(db, `carts/${user?.uid}/${itemId}`);
      const currentItem = cartItems?.find((item) => item.id === itemId);
      if (currentItem) {
        const newTotalItemAmount =
          currentItem.price * newQuantity + currentItem.deliveryCost;
        await update(itemRef, {
          quantity: newQuantity,
          totalItemAmount: newTotalItemAmount,
        });
        mutate(); // Revalidate SWR cache
        MySwal.fire("Updated!", "Item quantity has been updated.", "success");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      MySwal.fire("Error", "Failed to update quantity.", "error");
    }
  };

  const handleCheckout = async () => {
    if (!isLoggedIn || !user) {
      MySwal.fire({
        icon: "warning",
        title: "Login Required",
        text: "You need to be logged in to checkout.",
      });
      return;
    }

    if (!cartItems || cartItems.length === 0) {
      MySwal.fire({
        icon: "info",
        title: "Cart Empty",
        text: "Add some items to your cart before checking out.",
      });
      return;
    }

    setIsProcessingCheckout(true);

    try {
      for (const item of cartItems) {
        let deliveryLocation = "Aicha Office";

        if (item.deliveryOption === "home") {
          const { value, isDismissed } = await MySwal.fire({
            title: "Delivery Location",
            input: "text",
            inputLabel: `Where should we deliver ${item.title}?`,
            inputPlaceholder: "Enter delivery address",
            confirmButtonText: "Confirm",
            showCancelButton: true,
            cancelButtonText: "Cancel",
          });

          if (isDismissed) {
            setIsProcessingCheckout(false);
            return;
          }

          const trimmed = value?.trim();
          if (!trimmed) {
            await MySwal.fire({
              icon: "warning",
              title: "Location Required",
              text: "Please provide a delivery location to continue.",
            });
            setIsProcessingCheckout(false);
            return;
          }

          deliveryLocation = trimmed;
        }

        const ordersRef = ref(db, "orders");
        const newOrderRef = push(ordersRef);

        await set(newOrderRef, {
          orderId: newOrderRef.key,
          trackingNumber: newOrderRef.key,
          userId: user.uid,
          productId: item.productId,
          productTitle: item.title,
          productPrice: item.price,
          productImage: item.image,
          quantity: item.quantity,
          stock: item.quantity,
          amount: item.totalItemAmount,
          deliveryOption: item.deliveryOption,
          deliveryOn: item.deliveryOption,
          deliveryCost: item.deliveryCost,
          isPaid: false,
          status: "to_pay",
          location: deliveryLocation,
          createdAt: serverTimestamp(),
        });

        await remove(ref(db, `carts/${user.uid}/${item.id}`));
      }

      await mutate();

      MySwal.fire({
        icon: "success",
        title: "Order Placed!",
        html: `<p>Your checkout is complete. ${cartItems.length} item(s) moved to orders.</p>`,
      });
    } catch (checkoutError) {
      console.error("Error during checkout:", checkoutError);
      MySwal.fire({
        icon: "error",
        title: "Checkout Failed",
        text: "We couldn't process your checkout. Please try again.",
      });
    } finally {
      setIsProcessingCheckout(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto mt-32 p-4 text-center">
        <h2 className="text-2xl font-bold">Please log in to view your cart.</h2>
      </div>
    );
  }

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
        Failed to load cart details.
      </div>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="container mx-auto mt-32 p-4 text-center">
        <h2 className="text-2xl font-bold">Your cart is empty.</h2>
        <p className="text-gray-600">Start adding some amazing products!</p>
      </div>
    );
  }

  const totalCartAmount = cartItems.reduce(
    (sum, item) => sum + item.totalItemAmount,
    0
  );

  return (
    <div className="container mx-auto mt-32 p-4">
      <h1 className="text-3xl font-bold mb-6">My Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {paginatedCartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center bg-base-100 shadow-lg rounded-lg p-4"
            >
              <img
                src={`${item.image}`}
                alt={item.title}
                className="w-24 h-24 object-cover rounded-md mr-4"
              />
              <div className="flex-grow">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-600">Price: {item.price} €</p>
                <p className="text-gray-600">
                  Delivery:{" "}
                  {item.deliveryOption === "home"
                    ? `Home (+${item.deliveryCost} €)`
                    : "Office (Free)"}
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <button
                    className="btn btn-sm"
                    onClick={() =>
                      handleUpdateQuantity(item.id, item.quantity - 1)
                    }
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="btn btn-sm"
                    onClick={() =>
                      handleUpdateQuantity(item.id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">
                  {item.totalItemAmount.toFixed(2)} €
                </p>
                <button
                  className="btn btn-error btn-sm mt-2"
                  onClick={() => handleRemoveItem(item.id, item.title)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <div className="join">
                <button
                  className="join-item btn"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                >
                  previous
                </button>
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    className={`join-item btn ${
                      currentPage === index + 1 ? "btn-active btn-primary" : ""
                    }`}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  className="join-item btn"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  next
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Cart Summary */}
        <div className="lg:col-span-1 bg-base-100 shadow-lg rounded-lg p-6 h-fit">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>
                {(
                  totalCartAmount -
                  cartItems.reduce((sum, item) => sum + item.deliveryCost, 0)
                ).toFixed(2)}{" "}
                €
              </span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Charges:</span>
              <span>
                {cartItems
                  .reduce((sum, item) => sum + item.deliveryCost, 0)
                  .toFixed(2)}{" "}
                €
              </span>
            </div>
            <div className="border-t pt-4 mt-4 flex justify-between text-xl font-bold">
              <span>Total:</span>
              <span>{totalCartAmount.toFixed(2)} €</span>
            </div>
          </div>
          <button
            className="btn btn-primary w-full mt-6"
            onClick={handleCheckout}
            disabled={isProcessingCheckout}
          >
            {isProcessingCheckout ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Proceed to Checkout"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
