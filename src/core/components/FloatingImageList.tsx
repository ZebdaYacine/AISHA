import FloatingImage from "./FloatingImage";

export default function FloatingList() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <div className="hidden sm:block">
        <FloatingImage
          imageSrc="/public/aisha/B1.jpg"
          imageAlt="Shoes"
          size="lg"
          position="top-left"
          animationDelay="0s"
        />
      </div>
      <div className="hidden sm:block">
        <FloatingImage
          imageSrc="/public/aisha/C1.jpg"
          imageAlt="Artisan Craft"
          size="md"
          position="bottom-right"
          animationDelay="0.5s"
        />
      </div>
      <div className="hidden sm:block">
        <FloatingImage
          imageSrc="/public/aisha/B2.jpg"
          imageAlt="Shoes"
          size="lg"
          position="top-right"
          animationDelay="0s"
        />
      </div>
      <div className="hidden sm:block">
        <FloatingImage
          imageSrc="/public/aisha/A1.jpg"
          imageAlt="Shoes"
          size="lg"
          position="top-center-left"
          animationDelay="0s"
        />
      </div>
      <div className="hidden sm:block">
        <FloatingImage
          imageSrc="/public/aisha/CP1.jpg"
          imageAlt="Shoes"
          size="lg"
          position="bottom-far-right"
          animationDelay="0s"
        />
      </div>
      <div className="hidden sm:block">
        <FloatingImage
          imageSrc="/public/aisha/D1.jpg"
          imageAlt="Shoes"
          size="lg"
          position="bottom-left"
          animationDelay="0s"
        />
      </div>
      <div className="hidden sm:block">
        <FloatingImage
          imageSrc="/public/aisha/C1.jpg"
          imageAlt="Artisan Craft"
          size="md"
          position="bottom-right"
          animationDelay="0.5s"
        />
      </div>
    </div>
  );
}
