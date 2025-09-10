import { useState, useEffect } from "react";
import { db } from "../core/firebase/config";
import { ref, onValue } from "firebase/database";
import SlideSection from "../core/components/SlideSection";
import OurPhilosophySection from "../core/components/OurPhilosophySection";
import FilterTabs from "../core/components/FilterTabs";
import ProductCard from "../core/components/ProductCard";
import { useAuth } from "../core/hooks/useAuth";
import type { Product } from "./store/viewmodel/StoreViewModel";

export default function HomePage() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedProducts, setExpandedProducts] = useState<string[]>([]);

  const handleToggleMore = (id: string) => {
    setExpandedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    const productsRef = ref(db, "products");
    const unsubscribe = onValue(
      productsRef,
      (snapshot) => {
        try {
          const data = snapshot.val();
          if (data) {
            const productsList = Object.keys(data).map((key) => ({
              id: key,
              ...data[key],
              image: `http://185.209.229.242:9999${data[key].image}`,
            }));
            setProducts(productsList);
          } else {
            setProducts([]);
          }
        } catch (err) {
          setError("Failed to parse products data.");
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      },
      (err) => {
        setError("Failed to fetch products.");
        console.error(err);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const ITEMS_PER_PAGE = 16;
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const paginatedProducts = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      {!user && (
        <>
          {/* MAIN CONTENT */}
          <div className="sm:mt-32 mt-28 flex  flex-col flex-1 justify-center items-center w-full h-screen">
            {/* 1/3 - Video Section */}
            <div className="h-1/3 w-full">
              <video
                className="w-full h-full object-cover"
                autoPlay
                loop
                playsInline
              >
                <source src="/public/aisha/aicha.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* 1/3 - Cards Section */}
            <SlideSection />
            <OurPhilosophySection />
          </div>

          <p className="text-center text-4xl font-bold mt-20 mb-10">
            This week's highlights
          </p>
        </>
      )}

      <FilterTabs />

      <div className="mt-10 w-3/4 mx-auto">
        {/* Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {paginatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                image={`${product.image}`}
                title={product.title}
                description={product.description}
                price={product.price}
                stock={product.stock}
                onMore={() => handleToggleMore(product.id)}
                toggelMore={expandedProducts.includes(product.id)}
                onBuy={() => console.log(`Buy ${product.title}`)}
                isClient={true}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center mt-8 gap-2 flex-wrap">
          <button
            className="btn btn-sm"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`btn btn-sm ${
                currentPage === i + 1 ? "btn-primary" : ""
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="btn btn-sm"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
