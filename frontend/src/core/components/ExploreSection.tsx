const ExploreSection = () => {
  return (
    <div className="mt-20 flex justify-center w-full">
      {/* Container */}
      <div className="w-full sm:w-3/4 flex flex-col sm:flex-row justify-center items-stretch sm:h-[700px] px-4">
        {/* Left Card */}
        <div className="relative w-full sm:w-1/2 h-[300px] sm:h-full overflow-hidden shadow-lg group ">
          <img
            src="/dist/aisha/attachments/EXPLORE CAFTAN.png"
            alt="Explore Caftan"
            className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700 ease-in-out"
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition duration-500"></div>
          <div
            className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white drop-shadow-lg">
              Explore Our Caftan Collection
            </h2>
            <button className="mt-4 px-6 py-2 bg-white text-black font-semibold rounded-full shadow hover:bg-gray-100 transition">
              Shop Now
            </button>
          </div>
        </div>

        {/* Right Card */}
        <div className="relative w-full sm:w-1/2 h-[300px] sm:h-full overflow-hidden shadow-lg group ">
          <img
            src="/dist/aisha/attachments/EXPLORE HOME DECO.png"
            alt="Explore Home Deco"
            className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700 ease-in-out"
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition duration-500"></div>
          <div
            className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white drop-shadow-lg">
              Explore Home Deco
            </h2>
            <button className="mt-4 px-6 py-2 bg-white text-black font-semibold rounded-full shadow hover:bg-gray-100 transition">
              Discover
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreSection;
