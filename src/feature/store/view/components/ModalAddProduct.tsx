import { useState } from "react";
import ImageDropzone from "../../../../core/components/ImageDropzone";

interface ModalAddProductProps {
  id: string;
  title: string;
  onClose?: () => void;
  onSave?: (product: {
    title: string;
    description: string;
    image: File | null;
  }) => void;
}

export default function ModalAddProduct({
  id,
  title,
  onClose,
  onSave,
}: ModalAddProductProps) {
  const [productTitle, setProductTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSave = () => {
    if (!productTitle.trim()) {
      alert("Product title is required!");
      return;
    }
    onSave?.({ title: productTitle, description, image: imageFile });
    (document.getElementById(id) as HTMLDialogElement)?.close();
  };

  return (
    <dialog id={id} className="modal ">
      <div className="modal-box max-w-2xl ">
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
        </div>

        {/* Actions */}
        <div className="modal-action">
          <button className="btn btn-primary" onClick={handleSave}>
            Save
          </button>
          <form method="dialog">
            <button className="btn btn-outline" onClick={() => onClose?.()}>
              Cancel
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
