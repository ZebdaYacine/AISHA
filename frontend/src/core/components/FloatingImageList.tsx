import FloatingImage from "./FloatingImage";

export default function FloatingList() {
  const assetBasePath = "/dist/aisha";
  const floatingImages = [
    {
      src: `${assetBasePath}/B1.jpg`,
      alt: "Handcrafted leather slippers",
      size: "lg" as const,
      position: "top-left" as const,
      delay: "0s",
    },
    {
      src: `${assetBasePath}/B2.jpg`,
      alt: "Clay pottery showcase",
      size: "lg" as const,
      position: "top-right" as const,
      delay: "0.3s",
    },
    {
      src: `${assetBasePath}/A1.jpg`,
      alt: "Traditional weaving loom",
      size: "md" as const,
      position: "top-center-left" as const,
      delay: "0.15s",
    },
    {
      src: `${assetBasePath}/C2.png`,
      alt: "Craftswoman portrait",
      size: "lg" as const,
      position: "top-center-right" as const,
      delay: "0.45s",
    },
    {
      src: `${assetBasePath}/D1.jpg`,
      alt: "Tuareg silver jewelry",
      size: "lg" as const,
      position: "bottom-left" as const,
      delay: "0.6s",
    },
    {
      src: `${assetBasePath}/M1.jpg`,
      alt: "Handcrafted lantern detail",
      size: "lg" as const,
      position: "bottom-center-left" as const,
      delay: "0.75s",
    },
    {
      src: `${assetBasePath}/C1.jpg`,
      alt: "Artisan basket weaving",
      size: "md" as const,
      position: "bottom-right" as const,
      delay: "0.5s",
    },
    {
      src: `${assetBasePath}/CP1.jpg`,
      alt: "Copper plates display",
      size: "lg" as const,
      position: "bottom-far-right" as const,
      delay: "0.9s",
    },
    {
      src: `${assetBasePath}/J1.jpg`,
      alt: "Colorful textile stack",
      size: "md" as const,
      position: "center-left" as const,
      delay: "1.05s",
    },
    {
      src: `${assetBasePath}/133T695O4.jpg`,
      alt: "Hand-painted ceramic bowl",
      size: "sm" as const,
      position: "center-right" as const,
      delay: "1.2s",
    },
  ];

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <div className="hidden sm:block relative w-full h-full">
        {floatingImages.map((image, index) => (
          <FloatingImage
            key={`${image.position}-${index}`}
            imageSrc={image.src}
            imageAlt={image.alt}
            size={image.size}
            position={image.position}
            animationDelay={image.delay}
          />
        ))}
      </div>
    </div>
  );
}
