import React, { forwardRef, useState } from "react";
import { useImperativeHandle } from "react";
import { View, Image } from "react-native";
import Button from "~components/button";
import { H1, SmallText } from "~components/texts";
import AppColors from "~utills/AppColors";
import styles from "./styles";
import ModalWrapper from "~components/modalWrapper";
import { FontFamily } from "~assets/fonts";
import { SuccessIcon } from "~assets/images";
import { height, width } from "~utills/Dimension";

const SuccessModal = (
  {
    noBtnName = "No",
    yesBtnName = "Yes",
    noBtnStyles,
    yesBtnStyles,
    noBtnTextStyles,
    yesBtnTextStyles,
    text = "Welcome!",
    onNoPress,
    onYesPress,
    textViewStyles,
    description = "You are Successfully Checkin",
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
    <ModalWrapper
      // wraperContainer={{width:wid}}
      isVisible={isVisible}
      onClose={() => {
        setVisible(false);
      }}
      containerStyle={styles.modalStyle}
      backdropOpacity={0.08}
    >
      <View style={{ alignItems: "center" }}>
        <Image
          resizeMode="contain"
          source={SuccessIcon}
          style={{
            marginBottom: height(2),
            width: width(20),
            height: width(20),
          }}
        />
        <SmallText
          fontFamily={FontFamily.montserrat_Bold}
          color={AppColors.primary}
          size={5}
          textAlign={"center"}
        >
          {text}
        </SmallText>
        <SmallText
          fontFamily={FontFamily.montserrat_Bold}
          color={AppColors.black}
          size={4}
          textAlign={"center"}
        >
          {description}
        </SmallText>
      </View>
    </ModalWrapper>
  );
};
export default forwardRef(SuccessModal);
