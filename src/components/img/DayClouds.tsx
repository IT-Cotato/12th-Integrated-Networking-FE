import React from "react";
import CloudsIcon from "../../assets/img/Day-Clouds.png";

interface DayCloudProps {
  className?: string;
}

export const DayClouds: React.FC<DayCloudProps> = ({ className }) => {
  return (
    <div className={className}>
      <img
        src={CloudsIcon}
        alt="Clouds Icon"
        className="w-full h-full object-contain"
      />
    </div>
  );
};
