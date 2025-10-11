import { useState } from "react";

const filters = ["Best sellers", "New arrivals", "Sale Items", "Top rated"];

export default function FilterTabs() {
  const [active, setActive] = useState("Best sellers");

  return (
    <div className="flex flex-wrap justify-center gap-4 my-8">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => setActive(filter)}
          className={`badge badge-xl transition-all duration-200 px-4 py-3 rounded-full text-xl font-semibold 
            ${
              active === filter
                ? "badge-primary text-white shadow-lg"
                : "badge-outline hover:badge-neutral "
            }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
