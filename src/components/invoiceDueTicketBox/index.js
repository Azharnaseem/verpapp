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
import { CompanyIcon, ContractImage, InvoiceIcon, PersonImage } from "~assets/images";

// import LinearGradient from "react-native-linear-gradient";
const InboxDueTicketBox = ({
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
  image=InvoiceIcon,
  invoiceDate='06/09/2022',
  onPressViewDetail,
  onPressPhoneNo,
  item,
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
            style={{tintColor:AppColors.primary, width: width(12), height: width(12) }}
          />
          <View >
            <Text style={styles.nameText}>{`${item?.invoiceNumber}`}</Text>
            <Pressable
              onPress={onPressPhoneNo}
              style={{
                marginTop: 1.5,
                flexDirection: "row",
                alignItems: "center",
              
              }}
            >
             <Image
            source={CompanyIcon}
            resizeMode="contain"
            style={{ width: width(6), height: width(6) ,tintColor:AppColors.primary}}
          />
              <SmallText textStyles={{ FontFamily:FontFamily.montserrat_SemiBold, marginTop: 1}} size={3} color={AppColors.primary}>
                {`${item?.customeraName}`}
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
        <SmallText fontFamily={FontFamily.montserrat_SemiBold} size={3}color={AppColors.scndry}>Invoice Date<Text style={{color:AppColors.primary,fontSize:width(3)}}>{` ${item?.invoiceDate}`}</Text></SmallText>
        </View>
      </View>
      <View style={{marginTop:height(0.5), flexDirection:"row",justifyContent:"space-between"}}>
      <SmallText fontFamily={FontFamily.montserrat_SemiBold} size={3}color={AppColors.scndry}>Invoice Amount<Text style={{color:AppColors.primary,fontSize:width(3)}}>{` ${item?.invoiceAmount}`}</Text></SmallText>
      <SmallText fontFamily={FontFamily.montserrat_SemiBold} size={3}color={AppColors.scndry}>Due Date<Text style={{color:AppColors.primary,fontSize:width(3)}}>{` ${item?.dueDate}`}</Text></SmallText>

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
          Detail code
        </SmallText>
        <SmallText size={3} color={AppColors.greyText2}>{item?.detailCode}</SmallText>
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
          Credit Term
        </SmallText>
        <SmallText size={3} color={AppColors.greyText2}>{item?.creditTerm}</SmallText>
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
        Credit Day
        </SmallText>
        <SmallText size={3} color={AppColors.greyText2}>{item?.creditDay}</SmallText>
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
          Due
        </SmallText>
        <SmallText size={3} color={AppColors.greyText2}>{item?.due}</SmallText>
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
          Remarks
        </SmallText>
        <SmallText size={3} color={AppColors.greyText2}>{item?.remarks}</SmallText>
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
          Reciept Amount
        </SmallText>
        <SmallText size={3} color={AppColors.greyText2}>{item?.recieptAmount}</SmallText>
      </View>

    </View>
  );
};

export default InboxDueTicketBox;
