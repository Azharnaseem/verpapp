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
import MoneySvg from "~assets/SVG/moneySvg";
import dayjs from "dayjs";

// import LinearGradient from "react-native-linear-gradient";
const ContractBox = ({
  item,
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
    
    <View style={styles.mainViewContainer}>
      {console.log("---11111---",item)}
        <View style={styles.imageContainer}>
          <Image source={ContractImage} style={styles.imageStyle} />
        </View>
        <SmallText textStyles={styles.headingTextStyle}>
         { `Contact No:${item?.contractNo}`}
        </SmallText>
        <View style={styles.mainInfoContainer}>
          <MoneySvg />
          <SmallText
            size={3.5}
            color={AppColors.scndry}
            fontFamily={FontFamily.montserrat_Bold}
          >
            Ammount
          </SmallText>
          <SmallText
            size={3.5}
            color={AppColors.scndry}
            fontFamily={FontFamily.montserrat_Bold}
            textStyles={styles.priceTextStyle}
          >
            {`${item?.amount} ${item?.currency}`}
          </SmallText>

          <View
            style={{
              width: width(86),
              marginTop: height(0.5),
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: AppColors.grey2,
              borderRadius: width(4),
              padding: width(2),
            }}
          >
            <SmallText
              size={3.5}
              fontFamily={FontFamily.montserrat_SemiBold}
              color={AppColors.scndry}
            >
              Invoice Frequency
            </SmallText>
            <SmallText size={3} color={AppColors.greyText2}>
              {item?.invoicingFrequency}
            </SmallText>
          </View>
          <View
            style={{
             width: width(86),
              marginTop: height(0.5),
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: AppColors.grey2,
              borderRadius: width(4),
              padding: width(2),
            }}
          >
            <SmallText
              size={3.5}
              fontFamily={FontFamily.montserrat_SemiBold}
              color={AppColors.scndry}
            >
              Invoice Pattren
            </SmallText>
            <SmallText size={3} color={AppColors.greyText2}>
              {item?.invoicePattern}
            </SmallText>
          </View>
          <View
            style={{
              width: width(86),
              marginTop: height(0.5),
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: AppColors.grey2,
              borderRadius: width(4),
              padding: width(2),
            }}
          >
            <SmallText
              size={3.5}
              fontFamily={FontFamily.montserrat_SemiBold}
              color={AppColors.scndry}
            >
              Payment Term
            </SmallText>
            <SmallText size={3} color={AppColors.greyText2}>
              {item?.paymentTerms}
            </SmallText>
          </View>
        </View>
        <View style={{marginBottom:height(4),marginTop:height(1)}}>
          <View style={{flexDirection:"row",justifyContent:"space-between"}}>
          <View
            style={{
              width: width(42),
              marginTop: height(0.5),
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: AppColors.lightGrey,
              borderRadius: width(4),
              padding: width(2),
            }}
          >
            <SmallText
              size={3}
              fontFamily={FontFamily.montserrat_SemiBold}
              color={AppColors.greyText2}
            >
            Start Date
            </SmallText>
            <SmallText size={3} color={AppColors.greyText2}>
             {`${dayjs(item?.startDate).format('DD/MM/YYYY')}`}
            </SmallText>
          </View>
          <View
            style={{
              width: width(42),
              marginTop: height(0.5),
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: AppColors.lightGrey,
              borderRadius: width(4),
              padding: width(2),
            }}
          >
            <SmallText
              size={3}
              fontFamily={FontFamily.montserrat_SemiBold}
              color={AppColors.greyText2}
            >
             End Date
            </SmallText>
            <SmallText size={3} color={AppColors.greyText2}>
            {`${dayjs(item?.endDate).format('DD/MM/YYYY')}`}
            </SmallText>
          </View>
          </View>
        <View
            style={{
              width: width(90),
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
             Customer
            </SmallText>
            <SmallText size={3} color={AppColors.greyText2}>
              {item?.customerId}
            </SmallText>
          </View>
          <View
            style={{
              width: width(90),
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
            <SmallText size={3} color={AppColors.greyText2}>
              {item?.opportunityId}
            </SmallText>
          </View>
          <View
            style={{
              width: width(90),
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
              End Customer
            </SmallText>
            <SmallText size={3} color={AppColors.greyText2}>
              {item?.endCustomer}
            </SmallText>
          </View>
          <View
            style={{
              width: width(90),
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
              Status
            </SmallText>
            <SmallText size={3} color={AppColors.greyText2}>
              {item?.status}
            </SmallText>
          </View>
          <View
            style={{
              width: width(90),
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
              PO Number 
            </SmallText>
            <SmallText size={3} color={AppColors.greyText2}>
              {item?.poNumber}
            </SmallText>
          </View>
          <View
            style={{
              width: width(90),
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
              Prevention Mentinance
            </SmallText>
            <SmallText size={3} color={AppColors.greyText2}>
             {item?.preventionMaintenance}
            </SmallText>
          </View>
          <View
            style={{
              width: width(90),
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
             Employee
            </SmallText>
            <SmallText size={3} color={AppColors.greyText2}>
              {item?.employee}
            </SmallText>
          </View>
          <View
            style={{
              width: width(90),
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
              Contact of Notification
            </SmallText>
            <View style={{width:width(43),alignItems:"flex-end"}}>
            <SmallText numberOfLines={2} size={3} color={AppColors.greyText2}>
             {item?.contactofNotification}
            </SmallText>
            </View>
            
          </View>
          <View
            style={{
              width: width(90),
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
              Duration of months
            </SmallText>
            <SmallText size={3} color={AppColors.greyText2}>
              {item?.durationofMonth}
            </SmallText>
          </View>
          <View
            style={{
              width: width(90),
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
              SLA Type
            </SmallText>
            <SmallText size={3} color={AppColors.greyText2}>
              {item?.slaType}
            </SmallText>
          </View>
          <View
            style={{
              width: width(90),
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
             Site
            </SmallText>
            <SmallText size={3} color={AppColors.greyText2}>
              {item?.site}
            </SmallText>
          </View>
          <View
            style={{
              width: width(90),
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
             Tax Percentage
            </SmallText>
            <SmallText size={3} color={AppColors.greyText2}>
             {` ${item?.tax} %`}
            </SmallText>
          </View>
          <View
            style={{
              width: width(90),
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
             Contract status
            </SmallText>
            <SmallText size={3} color={AppColors.greyText2}>
             {item?.contractStatus}
            </SmallText>
          </View>
        </View>
      </View>
  );
};

export default ContractBox;
