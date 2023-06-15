import React from "react";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";
import AppColors from "~utills/AppColors";
const ConversationSVg = ({
  color = AppColors.black,
  width = 24,
  height = 24,
}) => {
  return (
    <Svg
      key={color}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={color}
      viewBox="0 0 24 24"
    >
      <Path
        fill={color}
        d="M4 2h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H6l-4 4V4c0-1.1.9-2 2-2Z"
      />
    </Svg>
  );
};
export default ConversationSVg;
