import React from "react";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";
import AppColors from "~utills/AppColors";
const BackSvg = ({ color = AppColors.primary, width = 30, height = 30 }) => {
  return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    // fill={color}
    // color={color}
    viewBox="0 0 24 24"
   
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m11 9-3 3m0 0 3 3m-3-3h8m5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </Svg>
  );
};
export default BackSvg;
