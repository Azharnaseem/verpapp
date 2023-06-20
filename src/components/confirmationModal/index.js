import React, { forwardRef, useState } from "react";
import { useImperativeHandle } from "react";
import { View } from "react-native";
import Button from "~components/button";
import { H1, SmallText } from "~components/texts";
import AppColors from "~utills/AppColors";
import styles from "./styles";
import ModalWrapper from "~components/modalWrapper";
import { FontFamily } from "~assets/fonts";


const ConfirmationModal = (
  {
    noBtnName = "No",
    yesBtnName = "Yes",
    noBtnStyles,
    yesBtnStyles,
    noBtnTextStyles,
    yesBtnTextStyles,
    text = "",
    onNoPress,
    onYesPress,
    textViewStyles,
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
      onClose={() => setVisible(false)}
      containerStyle={styles.modalStyle}
      backdropOpacity={0.08}
    >
      <View style={[styles.textView, textViewStyles]}>
        <SmallText fontFamily={FontFamily.montserrat_Bold} color={AppColors.black} size={4} textAlign={"center"}>{text}</SmallText>
      </View>

      {noBtnName && yesBtnName && (
        <View style={styles.row}>
          <Button
            title={noBtnName}
            containerStyle={[
              styles.btn,
              { backgroundColor: AppColors.graylight },
              noBtnStyles,
            ]}
            textStyle={[styles.btnText, noBtnTextStyles]}
            onPress={onNoPress}
          />
          <Button
            title={yesBtnName}
            containerStyle={[styles.btn, yesBtnStyles]}
            textStyle={[yesBtnTextStyles]}
            onPress={onYesPress}
          />
        </View>
      )}
    </ModalWrapper>
  );
};
export default forwardRef(ConfirmationModal);
