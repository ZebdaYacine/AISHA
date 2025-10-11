import { ref as databaseRef, push, set, update, get } from "firebase/database";
import { db } from "../../../core/firebase/config";

const UPLOAD_ENDPOINT = import.meta.env.PROD
  ? import.meta.env.VITE_UPLOAD_ENDPOINT_PROD
  : import.meta.env.VITE_UPLOAD_ENDPOINT_TEST;

export interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  userId: string;
  price: number;
  stock: number;
}

class StoreViewModel {
  // make it static so it can be used inside static methods
  private static base_url = UPLOAD_ENDPOINT;

  static fetchProducts = (): Promise<Product[]> => {
    return new Promise((resolve, reject) => {
      const productsDbRef = databaseRef(db, "products");
      get(productsDbRef)
        .then((snapshot) => {
          const data = snapshot.val();
          if (data) {
            const products = Object.keys(data).map((key) => ({
              id: key,
              ...data[key],
              image: `${data[key].image}`,
            }));
            resolve(products);
          } else {
            resolve([]);
          }
        })
        .catch((error) => reject(error));
    });
  };

  static addProduct = async (
    product: {
      title: string;
      description: string;
      image: File;
      price: number;
      stock: number;
    },
    userId: string
  ) => {
    const fileData = await StoreViewModel.fileToBase64(product.image);

    const response = await fetch(StoreViewModel.base_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        file_data: fileData,
        file_name: product.image.name,
      }),
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    const data = await response.json();
    const uploadedImagePath = data?.file_url ?? data?.url ?? data?.path;

    if (!uploadedImagePath) {
      throw new Error("Upload response missing image path");
    }

    const newProductData = {
      title: product.title,
      description: product.description,
      image: uploadedImagePath,
      userId,
      price: product.price,
      stock: product.stock,
    };

    const productsDbRef = databaseRef(db, "products");
    const newProductRef = push(productsDbRef);
    await set(newProductRef, newProductData);
  };

  static updateProduct = async (
    productId: string,
    updates: {
      title: string;
      description: string;
      price: number;
      stock: number;
    },
    newImage?: File | null
  ) => {
    let imageUrl = "";
    if (newImage) {
      const fileData = await StoreViewModel.fileToBase64(newImage);

      const response = await fetch(StoreViewModel.base_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          file_data: fileData,
          file_name: newImage.name,
        }),
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const data = await response.json();
      imageUrl = data?.file_url ?? data?.url ?? data?.path ?? "";

      if (!imageUrl) {
        throw new Error("Upload response missing image path");
      }
    }

    const productRef = databaseRef(db, `products/${productId}`);
    const finalUpdates = { ...updates, ...(imageUrl && { image: imageUrl }) };
    await update(productRef, finalUpdates);
  };

  private static fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        if (typeof result !== "string") {
          reject(new Error("Failed to convert file to base64"));
          return;
        }
        const base64 = result.includes(",") ? result.split(",")[1] : result;
        resolve(base64);
      };
      reader.onerror = () => {
        reject(reader.error ?? new Error("Failed to read file"));
      };
      reader.readAsDataURL(file);
    });
  }

  static fetchProductById = (productId: string): Promise<Product | null> => {
    return new Promise((resolve, reject) => {
      const productRef = databaseRef(db, `products/${productId}`);
      get(productRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            resolve({
              id: snapshot.key!,
              ...data,
              image: `${data.image}`,
            } as Product);
          } else {
            resolve(null);
          }
        })
        .catch((error) => reject(error));
    });
  };
}

export default StoreViewModel;
