import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../../core/hooks/useAuth";
import { db } from "../../../core/firebase/config";
import {
  equalTo,
  onValue,
  orderByChild,
  query,
  ref,
  type Unsubscribe,
} from "firebase/database";

export type OrderStatus = "to_pay" | "to_ship" | "shipped" | "processed";
export type OrderTab = "all" | OrderStatus;

export interface OrderRecord {
  orderId: string;
  userId: string;
  productId?: string;
  productTitle?: string;
  productImage?: string;
  productPrice?: number;
  quantity?: number;
  stock?: number;
  amount?: number;
  deliveryOption?: string;
  deliveryOn?: string;
  deliveryCost?: number;
  isPaid?: boolean;
  location?: string;
  status?: OrderStatus;
  createdAt?: number;
}

export const deriveStatus = (order: OrderRecord): OrderStatus => {
  if (order.status) {
    return order.status;
  }

  if (!order.isPaid) {
    return "to_pay";
  }

  if (order.isPaid && order.deliveryOption === "home") {
    return "to_ship";
  }

  return "processed";
};

export const formatCurrency = (value?: number) => {
  const amount = Number.isFinite(value) ? Number(value) : 0;
  return `${amount.toLocaleString()} DZD`;
};

export const formatDate = (timestamp?: number) => {
  if (!timestamp) return "--";
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) {
    return "--";
  }
  return date.toLocaleString();
};

export function useOrdersViewModel() {
  const { user, isLoggedIn } = useAuth();
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<OrderTab>("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!user?.uid) {
      setOrders([]);
      setLoading(false);
      return undefined;
    }

    setLoading(true);
    setError(null);

    const ordersQuery = query(
      ref(db, "orders"),
      orderByChild("userId"),
      equalTo(user.uid)
    );

    const unsubscribe: Unsubscribe = onValue(
      ordersQuery,
      (snapshot) => {
        const data = snapshot.val();
        if (!data) {
          setOrders([]);
          setLoading(false);
          return;
        }

        const parsedOrders: OrderRecord[] = Object.keys(data)
          .map((key) => {
            const entry = data[key];
            return {
              orderId: key,
              userId: entry.userId,
              productId: entry.productId,
              productTitle: entry.productTitle,
              productImage: entry.productImage,
              productPrice: entry.productPrice,
              quantity: entry.quantity,
              stock: entry.stock,
              amount: entry.amount,
              deliveryOption: entry.deliveryOption,
              deliveryOn: entry.deliveryOn,
              deliveryCost: entry.deliveryCost,
              isPaid: entry.isPaid,
              location: entry.location,
              status: entry.status,
              createdAt:
                typeof entry.createdAt === "number" ? entry.createdAt : 0,
            } satisfies OrderRecord;
          })
          .sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0));

        setOrders(parsedOrders);
        setLoading(false);
      },
      (firebaseError) => {
        console.error("Error fetching orders:", firebaseError);
        setError("Failed to load orders. Please try again later.");
        setLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [user?.uid]);

  const statusCounts = useMemo(() => {
    const counts: Record<OrderTab, number> = {
      all: orders.length,
      to_pay: 0,
      to_ship: 0,
      shipped: 0,
      processed: 0,
    };

    orders.forEach((order) => {
      const status = deriveStatus(order);
      counts[status] += 1;
    });

    return counts;
  }, [orders]);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const normalizedSearch = searchTerm.trim().toLowerCase();
      const matchesSearch = normalizedSearch
        ? order.orderId.toLowerCase().includes(normalizedSearch) ||
          (order.productTitle ?? "").toLowerCase().includes(normalizedSearch)
        : true;

      const status = deriveStatus(order);
      const matchesStatus =
        selectedTab === "all" ? true : status === selectedTab;

      return matchesSearch && matchesStatus;
    });
  }, [orders, selectedTab, searchTerm]);

  return {
    isLoggedIn,
    loading,
    error,
    statusCounts,
    filteredOrders,
    selectedTab,
    setSelectedTab,
    searchTerm,
    setSearchTerm,
  };
}
