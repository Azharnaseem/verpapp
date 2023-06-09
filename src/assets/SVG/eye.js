import React from "react";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";
import AppColors from "~utills/AppColors";
const Eye = ({ color = AppColors.primary, width = 20, height = 20 }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 18 18">
      <Defs>
        <ClipPath id="clip-path">
          <Rect
            id="Rectangle_539"
            data-name="Rectangle 539"
            width="18"
            height="18"
            transform="translate(287 21)"
            fill={color}
          />
        </ClipPath>
      </Defs>
      <G
        id="Mask_Group_19"
        data-name="Mask Group 19"
        transform="translate(-287 -21)"
        clip-path="url(#clip-path)"
      >
        <G id="view" transform="translate(287 21)">
          <G id="Group_2" data-name="Group 2">
            <G id="Group_1" data-name="Group 1">
              <Path
                id="Path_168"
                data-name="Path 168"
                d="M17.886,8.65C17.725,8.43,13.893,3.264,9,3.264S.275,8.43.114,8.65a.594.594,0,0,0,0,.7C.275,9.57,4.106,14.736,9,14.736S17.725,9.57,17.886,9.35A.593.593,0,0,0,17.886,8.65ZM9,13.549c-3.6,0-6.726-3.429-7.651-4.55C2.272,7.878,5.388,4.451,9,4.451S15.726,7.879,16.651,9C15.728,10.122,12.612,13.549,9,13.549Z"
                fill={color}
              />
            </G>
          </G>
          <G id="Group_4" data-name="Group 4">
            <G id="Group_3" data-name="Group 3">
              <Path
                id="Path_169"
                data-name="Path 169"
                d="M9,5.44A3.56,3.56,0,1,0,12.56,9,3.565,3.565,0,0,0,9,5.44Zm0,5.934A2.374,2.374,0,1,1,11.374,9,2.376,2.376,0,0,1,9,11.374Z"
                fill={color}
              />
            </G>
          </G>
        </G>
      </G>
    </Svg>
  );
};
export default Eye;
