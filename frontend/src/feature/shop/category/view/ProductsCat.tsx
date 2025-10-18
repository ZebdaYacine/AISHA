import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductCard from "../../../../core/components/ProductCard";
import {
  getCategoryInfo,
  getCategoryProducts,
} from "../data/staticCategoryProducts";

function formatSlug(slug: string) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function ProductsCat() {
  const navigate = useNavigate();
  const { categorySlug, subcategorySlug } = useParams<{
    categorySlug?: string;
    subcategorySlug?: string;
  }>();

  const categoryInfo = useMemo(
    () => getCategoryInfo(categorySlug ?? null),
    [categorySlug]
  );

  const products = useMemo(
    () => getCategoryProducts(categorySlug ?? null, subcategorySlug ?? null),
    [categorySlug, subcategorySlug]
  );

  if (!categoryInfo) {
    return (
      <div className="mt-32 text-center text-xl">
        Category not found. Please return to the shop menu.
      </div>
    );
  }

  const headline = subcategorySlug
    ? `${categoryInfo.title} · ${formatSlug(subcategorySlug)}`
    : categoryInfo.title;

  const leadCopy = subcategorySlug
    ? `Curated pieces for ${formatSlug(subcategorySlug)}.`
    : categoryInfo.tagline;

  return (
    <div className="container mx-auto mt-32 px-4 pb-16">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight">{headline}</h1>
        <p className="mt-3 text-lg text-gray-600">{leadCopy}</p>
      </div>

      {products.length > 0 ? (
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.image}
              title={product.title}
              description={product.description}
              dimension={product.dimension}
              price={product.price}
              stock={product.stock}
              dispalyFavorite={false}
              showActionButton={false}
              onCardClick={() => navigate(`/product/${product.id}`)}
            />
          ))}
        </div>
      ) : (
        <div className="mt-16 text-center text-lg text-gray-500">
          We are curating pieces for this selection. Please check back soon.
        </div>
      )}
    </div>
  );
}

export default ProductsCat;
