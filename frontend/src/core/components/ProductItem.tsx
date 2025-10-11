// components/ProductItem.tsx
interface ProductItemProps {
  src: string;
  name: string;
  price: string;
}

export default function ProductItem({ src, name, price }: ProductItemProps) {
  return (
    <div className="flex items-center gap-4 bg-base-100 rounded-xl p-3">
      <img
        src={src}
        alt="product"
        className="w-20 h-20 rounded-lg object-cover"
      />
      <div className="flex-1">
        <div className="font-medium text-base">{name}</div>
        <div className="text-sm mt-1">{price}</div>
      </div>
    </div>
  );
}
