import { useState } from "react";

const crafts = [
  {
    name: "Pottery",
    image: "/public/aisha/133T695O4.jpg",
    description: "Traditional clay pottery with unique Berber patterns.",
  },
  {
    name: "Weaving",
    image: "/public/aisha/6.jpg",
    description: "Handwoven textiles using ancestral techniques.",
  },
  {
    name: "Metalwork",
    image: "/public/aisha/D1.jpg",
    description: "Intricate metal artifacts crafted by skilled artisans.",
  },
  {
    name: "Embroidery",
    image: "/public/aisha/B1.jpg",
    description: "Colorful thread embroidery with regional symbols.",
  },
  {
    name: "Wood Carving",
    image: "/public/aisha/C2.png",
    description: "Hand-carved wooden décor and tools.",
  },
];

export default function CraftsDropdown() {
  const [selectedCraft, setSelectedCraft] = useState(crafts[0]);

  return (
    <div
      tabIndex={0}
      className="absolute left-1/2 top-full -translate-x-1/2 dropdown-content  w-[90vw] sm:w-[800px] h-auto max-h-[400px] mt-3 p-4 shadow-xl bg-base-100 rounded-box  max-w-2xl"
    >
      <div className="flex flex-col  ">
        <div className="flex flex-1 text-center text-3xl font-semibold mb-4">
          {" "}
          List of our crafts
        </div>
        <div className="flex flex-row w-full">
          <div className="flex-1 space-y-2">
            {crafts.map((craft, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setSelectedCraft(craft);
                }}
                className={`p-3 rounded-md cursor-pointer transition ${
                  selectedCraft.name === craft.name
                    ? "bg-primary text-primary-content"
                    : "hover:bg-base-200"
                }`}
              >
                {craft.name}
              </div>
            ))}
          </div>
          {/* Right: Craft detail card */}
          <div className="flex-1 bg-base-200 rounded-lg p-4 shadow-lg flex flex-col items-center text-center">
            <img
              src={selectedCraft.image}
              alt={selectedCraft.name}
              className="w-32 h-32 object-cover rounded-full mb-4"
            />
            <h3 className="text-xl font-bold">{selectedCraft.name}</h3>
            <p className="text-sm mt-2 text-gray-600">
              {selectedCraft.description}
            </p>
          </div>{" "}
        </div>
      </div>
    </div>
  );
}
