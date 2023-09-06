import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import styles from "./styles";
import { SmallText } from "~components/texts";
import { FontFamily } from "~assets/fonts";
import { height, width } from "~utills/Dimension";
import { LeadIcon, Oppartunity } from "~assets/images";
import AppColors from "~utills/AppColors";

// import LinearGradient from "react-native-linear-gradient";
const LeadsOppComponent = ({
  containerViewStyle = {},
  companyName = "Agrius It",
  leadNo = "123",
  type = "It Support",
  leadOwner = "Azhar Naseem",
  showLead = true,
  opportunityName = "Rammes It Solutions",
  documentNo = "32",
  stage = "New stage",
  onPress,

  chatTextStyle,
}) => {
  return (
    <Pressable onPress={onPress} style={[styles.container, containerViewStyle]}>
      {/* <LinearGradient
      style={[styles.container, containerViewStyle]}
      useAngle
      angle={180}
      colors={AppColors.red}
    > */}
      {showLead ? (
      
          <View style={{ width:width(88), flexDirection: "row" }}>
            <Image
              source={showLead ? LeadIcon : Oppartunity}
              style={{
                tintColor: AppColors.primary,
                width: width(10),
                height: width(10),
                alignSelf: "center",
              }}
            />
            <View style={{ paddingLeft: width(1.5) }}>
              <View style={{ alignItems:"center",flexDirection:"row",}}>
              <Text numberOfLines={1} style={styles.nameText}>
                Leader Owner:
              </Text>
              <Text numberOfLines={1} style={styles.valueName}>{` ${leadOwner}`}</Text>
              </View>
              <View style={{ alignItems:"center",flexDirection:"row",}}>
              <Text  style={styles.nameText}>
                Company Name:
              </Text>
              <Text numberOfLines={1} style={styles.valueName}>{` ${companyName}`}</Text>
              </View>
              <View style={{ alignItems:"center",flexDirection:"row",}}>
              <Text numberOfLines={1} style={styles.nameText}>
                Type:
              </Text>
              <Text numberOfLines={1} style={styles.valueName}>{` ${type}`}</Text>
            </View>
          </View>
          </View>

         
        
      ) : (
        <View style={{ flexDirection: "row" }}>
          <Image
            source={showLead ? LeadIcon : Oppartunity}
            style={{
              // borderWidth: 2,
              // borderColor: AppColors.scndry,
              tintColor: AppColors.primary,
              width: width(10),
              height: width(10),
              // backgroundColor: AppColors.darkGrey + "90",
              alignSelf: "center",
            }}
          />
          <View style={{ paddingLeft: width(1.5) }}>
            <Text numberOfLines={2} style={styles.nameText}>
              Opportunity Name:
              <Text style={styles.valueName}>{` ${opportunityName}`}</Text>
            </Text>
            {/* <Text numberOfLines={2}  style={styles.nameText}>
            Document No:
            <Text style={styles.valueName}> {documentNo}</Text>
          </Text> */}
            <Text numberOfLines={2} style={styles.nameText}>
              Company Name:
              <Text style={styles.valueName}>{` ${companyName}`}</Text>
            </Text>
            <Text numberOfLines={2} style={styles.nameText}>
              Stage:
              <Text style={styles.valueName}>{` ${stage}`}</Text>
            </Text>
            <Text numberOfLines={2} style={styles.nameText}>
              Opportunity Owner:
              <Text style={styles.valueName}>{` ${leadOwner}`}</Text>
            </Text>
          </View>
        </View>
      )}
    </Pressable>
  );
};

export default LeadsOppComponent;
