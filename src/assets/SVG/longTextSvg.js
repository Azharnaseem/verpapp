import React from "react";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";
import AppColors from "~utills/AppColors";
const LongTextSvg = ({ color = AppColors.black, width = 24, height = 24 }) => {
  return (
    <Svg
      key={color}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={color}
      color={color}
      viewBox="0 0 32 32"
    >
      <Path d="M0 20q0 2.496 1.76 4.256t4.256 1.76h12l4 5.984 4-5.984q2.464 0 4.224-1.76T32 20V6.016q0-2.496-1.76-4.256T26.016 0h-20Q3.52 0 1.76 1.76T0 6.016V20zm6.016 0v-1.984H16V20H6.016zm0-4v-1.984h20V16h-20zm0-4v-1.984h20V12h-20zm0-4V6.016h20V8h-20z" />
    </Svg>
  );
};
export default LongTextSvg;
