import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Text, Pressable, View } from "react-native";
import Modal from "react-native-modal";
import AppColors from "~utills/AppColors";
import styles from "./styles";
import { height, width } from "~utills/Dimension";
import { transform } from "@babel/core";

const DrawerModal = (
  {
    children,
    onClose,
    containerStyle,
    swipeDirection = "down",
    backdropColor = AppColors.black,
    backdropOpacity = 0.5,
    wraperContainer,
  },
  ref
) => {
  const [isVisible, setVisible] = useState(false);
  useImperativeHandle(ref, () => ({
    show: function () {
      setVisible(true);
    },
    hide: function () {
      setVisible(false);
    },
  }));

  return (
    <Modal
      isVisible={isVisible}
      //  / style={[styles.modalContainer, wraperContainer]}
      backdropColor={backdropColor}
      backdropOpacity={backdropOpacity}
      onBackdropPress={() => setVisible(false)}
      // avoidKeyboard={true}
      onBackButtonPress={() => setVisible(false)}
      // swipeDirection={swipeDirection}
      onSwipeComplete={() => setVisible(false)}
      // propagateSwipe={true}
    >
      <View style={styles.modalInnerContainer}>
        <View style={styles.modalInnerrContainer}></View>
        <View
          style={{
            width: "100%",
            height: height(15),
            position: "absolute",
            top: 60,
          }}
        >
          <View
            style={{
              width: "100%",
              height: height(12),
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              borderWidth: 3,
              borderColor: AppColors.scndry,
              backgroundColor:"red"
            }}
          ></View>
          <View style={{width:"100%",
          flexDirection:"row",
          justifyContent:"space-between",
          alignItems:"center"
          }}>
            <View style={{width:0,
            height:0,
            borderLeftWidth:22,
            borderRightWidth:22,
            borderBottomWidth:22,
            borderLeftColor:"transparent",
            borderRightColor:"transparent",
            borderBottomColor:"red",
            // transform: {rotate:"90deg" , scale},
            // transform:[{rotate:'45deg'}]
           
            }}>

            </View>

          </View>
        </View>
      </View>
    </Modal>
  );
};
export default forwardRef(DrawerModal);
