import React from "react";
import { Image, Pressable, Text } from "react-native";
import styles from "./styles";

import SvgIcon, { CheckedSvg, UncheckedSvg } from "../../assets/SVG";
import { AppIcon } from "~assets/images";
import { height, width } from "~utills/Dimension";

const HomeHeader = ({
  containerViewStyle = {},
  onPress,
}) => {
  return (
    <Pressable onPress={onPress} style={[styles.container, containerViewStyle]}>
      <Image source={AppIcon} resizeMode="contain"  style={{width:width(13),height:width(13)}}/>
      <Pressable onPress={onPress}>
         <SvgIcon.Logout /> 
      </Pressable>
    </Pressable>
  );
};

export default HomeHeader;
