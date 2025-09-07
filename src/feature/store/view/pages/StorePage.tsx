import React, { useState, useEffect } from "react";
import ProductCard from "../../../../core/components/ProductCard";
import { AiOutlinePlus } from "react-icons/ai";
import { useProfileContext } from "../../../../core/state/profileContext";
import { useAuth } from "../../../../core/hooks/useAuth";
import ModalAddProduct from "../components/ModalAddProduct";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import {
  ref as databaseRef,
  set,
  push,
  onValue,
} from "firebase/database";
import { db } from "../../../../core/firebase/config";

const StorePage: React.FC = () => {
  const [products, setProducts] = useState<
    { id: string; title: string; description: string; image: string }[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { profileInfo } = useProfileContext();
  const { user } = useAuth();

  useEffect(() => {
    const productsDbRef = databaseRef(db, "products");
    const unsubscribe = onValue(productsDbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const productsList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setProducts(productsList);
      } else {
        setProducts([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const capitalize = (str?: string) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";

  const firstName = capitalize(profileInfo?.firstName);

  const handleSaveProduct = async (product: {
    title: string;
    description: string;
    image: File | null;
  }) => {
    if (!user) {
      alert("You must be logged in to add a product.");
      return;
    }

    let imageUrl = "/public/aisha/placeholder.jpg";
    if (product.image) {
      const storage = getStorage();
      const imageRef = ref(
        storage,
        `products/${user.uid}/${product.image.name}`
      );
      await uploadBytes(imageRef, product.image);
      imageUrl = await getDownloadURL(imageRef);
    }

    const newProductData = {
      title: product.title,
      description: product.description,
      image: imageUrl,
      userId: user.uid,
    };

    try {
      const productsDbRef = databaseRef(db, "products");
      const newProductRef = push(productsDbRef);
      await set(newProductRef, newProductData);
      (document.getElementById("my_modal") as HTMLDialogElement).close();
    } catch (error) {
      console.error("Error adding product: ", error);
      alert("Failed to add product. Please try again.");
    }
  };

  const ITEMS_PER_PAGE = 16;
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const paginatedProducts = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

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
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginatedProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            image={product.image}
            title={product.title}
            description={product.description}
            onBuy={() => console.log(`Buy ${product.title}`)}
            isClient={false}
          />
        ))}
      </div>

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
          onSave={handleSaveProduct}
        />
      </div>
    </div>
  );
};

export default StorePage;
