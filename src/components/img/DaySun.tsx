import React from "react";
import SunIcon from "../../assets/img/Day-Sun.png";

interface DaySunProps {
  className?: string;
}

export const DaySun: React.FC<DaySunProps> = ({ className }) => {
  return (
    <div className={className}>
      <img
        src={SunIcon}
        alt="Sun Icon"
        className="w-full h-full object-contain"
      />
    </div>
  );
};
