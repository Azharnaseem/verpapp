import React from "react";
import { Pressable, Text, View } from "react-native";
import styles from "./styles";
import { SmallText } from "~components/texts";
import { FontFamily } from "~assets/fonts";
import SvgIcon from "~assets/SVG";
import AppColors from "~utills/AppColors";
import { height, width } from "~utills/Dimension";
import Button from "~components/button";
import { Image } from "react-native";
import { ContractImage, PersonImage } from "~assets/images";

// import LinearGradient from "react-native-linear-gradient";
const ContractTicketBox = ({
  containerViewStyle = {},
  contractNo = "1122",
  TicketNo="2312",
  customeraName = "Azhar Naseem",
  opportunityNo = "RE-122",
  employeeName = "Farukkh Khan",
  endDate = "6/july/2029",
  startDate = "6/july/2024",
  onPressPhoneNo,
  image=ContractImage,
  onPressEmail,
  onPressViewDetail,
  SerialNo="RE-3243",
  companyName="Agrius It",
  showTickets=false,
  chatTextStyle,
}) => {
  return (
    <View style={[styles.container, containerViewStyle]}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={image}
            resizeMode="contain"
            style={{ width: width(14), height: width(14) }}
          />
          <View style={{ marginHorizontal: width(2), width: width(40) }}>
            <Text style={styles.nameText}>{showTickets?`Ticket # ${TicketNo}`:`Contract # ${contractNo}`}</Text>
            <Pressable
              onPress={onPressPhoneNo}
              style={{
                marginTop: 1.5,
                flexDirection: "row",
                alignItems: "center",
              
              }}
            >
             <Image
            source={PersonImage}
            resizeMode="contain"
            style={{ width: width(3), height: width(3) }}
          />
              <SmallText textStyles={{ marginTop: 1}} size={3} color={AppColors.primary}>
                {`  ${customeraName}`}
              </SmallText>
            </Pressable>
          </View>
        </View>
        <Button
          onPress={onPressViewDetail}
          textStyle={styles.btnText}
          title={"View Detail"}
          containerStyle={styles.pdfbtnStyle}
        />
      </View>
    {showTickets?(
      <>
       <View
        style={{
          marginTop: height(0.5),
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: AppColors.lightGrey,
          borderRadius: width(4),
          padding: width(2),
        }}
      >
        <SmallText
        size={3.5}
          fontFamily={FontFamily.montserrat_SemiBold}
          color={AppColors.greyText2}
        >
          Company Name
        </SmallText>
        <SmallText size={3} color={AppColors.greyText2}>{companyName}</SmallText>
      </View>
      <View
        style={{
          marginTop: height(0.5),
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: AppColors.lightGrey,
          borderRadius: width(4),
          padding: width(2),
        }}
      >
        <SmallText
        size={3.5}
          fontFamily={FontFamily.montserrat_SemiBold}
          color={AppColors.greyText2}
        >
          Serial No
        </SmallText>
        <SmallText size={3} color={AppColors.greyText2}>{SerialNo}</SmallText>
      </View>
      <View
        style={{
          marginTop: height(0.5),
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: AppColors.lightGrey,
          borderRadius: width(4),
          padding: width(2),
        }}
      >
        <SmallText
        size={3.5}
          fontFamily={FontFamily.montserrat_SemiBold}
          color={AppColors.greyText2}
        >
          Contract No
        </SmallText>
        <SmallText size={3} color={AppColors.greyText2}>{SerialNo}</SmallText>
      </View>
      </>
   
      
      
      
      ):  (
      <>
      <View
        style={{
          marginTop: height(0.5),
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: AppColors.lightGrey,
          borderRadius: width(4),
          padding: width(2),
        }}
      >
        <SmallText
        size={3.5}
          fontFamily={FontFamily.montserrat_SemiBold}
          color={AppColors.greyText2}
        >
          Opportunity No
        </SmallText>
        <SmallText size={3} color={AppColors.greyText2}>{opportunityNo}</SmallText>
      </View>
      <Pressable
        onPress={onPressEmail}
        style={{
          marginTop: height(1),
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: AppColors.lightGrey,
          borderRadius: width(4),
          padding: width(3),
        }}
      >
        <SmallText
        size={3.5}
          fontFamily={FontFamily.montserrat_SemiBold}
          color={AppColors.greyText2}
        >
        Employee Name
        </SmallText>
        <SmallText size={3} color={AppColors.greyText2}>{employeeName}</SmallText>
      </Pressable>
      <View style={{flexDirection:"row",justifyContent:"space-between"}}>
        
     
      <View
        style={{
          marginTop: height(1),
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: AppColors.lightGrey,
          borderRadius: width(4),
          alignItems:"center",
          padding: width(3),
          width:width(40)
        }}
      >
        <SmallText
        size={3}
          fontFamily={FontFamily.montserrat_SemiBold}
          color={AppColors.greyText2}
        >
          Start Date
        </SmallText>
        <SmallText size={3} color={AppColors.greyText2}>{startDate}</SmallText>
      </View>
      <View
        style={{
          marginTop: height(1),
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: AppColors.lightGrey,
          borderRadius: width(4),
          alignItems:"center",
          padding: width(3),
          width:width(40)
        }}
      >
        <SmallText
        size={3}
          fontFamily={FontFamily.montserrat_SemiBold}
          color={AppColors.greyText2}
        >
          End Date
        </SmallText>
        <SmallText size={3} color={AppColors.greyText2}>{endDate}</SmallText>
      </View>
      </View>
      </>)}
    </View>
  );
};

export default ContractTicketBox;
