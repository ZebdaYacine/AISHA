import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import ProductCard from "../../../../core/components/ProductCard";
import { AiOutlinePlus } from "react-icons/ai";
import { useProfileContext } from "../../../../core/state/profileContext";
import ModalAddProduct from "../components/ModalAddProduct";
import ModalUpdateProduct from "../components/ModalUpdateProduct";
import { useStoreViewModel } from "../../viewmodel/useStoreViewModel";
import type { Product } from "../../viewmodel/StoreViewModel";

const StorePage: React.FC = observer(() => {
  const [currentPage, setCurrentPage] = useState(1);
  const [toggelMore, setToggelMore] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { profileInfo } = useProfileContext();
  const viewModel = useStoreViewModel();

  const capitalize = (str?: string) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";

  const firstName = capitalize(profileInfo?.firstName);

  const ITEMS_PER_PAGE = 16;
  const totalPages = Math.ceil(viewModel.products.length / ITEMS_PER_PAGE);

  const paginatedProducts = viewModel.products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    (document.getElementById("update_modal") as HTMLDialogElement).showModal();
  };

  return (
    <div className="mt-32 container mx-auto p-4">
      {/* ✅ Welcome Section */}
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold">
          Welcome back, <span className="text-primary">{firstName}</span> 👋
        </h2>
        <p className="text-gray-500 mt-2">
          Discover your personalized store and manage your products with ease.
        </p>
      </div>

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
      {viewModel.isLoading ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : viewModel.error ? (
        <div className="text-center text-red-500">{viewModel.error}</div>
      ) : (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {paginatedProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.image}
              title={product.title}
              description={product.description}
              price={product.price}
              stock={product.stock}
              toggelMore={toggelMore}
              onBuy={() => console.log(`Buy ${product.title}`)}
              onEdit={() => handleEdit(product)}
              isClient={false}
              onMore={() => {
                setToggelMore(!toggelMore);
              }}
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
          viewModel={viewModel}
          onClose={() => console.log("Modal closed")}
        />
        <ModalUpdateProduct
          id="update_modal"
          title="Update Product"
          viewModel={viewModel}
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      </div>
    </div>
  );
});

export default StorePage;
