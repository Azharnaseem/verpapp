import React from "react";
import { Pressable, Text,TouchableOpacity } from "react-native";
import styles from "./styles";

import SvgIcon, { CheckedSvg, UncheckedSvg } from "../../assets/SVG";

const CheckList = ({
  selected = false,
  containerViewStyle = {},
  tittle = "Select Country",
  onPress,
}) => {
  return (
    <TouchableOpacity  activeOpacity={0.6} onPress={onPress} style={[styles.container, containerViewStyle]}>
      <Pressable>
        {selected ? <SvgIcon.Checked /> : <SvgIcon.Unchecked />}
      </Pressable>
      <Text style={styles.nameText} numberOfLines={1}>
        {tittle}
      </Text>
    </TouchableOpacity>
  );
};

export default CheckList;
