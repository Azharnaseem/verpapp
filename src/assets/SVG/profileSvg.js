import React from "react";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";
import AppColors from "~utills/AppColors";
const ProfileSvg = ({ color = AppColors.red, width = 24, height = 24 }) => {
  return (
    <Svg
      width={width}
      height={height}
      fill={color}
      color={color}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
    >
      <Path d="M224 256a128 128 0 1 0 0-256 128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3 0 498.7 13.3 512 29.7 512h388.6c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3h-91.4z" />
    </Svg>
  );
};
export default ProfileSvg;
