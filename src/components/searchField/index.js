import React from "react";
import { Pressable, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./styles";
// import { CrossSVG, SearchSVG } from "~assets/svg";
import AppColors from "~utills/AppColors";
import { SmallText } from "~components/texts";


import SearchSVG from "~assets/SVG/searchSvg";
import CrossSVG from "~assets/SVG/crossSvg";
const SearchField = ({
  onPress = () => {},
  onPressClear,
  containerStyle = {},
  placeholder,
  placeholderColor = AppColors.gray,
  value,
  onChangeText,
  onSubmitEditing,
  onFocus,
  onBlur,
  blurOnSubmit,
  inputTextStyle,
  showCrossIcon,
  onPressBar,
  editable = true,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.searchContainer, containerStyle]}
      onPress={onPressBar}
    >
      <Pressable style={styles.searchIcon} onPress={onPress}>
        <SearchSVG/>
      </Pressable>
      {editable ? (
        <TextInput
          style={[styles.searchInput, inputTextStyle]}
          textAlignVertical={"center"}
          placeholder={placeholder}
          placeholderTextColor={placeholderColor}
          value={value}
          onChangeText={onChangeText}
          returnKeyType={"search"}
          onSubmitEditing={onSubmitEditing}
          onFocus={onFocus}
          onBlur={onBlur}
          blurOnSubmit={blurOnSubmit}
        />
      ) : (
        <SmallText
          textStyles={[
            styles.searchInput,
            { color: placeholderColor, flex: 0 },
          ]}
        >
          {placeholder}
        </SmallText>
      )}
      {showCrossIcon && (
        <Pressable style={styles.closeIcon} onPress={onPressClear}>
          <CrossSVG width={12} />
        </Pressable>
      )}
    </TouchableOpacity>
  );
};
export default SearchField;
