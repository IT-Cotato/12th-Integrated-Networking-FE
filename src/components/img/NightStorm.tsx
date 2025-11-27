import React from "react";
import StormIcon from "../../assets/img/Night-Storm.png";

interface NightStormProps {
  className?: string;
}

export const NightStorm: React.FC<NightStormProps> = ({ className }) => {
  return (
    <div className={className}>
      <img
        src={StormIcon}
        alt="Storm Icon"
        className="w-full h-full object-contain"
      />
    </div>
  );
};
