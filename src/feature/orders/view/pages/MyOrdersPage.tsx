import React, { useEffect, useMemo, useState } from "react";
import {
  deriveStatus,
  formatCurrency,
  formatDate,
  useOrdersViewModel,
  type OrderStatus,
} from "../../viewmodel/OrdersViewModel";

const PAGE_SIZE = 3;

const MyOrdersPage: React.FC = () => {
  const {
    isLoggedIn,
    loading,
    error,
    statusCounts,
    filteredOrders,
    selectedTab,
    setSelectedTab,
    searchTerm,
    setSearchTerm,
  } = useOrdersViewModel();

  const [currentPage, setCurrentPage] = useState(1);

  const ORDER_TABS: Array<{ key: OrderTab; label: string }> = [
    { key: "all", label: "View all" },
    { key: "to_pay", label: "To pay" },
    { key: "to_ship", label: "To ship" },
    { key: "shipped", label: "Shipped" },
    { key: "processed", label: "Processed" },
  ];

  const STATUS_LABEL: Record<OrderStatus, string> = {
    to_pay: "To Pay",
    to_ship: "To Ship",
    shipped: "Shipped",
    processed: "Processed",
  };

  const STATUS_BADGE: Record<OrderStatus, string> = {
    to_pay: "badge badge-xl badge-warning badge ",
    to_ship: "badge badge-xl badge-info badge",
    shipped: "badge badge-xl badge-accent badge",
    processed: "badge badge-xl badge-success badge",
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTab, searchTerm, filteredOrders.length]);

  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / PAGE_SIZE));

  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredOrders.slice(start, start + PAGE_SIZE);
  }, [filteredOrders, currentPage]);

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto mt-32 p-4 text-center">
        <h2 className="text-2xl font-bold">
          Please log in to view your orders.
        </h2>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto mt-32 p-4 text-center text-error">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-32 p-4 space-y-8 text-base md:text-lg">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold">My Orders</h1>
        <p className="text-gray-500 text-lg md:text-xl">
          Track and manage all of your recent purchases in one place.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-6 border-b border-base-200 pb-2 text-lg md:text-xl">
        {ORDER_TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={`pb-2 border-b-2 transition-all ${
              selectedTab === tab.key
                ? "border-primary text-primary font-semibold"
                : "border-transparent text-gray-500 hover:text-primary"
            }`}
            onClick={() => setSelectedTab(tab.key)}
          >
            {tab.label} ({statusCounts[tab.key] ?? 0})
          </button>
        ))}
      </div>

      <input
        type="text"
        placeholder="Tracking number"
        className="input  input-xl  input-primary w-full rounded-lg"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      {filteredOrders.length === 0 ? (
        <div className="bg-base-100 border border-dashed border-base-200 rounded-xl p-12 text-center text-gray-500 text-lg md:text-xl">
          No orders found for this filter.
        </div>
      ) : (
        <div className="space-y-6">
          {paginatedOrders.map((order) => {
            const status = deriveStatus(order);
            return (
              <div
                key={order.orderId}
                className="bg-base-100 rounded-xl shadow-md border border-base-200 p-6 space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <p className="text-base md:text-lg text-gray-500">
                      Order ID:{" "}
                      <span className="font-medium">{order.orderId}</span>
                    </p>
                    <p className="text-base md:text-lg text-gray-500">
                      Placed on: {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <span className={STATUS_BADGE[status]}>
                    {STATUS_LABEL[status]}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="w-full sm:w-40">
                    {order.productImage ? (
                      <img
                        src={order.productImage}
                        alt={order.productTitle ?? "Product image"}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-24 bg-base-200 rounded-lg flex items-center justify-center text-gray-400 text-sm">
                        No image
                      </div>
                    )}
                  </div>
                  <div className="flex-1 space-y-3">
                    <h2 className="text-xl md:text-2xl font-semibold">
                      {order.productTitle ?? "Product"}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-base md:text-lg text-gray-600">
                      <p>
                        Quantity:{" "}
                        <span className="font-medium">
                          {order.quantity ?? 1}
                        </span>
                      </p>
                      <p>
                        Total Amount:{" "}
                        <span className="font-medium">
                          {formatCurrency(order.amount)}
                        </span>
                      </p>
                      <p>
                        Delivery:{" "}
                        {order.deliveryOption === "home"
                          ? "Home Delivery"
                          : "Office Pickup"}
                      </p>
                      <p>Delivery Cost: {formatCurrency(order.deliveryCost)}</p>
                      <p>Status: {STATUS_LABEL[status]}</p>
                      <p>Paid: {order.isPaid ? "Yes" : "No"}</p>
                      <p className="sm:col-span-2">
                        Delivery Address: {order.location ?? "--"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {filteredOrders.length > PAGE_SIZE && (
        <div className="flex justify-center items-center gap-4 pt-4">
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-lg">
            Page {currentPage} of {totalPages}
          </span>
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MyOrdersPage;
