import React from "react";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";
import AppColors from "~utills/AppColors";
const AttendenceSvg
 = ({
  color = AppColors.black,
  width = 28,
  height = 28,
}) => {
  return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={width}
    height={height}
    viewBox="0 0 512 512"
    color={color}
    key={color}
   
  >
    <Path
      d="M359.51 367.614c-19.106-7.148-40.877-18.276-40.877-32.676v-37.782c6.996-19.393 17.51-20.781 22.768-50.546 12.254-4.379 19.258-11.384 28.009-42.026 6.574-23.064-3.112-29.254-9.382-30.905.128-1.229.256-2.466.359-3.917 2.369-34.543 22.425-137.078-47.012-149.332-18.38-14.296-30.043-20.774-69.437-18.38-24.937-.008-43.892 5.497-70.306-2.05-35.245 29.565-25.561 126.66-20.63 173.504-6.199 1.388-16.889 7.148-10.052 31.08 8.744 30.641 15.748 37.646 28.001 42.026 5.258 29.765 21.252 39.322 22.417 50.546v37.782c0 14.4-23.494 26.55-40.877 32.676C119.058 379.397 25.911 414.275 34.073 512h443.856c8.161-97.725-85.217-131.965-118.419-144.386z"
      style={{
        fill: color,
      }}
    />
  </Svg>
  );
};
export default AttendenceSvg;
