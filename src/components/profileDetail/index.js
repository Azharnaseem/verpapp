import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import styles from "./styles";
import { SmallText } from "~components/texts";
import { FontFamily } from "~assets/fonts";
import { height, width } from "~utills/Dimension";
import { LeadIcon, Oppartunity, SuccessIcon } from "~assets/images";
import AppColors from "~utills/AppColors";
import TickCheck from "~assets/SVG/tickCheck";
import AttendenceSvg from "~assets/SVG/Attendence";

// import LinearGradient from "react-native-linear-gradient";
const ProfileDetail = ({
  containerViewStyle = {},
  name = "Azhar Naseem",
  profession = "React Native Developer",
  icon = <AttendenceSvg
  color={AppColors.primary}
 
/>,
 onPress,
  iconStyle
  // image = "https://images.unsplash.com/photo-1520592978680-efbdeae5d036?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
}) => {
  return (
    <Pressable onPress={onPress}>
    <View style={[styles.container, containerViewStyle]}>
     {icon}
      <View style={{marginLeft:width(4) ,marginTop:height(0.5)}}>
     
        <SmallText   numberOfLines={1} color={AppColors.scndry} fontFamily={FontFamily.montserrat_Bold}>{`${name}`}</SmallText>
        {/* <SmallText>{profession}</SmallText> */}
      </View>
        {/* <Image
        resizeMode="contain"
        source={SuccessIcon}
        style={[{
          width: width(8),
          height: width(8),
          // backgroundColor: "gray",
          tintColor:"red",
          borderRadius: width(100),
          marginRight:width(3)
        },iconStyle]}
      /> */}
     
    </View>
    </Pressable>
  );
};

export default ProfileDetail;
