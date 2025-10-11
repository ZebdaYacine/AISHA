import type { FC, ReactNode } from "react";
import { Construction, Clock } from "lucide-react";
import { motion } from "framer-motion";

type UnderDevelopmentProps = {
  featureName?: string;
  description?: string;
  className?: string;
  children?: ReactNode;
};

const UnderDevelopment: FC<UnderDevelopmentProps> = ({
  featureName = "This feature",
  description = "We're actively building something great. Thanks for your patience!",
  children,
}) => {
  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800 `}
    >
      <motion.div
        className="flex flex-col items-center text-center px-6 py-12 rounded-2xl shadow-lg bg-white max-w-lg border border-gray-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="p-4 bg-yellow-100 rounded-full mb-4 shadow-sm">
          <Construction className="w-10 h-10 text-yellow-600" />
        </div>

        <h1 className="text-2xl font-semibold mb-2">
          {featureName} is under development
        </h1>
        <p className="text-gray-600 mb-4">{description}</p>

        {children && (
          <div className="mt-6 flex flex-col items-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-1 inline-block" />
            {children}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default UnderDevelopment;
