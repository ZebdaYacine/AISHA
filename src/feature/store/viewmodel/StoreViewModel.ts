import { makeAutoObservable } from "mobx";
import { ref as databaseRef, onValue, push, set } from "firebase/database";
import { db } from "../../../core/firebase/config";

export interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  userId: string;
}

class StoreViewModel {
  products: Product[] = [];
  isLoading = true;
  error: string | null = null;
  uploadProgress = 0;
  isUploading = false;

  constructor() {
    makeAutoObservable(this);
    this.fetchProducts();
  }

  fetchProducts() {
    this.isLoading = true;
    const productsDbRef = databaseRef(db, "products");
    onValue(
      productsDbRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          this.products = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
            image: `http://185.209.229.242:9999${data[key].image}`,
          }));
        } else {
          this.products = [];
        }
        this.isLoading = false;
      },
      (error) => {
        this.error = error.message;
        this.isLoading = false;
      }
    );
  }

  addProduct = (
    product: { title: string; description: string; image: File },
    userId: string
  ) => {
    this.isUploading = true;
    this.uploadProgress = 0;

    const formData = new FormData();
    formData.append("file", product.image as Blob);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://185.209.229.242:9999/upload", true);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        this.uploadProgress = (event.loaded / event.total) * 100;
      }
    };

    xhr.onload = () => {
      this.isUploading = false;
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        const newProductData = {
          title: product.title,
          description: product.description,
          image: data.path,
          userId,
        };
        const productsDbRef = databaseRef(db, "products");
        const newProductRef = push(productsDbRef);
        set(newProductRef, newProductData);
      } else {
        this.error = xhr.statusText;
      }
    };

    xhr.onerror = () => {
      this.isUploading = false;
      this.error = "Upload failed";
    };

    xhr.send(formData);
  };
}

export default StoreViewModel;
