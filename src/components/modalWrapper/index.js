import React from "react";
import { Pressable, View } from "react-native";
import Modal from "react-native-modal";
import AppColors from "~utills/AppColors";
import styles from "./styles";
const ModalWrapper = ({
  children,
  isVisible,
  onClose,
  containerStyle,
  swipeDirection = "down",
  backdropColor = AppColors.black,
  backdropOpacity = 0,
  wraperContainer,
  onBackdropPress
}) => {
  return (
    <Modal
      isVisible={isVisible}
      style={[styles.modalContainer, wraperContainer]}
      backdropColor={backdropColor}
      backdropOpacity={backdropOpacity}
      onBackdropPress={onBackdropPress}
      avoidKeyboard={true}
      onBackButtonPress={onClose}
      swipeDirection={swipeDirection}
      onSwipeComplete={onClose}
      propagateSwipe={true}
    >
      <View>
        <View
          style={[
            styles.modalInnerContainer,
            containerStyle ? containerStyle : {},
          ]}
        >
          {children}
        </View>
      </View>
    </Modal>
  );
};
export default ModalWrapper;
