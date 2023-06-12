import React, { forwardRef } from "react";
import { View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import AppColors from "~utills/AppColors";
import { height, width } from "~utills/Dimension";

const BottomSheet = (
  {
    showData = () => null,
    children,
    bottomSheetHeight,
    draggableIconStyle = {
      width: width(15),
      backgroundColor: AppColors.secndry,
      marginTop: height(10),
      // / paddingTop: height(6),
    },
  },
  ref
) => {
  return (
    <RBSheet
      ref={ref}
      // closeOnDragDown={true}
      closeOnPressBack={true}
      height={bottomSheetHeight}
      openDuration={600}
      customStyles={{
        // wrapper: { backgroundColor: "transparent" },
        container: {
          overflow: "visible",
          backgroundColor: AppColors.scndry,
          borderTopRightRadius: width(5),
          borderTopLeftRadius: width(5),
          borderWidth: 2,
          borderColor: AppColors.primary,
        },
        // draggableIcon: draggableIconStyle,
      }}
    >
      <View>{children}</View>
    </RBSheet>
  );
};

export default forwardRef(BottomSheet);
