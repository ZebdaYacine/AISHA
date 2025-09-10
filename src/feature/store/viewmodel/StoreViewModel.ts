import { ref as databaseRef, push, set, update, get } from "firebase/database";
import { db } from "../../../core/firebase/config";

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
              image: `http://185.209.229.242:9999${data[key].image}`,
            }));
            resolve(products);
          } else {
            resolve([]);
          }
        })
        .catch((error) => {
          reject(error);
        });
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
    const formData = new FormData();
    formData.append("file", product.image as Blob);

    const response = await fetch("http://185.209.229.242:9999/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();
    const newProductData = {
      title: product.title,
      description: product.description,
      image: data.path,
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
      const formData = new FormData();
      formData.append("file", newImage as Blob);

      const response = await fetch("http://185.209.229.242:9999/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      imageUrl = data.path;
    }

    const productRef = databaseRef(db, `products/${productId}`);
    const finalUpdates = { ...updates, ...(imageUrl && { image: imageUrl }) };
    await update(productRef, finalUpdates);
  };

  static fetchProductById = (productId: string): Promise<Product | null> => {
    return new Promise((resolve, reject) => {
      const productRef = databaseRef(db, `products/${productId}`);
      get(productRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            resolve({
              id: snapshot.key,
              ...data,
              image: `${data.image}`,
            } as Product);
          } else {
            resolve(null);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}

export default StoreViewModel;
