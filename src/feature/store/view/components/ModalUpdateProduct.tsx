import { useState, useEffect } from "react";
import { useSWRConfig } from "swr";
import ImageDropzone from "../../../../core/components/ImageDropzone";
import { useAuth } from "../../../../core/hooks/useAuth";
import StoreViewModel, {
  type Product,
} from "../../viewmodel/StoreViewModel";

interface ModalUpdateProductProps {
  id: string;
  title: string;
  product: Product | null;
  onClose?: () => void;
}

const ModalUpdateProduct: React.FC<ModalUpdateProductProps> = ({
  id,
  title,
  product,
  onClose,
}) => {
  const [productTitle, setProductTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [stock, setStock] = useState<number | "">("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { user } = useAuth();
  const { mutate } = useSWRConfig();

  useEffect(() => {
    if (product) {
      setProductTitle(product.title);
      setDescription(product.description);
      setPrice(product.price);
      setStock(product.stock);
    }
  }, [product]);

  const handleSave = async () => {
    if (!user) {
      alert("You must be logged in to update a product.");
      return;
    }
    if (!product) {
      alert("No product selected for update.");
      return;
    }
    if (!productTitle.trim()) {
      alert("Product title is required!");
      return;
    }
    if (price === "" || price <= 0) {
      alert("Please enter a valid price for the product.");
      return;
    }
    if (stock === "" || stock < 0) {
      alert("Please enter a valid stock quantity.");
      return;
    }

    setIsUploading(true);
    try {
      await StoreViewModel.updateProduct(
        product.id,
        {
          title: productTitle,
          description,
          price: price,
          stock: stock,
        },
        imageFile
      );
      mutate("products");
      (document.getElementById(id) as HTMLDialogElement)?.close();
      setImageFile(null);
    } catch (error) {
      console.error("Failed to update product:", error);
      alert("Failed to update product. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

    return (
      <dialog id={id} className="modal">
        <div className="modal-box max-w-2xl">
          <h3 className="font-bold text-xl mb-4">{title}</h3>

          <div className="space-y-4">
            {/* Title */}
            <div className="form-control">
              <label className="label font-medium">Product Title</label>
              <input
                type="text"
                placeholder="Awesome product name"
                className="input input-bordered w-full"
                value={productTitle}
                onChange={(e) => setProductTitle(e.target.value)}
              />
            </div>
            {/* Price */}
            <div className="form-control">
              <label className="label font-medium">Price</label>
              <input
                type="number"
                placeholder="99.99"
                className="input input-bordered w-full"
                value={price}
                onChange={(e) =>
                  setPrice(
                    e.target.value === "" ? "" : parseFloat(e.target.value)
                  )
                }
              />
            </div>

            {/* Stock */}
            <div className="form-control">
              <label className="label font-medium">Stock</label>
              <input
                type="number"
                placeholder="10"
                className="input input-bordered w-full"
                value={stock}
                onChange={(e) =>
                  setStock(
                    e.target.value === "" ? "" : parseInt(e.target.value, 10)
                  )
                }
              />
            </div>

            {/* Description */}
            <div className="form-control">
              <label className="label font-medium">Description</label>
              <textarea
                className="textarea textarea-bordered w-full h-24"
                placeholder="Write a short product description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <label className="label">
                <span className="label-text-alt">Optional</span>
              </label>
            </div>

            {/* Image Upload */}
            <div className="form-control">
              <label className="label font-medium">
                Product Image (Optional)
              </label>
              <ImageDropzone onImageDrop={setImageFile} />
            </div>

            {/* Progress Bar */}
            {isUploading && (
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `100%` }}
                ></div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="modal-action">
            <button
              className="btn btn-primary"
              onClick={handleSave}
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Update"}
            </button>
            <form method="dialog">
              <button
                className="btn btn-outline"
                onClick={onClose}
                disabled={isUploading}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </dialog>
    );
};

export default ModalUpdateProduct;
