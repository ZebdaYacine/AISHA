import { useState } from "react";
import SlideSection from "../core/components/SlideSection";
import OurPhilosophySection from "../core/components/OurPhilosophySection";
import FilterTabs from "../core/components/FilterTabs";
import ProductCard from "../core/components/ProductCard";

export default function HomePage() {
  const productImages = [
    "M1.jpg",
    "A1.jpg",
    "B2.jpg",
    "J1.jpg",
    "D1.jpg",
    "C1.jpg",
    "C3.png",
    "C2.png",
  ];

  const allProducts = productImages.map((filename, index) => ({
    id: index + 1,
    title: filename.replace(/\.(jpg|png)$/, ""), // remove file extension
    description: "Découvrez nos produits artisanaux 100% faits main.",
    image: `/public/aisha/${filename}`,
  }));

  const ITEMS_PER_PAGE = 16;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(allProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = allProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      {/* MAIN CONTENT */}
      <div className="flex flex-col flex-1 justify-center items-center w-full h-screen">
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

      <FilterTabs />

      <div className="mt-10 w-3/4 mx-auto">
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {paginatedProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.image}
              title={product.title}
              description={product.description}
              onBuy={() => console.log(`Buy ${product.title}`)}
            />
          ))}
        </div>

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
