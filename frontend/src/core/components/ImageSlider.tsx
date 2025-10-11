import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export default function ImageSlider() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  const assetBasePath = "/dist/aisha";

  const heritageItems = [
    { imageSrc: `${assetBasePath}/A1.jpg` },
    { imageSrc: `${assetBasePath}/B1.jpg` },
    { imageSrc: `${assetBasePath}/D1.jpg` },
    { imageSrc: `${assetBasePath}/O5.jpg` },
    { imageSrc: `${assetBasePath}/CP1.jpg` },
    { imageSrc: `${assetBasePath}/M1.jpg` },
    { imageSrc: `${assetBasePath}/J1.jpg` },
    { imageSrc: `${assetBasePath}/plateu en bois 1.jpg` },
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
