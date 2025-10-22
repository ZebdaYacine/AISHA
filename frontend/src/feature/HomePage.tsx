import { useState, useEffect, useRef } from "react";
import { db } from "../core/firebase/config";
import { ref, onValue } from "firebase/database";
// import SlideSection from "../core/components/SlideSection";
// import OurPhilosophySection from "../core/components/OurPhilosophySection";
import FilterTabs from "../core/components/FilterTabs";
import ProductCard from "../core/components/ProductCard";
import { useAuth } from "../core/hooks/useAuth";
import { useProfileContext } from "../core/state/profileContext";
import WelcomeBanner from "../core/components/WelcomeBanner";
import type { Product } from "./store/viewmodel/StoreViewModel";
// import SlideSection from "../core/components/SlideSection";
import OurPhilosophySection from "../core/components/OurPhilosophySection";
import ExploreSection from "../core/components/ExploreSection";

export default function HomePage() {
  const { user } = useAuth();
  const { profileInfo } = useProfileContext();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage] = useState(1);
  const [expandedProducts, setExpandedProducts] = useState<string[]>([]);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

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
              dimension: data[key].dimension ?? "",
              image: `${data[key].image}`,
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
  // const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const capitalize = (str?: string | null) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";

  const firstName = capitalize(
    profileInfo?.firstName ??
      (user?.displayName ? user.displayName.split(" ")[0] : "")
  );

  const paginatedProducts = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    const videoEl = heroVideoRef.current;
    if (!videoEl) {
      return;
    }

    const handleScroll = () => {
      const maxScroll = Math.max(window.innerHeight * 0.8, 1);
      const scrollTop = window.scrollY;
      const rawVolume = 1 - scrollTop / maxScroll;
      const clampedVolume = Math.max(0, Math.min(1, rawVolume));

      videoEl.volume = clampedVolume;
      videoEl.muted = clampedVolume <= 0.05;
    };

    // Initialize volume when component mounts
    videoEl.muted = false;
    videoEl.volume = 1;
    videoEl.play().catch(() => {
      /* Autoplay with audio can be blocked until user interaction */
    });
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {user ? (
        <div className="mt-40 container mx-auto px-4">
          <WelcomeBanner name={firstName} />
        </div>
      ) : (
        <>
          {/* MAIN CONTENT */}
          <div className=" sm:mt-28 mt-28 flex  flex-col flex-1 justify-center items-center w-full h-screen">
            <div className="h-1/3 w-full">
              <video
                ref={heroVideoRef}
                className="w-full h-full object-cover"
                autoPlay
                loop
                playsInline
              >
                <source src="/dist/aisha/aicha.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            {/* <HeroSlideshow /> */}
            {/* <SlideSection /> */}
            {/* <OurPhilosophySection /> */}
          </div>

          <h2 className="text-center text-4xl font-bold mt-20 mb-10">
            This week's highlights
          </h2>
        </>
      )}

      <FilterTabs />

      <div className="mt-20 w-3/4 mx-auto ">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {paginatedProducts.slice(0, 8).map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                image={`${product.image}`}
                title={product.title}
                description={product.description}
                dimension={product.dimension}
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
      </div>

      <div className="mt-5 flex  flex-col flex-1 justify-center items-center w-full h-screen">
        <OurPhilosophySection />
      </div>

      <div className="mt-20 w-3/4 mx-auto ">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {paginatedProducts.slice(8, 12).map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                image={`${product.image}`}
                title={product.title}
                description={product.description}
                dimension={product.dimension}
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
      </div>
      <ExploreSection />
    </>
  );
}
