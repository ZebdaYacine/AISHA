import type { IconType } from "react-icons";
import React from "react";

interface InputWithIconProps {
  Icon: IconType;
  placeholder: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

const InputWithIcon: React.FC<InputWithIconProps> = ({
  Icon,
  placeholder,
  value,
  onChange,
  type = "text",
}) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type={type}
        placeholder={placeholder}
        className="input input-bordered w-full pl-10"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputWithIcon;
