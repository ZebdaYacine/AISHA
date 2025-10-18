import { useEffect, useMemo, useState } from "react";
import ImageZoom from "../../../../core/components/ImageZoom";

interface ProductGalleryProps {
  images: string[];
  title: string;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images, title }) => {
  const sanitizedImages = useMemo(() => {
    const validImages = images.filter(
      (src): src is string => typeof src === "string" && src.length > 0
    );
    return Array.from(new Set(validImages));
  }, [images]);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (sanitizedImages.length === 0) {
      if (activeIndex !== 0) {
        setActiveIndex(0);
      }
      return;
    }

    if (activeIndex >= sanitizedImages.length) {
      setActiveIndex(0);
    }
  }, [sanitizedImages, activeIndex]);

  if (sanitizedImages.length === 0) {
    return null;
  }

  const handlePrev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? sanitizedImages.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prev) =>
      prev === sanitizedImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <ImageZoom
          src={sanitizedImages[activeIndex]}
          alt={`${title} - image ${activeIndex + 1}`}
          className="w-full h-full sm:h-full md:h-full rounded-lg shadow-lg overflow-hidden"
        />

        {sanitizedImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              className="btn btn-circle btn-sm absolute left-4 top-1/2 -translate-y-1/2 bg-base-100/80 hover:bg-base-100"
            >
              {"<"}
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="btn btn-circle btn-sm absolute right-4 top-1/2 -translate-y-1/2 bg-base-100/80 hover:bg-base-100"
            >
              {">"}
            </button>
          </>
        )}
      </div>

      {sanitizedImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {sanitizedImages.map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                index === activeIndex
                  ? "border-primary shadow-lg"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <img
                src={src}
                alt={`${title} thumbnail ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
