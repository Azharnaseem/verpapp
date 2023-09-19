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
import { CompanyIcon, ContractImage, InvoiceIcon, LeadIcon, Oppartunity, PersonImage } from "~assets/images";
import dayjs from "dayjs";

// import LinearGradient from "react-native-linear-gradient";
const SupprtOppartunityDetail = ({
  containerViewStyle = {},
  // invoiceNumber = "Pur-11 00022",
  // invoiceAmount="60,000.00 $",
  // dueDate="16/09/2023",
  // remarks="Nill",
  // customeraName = "Agrius IT",
  // detailCode = "RE-122-323-33",
  // creditTerm = "Credit",
  // creditDay = "12",
  // due = "0.00$",
  // recieptAmount="0.00$",
  image=Oppartunity,
  invoiceDate='06/09/2022',
  onPressViewDetail,
  onPressPhoneNo,
  item,
}) => {
  console.log("================>>>dd------>>>>",item);
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
            style={{tintColor:AppColors.primary, width: width(12), height: width(12) }}
          />
          <View >
            <Text style={styles.nameText}>{`Modal No: ${item?.modelNo?item?.modelNo:"Not found"}`}</Text>
            <Pressable
              // onPress={onPressPhoneNo}
              style={{
                marginTop: 1.5,
                flexDirection: "row",
                alignItems: "center",
                // justifyContent:"center",
                paddingLeft:3
              
              }}
            >
              <SmallText size={3} fontFamily={FontFamily.montserrat_SemiBold} color={AppColors?.scndry}>Serial No:</SmallText>
             {/* <Image
            source={CompanyIcon}
            resizeMode="contain"
            style={{ width: width(6), height: width(6) ,tintColor:AppColors.primary}}
          /> */}
              <SmallText fontFamily={FontFamily.montserrat_SemiBold} textStyles={{ marginTop: 1}} size={3} color={AppColors.primary}>
                {`${item?.serialNo?item?.serialNo:"Nill"}`}
              </SmallText>
            </Pressable>
          </View>
        </View>
        <View >
        <Button
          onPress={onPressViewDetail}
          textStyle={styles.btnText}
          title={"View Pdf"}
          containerStyle={styles.pdfbtnStyle}
        />
        <SmallText fontFamily={FontFamily.montserrat_SemiBold} size={3}color={AppColors.scndry}>Start Date<Text style={{color:AppColors.primary,fontSize:width(3)}}>{` ${dayjs(item?.startDate).format('DD/MM/YYYY')}`}</Text></SmallText>
        </View>
      </View>
      <View style={{marginTop:height(0.5), flexDirection:"row",justifyContent:"space-between"}}>
      <SmallText fontFamily={FontFamily.montserrat_SemiBold} size={3}color={AppColors.scndry}>Unit Price<Text style={{color:AppColors.primary,fontSize:width(3)}}>{` ${item?.unitPrice}`}</Text></SmallText>
      <SmallText fontFamily={FontFamily.montserrat_SemiBold} size={3}color={AppColors.scndry}>End Date<Text style={{color:AppColors.primary,fontSize:width(3)}}>{` ${dayjs(item?.endDate).format('DD/MM/YYYY')}`}</Text></SmallText>

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
          Brand
        </SmallText>
        <SmallText size={3} color={AppColors.greyText2}>{item?.brand?item?.brand:"Nill"}</SmallText>
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
          Type
        </SmallText>
        <SmallText size={3} color={AppColors.greyText2}>{item?.type?item?.type:"Nill"}</SmallText>
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
        Address
        </SmallText>
        <SmallText size={3} color={AppColors.greyText2}>{item?.address?item?.address:"Nill"}</SmallText>
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
          Country
        </SmallText>
        <SmallText size={3} color={AppColors.greyText2}>{item?.country?item?.country:"Nill"}</SmallText>
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
          City
        </SmallText>
        <SmallText size={3} color={AppColors.greyText2}>{item?.city?item?.city:"Nill"}</SmallText>
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
          SLA Coverage
        </SmallText>
        <SmallText size={3} color={AppColors.greyText2}>{item?.slaCoverage?item?.slaCoverage:"Nill"}</SmallText>
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
          SLA Invention Time
        </SmallText>
        <SmallText size={3} color={AppColors.greyText2}>{item?.slaInterventionTime?item?.slaInterventionTime:"Nill"}</SmallText>
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
          SLA Fix Time
        </SmallText>
        <SmallText size={3} color={AppColors.greyText2}>{item?.slaFixTime?item?.slaFixTime:"Nill"}</SmallText>
      </View>
     

    </View>
  );
};

export default SupprtOppartunityDetail;
