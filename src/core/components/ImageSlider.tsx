import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export default function ImageSlider() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  const heritageItems = [
    { imageSrc: "/public/aisha/A1.jpg" },
    { imageSrc: "/public/aisha/B1.jpg" },
    { imageSrc: "/public/aisha/D1.jpg" },
    { imageSrc: "/public/aisha/O5.jpg" },
    { imageSrc: "/public/aisha/CP1.jpg" },
    { imageSrc: "/public/aisha/M1.jpg" },
    { imageSrc: "/public/aisha/J1.jpg" },
    { imageSrc: "/public/aisha/plateu en bois 1.jpg" },
  ];

  return (
    <div className="relative w-full h-screen overflow-hidden" ref={emblaRef}>
      <div className="embla__container flex h-full">
        {heritageItems.map((item, index) => (
          <div
            key={index}
            className="embla__slide flex-shrink-0 w-50 h-full relative "
          >
            <img
              src={item.imageSrc}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Overlay Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black bg-opacity-40 px-4">
        <h1 className="text-5xl font-bold text-white mb-4 animate-slide-up">
          Aisha
        </h1>
        <h2 className="text-3xl font-semibold text-white mb-4 animate-slide-up">
          Eyes on our traditions and patrimoine
        </h2>
        <p
          className="text-lg md:text-xl text-white max-w-3xl animate-slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          Discover Algeria’s heritage with authentic crafts from master artisans
          — pottery, weaving, metalwork, embroidery, and more.
        </p>
      </div>
    </div>
  );
}
