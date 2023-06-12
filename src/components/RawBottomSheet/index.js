import React, { forwardRef, useRef } from "react";
import { Text, Dimensions } from "react-native";

import RBSheet from "react-native-raw-bottom-sheet";

const { width, height } = Dimensions.get("window");
const guidelineBaseWidth = 320;
const guidelineBaseHeight = 568;
const verticalScale = (size) => (height / guidelineBaseHeight) * size;

const RawBottomSheet = (props, ref) => {
  return (
    <RBSheet
      ref={ref}
      closeOnDragDown={true}
      closeOnPressMask={true}
      height={props.height}
      duration={250}
      customStyles={{
        // wrapper: {
        //     backgroundColor: 'transparent',
        // },
        container: {
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        },
        draggableIcon: {
          backgroundColor: "#000",
        },
      }}
      onOpen={() => console.log("Bottom sheet opened")}
      onClose={() => console.log("Bottom sheet closed")}
    >
      {props.children}
    </RBSheet>
  );
};
export default forwardRef(RawBottomSheet);
