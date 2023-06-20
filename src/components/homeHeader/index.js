import React from "react";
import { Image, Pressable, Text } from "react-native";
import styles from "./styles";

import SvgIcon, { CheckedSvg, UncheckedSvg } from "../../assets/SVG";
import { AppIcon } from "~assets/images";
import { height, width } from "~utills/Dimension";
import { View } from "react-native";

const HomeHeader = ({
  containerViewStyle = {},
  onPressLogout,
}) => {
  return (
    <View style={[styles.container, containerViewStyle]}>
      <Image source={AppIcon} resizeMode="contain"  style={{width:width(13),height:width(13)}}/>
      <Pressable onPress={onPressLogout}>
         <SvgIcon.Logout /> 
      </Pressable>
    </View>
  );
};

export default HomeHeader;
