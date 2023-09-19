import React from "react";
import {View, Image, Pressable, Text } from "react-native";
import styles from "./styles";

import SvgIcon, { CheckedSvg, UncheckedSvg } from "../../assets/SVG";
import { AppIcon } from "~assets/images";
import { height, width } from "~utills/Dimension";
import { SmallText } from "~components/texts";
import AppColors from "~utills/AppColors";
import { FontFamily } from "~assets/fonts";

const PageHeader = ({
  containerViewStyle = {},

  pageTitle="All Leads",
  onPressBack,
}) => {
  return (
    <View style={[styles.container, containerViewStyle]}>
      <Pressable onPress={onPressBack} style={styles.backCircleCon}>
        <SvgIcon.BackIcon />
      </Pressable>
      <View style={{justifyContent:"center",alignItems:"center",width:width(60),marginHorizontal:width(10)}}>
      <SmallText size={4} color={AppColors.scndry} fontFamily={FontFamily.montserrat_SemiBold} >{pageTitle}</SmallText>
      </View>
      </View>
  );
};

export default PageHeader;
