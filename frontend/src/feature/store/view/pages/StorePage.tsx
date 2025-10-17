import React, { useState } from "react";
import useSWR from "swr";
import ProductCard from "../../../../core/components/ProductCard";
import { AiOutlinePlus } from "react-icons/ai";
import { useProfileContext } from "../../../../core/state/profileContext";
import ModalAddProduct from "../components/ModalAddProduct";
import ModalUpdateProduct from "../components/ModalUpdateProduct";
import StoreViewModel, { type Product } from "../../viewmodel/StoreViewModel";
import WelcomeBanner from "../../../../core/components/WelcomeBanner";

const fetcher = () => StoreViewModel.fetchProducts();

const StorePage: React.FC = () => {
  const {
    data: products = [],
    error,
    isLoading,
  } = useSWR<Product[]>("products", fetcher);
  const [currentPage, setCurrentPage] = useState(1);
  // const [toggelMore, setToggelMore] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { profileInfo } = useProfileContext();

  const capitalize = (str?: string) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";

  const firstName = capitalize(profileInfo?.firstName);

  const ITEMS_PER_PAGE = 16;
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const paginatedProducts = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const [expandedProducts, setExpandedProducts] = useState<string[]>([]);

  const handleToggleMore = (id: string) => {
    setExpandedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    (document.getElementById("update_modal") as HTMLDialogElement).showModal();
  };

  return (
    <div className="mt-32 container mx-auto p-4">
      <WelcomeBanner name={firstName} />
      {/* ✅ Store Header */}
      <div className="flex flex-row justify-between  mb-6">
        <button
          onClick={() =>
            (
              document.getElementById("my_modal") as HTMLDialogElement
            ).showModal()
          }
          className="btn btn-soft btn-neutral btn-outline flex  gap-2 btn-lg"
        >
          <AiOutlinePlus className="w-5 h-5" />
          Add New Product
        </button>
      </div>
      {/* ✅ Product Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : error ? (
        <div className="text-center text-red-500">{error.message}</div>
      ) : (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {paginatedProducts.map((product) => (
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
              // onBuy={() => console.log(`Buy ${product.title}`)}
              isClient={false}
              onEdit={() => handleEdit(product)}
            />
          ))}
        </div>
      )}
      {/* ✅ Pagination */}
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
        <ModalAddProduct
          id="my_modal"
          title="Add New Product"
          onClose={() => console.log("Modal closed")}
        />
        <ModalUpdateProduct
          id="update_modal"
          title="Update Product"
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      </div>
    </div>
  );
};

export default StorePage;
