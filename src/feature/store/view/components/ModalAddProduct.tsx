import { useState } from "react";
import { observer } from "mobx-react-lite";
import ImageDropzone from "../../../../core/components/ImageDropzone";
import { useAuth } from "../../../../core/hooks/useAuth";
import StoreViewModel from "../../viewmodel/StoreViewModel";

interface ModalAddProductProps {
  id: string;
  title: string;
  viewModel: StoreViewModel;
  onClose?: () => void;
}

const ModalAddProduct: React.FC<ModalAddProductProps> = observer(({
  id,
  title,
  viewModel,
  onClose,
}) => {
  const [productTitle, setProductTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { user } = useAuth();

  const handleSave = () => {
    if (!user) {
      alert("You must be logged in to add a product.");
      return;
    }
    if (!productTitle.trim()) {
      alert("Product title is required!");
      return;
    }
    if (!imageFile) {
      alert("Please select an image for the product.");
      return;
    }

    viewModel.addProduct(
      { title: productTitle, description, image: imageFile },
      user.uid
    );

    // Close modal after upload starts, ViewModel handles the rest
    (document.getElementById(id) as HTMLDialogElement)?.close();
    // Reset form
    setProductTitle("");
    setDescription("");
    setImageFile(null);
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
            <label className="label font-medium">Product Image</label>
            <ImageDropzone onImageDrop={setImageFile} />
          </div>

          {/* Progress Bar */}
          {viewModel.isUploading && (
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${viewModel.uploadProgress}%` }}
              ></div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="modal-action">
          <button
            className="btn btn-primary"
            onClick={handleSave}
            disabled={viewModel.isUploading}
          >
            {viewModel.isUploading ? "Uploading..." : "Save"}
          </button>
          <form method="dialog">
            <button
              className="btn btn-outline"
              onClick={onClose}
              disabled={viewModel.isUploading}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
});

export default ModalAddProduct;
