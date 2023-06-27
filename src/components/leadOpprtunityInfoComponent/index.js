import React from "react";
import { Pressable, Text, View } from "react-native";
import styles from "./styles";
import { SmallText } from "~components/texts";
import { FontFamily } from "~assets/fonts";
import SvgIcon from "~assets/SVG";
import AppColors from "~utills/AppColors";
import { height, width } from "~utills/Dimension";
import Button from "~components/button";


// import LinearGradient from "react-native-linear-gradient";
const LeadOpprtunityInfoDetail= ({

  containerViewStyle = {},

name="Azhar Naseem",
phoneNumber="+923407685574",
department="App Developer",
email="azha@123gmail.com",
country="Pakistan",
onPressPhoneNo,
onPressEmail,
onPressPdf,
chatTextStyle,
}) => {
  return (
    <View style={[styles.container, containerViewStyle]}>
      <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
      <View style={{flexDirection:"row",alignItems:"center" }}>
      <SvgIcon.Person/>
      <View style={{marginHorizontal:width(2),width:width(40)}}>
      <Text style={styles.nameText} >{name}</Text> 
      <Pressable onPress={onPressPhoneNo} style={{ marginTop:1.5,  flexDirection:"row" ,alignItems:"center"}}>
      <SvgIcon.Phone/>
      <SmallText size={3} color={AppColors.primary}>{phoneNumber}</SmallText>
      </Pressable>
      </View>
      </View>
      <Button onPress={onPressPdf} textStyle={styles.btnText}title={"View Pdf"} containerStyle={styles.pdfbtnStyle}/>
      </View>
      <View style={{marginTop:height(1), flexDirection:"row",justifyContent:"space-between", backgroundColor:AppColors.lightGrey ,borderRadius:width(4),padding:width(2)}} >
          <SmallText fontFamily={FontFamily.montserrat_SemiBold} color={AppColors.greyText2}>Department</SmallText>
          <SmallText color={AppColors.greyText2}>{department}</SmallText>
      </View>
      <Pressable onPress={onPressEmail} style={{marginTop:height(1), flexDirection:"row",justifyContent:"space-between", backgroundColor:AppColors.lightGrey ,borderRadius:width(4),padding:width(3)}} >
          <SmallText fontFamily={FontFamily.montserrat_SemiBold} color={AppColors.greyText2}>E-mail</SmallText>
          <SmallText color={AppColors.greyText2}>{email}</SmallText>
      </Pressable>
      <View style={{marginTop:height(1), flexDirection:"row",justifyContent:"space-between", backgroundColor:AppColors.lightGrey ,borderRadius:width(4),padding:width(3)}} >
          <SmallText fontFamily={FontFamily.montserrat_SemiBold} color={AppColors.greyText2}>Country</SmallText>
          <SmallText color={AppColors.greyText2}>{country}</SmallText>
      </View>
      </View>
   

  );
};

export default LeadOpprtunityInfoDetail;
