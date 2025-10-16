import { useEffect, useState } from "react";

const assetBasePath = "/dist/aisha";

const CRAFT_IMAGES = [
  "A1.jpg",
  "B1.jpg",
  "C1.jpg",
  "D1.jpg",
  "M1.jpg",
  "O5.jpg",
].map((name) => `${assetBasePath}/${name}`);

const COVER_IMAGE = `${assetBasePath}/aicha_cover.jpg`;

export default function HeroSlideshow() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [exitCount, setExitCount] = useState(0);
  const [showCover, setShowCover] = useState(false);
  const [animationDone, setAnimationDone] = useState(false);
  const [displayedImages, setDisplayedImages] = useState<string[]>([]);

  // 🔹 Pick 3 or 6 images depending on screen size
  useEffect(() => {
    const updateImages = () => {
      const isMobile = window.innerWidth < 640; // Tailwind 'sm' breakpoint
      setDisplayedImages(isMobile ? CRAFT_IMAGES.slice(0, 3) : CRAFT_IMAGES);
    };
    updateImages();
    window.addEventListener("resize", updateImages);
    return () => window.removeEventListener("resize", updateImages);
  }, []);

  // 🔹 Run animation once on load (3-second total duration)
  useEffect(() => {
    if (displayedImages.length === 0) return;

    const showDuration = 1000; // 1s for all to appear
    const coverDelay = 500; // after all visible, fade in cover
    const exitDuration = 1500; // 1.5s for all to slide out
    const totalTime = showDuration + coverDelay + exitDuration;

    const appearInterval = showDuration / displayedImages.length; // balanced step timing

    // Phase 1: show images quickly
    const enterInterval = setInterval(() => {
      setVisibleCount((c) => {
        if (c < displayedImages.length) return c + 1;
        clearInterval(enterInterval);

        // Phase 2: fade in cover
        setTimeout(() => setShowCover(true), coverDelay);

        // Phase 3: slide images out quickly
        const exitInterval = setInterval(() => {
          setExitCount((c) => c + 1);
        }, exitDuration / displayedImages.length);

        // Stop after total sequence
        setTimeout(() => {
          clearInterval(exitInterval);
          setAnimationDone(true);
        }, totalTime);

        return c;
      });
    }, appearInterval);

    return () => clearInterval(enterInterval);
  }, [displayedImages]);

  return (
    <div className="flex w-full justify-center items-center mt-5">
      <div className="relative w-full h-[60vh] sm:h-[90vh] overflow-hidden rounded-xl ">
        {/* --- Aisha Cover --- */}
        <img
          src={COVER_IMAGE}
          alt="Aisha cover"
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${
            showCover ? "opacity-100 scale-105" : "opacity-0 scale-100"
          }`}
          style={{ zIndex: 1 }}
        />

        {/* --- Craft Images --- */}
        <div className="absolute inset-0 flex w-full h-full z-10">
          {displayedImages.map((src, index) => {
            const visible = index < visibleCount;
            const exiting = index < exitCount;
            return (
              <div
                key={src}
                className="h-full transition-all duration-500 ease-in-out w-1/3 sm:w-1/6"
                style={{
                  transform: exiting ? "translateX(120%)" : "translateX(0)",
                  opacity: visible && !exiting ? 1 : 0,
                }}
              >
                <img
                  src={src}
                  alt={`Craft ${index + 1}`}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            );
          })}
        </div>

        {!animationDone && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none z-20 transition-opacity duration-700"></div>
        )}
      </div>
    </div>
  );
}
