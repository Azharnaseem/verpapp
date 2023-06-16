import React from "react";
import Svg, { Path } from "react-native-svg";
import AppColors from "~utills/AppColors";
const CrossSVG = ({ color = AppColors.primary, width = 16, height = 22 }) => {
  return (
    <Svg
      key={color}
      width={width}
      height={height}
      viewBox="0 0 8 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M3.99987 3.29312L6.47487 0.818115L7.18187 1.52512L4.70687 4.00012L7.18187 6.47512L6.47487 7.18212L3.99987 4.70711L1.52487 7.18212L0.817871 6.47512L3.29287 4.00012L0.817871 1.52512L1.52487 0.818115L3.99987 3.29312Z"
        fill={color}
      />
    </Svg>
  );
};
export default CrossSVG;
