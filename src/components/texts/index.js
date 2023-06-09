import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { FontFamily } from '~assets/fonts';
import AppColors from '~utills/AppColors';
import { height, width } from '~utills/Dimension';

export const LargeText = ({
  children = '',
  color = AppColors.textColor,
  textStyles = {},
  fontFamily = FontFamily.montserrat_SemiBold,
  size = 6.5,
  textAlign = 'auto',
  textProps,
  onPress = undefined,
  numberOfLines
}) => {
  const styles = StyleSheet.create({
    text: {
      fontSize: width(size),
      color: color,
      fontFamily: fontFamily,
      textAlign: textAlign,
    },
  });
  return (
    <Pressable disabled={typeof onPress == 'undefined'} onPress={onPress}>
      <Text numberOfLines={numberOfLines} style={[styles.text, textStyles]} {...textProps}>
        {children}
      </Text>
    </Pressable>
  );
};

export const MediumText = ({
  children = '',
  size = 4.5,
  textAlign,
  color = AppColors.textColor,
  textStyles,
  fontFamily = FontFamily.montserrat_Medium,
  textProps,
  onPress = undefined,
  numberOfLines
}) => {
  const styles = StyleSheet.create({
    text: {
      fontSize: width(size),
      color: color,
      textAlign: textAlign,
      fontFamily: fontFamily
    },
  });
  return (
    <Pressable disabled={typeof onPress == 'undefined'} onPress={onPress}>
      <Text numberOfLines={numberOfLines} style={[styles.text, textStyles]} {...textProps}>
        {children}
      </Text>
    </Pressable>
  );
};
export const SmallText = ({
  children = '',
  size = 4,
  textAlign,
  color = AppColors.textColor,
  textStyles,
  fontFamily = FontFamily.montserrat_Regular,
  textProps,
  onPress = undefined,
  numberOfLines,
}) => {
  const styles = StyleSheet.create({
    text: {
      fontSize: width(size),
      color: color,
      textAlign: textAlign,
      fontFamily: fontFamily,
    },
  });
  return (
    <Pressable disabled={typeof onPress == 'undefined'} onPress={onPress}>
      <Text numberOfLines={numberOfLines} style={[styles.text, textStyles]} {...textProps}>
        {children}
      </Text>
    </Pressable>
  );
};
export const UnderLineText = ({
  children = '',
  size = 4.5,
  textAlign,
  color = AppColors.primary,
  textStyles,
  fontFamily = FontFamily.montserrat_Medium,
  textProps,
  onPress = undefined,
  textDecorationLine = 'underline',
}) => {
  const styles = StyleSheet.create({
    text: {
      fontSize: width(size),
      color: color,
      textAlign: textAlign,
      fontFamily: fontFamily,
      textDecorationLine: textDecorationLine,
    },
  });
  return (
    <Pressable disabled={typeof onPress == 'undefined'} onPress={onPress}>
      <Text style={[styles.text, textStyles]} {...textProps}>
        {children}
      </Text>
    </Pressable>
  );
};

