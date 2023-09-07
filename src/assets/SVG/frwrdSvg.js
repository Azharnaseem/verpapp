import React from "react";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";
import AppColors from "~utills/AppColors";
const FrwordSvg = ({ color = AppColors.primary, width = 30, height = 30 }) => {
  return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    color={color}
    fill={color}
  >
    <Path d="M15.71 12.71a1 1 0 0 0 .21-.33 1 1 0 0 0 0-.76 1 1 0 0 0-.21-.33l-3-3a1 1 0 0 0-1.42 1.42l1.3 1.29H9a1 1 0 0 0 0 2h3.59l-1.3 1.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0ZM22 12a10 10 0 1 0-10 10 10 10 0 0 0 10-10ZM4 12a8 8 0 1 1 8 8 8 8 0 0 1-8-8Z" />
  </Svg>
  );
};
export default FrwordSvg;
