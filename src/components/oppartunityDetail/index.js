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

// import LinearGradient from "react-native-linear-gradient";
const OppartunityDetail = ({
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
  onPressDescription,
  onPressPhoneNo,
  item,
}) => {
  console.log("=====sssssssssss",item);
  return (
    <View style={[styles.container, containerViewStyle]}>
      <View
        style={{
        
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row",width:'75%',  alignItems: "center" , }}>
          <Image
            source={image}
            resizeMode="contain"
            style={{tintColor:AppColors.primary, width: width(12), height: width(12) }}
          />
          <View >
            <Text numberOfLines={2} style={styles.nameText}>{`Part No: ${item?.partNo?item?.partNo:"Not found"}`}</Text>
            <Pressable
              // onPress={onPressPhoneNo}
              style={{
                marginTop: 1.5,
                flexDirection: "row",
                alignItems: "center",
                // justifyContent:"center",
                paddingLeft:3,
                // backgroundColor:"green"
            
              }}
            >
              <SmallText size={3} fontFamily={FontFamily.montserrat_SemiBold} color={AppColors?.scndry}>Lead Time:</SmallText>
             {/* <Image
            source={CompanyIcon}
            resizeMode="contain"
            style={{ width: width(6), height: width(6) ,tintColor:AppColors.primary}}
          /> */}
              <SmallText numberOfLines={1}   fontFamily={FontFamily.montserrat_SemiBold} textStyles={{ width:width(20), marginTop: 1}} size={3} color={AppColors.primary}>
                {`${item?.leadTime?item?.leadTime:"Nill"}`}
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
        <SmallText fontFamily={FontFamily.montserrat_SemiBold} size={3}color={AppColors.scndry}>Discount<Text style={{color:AppColors.primary,fontSize:width(3)}}>{` ${item?.discount}`}</Text></SmallText>
        </View>
      </View>
      <View style={{marginTop:height(0.5), flexDirection:"row",justifyContent:"space-between"}}>
      <SmallText fontFamily={FontFamily.montserrat_SemiBold} size={3}color={AppColors.scndry}>Total Price<Text style={{color:AppColors.primary,fontSize:width(3)}}>{` ${item?.totalAmount}`}</Text></SmallText>
      <SmallText fontFamily={FontFamily.montserrat_SemiBold} size={3}color={AppColors.scndry}>Price<Text style={{color:AppColors.primary,fontSize:width(3)}}>{` ${item?.price}`}</Text></SmallText>

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
          Brand No
        </SmallText>
        <SmallText size={3} color={AppColors.greyText2}>{item?.brandNo?item?.brandNo:"Nill"}</SmallText>
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
        Status
        </SmallText>
        <SmallText size={3} color={AppColors.greyText2}>{item?.status?item?.status:"Nill"}</SmallText>
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
          Warranty
        </SmallText>
        <SmallText size={3} color={AppColors.greyText2}>{item?.warranty?item?.warranty:"Nill"}</SmallText>
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
          Qty
        </SmallText>
        <SmallText size={3} color={AppColors.greyText2}>{item?.qty?item?.qty:"Nill"}</SmallText>
      </View>
      <Pressable
      onPress={onPressDescription}
        style={{
          marginTop: height(0.5),
          // flexDirection: "row",
          // justifyContent: "space-between",
          backgroundColor: AppColors.green,
          borderRadius: width(4),
          padding: width(2),
        }}
      >
        <SmallText
        size={3.5}
        
          fontFamily={FontFamily.montserrat_SemiBold}
          color={AppColors.greyText2}
        >
        Description:
        </SmallText>
        <SmallText textStyles={styles.tttt}  numberOfLines={3} size={3} color={AppColors.greyText2}>{`${item?.description?item?.description:"Nill"}`}</SmallText>
      </Pressable>

    </View>
  );
};

export default OppartunityDetail;
