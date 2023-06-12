import React from "react";
import { Pressable, Text } from "react-native";
import styles from "./styles";

import SvgIcon, { CheckedSvg, UncheckedSvg } from "../../assets/SVG";

const CheckList = ({
  selected = false,
  containerViewStyle = {},
  tittle = "Select Country",
  onPress,
}) => {
  return (
    <Pressable onPress={onPress} style={[styles.container, containerViewStyle]}>
      <Pressable onPress={onPress}>
        {selected ? <SvgIcon.Checked /> : <SvgIcon.Unchecked />}
      </Pressable>
      <Text style={styles.nameText} numberOfLines={1}>
        {tittle}
      </Text>
    </Pressable>
  );
};

export default CheckList;
