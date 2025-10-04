import ImageSlider from "./ImageSlider";
// import ProductItem from "./ProductItem";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import ProductItem from "../components/ProductItem";
export default function SlideSection() {
  return (
    <div className="h-1/3 flex w-full items-center justify-center mt-5">
      <div className="flex w-11/12 md:flex-row flex-col gap-8   justify-center p-4 rounded-2xl ">
        {/* LEFT CARD */}
        <div className="  card md:w-1/2 h-full bg-base-100 shadow-xl rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300">
          <figure className="h-full">
            <ImageSlider />
          </figure>
        </div>

        {/* <div className="rounded-2xl shadow-xl p-4 md:w-1/2 h-full overflow-y-auto bg-base-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Popular products</h2>
            <div className="flex gap-2">
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-base-200 hover:bg-base-300">
                <FaChevronLeft />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-base-200 hover:bg-base-300">
                <FaChevronRight />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3 overflow-y-auto max-h-[80%] pr-2">
            {[
              {
                src: "/dist/aisha/A1.jpg",
                name: "Short jacket in long-pile faux fur",
                price: "$218.00",
              },
              {
                src: "/dist/aisha/B1.jpg",
                name: "Women's walking shoes tennis sneakers",
                price: "$54.99",
              },
              {
                src: "/dist/aisha/6.jpg",
                name: "Classic aviator sunglasses for women",
                price: "$76.00",
              },
            ]
              .flatMap((item) => Array(2).fill(item))
              .map((product, i) => (
                <ProductItem
                  key={i}
                  src={product.src}
                  name={product.name}
                  price={product.price}
                />
              ))}
          </div>
        </div> */}
      </div>
    </div>
  );
}
