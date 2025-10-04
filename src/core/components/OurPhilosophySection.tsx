export default function OurPhilosophySection() {
  return (
    <div className="flex w-3/4  justify-center items-center mt-5">
      <div className="card w-11/12 md:flex-row flex-col bg-base-100  rounded-2xl overflow-hidden">
        {/* LEFT: TEXT SECTION */}
        <div className="md:w-1/2 w-full p-8 flex flex-col justify-center bg-gradient-to-br from-amber-300 via-orange-500 to-yellow-300">
          <h2 className="text-3xl font-bold mb-4">Our Philosophy</h2>
          <p className=" text-gray-700 leading-relaxed md:text-2xl text-base text-justify">
            At Aicha, we believe in crafting products that blend style, comfort,
            and authenticity. Our commitment to ethical sourcing, sustainable
            materials, and timeless design reflects our deep respect for nature,
            craftsmanship, and you — our valued customer.
            <br />
            We’re not just creating clothing; we’re building a movement that
            celebrates individuality, empowers women, and inspires conscious
            living.
          </p>
        </div>

        {/* RIGHT: IMAGE SECTION */}
        <div className="hidden md:flex md:w-1/2  items-center justify-center ">
          <div className="w-full h-full   overflow-hidden">
            <img
              src="/dist/aisha/section/slide 2A.jpg"
              alt="Our Philosophy"
              className="w-full h-full object-cover "
            />
          </div>
        </div>
      </div>
    </div>
  );
}
