import {
  FaCreditCard,
  FaGlobeAmericas,
  FaBoxOpen,
  FaRegHeart,
} from "react-icons/fa";

const FEATURE_ITEMS = [
  {
    icon: FaCreditCard,
    label: "Secure payment",
  },
  {
    icon: FaGlobeAmericas,
    label: "Worldwide shipping",
  },
  {
    icon: FaBoxOpen,
    label: "Delivered with care",
  },
  {
    icon: FaRegHeart,
    label: "Excellent service",
  },
] as const;

const Features = () => (
  <section className="w-full ">
    <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-8 sm:px-6">
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8">
        {FEATURE_ITEMS.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-3 rounded-2xl bg-base-200/40 p-4 text-center shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-md"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full  sm:h-16 sm:w-16">
              <Icon className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden="true" />
            </span>
            <p className="text-sm font-semibold text-base-content sm:text-base">
              {label}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
