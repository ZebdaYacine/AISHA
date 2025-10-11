import type { FC, JSX } from "react";
import { CheckCircle, Clock, XCircle } from "lucide-react"; // icons

type AlertType = "pending" | "accepted" | "rejected";

interface CustomAlertProps {
  type: AlertType;
  message: string;
}

const styles: Record<AlertType, string> = {
  pending: "bg-blue-100 text-blue-800 border-blue-300",
  accepted: "bg-green-100 text-green-800 border-green-300",
  rejected: "bg-red-100 text-red-800 border-red-300",
};

const icons: Record<AlertType, JSX.Element> = {
  pending: <Clock className="w-6 h-6" />,
  accepted: <CheckCircle className="w-6 h-6" />,
  rejected: <XCircle className="w-6 h-6" />,
};

const CustomAlert: FC<CustomAlertProps> = ({ type, message }) => {
  return (
    <div
      role="alert"
      className={`alert flex items-center gap-3 p-4 border rounded-xl text-lg font-semibold justify-center shadow-sm ${styles[type]}`}
    >
      {icons[type]}
      <span>{message}</span>
    </div>
  );
};

export default CustomAlert;
