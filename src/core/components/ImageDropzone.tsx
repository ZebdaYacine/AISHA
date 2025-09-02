import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface ImageDropzoneProps {
  onImageDrop: (file: File) => void;
  existingImage?: string | null;
}

const ImageDropzone: React.FC<ImageDropzoneProps> = ({
  onImageDrop,
  existingImage,
}) => {
  const [preview, setPreview] = useState<string | null>(existingImage || null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        onImageDrop(file);
        setPreview(URL.createObjectURL(file));
      }
    },
    [onImageDrop]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`relative w-full p-6 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors duration-300 ${
        isDragActive
          ? "border-primary bg-primary-focus"
          : "border-base-300 hover:border-primary"
      }`}
    >
      <input {...getInputProps()} />
      {preview ? (
        <div className="flex flex-col items-center">
          <img
            src={preview}
            alt="Profile Preview"
            className="w-24 h-24 object-cover rounded-full mb-4"
          />
          <p className="text-sm">Drag 'n' drop to replace, or click</p>
        </div>
      ) : (
        <div className="text-base-content/70">
          {isDragActive ? (
            <p>Drop the image here...</p>
          ) : (
            <p>Drag 'n' drop an image here, or click to select one</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageDropzone;
