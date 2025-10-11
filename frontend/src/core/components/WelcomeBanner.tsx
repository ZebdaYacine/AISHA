import type { FC } from "react";

type WelcomeBannerProps = {
  name?: string | null;
  description?: string;
  className?: string;
};

const WelcomeBanner: FC<WelcomeBannerProps> = ({
  name,
  description = "Discover your personalized store and manage your products with ease.",
  className,
}) => {
  const displayName = name && name.trim().length > 0 ? name : "there";
  const baseClass = "mb-10 text-center";

  return (
    <div className={`${baseClass} ${className ?? ""}`.trim()}>
      <h2 className="text-3xl font-bold">
        Welcome back, <span className="text-primary">{displayName}</span> 👋
      </h2>
      <p className="text-gray-500 mt-2">{description}</p>
    </div>
  );
};

export default WelcomeBanner;
