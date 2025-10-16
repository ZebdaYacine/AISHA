import {
  FaCreditCard,
  FaGlobeAmericas,
  FaBoxOpen,
  FaRegHeart,
} from "react-icons/fa";

const Features = () => (
  <div className="flex justify-around items-center w-full  ">
    <div className="flex flex-col items-center text-center">
      <FaCreditCard size={40} />
      <p className="mt-2 text-lg font-medium">Secure payment</p>
    </div>
    <div className="flex flex-col items-center text-center">
      <FaGlobeAmericas size={40} />
      <p className="mt-2 text-lg font-medium">Worldwide shipping</p>
    </div>
    <div className="flex flex-col items-center text-center">
      <FaBoxOpen size={40} />
      <p className="mt-2 text-lg font-medium">Delivered with care</p>
    </div>
    <div className="flex flex-col items-center text-center">
      <FaRegHeart size={40} />
      <p className="mt-2 text-lg font-medium">Excellent service</p>
    </div>
  </div>
);

export default Features;
