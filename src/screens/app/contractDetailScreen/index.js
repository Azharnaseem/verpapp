import React, { useState } from "react";
import { View, Text, Image, FlatList, Linking } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  ContractTicketBox,
  HomeHeader,
  LeadOpprtunityInfoDetail,
  LeadsOppComponent,
  PageHeader,
  ScreenWrapper,
} from "~components";

import { selectUserMeta, setIsLoggedIn, setUserMeta } from "~redux/slices/user";
import styles from "./styles";

import CommonStyles from "~utills/CommonStyles";
import { height, width } from "~utills/Dimension";
import SearchField from "~components/searchField";
import ScreenNames from "~routes/routes";
import { ContractImage } from "~assets/images";
import { SmallText } from "~components/texts";
import MoneySvg from "~assets/SVG/moneySvg";
import { FontFamily } from "~assets/fonts";
import AppColors from "~utills/AppColors";

// import { PDFGenerator } from "~utills/Methods";
export default function ContractDetailScreen({ navigation, route }) {
  const routsData = route.params;
  // console.log("==2222222==", routsData);
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserMeta);
  const makePhoneCall = () => {
    const phoneNumber = "+923407685573"; // Replace with the desired phone number

    Linking.openURL(`tel:${phoneNumber}`).catch((error) =>
      console.log("Error making phone call:", error)
    );
  };

  return (
    <ScreenWrapper
    scrollEnabled
      headerUnScrollable={() => {
        return (
          <View>
            <PageHeader
              pageTitle={"Contract Detail"}
              onPressBack={() => navigation.goBack()}
            />
            {/* <SearchField onPressBar={()=>navigation.navigate(ScreenNames.SEARCHSCREEN)} editable={false} placeholder={"Search Leads"} containerStyle={{marginVertical:height(1)}} /> */}
          </View>
        );
      }}
    >
      <View style={styles.mainViewContainer}>
        <View style={styles.imageContainer}>
          <Image source={ContractImage} style={styles.imageStyle} />
        </View>
        <SmallText textStyles={styles.headingTextStyle}>
          Contract No RU-1244
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
            50,000.00 PKR
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
              Monthly
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
              sss
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
              sss
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
             08/july/2022
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
             09/july/2029
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
             Farukh Khan
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
              323
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
              Adnan
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
              Pending
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
              Farukh K23
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
             yes
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
              Wahid khan 
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
            <SmallText size={3} color={AppColors.greyText2}>
             found032939
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
              Duration of months
            </SmallText>
            <SmallText size={3} color={AppColors.greyText2}>
              3
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
              Full Hardware Support
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
              Mono-Site
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
              1%
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
             Item
            </SmallText>
            <SmallText size={3} color={AppColors.greyText2}>
             Any Value
            </SmallText>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}
