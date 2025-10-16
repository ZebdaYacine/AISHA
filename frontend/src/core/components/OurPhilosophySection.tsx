export default function OurPhilosophySection() {
  return (
    <div className="flex w-3/4  justify-center items-center mt-5">
      <div className="card w-11/12 md:flex-row flex-col bg-base-100  rounded-2xl overflow-hidden">
        {/* LEFT: TEXT SECTION */}
        <div className="md:w-1/2 w-full p-8 flex flex-col justify-center bg-[#F0F0F0]">
          <h2 className="text-3xl font-bold mb-4">Our Philosophy</h2>
          <p className=" text-gray-700 leading-relaxed md:text-2xl text-base text-justify">
            At Aicha, we believe in celebrating the soul of Algerian
            craftsmanship. We honor the hands that create, the traditions that
            endure, and the stories woven into every product. Committed to fair
            trade and sustainability, we connect artisans with the world,
            ensuring authenticity, quality, and cultural richness in every
            purchase. Together, we build a legacy of beauty and empowerment.
            <br />
          </p>
        </div>

        {/* RIGHT: IMAGE SECTION */}
        <div className="hidden md:flex md:w-1/2  items-center justify-center ">
          {/* <div className="w-full h-full   overflow-hidden">
            <img
              src="/dist/aisha/section/slide 2A.jpg"
              alt="Our Philosophy"
              className="w-full h-full object-cover "
            />
          </div> */}
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            playsInline
            muted
          >
            <source src="/dist/aisha/our_philosophy.mp4" type="video/mp4" />
          </video>
          <div className="h-1/3 w-full">
            <video
              className="w-full h-full object-cover"
              autoPlay
              loop
              playsInline
              muted
            >
              <source src="/dist/aisha/our_philosophy.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </div>
  );
}
