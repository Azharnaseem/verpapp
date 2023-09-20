import React, { forwardRef, useState } from "react";
import { useImperativeHandle } from "react";
import { Pressable, View } from "react-native";
import Button from "~components/button";
import { H1, SmallText } from "~components/texts";
import AppColors from "~utills/AppColors";
import styles from "./styles";
import ModalWrapper from "~components/modalWrapper";
import { FontFamily } from "~assets/fonts";
import { width } from "~utills/Dimension";
import CrossSVG from "~assets/SVG/crossSvg";


const DescriptionModal = (
  {
    tittle="Description",
    text = "sssssssss swdddddddddddddd dsfsf  dfsf  dsrfs sfrcsdfs dfrsfds",
    onNoPress,
    onYesPress,
    textViewStyles,
  },
  ref
) => {
  const [isVisible, setVisible] = useState(false);
  const [description, setDescription] = useState('');
  useImperativeHandle(ref, () => ({
    show: function ({ des}) {
      setDescription(des)
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
      
<Pressable onPress={() => setVisible(false)} style={{width:width(8),height:width(8),justifyContent:"center", alignItems:"center",borderRadius:width(4),backgroundColor:AppColors.primary,position:"absolute",right:10,top:8}}>
<CrossSVG color="white"/>
</Pressable>
      
      <View style={[styles.textView, textViewStyles]}>
        <SmallText fontFamily={FontFamily.montserrat_SemiBold} color={AppColors.black} size={4} textAlign={"center"}>{tittle}</SmallText>
        <SmallText fontFamily={FontFamily.montserrat_Regular} color={AppColors.black} size={3} textAlign={"center"}>{description}</SmallText>
      </View>
      

     
    </ModalWrapper>
  );
};
export default forwardRef(DescriptionModal);
