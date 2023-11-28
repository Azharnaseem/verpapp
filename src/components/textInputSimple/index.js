import React, { forwardRef } from "react";
import { Controller } from "react-hook-form";
import { TextInput, TouchableOpacity, View } from "react-native";
import { FontFamily } from "~assets/fonts";
import { SmallText } from "~components/texts";
import { width } from "~utills/Dimension";
import AppColors from "~utills/AppColors";
import styles from "./styles";
import CommonStyles from "~utills/CommonStyles";
const TextInputSimple = (
  {
    errorMsg,
    mainContainerStyle = {},
    containerStyle = {},
    innerRow = {},
    textValue = "",
    placeholder = "",
    keyboardType = "default",
    maxLength = null,
    multiline = false,
    numberOfLines = null,
    editable = true,
    onChangeText = undefined,
    placeholderColor = AppColors.darkGrey,
    returnKeyType = "default",
    onSubmitEditing = () => {},
    onPressForgot = () => {},
    textAlignVertical,
    Icon = null,
    prefixIcon = null,
    secureTextEntry = false,
    onFocus,
    name,
    onIconPress,
    onPrefixPress,
    onBlurr,
    control,
    blurOnSubmit,
    autoCapitalize,
    label,
    showForgotPassword = false,
    onPress,
  },
  ref
) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, mainContainerStyle]}
    >
      {label && (
        <View style={styles.labelRow}>
          <SmallText
            color={AppColors.scndry}
            fontFamily={FontFamily.montserrat_SemiBold}
            textStyles={[CommonStyles.marginBottom_1]}
          >
            {label}
          </SmallText>
          {showForgotPassword && (
            <SmallText
              color={AppColors.primary}
              onPress={onPressForgot}
              fontFamily={FontFamily.montserrat_SemiBold}
              textStyles={[CommonStyles.marginBottom_1]}
            >
              Forgot Password?
            </SmallText>
          )}
        </View>
      )}
      <View
        style={[
          styles.row,
          { justifyContent: Icon ? "flex-start" : "center" },
          innerRow,
          { alignItems: multiline ? "flex-start" : "center" },
        ]}
      >
        {prefixIcon && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            style={styles.prefixIcon}
          >
            {prefixIcon}
          </TouchableOpacity>
        )}
        {/* <Controller
          control={control}
          name={name}
          render={({ field: { onChange, onBlur, value } }) => ( */}
        
        <TextInput
        onPressIn={onPress}
          textAlignVertical={textAlignVertical}
          editable={editable}
          ref={ref}
          placeholder={placeholder}
          placeholderTextColor={placeholderColor}
          style={[
            styles.inputText,
            containerStyle,
            {
              width: Icon ? width(68) : width(90),
            },
          ]}
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={numberOfLines}
          maxLength={maxLength}
          value={textValue}
          onChangeText={onChangeText}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          secureTextEntry={secureTextEntry}
          selectionColor={AppColors.primary}
          onFocus={onFocus}
          // onBlur={onBlur}
          blurOnSubmit={blurOnSubmit}
          autoCapitalize={autoCapitalize}
        />
        {/* )} */}
        {/* /> */}
        {Icon && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            style={styles.iconStyle}
          >
            {Icon}
          </TouchableOpacity>
        )}
      </View>
      <SmallText size={2.4} color={AppColors.red} textStyles={styles.errorText}>
        {errorMsg}
      </SmallText>
    </TouchableOpacity>
  );
};
export default forwardRef(TextInputSimple);
