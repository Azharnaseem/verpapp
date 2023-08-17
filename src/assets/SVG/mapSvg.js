import React from "react";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";
import AppColors from "~utills/AppColors";
const MapSVG = ({ color = AppColors.primary, width = 28, height = 28 }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      key={color}
      color={color}
      viewBox="0 0 24 24"
    >
      <Path
        stroke={AppColors.primary}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5.7 15c-1.666.635-2.7 1.52-2.7 2.5 0 1.933 4.03 3.5 9 3.5s9-1.567 9-3.5c0-.98-1.034-1.865-2.7-2.5M12 9h.01M18 9c0 4.064-4.5 6-6 9-1.5-3-6-4.936-6-9a6 6 0 1 1 12 0Zm-5 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
      />
    </Svg>
  );
};
export default MapSVG;
