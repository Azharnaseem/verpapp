import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import styles from "./styles";
import { SmallText } from "~components/texts";
import { FontFamily } from "~assets/fonts";
import { height, width } from "~utills/Dimension";
import { LeadIcon, Oppartunity } from "~assets/images";
import AppColors from "~utills/AppColors";

// import LinearGradient from "react-native-linear-gradient";
const ProfileDetail = ({
  containerViewStyle = {},
  name = "Azhar Naseem",
  profession = "React Native Developer",
  image = "https://images.unsplash.com/photo-1520592978680-efbdeae5d036?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
}) => {
  return (
    <View style={[styles.container, containerViewStyle]}>
      <Image
        resizeMode="contain"
        source={{ uri: image }}
        style={{
          width: width(12),
          height: width(12),
          backgroundColor: "gray",
          borderRadius: width(100),
          marginRight:width(3)
        }}
      />
      <View>
        <SmallText color={AppColors.scndry}fontFamily={FontFamily.montserrat_Bold}>{name}</SmallText>
        <SmallText>{profession}</SmallText>
      </View>
    </View>
  );
};

export default ProfileDetail;
